# procedural_perforated_mesh.py
#
# Copyright (c) 2026 rePhlow, iGEM UCM Madrid
# Released under the MIT Licence. See LICENSE, or https://opensource.org/licenses/MIT
#
# Part of the rePhlow open-source Blender tools.
# https://2026.igem.wiki/rephlow/contribution

"""
Industrial honeycomb and micro-perforated mesh shader.

Wraps a hexagonal grid carrying real micro-perforations around a
cylindrical object, using alpha rather than geometry. Not a single vertex
is added to the mesh.

THE PROBLEM THIS SOLVES
    Modelling a filter, a sieve or a perforated basket as actual geometry
    costs thousands of faces, makes Boolean operations fragile and slows
    the viewport to a crawl. Here the holes are computed in the shader, so
    the mesh stays a plain cylinder while the render shows a perforated
    one. The cost is constant regardless of how fine the perforation is.

HOW IT WORKS, IN FOUR STEPS
    1. Coordinates. The sides are unwrapped cylindrically, using arc length
       (angle times radius) as U and object Z as V, while the top face uses
       plain X and Y. The two are blended by the surface normal, so the
       pattern is undistorted on both the wall and the lid.
    2. Hexagons. A 2D Voronoi texture with Randomness set to 0 and the
       Distance to Edge feature produces a perfect hexagonal lattice. A
       colour ramp turns the edge distance into a solid frame.
    3. Perforations. A second Voronoi, much denser, puts a dark dot at the
       centre of every cell.
    4. Combination. A MAXIMUM node keeps the frame always opaque, so the
       holes can only ever appear inside a hexagon and the structure stays
       mechanically plausible.

TWO TRAPS WORTH KNOWING
    The height threshold is compared in WORLD coordinates, taken from
    Geometry > Position, not in object coordinates. After joining several
    steel parts into one mesh, the origin of the merged object inherits the
    position of one of them, which shifts object-space Z away from the real
    design height. Using world position keeps the perforated band exactly
    where it belongs, whatever the mesh was joined from.

    The alpha blend mode enum in Blender is 'CLIP'. The interface labels it
    "Alpha Clip", and 'ALPHA_CLIP' is not a valid value. 'HASHED' is left
    commented out as the softer alternative.

PARAMETERS
    radio_base_mm            radius of the cylinder, in millimetres
    escala_hex               hexagonal cell size, roughly 1 / size in mm
    escala_poro              density of the micro-perforations
    grosor_marco             colour ramp threshold setting the frame width
    umbral_z_zona_perforada  world height below which the side pattern is
                             active; above it the metal stays smooth

SCENE REQUIREMENTS
    An object named "Base_Principal" or, failing that, "Cuerpo_Acero".
    Rename your own cylinder to either, or edit asignar_material_a_base().

TESTED IN
    Blender [version to fill in]

USAGE
    Scripting workspace -> New Text -> paste -> Run Script (Alt+P).
"""

import bpy
import math


