# optimized_particle_instancing.py
#
# Copyright (c) 2026 rePhlow, iGEM UCM Madrid
# Released under the MIT Licence. See LICENSE, or https://opensource.org/licenses/MIT
#
# Part of the rePhlow open-source Blender tools.
# https://2026.igem.wiki/rephlow/contribution

"""
Optimised instancing for high-volume biological particles.

Places fifteen calcium alginate beads inside the perforated basket,
optimised for render performance rather than optical accuracy. The target
is a legible visualisation of a biotechnology device, not a photorealistic
material study.

THE THREE DECISIONS THAT KEEP IT FAST
    1. One shared mesh. Every bead points at the same mesh datablock, an
       icosphere with subdivisions=2, that is 42 vertices and 80 faces. The
       subtle organic deformation is applied ONCE to that shared mesh, not
       per bead, so fifteen objects cost the memory of one.
    2. One shared material. A single Principled BSDF using Alpha blending,
       with no transmission, no subsurface scattering, no volume and no
       procedural textures. A pale base colour plus alpha reads as wet
       hydrogel at a fraction of the cost of physically accurate glass.
    3. Variety through transforms only. Each bead gets its own rotation and
       a slightly non-uniform scale. Nothing is ever duplicated, so visual
       variation is free.

    Scaling this up is linear in objects and flat in geometry, which is why
    the viewport stays responsive where hundreds of individually modelled
    beads would freeze it.

THE PARENTING TRAP, AND WHY matrix_parent_inverse IS THE IDENTITY HERE
    Setting obj.matrix_parent_inverse = parent.matrix_world.inverted()
    cancels the parent transform, which makes obj.location behave as a
    WORLD coordinate. The bead positions below were computed in the LOCAL
    space of "Basket_Body", so the inverse matrix must be left as the
    identity for them to land correctly. Without this the beads appear far
    below and outside the basket. This is the single most common mistake
    when parenting by script instead of in the interface.

WHY PARENT TO THE BASKET AND NOT TO THE ROTATION EMPTY
    The beads follow the basket, so when the basket spins or opens they
    travel with it automatically and no second animation is needed.

SCENE REQUIREMENTS
    "Basket_Body" must exist. Run 06_procedural_mesh_slicer.py first.
    This script touches nothing else in the scene.

TESTED IN
    Blender [version to fill in]

USAGE
    Scripting workspace -> New Text -> paste -> Run Script (Alt+P).
"""

import bpy
import bmesh
import random
import mathutils

RADIO_BEAD = 4.0          # mm, so 8 mm diameter beads
NUM_BOLITAS = 15
NOMBRE_MESH = "Bead_Produccion_Mesh"
NOMBRE_MAT = "Bead_Produccion_Mat"

# Transforms used in the production scene, expressed in the LOCAL space of
# "Basket_Body". They were generated once with random jitter inside the
# footprint of the basket, close to the bottom, allowing slight overlap
# between neighbours so the arrangement reads as settled rather than
# arranged. They are hard-coded rather than regenerated so that the scene
# is reproducible frame for frame.
DATOS_BOLITAS = [
    # (loc_x, loc_y, loc_z, rot_x, rot_y, rot_z, scale_x, scale_y, scale_z)
    (-9.29,  2.87, -59.89, 5.811, 5.960, 5.607, 0.979, 0.972, 0.976),
    (-4.77, -2.92, -60.39, 0.819, 1.206, 2.793, 0.981, 0.965, 0.967),
    ( 5.94,  3.99, -60.89, 4.461, 2.647, 3.221, 1.008, 0.996, 1.026),
    ( 3.96, -10.07, -60.95, 3.702, 4.134, 3.902, 1.023, 1.039, 1.023),
    (12.69, -1.43, -60.22, 3.594, 4.150, 1.975, 0.974, 0.984, 0.979),
    (-2.29, 12.78, -59.81, 2.811, 4.036, 1.144, 0.974, 0.993, 0.969),
    (-2.48,  5.71, -60.65, 0.718, 0.620, 0.245, 0.989, 0.999, 0.980),
    ( 4.13, 10.39, -59.87, 2.323, 1.813, 1.915, 1.019, 1.007, 1.001),
    (-11.18, -4.37, -60.26, 4.925, 4.443, 5.206, 0.986, 1.001, 0.988),
    (-3.32, -11.09, -59.90, 5.941, 1.051, 6.126, 0.970, 0.955, 0.985),
    # Five beads added later, to fill the bottom of the basket better,
    # reusing exactly the same shared mesh and material.
    (-7.65,  5.27, -60.69, 1.561, 4.774, 1.578, 0.988, 1.013, 1.001),
    (10.39, -4.24, -60.39, 3.853, 1.362, 5.667, 0.987, 0.988, 1.013),
    ( 7.04,  9.99, -59.88, 2.129, 5.949, 3.322, 1.021, 0.995, 0.989),
    (-0.94,  7.68, -60.66, 6.218, 3.357, 2.903, 1.032, 1.006, 1.038),
    (-5.88,  7.34, -59.80, 1.010, 4.975, 3.741, 1.039, 1.035, 1.011),
]

