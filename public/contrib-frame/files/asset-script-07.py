# automated_infinite_rotation.py
#
# Copyright (c) 2026 rePhlow, iGEM UCM Madrid
# Released under the MIT Licence. See LICENSE, or https://opensource.org/licenses/MIT
#
# Part of the rePhlow open-source Blender tools.
# https://2026.igem.wiki/rephlow/contribution

"""
Transparent vessel and automated infinite rotation loop.

Two things happen here. First a clean plastic or glass container is built
around the existing assembly, sized so the rotating basket sits centred
inside it. Then an Empty is created at the origin, the rotating components
are parented to it, and a 360 degree spin is keyframed with linear
interpolation.

WHY LINEAR INTERPOLATION MATTERS
    Blender's default Bezier easing accelerates out of the first keyframe
    and decelerates into the last. On a looping turntable that reads as a
    stutter every time the animation repeats. Forcing LINEAR on the two
    keyframes produces a constant angular velocity, so the loop is seamless.
    This is the transferable part of the script and applies to any stirrer,
    rotor or turntable, not only to this bioreactor.

WHY A MATERIAL WITHOUT REFRACTION
    The vessel uses Transmission 1.0 with IOR 1.0 and screen refraction off.
    A physically accurate glass IOR would bend and mirror the background,
    which hides the mechanism the animation is meant to show. This is a
    deliberate choice of legibility over optical accuracy.

SCENE REQUIREMENTS
    Two objects must already exist, "Cuerpo_Acero" (the merged basket,
    neck, shafts and collar) and "Tapon_Laton". They are the components
    parented to the rotation Empty. If your scene names them differently,
    change them in the "ROTATION" section below.

TESTED IN
    Blender [version to fill in]

USAGE
    Scripting workspace -> New Text -> paste -> Run Script (Alt+P).
"""

import bpy
import math

scene = bpy.context.scene

# ---------------------------------------------------------------------
# Idempotent clean-up.
# Removes the vessel, the Empty and the materials this script creates, so
# it can be re-run without duplicating anything.
# ---------------------------------------------------------------------
for nombre in ("Tarro_Biorreactor", "Empty_Rotacion"):
    obj = bpy.data.objects.get(nombre)
    if obj:
        bpy.data.objects.remove(obj, do_unlink=True)
for nombre_mat in ("Vidrio_Transparente", "Plastico_Cristal_Limpio"):
    m = bpy.data.materials.get(nombre_mat)
    if m:
        bpy.data.materials.remove(m)

# =======================================================================
# 1. VESSEL
#    A large container whose top edge reaches the collar and whose height
#    leaves the basket exactly centred inside it.
# =======================================================================

# Design heights of the basket, identical to those in the generation script
# that produced "Cuerpo_Acero". All values in millimetres.
ALTO_BASE = 65.0
ALTO_CUELLO = 6.0
Z_FIN_CUELLO = ALTO_BASE + ALTO_CUELLO                        # 71
Z_TAPON_INI = 160.0
MEDIO_VASTAGO = Z_FIN_CUELLO + (Z_TAPON_INI - Z_FIN_CUELLO) / 2.0
Z_COLLARIN_INI = MEDIO_VASTAGO + 5.0                          # 120.5
Z_COLLARIN_FIN = Z_COLLARIN_INI + 10.0                        # 130.5

# The collar is not a separate object, it is merged inside "Cuerpo_Acero",
# so its vertical centre is computed here and used as the reference height.
COLLARIN_CENTRO_Z = (Z_COLLARIN_INI + Z_COLLARIN_FIN) / 2.0   # 125.5
CESTA_CENTRO_Z = ALTO_BASE / 2.0                              # 32.5

DIAMETRO_TARRO = 95.0
RADIO_TARRO = DIAMETRO_TARRO / 2.0

tope_tarro = COLLARIN_CENTRO_Z

# Height chosen so that the centre of the vessel coincides with the centre
# of the basket. That leaves a symmetric gap above and a generous clearance
# below, with the vessel extending under Z = 0.
altura_tarro = 2.0 * (tope_tarro - CESTA_CENTRO_Z)
centro_z_tarro = CESTA_CENTRO_Z

