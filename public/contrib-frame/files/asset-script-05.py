# parametric_hardware_engraving.py
#
# Copyright (c) 2026 rePhlow, iGEM UCM Madrid
# Released under the MIT Licence. See LICENSE, or https://opensource.org/licenses/MIT
#
# Part of the rePhlow open-source Blender tools.
# https://2026.igem.wiki/rephlow/contribution

"""
Parametric hardware modelling with automated text engraving.

Builds a complete cylindrical device entirely through code, 38 x 38 x 190 mm,
and carves a label into its curved surface. The object modelled here is the
stainless steel infuser that rePhlow repurposed as the rotating basket of
its bioreactor, so the dimensions match a real part.

WHAT IS WORTH REUSING, EVEN FOR A DIFFERENT DEVICE
    1. Parametric construction. Every dimension is a named constant and the
       vertical coordinates are derived from them, so changing one diameter
       rebuilds the whole device consistently. Nothing is positioned by
       hand.
    2. Procedural knurling. Two Wave textures crossed at +45 and -45
       degrees and multiplied together give a diamond knurl on the brass
       cap, with no texture image and no extra geometry.
    3. Text carved into a curved surface. A text object is converted to a
       mesh, given thickness with Solidify, and subtracted from the body
       with a Boolean modifier. The thickness is what makes the cut
       reliable: a flat, zero-depth mesh grazes a cylinder and the Boolean
       fails or produces holes.

THE LABEL
    TEXTO_GRABADO below is the string carved into the body. It defaults to
    the brand name of the commercial part this model reproduces. If you
    adapt the script to your own device, change it. Engraving somebody
    else's trademark onto a model you redistribute is best avoided.

SCENE REQUIREMENTS
    None. The script sets up units itself, removes the default cube and
    builds everything from primitives. It is the first script of the
    rePhlow chain, and the one that creates "Cuerpo_Acero" and
    "Tapon_Laton", which the other scripts expect to find.

TESTED IN
    Blender [version to fill in]

USAGE
    Scripting workspace -> New Text -> paste -> Run Script (Alt+P),
    or blender --background --python parametric_hardware_engraving.py
"""

import bpy
import bmesh
import math

# ---------------------------------------------------------------------------
# 0. SCENE SETUP AND CLEAN-UP
#    scale_length = 0.001 makes the interface display millimetres. Note that
#    it does NOT change how light is computed; see macro_studio_lighting_rig.py
#    for the consequences of that.
# ---------------------------------------------------------------------------

scene = bpy.context.scene
scene.unit_settings.system = 'METRIC'
scene.unit_settings.length_unit = 'MILLIMETERS'
scene.unit_settings.scale_length = 0.001

TEXTO_GRABADO = "TRUTHBORNE"   # label carved into the body; change it for your own device
NOMBRE_COLECCION = "Dispositivo"

NOMBRES_PROPIOS = {"Cuerpo_Acero", "Tapon_Laton", "Texto_Grabado", "TRUTHBORNE_Vaporizador"}


def limpiar_objetos_previos():
    """Remove anything a previous run of this script left behind."""
    for nombre in list(NOMBRES_PROPIOS):
        obj = bpy.data.objects.get(nombre)
        if obj:
            bpy.data.objects.remove(obj, do_unlink=True)
    cubo = bpy.data.objects.get("Cube")
    if cubo:
        bpy.data.objects.remove(cubo, do_unlink=True)


limpiar_objetos_previos()

# ---------------------------------------------------------------------------
# 1. DIMENSIONS, all in millimetres
#    Change these and the whole device rebuilds coherently, because every
#    vertical coordinate below is derived rather than typed.
# ---------------------------------------------------------------------------

DIAM_BASE      = 38.0
RADIO_BASE     = DIAM_BASE / 2.0          # 19 mm
ALTO_BASE      = 65.0                     # roughly one third of the total height

ALTO_CUELLO    = 6.0                      # subtle conical transition
RADIO_CUELLO_INF = 6.0
RADIO_VASTAGO  = 4.0                      # 8 mm shaft diameter

ALTO_COLLARIN  = 10.0
RADIO_COLLARIN = 6.5

