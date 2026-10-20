# procedural_hydrogel_generator.py
#
# Copyright (c) 2026 rePhlow, iGEM UCM Madrid
# Released under the MIT Licence. See LICENSE, or https://opensource.org/licenses/MIT
#
# Part of the rePhlow open-source Blender tools.
# https://2026.igem.wiki/rephlow/contribution

"""
Procedural hydrogel bead generator.

Builds a single alginate hydrogel bead and gives it a procedural core-shell
material, meaning the appearance is computed from shader nodes rather than
loaded from texture images. The result is a translucent sphere with a cloudy,
denser core fading into an almost colourless outer shell.

This script creates ONE test bead. Its purpose is to validate size, shape and
material before populating a container with many copies; use
04_optimized_particle_instancing.py for the high-volume case.

WHY A PROCEDURAL MATERIAL
    A hydrogel capsule has no surface detail to photograph, so an image texture
    buys nothing. What reads as "wet gel" is the radial gradient between a
    light-scattering core and a transmissive shell, and that is cheap to
    compute and free to retune.

SCENE REQUIREMENTS
    None. This script runs on an empty scene.

SCALE
    The scene convention is 1 Blender Unit = 1 mm. The bead is 4 mm across
    (2 mm radius). Change RADIO_BEAD to rescale; the material follows it
    automatically, because the radial gradient is mapped from the same value.

TESTED IN
    Blender [version to fill in]

USAGE
    Scripting workspace -> New Text -> paste -> Run Script (Alt+P).
"""

import bpy

# ---------------------------------------------------------------------
# Idempotent clean-up.
# Removes the objects and materials this script creates, so it can be run
# repeatedly without accumulating duplicates named .001, .002 and so on.
# ---------------------------------------------------------------------
for nombre in ("Bead_Alginato_Test",):
    o = bpy.data.objects.get(nombre)
    if o:
        bpy.data.objects.remove(o, do_unlink=True)
for nombre_mat in ("Alginato_Hidrogel",):
    m = bpy.data.materials.get(nombre_mat)
    if m:
        bpy.data.materials.remove(m)

RADIO_BEAD = 2.0                          # mm, so a 4 mm diameter bead
UBICACION_BEAD = (70.0, 0.0, RADIO_BEAD)  # placed at floor level, clear of other geometry

# =========================================================================
# 1. GEOMETRY
#    A near-perfect sphere carrying a very subtle organic deformation.
#    A mathematically perfect sphere reads as synthetic; real capsules are
#    slightly irregular, and that irregularity is what sells the material.
# =========================================================================
bpy.ops.mesh.primitive_ico_sphere_add(
    radius=RADIO_BEAD, subdivisions=5, location=UBICACION_BEAD
)
bead = bpy.context.object
bead.name = "Bead_Alginato_Test"

# Slight overall asymmetry, applied as scale and then baked into the mesh.
bead.scale = (1.0, 1.035, 0.965)
bpy.context.view_layer.objects.active = bead
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

# Very low-frequency surface undulation. A large noise scale gives broad,
# soft waves; a small one would give wrinkles and spikes, which is wrong
# for a smooth gel.
tex_ruido = bpy.data.textures.new("RuidoBead", type='DISTORTED_NOISE')
tex_ruido.noise_scale = 3.2      # large scale, so wide and gentle undulations
tex_ruido.distortion = 0.6

mod_disp = bead.modifiers.new("Displace_Organico", 'DISPLACE')
mod_disp.texture = tex_ruido
mod_disp.strength = 0.06         # about 3 % of the radius, deliberately subtle
mod_disp.mid_level = 0.5

mod_subsurf = bead.modifiers.new("Subdiv_Suavizado", 'SUBSURF')
mod_subsurf.levels = 1           # viewport
mod_subsurf.render_levels = 2    # render

bpy.ops.object.shade_smooth()
try:
    # Auto-smooth exists only in recent Blender versions; ignore if absent.
    bpy.ops.object.shade_auto_smooth(angle=0.6)
except Exception:
    pass