body = bpy.data.objects.get("Basket_Body")
if body is None:
    raise RuntimeError("'Basket_Body' not found in the scene. "
                       "Run 06_procedural_mesh_slicer.py first.")

# -----------------------------------------------------------------------
# Idempotent clean-up, limited to the objects and data this script owns.
# -----------------------------------------------------------------------
for i in range(1, NUM_BOLITAS + 1):
    o = bpy.data.objects.get(f"Bead_Cesta_{i:02d}")
    if o:
        bpy.data.objects.remove(o, do_unlink=True)
m_viejo = bpy.data.meshes.get(NOMBRE_MESH)
if m_viejo:
    bpy.data.meshes.remove(m_viejo)
mat_viejo = bpy.data.materials.get(NOMBRE_MAT)
if mat_viejo:
    bpy.data.materials.remove(mat_viejo)

# =========================================================================
# 1. SHARED MESH
#    A low-polygon icosphere deformed once. The fixed random seed keeps the
#    deformation identical between runs, so renders are reproducible.
# =========================================================================
random.seed(42)

bpy.ops.mesh.primitive_ico_sphere_add(radius=RADIO_BEAD, subdivisions=2, location=(0, 0, 0))
bead_base = bpy.context.object
mesh_compartida = bead_base.data
mesh_compartida.name = NOMBRE_MESH

bm = bmesh.new()
bm.from_mesh(mesh_compartida)
for v in bm.verts:
    factor = 1.0 + random.uniform(-0.015, 0.015)   # +/- 1.5 %, deliberately subtle
    v.co *= factor
bm.to_mesh(mesh_compartida)
bm.free()
mesh_compartida.update()

# The temporary object has served its purpose; the mesh datablock survives
# because the beads created below will reference it.
bead_base.data.materials.clear()
bpy.data.objects.remove(bead_base, do_unlink=True)

# =========================================================================
# 2. SHARED MATERIAL
#    Cheap shading. Alpha blending instead of transmission, no subsurface,
#    no volume, no textures. A low roughness is what makes it read as wet.
# =========================================================================
mat = bpy.data.materials.new(NOMBRE_MAT)
mat.use_nodes = True
nt = mat.node_tree
principled = nt.nodes.get("Principled BSDF")

principled.inputs["Base Color"].default_value = (0.80, 0.94, 0.96, 1.0)  # pale cyan
principled.inputs["Alpha"].default_value = 0.60
principled.inputs["Roughness"].default_value = 0.18
principled.inputs["Metallic"].default_value = 0.0
principled.inputs["Transmission Weight"].default_value = 0.0
principled.inputs["Subsurface Weight"].default_value = 0.0
principled.inputs["IOR"].default_value = 1.5

mat.blend_method = 'BLEND'
try:
    mat.shadow_method = 'NONE'   # minimal shadow cost, where the property exists
except Exception:
    pass
try:
    mat.use_raytrace_refraction = False
except Exception:
    pass

# =========================================================================
# 3. THE BEAD OBJECTS
#    Each one references the same mesh and the same material, and differs
#    only in its transform.
# =========================================================================
bolitas = []
for i, (lx, ly, lz, rx, ry, rz, sx, sy, sz) in enumerate(DATOS_BOLITAS, start=1):
    obj = bpy.data.objects.new(f"Bead_Cesta_{i:02d}", mesh_compartida)
    bpy.context.collection.objects.link(obj)

    obj.location = (lx, ly, lz)
    obj.rotation_euler = (rx, ry, rz)
    obj.scale = (sx, sy, sz)

    obj.data.materials.append(mat)

    mod = obj.modifiers.new("Smooth_by_Angle", 'NODES')
    try:
        bpy.ops.object.shade_auto_smooth({"object": obj}, angle=0.6)
    except Exception:
        # Operator signature changed across versions; the mesh still renders.
        pass

    # Identity inverse, so obj.location stays a local coordinate of the
    # parent. See the note at the top of the file.
    obj.parent = body
    obj.matrix_parent_inverse = mathutils.Matrix.Identity(4)

    bolitas.append(obj)

print(f"{len(bolitas)} alginate beads created, sharing mesh '{NOMBRE_MESH}' and "
      f"material '{NOMBRE_MAT}', parented to 'Basket_Body'.")