RADIO_TAPON    = 6.75                     # 13.5 mm cap diameter
ALTO_TOTAL     = 190.0

# Accumulated vertical coordinates.
Z0 = 0.0
Z1 = Z0 + ALTO_BASE                                    # 65, top of the base
Z2 = Z1 + ALTO_CUELLO                                  # 71, top of the neck

# The upper shaft has to leave room for the collar and the cap.
ALTO_TAPON = 30.0
Z_TAPON_INI = ALTO_TOTAL - ALTO_TAPON                  # 160

# The collar sits slightly above the midpoint of the shaft, which reads
# better than dead centre.
MEDIO_VASTAGO = Z2 + (Z_TAPON_INI - Z2) / 2.0
Z_COLLARIN_INI = MEDIO_VASTAGO + 5.0
Z_COLLARIN_FIN = Z_COLLARIN_INI + ALTO_COLLARIN

# ---------------------------------------------------------------------------
# 2. MATERIALS
# ---------------------------------------------------------------------------

def crear_material_acero():
    """Brushed steel, with a honeycomb bump limited to the lower body."""
    mat = bpy.data.materials.new("Acero_Cepillado")
    mat.use_nodes = True
    nt = mat.node_tree
    nodes, links = nt.nodes, nt.links
    principled = nodes.get("Principled BSDF")

    principled.inputs["Base Color"].default_value = (0.72, 0.73, 0.75, 1.0)
    principled.inputs["Metallic"].default_value = 1.0
    principled.inputs["Roughness"].default_value = 0.2

    # Voronoi bump, masked by height so only the lower half of the base
    # carries the texture.
    geo   = nodes.new("ShaderNodeNewGeometry")
    sep   = nodes.new("ShaderNodeSeparateXYZ")
    mask  = nodes.new("ShaderNodeMath")
    mask.operation = 'LESS_THAN'
    mask.inputs[1].default_value = 40.0  # height threshold in mm

    voro = nodes.new("ShaderNodeTexVoronoi")
    voro.inputs["Scale"].default_value = 9.0

    mult = nodes.new("ShaderNodeMath")
    mult.operation = 'MULTIPLY'

    bump = nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.25

    links.new(geo.outputs["Position"], sep.inputs["Vector"])
    links.new(sep.outputs["Z"], mask.inputs[0])
    links.new(geo.outputs["Position"], voro.inputs["Vector"])
    links.new(voro.outputs["Distance"], mult.inputs[0])
    links.new(mask.outputs["Value"], mult.inputs[1])
    links.new(mult.outputs["Value"], bump.inputs["Height"])
    links.new(bump.outputs["Normal"], principled.inputs["Normal"])

    return mat


def crear_material_laton():
    """Brass with a procedural diamond knurl.

    Two band Wave textures are rotated to +45 and -45 degrees and
    multiplied. Where both bands are bright the surface rises, which
    produces the crosshatch of a real knurled grip without any geometry
    or image texture.
    """
    mat = bpy.data.materials.new("Laton_Moleteado")
    mat.use_nodes = True
    nt = mat.node_tree
    nodes, links = nt.nodes, nt.links
    principled = nodes.get("Principled BSDF")

    principled.inputs["Base Color"].default_value = (0.80, 0.58, 0.18, 1.0)
    principled.inputs["Metallic"].default_value = 1.0
    principled.inputs["Roughness"].default_value = 0.3

    tex_coord = nodes.new("ShaderNodeTexCoord")

    map1 = nodes.new("ShaderNodeMapping")
    map1.inputs["Rotation"].default_value = (0.0, 0.0, math.radians(45))
    map1.inputs["Scale"].default_value = (6.0, 6.0, 6.0)

    map2 = nodes.new("ShaderNodeMapping")
    map2.inputs["Rotation"].default_value = (0.0, 0.0, math.radians(-45))
    map2.inputs["Scale"].default_value = (6.0, 6.0, 6.0)

    wave1 = nodes.new("ShaderNodeTexWave")
    wave1.wave_type = 'BANDS'
    wave1.inputs["Scale"].default_value = 12.0

    wave2 = nodes.new("ShaderNodeTexWave")
    wave2.wave_type = 'BANDS'
    wave2.inputs["Scale"].default_value = 12.0

    mezcla = nodes.new("ShaderNodeMixRGB")
    mezcla.blend_type = 'MULTIPLY'
    mezcla.inputs["Fac"].default_value = 1.0

    bump = nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.35

    links.new(tex_coord.outputs["Object"], map1.inputs["Vector"])
    links.new(tex_coord.outputs["Object"], map2.inputs["Vector"])
    links.new(map1.outputs["Vector"], wave1.inputs["Vector"])
    links.new(map2.outputs["Vector"], wave2.inputs["Vector"])
    links.new(wave1.outputs["Color"], mezcla.inputs["Color1"])
    links.new(wave2.outputs["Color"], mezcla.inputs["Color2"])
    links.new(mezcla.outputs["Color"], bump.inputs["Height"])
    links.new(bump.outputs["Normal"], principled.inputs["Normal"])

    return mat