# =========================================================================
# 2. MATERIAL
#    Translucent hydrogel with a core-to-shell gradient. Everything below
#    is driven by one value, the normalised distance from the centre of the
#    object, so the three properties that change with depth stay coherent.
# =========================================================================
mat = bpy.data.materials.new("Alginato_Hidrogel")
mat.use_nodes = True
nt = mat.node_tree
nodes, links = nt.nodes, nt.links
nodes.clear()

salida = nodes.new("ShaderNodeOutputMaterial")
principled = nodes.new("ShaderNodeBsdfPrincipled")
links.new(principled.outputs["BSDF"], salida.inputs["Surface"])

# --- Radial factor: 0 at the centre (core), 1 at the surface (shell) -----
# Object coordinates are used rather than world coordinates, so the gradient
# travels with the bead wherever it is moved or instanced.
tex_coord = nodes.new("ShaderNodeTexCoord")
vec_len = nodes.new("ShaderNodeVectorMath")
vec_len.operation = 'LENGTH'
links.new(tex_coord.outputs["Object"], vec_len.inputs[0])

mapa_radial = nodes.new("ShaderNodeMapRange")
mapa_radial.inputs["From Min"].default_value = 0.0
mapa_radial.inputs["From Max"].default_value = RADIO_BEAD
mapa_radial.inputs["To Min"].default_value = 0.0
mapa_radial.inputs["To Max"].default_value = 1.0
mapa_radial.clamp = True
links.new(vec_len.outputs["Value"], mapa_radial.inputs["Value"])
factor_radial = mapa_radial.outputs["Result"]

# --- Colour: denser and bluer at the core, almost colourless at the shell -
color_nucleo = (0.66, 0.82, 0.89, 1.0)
color_cascara = (0.90, 0.96, 0.985, 1.0)

mezcla_color = nodes.new("ShaderNodeMix")
mezcla_color.data_type = 'RGBA'
mezcla_color.inputs["A"].default_value = color_nucleo
mezcla_color.inputs["B"].default_value = color_cascara
links.new(factor_radial, mezcla_color.inputs["Factor"])
links.new(mezcla_color.outputs["Result"], principled.inputs["Base Color"])

# --- Transmission: the shell lets light through, the core blocks more -----
mapa_transmision = nodes.new("ShaderNodeMapRange")
mapa_transmision.inputs["From Min"].default_value = 0.0
mapa_transmision.inputs["From Max"].default_value = 1.0
mapa_transmision.inputs["To Min"].default_value = 0.15   # core
mapa_transmision.inputs["To Max"].default_value = 0.55   # shell
links.new(factor_radial, mapa_transmision.inputs["Value"])
links.new(mapa_transmision.outputs["Result"], principled.inputs["Transmission Weight"])

# --- Subsurface scattering: higher at the core, which is what makes it ----
#     look cloudy rather than simply tinted.
mapa_sss = nodes.new("ShaderNodeMapRange")
mapa_sss.inputs["From Min"].default_value = 0.0
mapa_sss.inputs["From Max"].default_value = 1.0
mapa_sss.inputs["To Min"].default_value = 0.95   # core, cloudier
mapa_sss.inputs["To Max"].default_value = 0.55   # shell, still slightly diffusing
links.new(factor_radial, mapa_sss.inputs["Value"])
links.new(mapa_sss.outputs["Result"], principled.inputs["Subsurface Weight"])

# A generous scattering radius relative to the size of the bead. Without it,
# light would not visibly diffuse inside an object only 4 mm across.
principled.inputs["Subsurface Radius"].default_value = (1.0, 1.3, 1.6)
try:
    principled.inputs["Subsurface Scale"].default_value = 1.0
except Exception:
    # Input renamed across Blender versions; safe to skip.
    pass

principled.inputs["Roughness"].default_value = 0.16   # slightly glossy, reads as wet
principled.inputs["Metallic"].default_value = 0.0
principled.inputs["IOR"].default_value = 1.33         # water, not glass

mat.blend_method = 'BLEND'
try:
    mat.shadow_method = 'NONE'
except Exception:
    # Removed in Blender 4.2+; ignore on newer versions.
    pass
mat.use_screen_refraction = False

bead.data.materials.clear()
bead.data.materials.append(mat)

print(f"Alginate bead created at {UBICACION_BEAD}, diameter {RADIO_BEAD * 2} mm.")
