# macro_studio_lighting_rig.py
#
# Copyright (c) 2026 rePhlow, iGEM UCM Madrid
# Released under the MIT Licence. See LICENSE, or https://opensource.org/licenses/MIT
#
# Part of the rePhlow open-source Blender tools.
# https://2026.igem.wiki/rephlow/contribution

"""
Macro-scale studio lighting and camera rig.

Spawns a three-point lighting setup and a tracking product camera, both
calibrated for hardware measured in millimetres, and sets the render output
for video.

THE PROBLEM THIS SOLVES
    Blender's light transport assumes 1 Blender Unit = 1 metre. Setting
    scene.unit_settings.scale_length = 0.001 changes how units are DISPLAYED
    in the interface, but Cycles and EEVEE keep computing the physics as if
    one unit were a metre. A device modelled at "millimetres as Blender
    Units" is therefore lit as though it were hundreds of times larger and
    hundreds of times further from every lamp, so ordinary wattages render
    almost black.

    The energies below are not arbitrary. They were calibrated empirically
    against the real scene and verified by Cycles renders. Expect values in
    the tens of millions of watts and do not treat them as a mistake.

SCENE REQUIREMENTS
    An object to aim at. The script looks for "Empty_Rotacion" and falls
    back to "Cuerpo_Acero". If neither exists, the camera and lamps are
    still created but nothing tracks a target, so point them manually or
    rename your own subject to one of those two.

    Every existing camera and light is deleted first. Run this on a scene
    whose lighting you are willing to lose.

TESTED IN
    Blender [version to fill in]

USAGE
    Scripting workspace -> New Text -> paste -> Run Script (Alt+P).
"""

import bpy

scene = bpy.context.scene

# -----------------------------------------------------------------------
# 1. CLEAN-UP
#    Remove every existing camera and light, so repeated runs do not stack
#    rigs on top of each other.
# -----------------------------------------------------------------------
for obj in list(bpy.data.objects):
    if obj.type in ('CAMERA', 'LIGHT'):
        bpy.data.objects.remove(obj, do_unlink=True)

# Framing and lighting target. In the rePhlow scene the base is not a
# separate object, it is merged into "Cuerpo_Acero", so the rotation Empty
# is used as the aim point and the merged body is the fallback.
objetivo = bpy.data.objects.get("Empty_Rotacion") or bpy.data.objects.get("Cuerpo_Acero")

# =========================================================================
# 2. PRODUCT CAMERA
#    Elevated three-quarter view with an 85 mm lens, the usual choice for
#    product photography because it compresses perspective without the
#    distortion of a wide angle.
# =========================================================================
bpy.ops.object.camera_add(location=(450.0, -510.0, 470.0))
camara = bpy.context.object
camara.name = "Camara_Producto"
camara.data.lens = 85.0

# At this scale the default clipping range would cut the subject off, since
# the camera sits several hundred "millimetre units" away. Widen both ends.
camara.data.clip_start = 1.0
camara.data.clip_end = 5000.0

if objetivo:
    track = camara.constraints.new('TRACK_TO')
    track.target = objetivo
    track.track_axis = 'TRACK_NEGATIVE_Z'
    track.up_axis = 'UP_Y'

scene.camera = camara

# =========================================================================
# 3. THREE-POINT STUDIO LIGHTING
#    Area lamps only. Large emitters give soft shadows and the broad
#    highlights that read as polished metal and wet glass.
# =========================================================================

def crear_luz_area(nombre, ubicacion, energia, tamano):
    """Create one square area lamp aimed at the scene target.

    nombre    name given to the lamp object
    ubicacion (x, y, z) in scene units
    energia   watts, calibrated for the millimetre-as-unit scale
    tamano    emitter edge length; larger means softer shadows
    """
    bpy.ops.object.light_add(type='AREA', location=ubicacion)
    luz = bpy.context.object
    luz.name = nombre
    luz.data.shape = 'SQUARE'
    luz.data.size = tamano
    luz.data.energy = energia
    if objetivo:
        t = luz.constraints.new('TRACK_TO')
        t.target = objetivo
        t.track_axis = 'TRACK_NEGATIVE_Z'
        t.up_axis = 'UP_Y'
    return luz

# Key light. Camera side, strongest of the three, defines the volumes.
crear_luz_area("Luz_Key", (350.0, -300.0, 320.0), energia=4.0e7, tamano=300.0)

# Fill light. Opposite side, under half the key energy, opens the shadows
# without flattening the subject.
crear_luz_area("Luz_Fill", (-320.0, -200.0, 180.0), energia=1.77e7, tamano=350.0)

# Rim light. Behind and above, separates the silhouette from the background.
crear_luz_area("Luz_Rim", (0.0, 320.0, 350.0), energia=3.1e7, tamano=250.0)

# =========================================================================
# 4. VIDEO OUTPUT FORMAT
# =========================================================================
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.resolution_percentage = 100

scene.frame_start = 1
scene.frame_end = 250

# On EEVEE, raytracing has to stay on or transmissive objects such as a
# glass vessel render opaque.
if scene.render.engine == 'BLENDER_EEVEE' and hasattr(scene, "eevee"):
    scene.eevee.use_raytracing = True

print(f"Camera '{camara.name}' active, {camara.data.lens} mm lens, "
      f"TRACK_TO target: {objetivo.name if objetivo else 'none'}. "
      f"Three area lamps created and calibrated. Render 1920x1080, frames 1-250.")