def crear_material_panal_industrial(
    radio_base_mm=19.0,
    escala_hex=0.15,
    escala_poro=1.6,
    grosor_marco=0.06,
    umbral_z_zona_perforada=64.0,
):
    """Build the perforated honeycomb material and return it."""
    nombre = "Panal_Industrial_Perforado"
    mat_existente = bpy.data.materials.get(nombre)
    if mat_existente:
        bpy.data.materials.remove(mat_existente)

    mat = bpy.data.materials.new(nombre)
    mat.use_nodes = True
    nt = mat.node_tree
    nodes, links = nt.nodes, nt.links
    nodes.clear()

    salida = nodes.new("ShaderNodeOutputMaterial")
    principled = nodes.new("ShaderNodeBsdfPrincipled")
    links.new(principled.outputs["BSDF"], salida.inputs["Surface"])

    principled.inputs["Metallic"].default_value = 1.0
    principled.inputs["Roughness"].default_value = 0.25

    # -----------------------------------------------------------------
    # 1. COORDINATES
    #    Cylindrical unwrap (arc length, Z) for the walls, flat (X, Y) for
    #    the top face, blended by the normal so the pattern is never
    #    stretched on either surface.
    # -----------------------------------------------------------------
    tex_coord = nodes.new("ShaderNodeTexCoord")
    geom = nodes.new("ShaderNodeNewGeometry")

    sep_obj = nodes.new("ShaderNodeSeparateXYZ")
    links.new(tex_coord.outputs["Object"], sep_obj.inputs["Vector"])

    # radius = length(X, Y, 0)
    comb_xy0 = nodes.new("ShaderNodeCombineXYZ")
    links.new(sep_obj.outputs["X"], comb_xy0.inputs["X"])
    links.new(sep_obj.outputs["Y"], comb_xy0.inputs["Y"])
    comb_xy0.inputs["Z"].default_value = 0.0

    vec_radio = nodes.new("ShaderNodeVectorMath")
    vec_radio.operation = 'LENGTH'
    links.new(comb_xy0.outputs["Vector"], vec_radio.inputs[0])

    # angle = atan2(Y, X)
    angulo = nodes.new("ShaderNodeMath")
    angulo.operation = 'ARCTAN2'
    links.new(sep_obj.outputs["Y"], angulo.inputs[0])
    links.new(sep_obj.outputs["X"], angulo.inputs[1])

    # arc length = angle * radius, which becomes the U coordinate.
    # Multiplying by the radius is what keeps the hexagons the same real
    # size on cylinders of different diameters.
    arco = nodes.new("ShaderNodeMath")
    arco.operation = 'MULTIPLY'
    links.new(angulo.outputs["Value"], arco.inputs[0])
    links.new(vec_radio.outputs["Value"], arco.inputs[1])

    uv_lateral = nodes.new("ShaderNodeCombineXYZ")
    links.new(arco.outputs["Value"], uv_lateral.inputs["X"])
    links.new(sep_obj.outputs["Z"], uv_lateral.inputs["Y"])
    uv_lateral.inputs["Z"].default_value = 0.0

    uv_superior = nodes.new("ShaderNodeCombineXYZ")
    links.new(sep_obj.outputs["X"], uv_superior.inputs["X"])
    links.new(sep_obj.outputs["Y"], uv_superior.inputs["Y"])
    uv_superior.inputs["Z"].default_value = 0.0

    # factor_superior is 1 on the lid, where the normal points along +Z,
    # and 0 on the walls.
    sep_normal = nodes.new("ShaderNodeSeparateXYZ")
    links.new(geom.outputs["True Normal"], sep_normal.inputs["Vector"])

    factor_superior = nodes.new("ShaderNodeMath")
    factor_superior.operation = 'ABSOLUTE'
    links.new(sep_normal.outputs["Z"], factor_superior.inputs[0])

    # uv_final = uv_lateral + factor_superior * (uv_superior - uv_lateral)
    diff_uv = nodes.new("ShaderNodeVectorMath")
    diff_uv.operation = 'SUBTRACT'
    links.new(uv_superior.outputs["Vector"], diff_uv.inputs[0])
    links.new(uv_lateral.outputs["Vector"], diff_uv.inputs[1])

    diff_escalada = nodes.new("ShaderNodeVectorMath")
    diff_escalada.operation = 'SCALE'
    links.new(diff_uv.outputs["Vector"], diff_escalada.inputs[0])
    links.new(factor_superior.outputs["Value"], diff_escalada.inputs["Scale"])

    uv_final = nodes.new("ShaderNodeVectorMath")
    uv_final.operation = 'ADD'
    links.new(uv_lateral.outputs["Vector"], uv_final.inputs[0])
    links.new(diff_escalada.outputs["Vector"], uv_final.inputs[1])

    mapeo = nodes.new("ShaderNodeMapping")
    links.new(uv_final.outputs["Vector"], mapeo.inputs["Vector"])
    mapeo.inputs["Scale"].default_value = (1.0, 1.0, 1.0)

    # -----------------------------------------------------------------
    # 2. HEXAGONAL STRUCTURE, the solid metal frame.
    #    A 2D Voronoi with Randomness 0 degenerates into a regular lattice,
    #    and Distance to Edge measures how far each point is from the cell
    #    boundary, which is exactly a frame mask.
    # -----------------------------------------------------------------
    voro_hex = nodes.new("ShaderNodeTexVoronoi")
    voro_hex.voronoi_dimensions = '2D'
    voro_hex.feature = 'DISTANCE_TO_EDGE'
    voro_hex.inputs["Scale"].default_value = escala_hex
    voro_hex.inputs["Randomness"].default_value = 0.0
    links.new(mapeo.outputs["Vector"], voro_hex.inputs["Vector"])

    rampa_hex = nodes.new("ShaderNodeValToRGB")
    rampa_hex.color_ramp.elements[0].position = 0.0
    rampa_hex.color_ramp.elements[0].color = (1, 1, 1, 1)   # cell edge, solid frame
    rampa_hex.color_ramp.elements[1].position = grosor_marco
    rampa_hex.color_ramp.elements[1].color = (0, 0, 0, 1)   # cell interior, open to holes
    links.new(voro_hex.outputs["Distance"], rampa_hex.inputs["Fac"])

    marco_bw = nodes.new("ShaderNodeRGBToBW")
    links.new(rampa_hex.outputs["Color"], marco_bw.inputs["Color"])

    # -----------------------------------------------------------------
    # 3. MICRO-PERFORATIONS, a very dense grid of dark dots.
    # -----------------------------------------------------------------
    voro_poro = nodes.new("ShaderNodeTexVoronoi")
    voro_poro.voronoi_dimensions = '2D'
    voro_poro.feature = 'F1'
    voro_poro.distance = 'EUCLIDEAN'
    voro_poro.inputs["Scale"].default_value = escala_poro
    voro_poro.inputs["Randomness"].default_value = 0.0
    links.new(mapeo.outputs["Vector"], voro_poro.inputs["Vector"])

    rampa_poro = nodes.new("ShaderNodeValToRGB")
    rampa_poro.color_ramp.elements[0].position = 0.0
    rampa_poro.color_ramp.elements[0].color = (0, 0, 0, 1)  # cell centre, a hole
    rampa_poro.color_ramp.elements[1].position = 0.15
    rampa_poro.color_ramp.elements[1].color = (1, 1, 1, 1)  # elsewhere, solid metal
    links.new(voro_poro.outputs["Distance"], rampa_poro.inputs["Fac"])

    poro_bw = nodes.new("ShaderNodeRGBToBW")
    links.new(rampa_poro.outputs["Color"], poro_bw.inputs["Color"])

    # -----------------------------------------------------------------
    # 4. COMBINATION MASK
    #    MAXIMUM forces the frame opaque, so pores exist only inside a
    #    hexagon and never cut through the structural lattice.
    # -----------------------------------------------------------------
    patron_combinado = nodes.new("ShaderNodeMath")
    patron_combinado.operation = 'MAXIMUM'
    links.new(marco_bw.outputs["Val"], patron_combinado.inputs[0])
    links.new(poro_bw.outputs["Val"], patron_combinado.inputs[1])

    # -----------------------------------------------------------------
    # 5. ACTIVE ZONE
    #    The pattern appears only on the perforated band of the wall and on
    #    the top face. The rest of the body stays smooth metal.
    #
    #    The height test uses WORLD position, not object coordinates. After
    #    joining the steel parts, the merged origin inherits the position of
    #    one of them, which would shift an object-space threshold and leak
    #    the pattern onto the neck and the shaft.
    # -----------------------------------------------------------------
    sep_world = nodes.new("ShaderNodeSeparateXYZ")
    links.new(geom.outputs["Position"], sep_world.inputs["Vector"])

    zona_lateral_activa = nodes.new("ShaderNodeMath")
    zona_lateral_activa.operation = 'LESS_THAN'
    zona_lateral_activa.inputs[1].default_value = umbral_z_zona_perforada
    links.new(sep_world.outputs["Z"], zona_lateral_activa.inputs[0])

    zona_superior_activa = nodes.new("ShaderNodeMath")
    zona_superior_activa.operation = 'GREATER_THAN'
    zona_superior_activa.inputs[1].default_value = 0.5
    links.new(factor_superior.outputs["Value"], zona_superior_activa.inputs[0])

    zona_activa = nodes.new("ShaderNodeMath")
    zona_activa.operation = 'MAXIMUM'
    links.new(zona_lateral_activa.outputs["Value"], zona_activa.inputs[0])
    links.new(zona_superior_activa.outputs["Value"], zona_activa.inputs[1])

    # alpha = mix(fully opaque, pattern, factor = active zone)
    alpha_final = nodes.new("ShaderNodeMixRGB")
    alpha_final.blend_type = 'MIX'
    alpha_final.inputs["Color1"].default_value = (1, 1, 1, 1)
    links.new(patron_combinado.outputs["Value"], alpha_final.inputs["Color2"])
    links.new(zona_activa.outputs["Value"], alpha_final.inputs["Fac"])

    links.new(alpha_final.outputs["Color"], principled.inputs["Alpha"])

    # Relief on the frame, restricted to the active zone so the smooth part
    # of the body keeps a flat surface.
    bump_altura = nodes.new("ShaderNodeMath")
    bump_altura.operation = 'MULTIPLY'
    links.new(marco_bw.outputs["Val"], bump_altura.inputs[0])
    links.new(zona_activa.outputs["Value"], bump_altura.inputs[1])

    bump = nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.3
    bump.inputs["Distance"].default_value = 0.3  # mm
    links.new(bump_altura.outputs["Value"], bump.inputs["Height"])
    links.new(bump.outputs["Normal"], principled.inputs["Normal"])

    # Subtle tonal difference between frame and cell interior, again only
    # inside the active zone. Outside it the surface must read as plain,
    # uniform steel, with no hexagon-shaped tint showing through.
    color_marco = (0.85, 0.86, 0.88, 1.0)
    color_interior = (0.62, 0.63, 0.65, 1.0)
    color_plano_uniforme = (0.72, 0.73, 0.75, 1.0)

    mezcla_color = nodes.new("ShaderNodeMixRGB")
    mezcla_color.inputs["Color1"].default_value = color_interior
    mezcla_color.inputs["Color2"].default_value = color_marco
    links.new(marco_bw.outputs["Val"], mezcla_color.inputs["Fac"])

    color_plano = nodes.new("ShaderNodeRGB")
    color_plano.outputs[0].default_value = color_plano_uniforme

    color_final = nodes.new("ShaderNodeMixRGB")
    color_final.blend_type = 'MIX'
    links.new(color_plano.outputs[0], color_final.inputs["Color1"])
    links.new(mezcla_color.outputs["Color"], color_final.inputs["Color2"])
    links.new(zona_activa.outputs["Value"], color_final.inputs["Fac"])
    links.new(color_final.outputs["Color"], principled.inputs["Base Color"])

    # -----------------------------------------------------------------
    # 6. REAL TRANSPARENCY
    #    'CLIP' is the enum value; the interface calls it "Alpha Clip".
    # -----------------------------------------------------------------
    try:
        mat.blend_method = 'CLIP'
        mat.alpha_threshold = 0.5
        # Softer alternative, without hard cut-off:
        # mat.blend_method = 'HASHED'
    except Exception as e:
        print(f"[Warning] blend_method not available in this Blender version: {e}")

    try:
        mat.shadow_method = 'CLIP'   # so the holes also cut the shadow
    except Exception:
        pass

    mat.use_backface_culling = False

    return mat


def asignar_material_a_base(mat):
    """Assign the material to the cylindrical body, whatever it is called."""
    obj = bpy.data.objects.get("Base_Principal")
    if obj is None:
        obj = bpy.data.objects.get("Cuerpo_Acero")
        if obj:
            print("[Info] 'Base_Principal' not found; assigning to 'Cuerpo_Acero' instead.")
    if obj is None:
        print("[Warning] No target object found. Rename your cylinder to "
              "'Base_Principal' or 'Cuerpo_Acero', or edit this function.")
        return None

    obj.data.materials.clear()
    obj.data.materials.append(mat)
    return obj


if __name__ == "__main__":
    material = crear_material_panal_industrial()
    objeto = asignar_material_a_base(material)
    if objeto:
        print(f"Material '{material.name}' assigned to '{objeto.name}'.")