mat_acero = crear_material_acero()
mat_laton = crear_material_laton()

# ---------------------------------------------------------------------------
# 3. GEOMETRY HELPERS
# ---------------------------------------------------------------------------

def aplicar_transformaciones(obj):
    """Bake scale into the mesh, so later modifiers behave predictably."""
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)


def aplicar_bisel(obj, ancho=1.0, segmentos=2):
    """Bevel sharp edges. Machined parts never have perfectly sharp edges,
    and the highlight a bevel catches is what makes metal read as metal."""
    bpy.context.view_layer.objects.active = obj
    mod = obj.modifiers.new("Bisel", 'BEVEL')
    mod.width = ancho
    mod.segments = segmentos
    mod.limit_method = 'ANGLE'
    mod.angle_limit = math.radians(35)
    bpy.ops.object.modifier_apply(modifier=mod.name)


def suavizar(obj, angulo_grados=35):
    """Smooth shading with an angle threshold, across Blender versions."""
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.shade_smooth()
    try:
        # Blender 4.1 and later
        bpy.ops.object.shade_auto_smooth(angle=math.radians(angulo_grados))
    except Exception:
        try:
            # Blender before 4.1
            obj.data.use_auto_smooth = True
            obj.data.auto_smooth_angle = math.radians(angulo_grados)
        except Exception:
            pass


def crear_cilindro(nombre, radio, profundidad, z_centro, vertices=64):
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=vertices, radius=radio, depth=profundidad,
        location=(0.0, 0.0, z_centro)
    )
    obj = bpy.context.object
    obj.name = nombre
    aplicar_transformaciones(obj)
    return obj


def crear_cono(nombre, radio_inf, radio_sup, profundidad, z_centro, vertices=64):
    bpy.ops.mesh.primitive_cone_add(
        vertices=vertices, radius1=radio_inf, radius2=radio_sup,
        depth=profundidad, location=(0.0, 0.0, z_centro)
    )
    obj = bpy.context.object
    obj.name = nombre
    aplicar_transformaciones(obj)
    return obj

# ---------------------------------------------------------------------------
# 4. COMPONENTS
# ---------------------------------------------------------------------------

# 4.1 Cylindrical base, brushed steel.
base = crear_cilindro("Base", RADIO_BASE, ALTO_BASE, Z0 + ALTO_BASE / 2.0)
aplicar_bisel(base, ancho=1.2, segmentos=3)

# 4.2 Conical neck, the transition between base and shaft.
cuello = crear_cono("Cuello", RADIO_CUELLO_INF, RADIO_VASTAGO, ALTO_CUELLO,
                    Z1 + ALTO_CUELLO / 2.0)

# 4.3 Lower shaft.
vastago_inf = crear_cilindro("Vastago_Inferior", RADIO_VASTAGO,
                             Z_COLLARIN_INI - Z2, Z2 + (Z_COLLARIN_INI - Z2) / 2.0)

# 4.4 Intermediate collar, heavily bevelled.
collarin = crear_cilindro("Collarin", RADIO_COLLARIN, ALTO_COLLARIN,
                          Z_COLLARIN_INI + ALTO_COLLARIN / 2.0)
aplicar_bisel(collarin, ancho=2.6, segmentos=2)