bpy.ops.mesh.primitive_cylinder_add(
    radius=RADIO_TARRO, depth=altura_tarro, vertices=64,
    location=(0.0, 0.0, centro_z_tarro)
)
tarro = bpy.context.object
tarro.name = "Tarro_Biorreactor"
bpy.ops.object.shade_smooth()

# Clean plastic or glass. No high IOR and no glass node group, so the
# material transmits light without distorting or mirroring the environment.
mat = bpy.data.materials.new("Plastico_Cristal_Limpio")
mat.use_nodes = True
principled = mat.node_tree.nodes["Principled BSDF"]
principled.inputs["Base Color"].default_value = (1.0, 1.0, 1.0, 1.0)
principled.inputs["Roughness"].default_value = 0.05
principled.inputs["Metallic"].default_value = 0.0
principled.inputs["Transmission Weight"].default_value = 1.0
principled.inputs["IOR"].default_value = 1.0          # 1.0 means no bending of light

mat.blend_method = 'BLEND'          # 'HASHED' is the alternative
try:
    mat.shadow_method = 'NONE'      # Blender < 4.2, EEVEE Legacy
except Exception:
    pass
mat.use_screen_refraction = False   # keeps the background undistorted

tarro.data.materials.clear()
tarro.data.materials.append(mat)

# Blender 4.2+ with EEVEE Next removed the per-material shadow method, so
# the shadow is suppressed per object through ray visibility instead.
try:
    tarro.visible_shadow = False
except Exception:
    pass

# =======================================================================
# 2. ROTATION
#    Pivot Empty plus a linear 360 degree spin over frames 1 to 250.
# =======================================================================

cesta = bpy.data.objects.get("Cuerpo_Acero")
tapon = bpy.data.objects.get("Tapon_Laton")
componentes_cesta = [o for o in (cesta, tapon) if o is not None]

bpy.ops.object.empty_add(type='PLAIN_AXES', location=(0.0, 0.0, 0.0))
pivote = bpy.context.object
pivote.name = "Empty_Rotacion"

# Parenting through matrix_parent_inverse keeps each component exactly where
# it already is, which is the scripted equivalent of "Keep Transform".
for comp in componentes_cesta:
    comp.parent = pivote
    comp.matrix_parent_inverse = pivote.matrix_world.inverted()

scene.frame_start = 1
scene.frame_end = 250

pivote.rotation_mode = 'XYZ'
pivote.rotation_euler.z = 0.0
pivote.keyframe_insert(data_path="rotation_euler", index=2, frame=1)

pivote.rotation_euler.z = math.radians(360.0)
pivote.keyframe_insert(data_path="rotation_euler", index=2, frame=250)


def fcurves_de(obj):
    """Return the animation F-curves of an object.

    Written to work with both APIs. Classic Blender exposes
    action.fcurves directly; Blender 4.4 and later use layered Actions,
    where the curves live under action.layers -> strips -> channelbags.
    """
    accion = obj.animation_data.action
    if hasattr(accion, "fcurves"):
        return list(accion.fcurves)
    curvas = []
    for layer in accion.layers:
        for strip in layer.strips:
            for cb in strip.channelbags:
                curvas.extend(cb.fcurves)
    return curvas


# Linear interpolation on the Z rotation curve. This is what removes the
# ease-in and ease-out and makes the loop seamless.
for fc in fcurves_de(pivote):
    if fc.data_path == "rotation_euler" and fc.array_index == 2:
        for kp in fc.keyframe_points:
            kp.interpolation = 'LINEAR'

scene.frame_set(1)

print(f"Vessel: {altura_tarro:.2f} mm tall, diameter {DIAMETRO_TARRO:.1f} mm, "
      f"basket centred at Z = {CESTA_CENTRO_Z:.1f} mm. "
      f"Pivot and animation ready, frames 1-250, LINEAR interpolation.")
