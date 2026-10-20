# procedural_mesh_slicer.py
#
# Copyright (c) 2026 rePhlow, iGEM UCM Madrid
# Released under the MIT Licence. See LICENSE, or https://opensource.org/licenses/MIT
#
# Part of the rePhlow open-source Blender tools.
# https://2026.igem.wiki/rephlow/contribution

"""
Procedural mesh slicing and hinge assembly.

Cuts a closed basket into two pieces at an exact height, so that an
exploded view or an opening animation can be built from a mesh that was
modelled as a single solid.

    "Basket_Body"   the hollow main body, world Z 0 to 56 mm, closed at the
                    bottom and OPEN at the top, so lifting the lid reveals
                    the interior where the beads sit.
    "Basket_Cap"    a thin 9 mm ring cut from the top of the basket, JOINED
                    into one object with the complete shaft, that is neck,
                    lower rod, collar and upper rod. The shaft therefore
                    always stays a single piece, and that piece carries the
                    lid of the basket with it.

THE TECHNIQUE WORTH REUSING
    Selecting faces by height only works if the mesh already has an edge
    loop there. A cylinder created with primitive_cylinder_add has no
    intermediate vertical subdivisions, so a height-based selection would
    grab whole faces that span the cut and the separation would be ragged.
    The fix is bmesh.ops.bisect_plane, which inserts a real edge loop at an
    exact coordinate before anything is selected. Any script that needs to
    split geometry at a precise plane needs this step.

    The second idea here is the use of matrix_parent_inverse when
    re-parenting, which preserves each piece in place rather than snapping
    it to the parent, and the use of origin_set with the 3D cursor so both
    halves rotate about the same axis afterwards.

SCENE REQUIREMENTS
    "Cuerpo_Acero" must exist, or the two pieces "Basket_Body" and
    "Basket_Cap" if the first separation has already been run.
    "Empty_Rotacion" is used as the rotation parent if present.

IDEMPOTENCE
    The script checks what state the scene is in and only performs the
    steps still pending, so it can be run twice without damage.

TESTED IN
    Blender [version to fill in]

USAGE
    Scripting workspace -> New Text -> paste -> Run Script (Alt+P).
"""

import bpy
import bmesh

Z_CUELLO_MUNDO = 65.0       # world height of the original basket top, where the neck starts
GROSOR_ANILLO_TAPA = 9.0    # mm, thickness of the ring cut from the top of the basket
DISTANCIA_APERTURA = -35.0  # mm, how far the hollow body drops along Z when opened


def separar_cesta_de_eje():
    """Step 1. Separate the complete basket, 0 to 65 mm, from the complete
    shaft, 65 to 160 mm.

    This first cut needs no bisection, because the two parts meet at a real
    topological seam in the merged mesh. Faces are selected by the height of
    their median centre and split off with mesh.separate.
    """
    obj = bpy.data.objects.get("Cuerpo_Acero")
    if obj is None:
        return
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)

    # Face centres are in local coordinates, so the world threshold has to
    # be shifted by the object origin before comparing.
    UMBRAL_LOCAL = Z_CUELLO_MUNDO - obj.location.z

    bpy.ops.object.mode_set(mode='EDIT')
    bm = bmesh.from_edit_mesh(obj.data)
    bm.faces.ensure_lookup_table()
    for f in bm.faces:
        f.select = f.calc_center_median().z <= UMBRAL_LOCAL + 1e-4
    bmesh.update_edit_mesh(obj.data)

    bpy.ops.mesh.separate(type='SELECTED')
    bpy.ops.object.mode_set(mode='OBJECT')

    nuevo = bpy.data.objects.get(f"{obj.name}.001")
    cap, body = obj, nuevo
    cap.name = "Basket_Cap"
    body.name = "Basket_Body"

    # Both pieces get their origin at the same point, the seam height, so
    # that they share a rotation axis and the opening movement is clean.
    bpy.context.scene.frame_set(1)
    cursor = bpy.context.scene.cursor
    cursor.location = (0.0, 0.0, Z_CUELLO_MUNDO)
    for pieza in (cap, body):
        bpy.context.view_layer.objects.active = pieza
        bpy.ops.object.select_all(action='DESELECT')
        pieza.select_set(True)
        bpy.ops.object.origin_set(type='ORIGIN_CURSOR')

    pivote = bpy.data.objects.get("Empty_Rotacion")
    if pivote:
        for pieza in (cap, body):
            pieza.parent = pivote
            # Keeps the piece exactly where it is, instead of snapping it
            # to the parent transform.
            pieza.matrix_parent_inverse = pivote.matrix_world.inverted()