# 4.5 Upper shaft.
vastago_sup = crear_cilindro("Vastago_Superior", RADIO_VASTAGO,
                             Z_TAPON_INI - Z_COLLARIN_FIN,
                             Z_COLLARIN_FIN + (Z_TAPON_INI - Z_COLLARIN_FIN) / 2.0)

# 4.6 Top cap, knurled brass.
tapon = crear_cilindro("Tapon", RADIO_TAPON, ALTO_TAPON,
                       Z_TAPON_INI + ALTO_TAPON / 2.0)
aplicar_bisel(tapon, ancho=0.8, segmentos=3)

# ---------------------------------------------------------------------------
# 5. TEXT ENGRAVING, carved into the curved body with a Boolean
# ---------------------------------------------------------------------------

try:
    bpy.ops.object.text_add(location=(0.0, -RADIO_BASE - 1.0, ALTO_BASE * 0.55))
    texto_obj = bpy.context.object
    texto_obj.name = "Texto_Grabado"
    texto_obj.data.body = TEXTO_GRABADO
    texto_obj.data.align_x = 'CENTER'
    texto_obj.data.align_y = 'CENTER'
    texto_obj.data.size = 5.0
    texto_obj.data.extrude = 0.0

    # Stand the text upright, facing -Y, which is where the camera sits.
    texto_obj.rotation_euler = (math.radians(90.0), 0.0, 0.0)

    bpy.context.view_layer.objects.active = texto_obj
    bpy.ops.object.convert(target='MESH')

    # Give the text real thickness. A flat mesh only grazes the curved
    # surface and the Boolean then fails or punches through.
    solid = texto_obj.modifiers.new("Solidify", 'SOLIDIFY')
    solid.thickness = 3.0
    bpy.ops.object.modifier_apply(modifier=solid.name)

    bool_mod = base.modifiers.new("Grabado_Texto", 'BOOLEAN')
    bool_mod.operation = 'DIFFERENCE'
    bool_mod.object = texto_obj
    bpy.context.view_layer.objects.active = base
    bpy.ops.object.modifier_apply(modifier=bool_mod.name)

    bpy.data.objects.remove(texto_obj, do_unlink=True)
except Exception as e:
    print(f"[Warning] Text engraving could not be generated: {e}")

# ---------------------------------------------------------------------------
# 6. JOIN THE STEEL PARTS AND ASSIGN MATERIALS
#    Everything merges into "Cuerpo_Acero", which is the object the other
#    scripts in this set look for.
# ---------------------------------------------------------------------------

piezas_acero = [base, cuello, vastago_inf, collarin, vastago_sup]

bpy.ops.object.select_all(action='DESELECT')
for p in piezas_acero:
    p.select_set(True)
bpy.context.view_layer.objects.active = base
bpy.ops.object.join()
cuerpo_acero = bpy.context.object
cuerpo_acero.name = "Cuerpo_Acero"
cuerpo_acero.data.materials.clear()
cuerpo_acero.data.materials.append(mat_acero)

tapon.name = "Tapon_Laton"
tapon.data.materials.clear()
tapon.data.materials.append(mat_laton)

# ---------------------------------------------------------------------------
# 7. FINAL SHADING
# ---------------------------------------------------------------------------

suavizar(cuerpo_acero, angulo_grados=35)
suavizar(tapon, angulo_grados=35)

# ---------------------------------------------------------------------------
# 8. COLLECTION
# ---------------------------------------------------------------------------

coleccion = (bpy.data.collections.get(NOMBRE_COLECCION)
             or bpy.data.collections.new(NOMBRE_COLECCION))
if coleccion.name not in scene.collection.children:
    scene.collection.children.link(coleccion)

for obj in (cuerpo_acero, tapon):
    for col in list(obj.users_collection):
        col.objects.unlink(obj)
    coleccion.objects.link(obj)

bpy.ops.object.select_all(action='DESELECT')
cuerpo_acero.select_set(True)
tapon.select_set(True)
bpy.context.view_layer.objects.active = cuerpo_acero

print(f"Device generated. Total height {ALTO_TOTAL} mm, "
      f"engraved label '{TEXTO_GRABADO}'.")