def dividir_tapa_de_la_cesta():
    """Step 2. Cut a thin ring from the top of Basket_Body and join it to
    Basket_Cap, so the lid travels with the shaft."""
    body = bpy.data.objects.get("Basket_Body")
    cap = bpy.data.objects.get("Basket_Cap")
    if body is None or cap is None:
        raise RuntimeError("Run separar_cesta_de_eje() first.")

    # Return to the closed position before cutting, otherwise the cut plane
    # would land at the wrong height on an already opened assembly.
    if "ubicacion_cerrada_z" in body:
        body.location.z = body["ubicacion_cerrada_z"]
    bpy.context.view_layer.update()

    bpy.context.view_layer.objects.active = body
    bpy.ops.object.select_all(action='DESELECT')
    body.select_set(True)

    # The origin of Basket_Body sits on its top edge, so the cut plane is
    # simply minus the ring thickness in local coordinates.
    UMBRAL_LOCAL = -GROSOR_ANILLO_TAPA

    bpy.ops.object.mode_set(mode='EDIT')
    bm = bmesh.from_edit_mesh(body.data)
    bm.faces.ensure_lookup_table()

    # Insert a real edge loop at the cut height. Without this the mesh has
    # no geometry there and the face selection below would be meaningless.
    bmesh.ops.bisect_plane(
        bm,
        geom=list(bm.verts) + list(bm.edges) + list(bm.faces),
        plane_co=(0.0, 0.0, UMBRAL_LOCAL),
        plane_no=(0.0, 0.0, 1.0),
        clear_inner=False,
        clear_outer=False,
    )
    bm.faces.ensure_lookup_table()
    for f in bm.faces:
        f.select = f.calc_center_median().z >= UMBRAL_LOCAL + 1e-4
    bmesh.update_edit_mesh(body.data)

    bpy.ops.mesh.separate(type='SELECTED')
    bpy.ops.object.mode_set(mode='OBJECT')

    anillo = bpy.data.objects.get(f"{body.name}.001")

    # Join the lid ring into the shaft object, so they move as one piece.
    bpy.ops.object.select_all(action='DESELECT')
    anillo.select_set(True)
    cap.select_set(True)
    bpy.context.view_layer.objects.active = cap
    bpy.ops.object.join()
    bpy.context.object.name = "Basket_Cap"

    pivote = bpy.data.objects.get("Empty_Rotacion")
    for pieza in (bpy.data.objects.get("Basket_Cap"), body):
        if pivote and pieza.parent is not pivote:
            pieza.parent = pivote
            pieza.matrix_parent_inverse = pivote.matrix_world.inverted()

    # Open the mechanism, remembering the closed height on the object as a
    # custom property so step 2 can be re-run from a known state.
    body["ubicacion_cerrada_z"] = body.location.z
    body.location.z += DISTANCIA_APERTURA
    bpy.context.view_layer.update()

    print(f"Basket split. Basket_Body (hollow body) at Z = "
          f"{body.matrix_world.translation.z:.1f} mm, Basket_Cap (lid plus full shaft) at Z = "
          f"{bpy.data.objects.get('Basket_Cap').matrix_world.translation.z:.1f} mm")


# --- Entry point ---------------------------------------------------------
# Run step 1 only if the two pieces do not exist yet.
if bpy.data.objects.get("Basket_Body") is None or bpy.data.objects.get("Basket_Cap") is None:
    separar_cesta_de_eje()

# Run step 2 only if Basket_Body still includes the top ring, which is
# detected by measuring its real height in world coordinates.
_body = bpy.data.objects.get("Basket_Body")
_zs = [(_body.matrix_world @ v.co).z for v in _body.data.vertices]
if (max(_zs) - min(_zs)) > (65.0 - GROSOR_ANILLO_TAPA + 1.0):
    dividir_tapa_de_la_cesta()
else:
    print("The basket is already split. Basket_Body no longer includes the top ring.")
