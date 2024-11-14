/*-----------------------------------------------------------------------------
 * Ellie Camp
 * CSci 360 - Project 6
 * cube.js
-----------------------------------------------------------------------------*/
 
// global size variable
var cubie_size = 6;

// used to keep track of the state of the cube
var layerList;
var ULayer;// = new Object3D();
var DLayer;// = new Object3D();
var FLayer;// = new Object3D();
var BLayer;// = new Object3D();
var RLayer;// = new Object3D();
var LLayer;// = new Object3D();

var faces;

// load textures for cube
var redSticker = new THREE.TextureLoader().load( "./colors/RED.png" );
var orangeSticker = new THREE.TextureLoader().load( "./colors/ORANGE.png" );
var yellowSticker = new THREE.TextureLoader().load( "./colors/YELLOW.png" );
var whiteSticker = new THREE.TextureLoader().load( "./colors/WHITE.png" );
var greenSticker = new THREE.TextureLoader().load( "./colors/GREEN.png" );
var blueSticker = new THREE.TextureLoader().load( "./colors/BLUE.png" );

// function to make cubie with variable amount of colors on it
function makeCubie(kind, color1, color2, color3){
    var cubieGeom = new THREE.BoxGeometry(cubie_size, cubie_size, cubie_size);

    cubieMaterials = [];

    // });//

    // make cubie fully black
    for (var i=0; i<6; i++){
        cubieMaterials.push( new THREE.MeshPhongMaterial( {color: 0x000000}));//, transparent: true, opacity: 0.5} ) );
    }
    // if edge, load two colored stickers
    if (kind == "edge"){
        cubieMaterials[2] = new THREE.MeshPhongMaterial( {map: color1});//, transparent: true, opacity: 0.5} );
        cubieMaterials[4] = new THREE.MeshPhongMaterial( {map: color2});//, transparent: true, opacity: 0.5} );
    }
    // if corner, load three colored stickers
    else if (kind == "corner"){
        cubieMaterials[2] = new THREE.MeshPhongMaterial( {map: color1});//, transparent: true, opacity: 0.5} );
        cubieMaterials[4] = new THREE.MeshPhongMaterial( {map: color2});//, transparent: true, opacity: 0.5} );
        cubieMaterials[0] = new THREE.MeshPhongMaterial( {map: color3});//, transparent: true, opacity: 0.5} );
    }
    // if center, load one colored sticker on top
    else if (kind == "center"){
        cubieMaterials[2] = new THREE.MeshPhongMaterial( {map: color1} );
    }

    // make material and make mesh
    var cubieMaterials = new THREE.MeshFaceMaterial( cubieMaterials );
    var cubie = new THREE.Mesh(cubieGeom, cubieMaterials);
    cubie.castShadow = true;

    return cubie;
}


// function to create edge pieces
function makeEdge(color1, color2, xpos, ypos, zpos, xRot, yRot, zRot, name ){
    var piece = new THREE.Object3D();
    piece.name = name;
    var edge = makeCubie("edge", color1, color2 );
    edge.position.set(xpos, ypos, zpos);
    edge.rotation.set(xRot, yRot, zRot)

    piece.add(edge);
    return piece;
}

// function to create corner pieces
function makeCorner(color1, color2, color3, xpos, ypos, zpos, xRot, yRot, zRot, name ){
    var piece = new THREE.Object3D();
    piece.name = name;
    var corner = makeCubie("corner", color1, color2, color3);
    corner.position.set(xpos, ypos, zpos);
    corner.rotation.set(xRot, yRot, zRot)

    piece.add(corner);
    return piece;
}


function createCube(){
    var cube = new THREE.Object3D();
    
    // add a black cubie to the center of the cube Object
    var core = makeCubie();
    cube.add(core);

    // make yellow center
    var YC = makeCubie("center", yellowSticker);
    YC.position.y = cubie_size;
    //cube.add(YC);

    // make yellow edge pieces
    var YR = makeEdge(yellowSticker, redSticker, cubie_size, cubie_size, 0, 0, Math.PI/2, 0, "YR" );
    //cube.add(YR);    
    var YO = makeEdge(yellowSticker, orangeSticker, -cubie_size, cubie_size, 0, 0, -Math.PI/2, 0, "YO" );
    //cube.add(YO);
    var YG = makeEdge(yellowSticker, greenSticker, 0, cubie_size, -cubie_size, 0, Math.PI, 0, "YG" );
    //cube.add(YG);
    var YB = makeEdge(yellowSticker, blueSticker,0, cubie_size, cubie_size, 0, 0, 0, "YB"  );
    //cube.add(YB);

    // make yellow corner pieces
    var YBR = makeCorner(yellowSticker, blueSticker, redSticker, cubie_size, cubie_size, cubie_size, 0, 0, 0, "YBR");
    //cube.add(YBR);
    var YRG = makeCorner(yellowSticker, redSticker, greenSticker, cubie_size, cubie_size, -cubie_size, 0, Math.PI/2, 0, "YRG" );
    //cube.add(YRG);
    var YGO = makeCorner(yellowSticker, greenSticker, orangeSticker, -cubie_size, cubie_size, -cubie_size, 0, Math.PI, 0, "YGO" );
    //cube.add(YGO);
    var YOB = makeCorner(yellowSticker, orangeSticker, blueSticker, -cubie_size, cubie_size, cubie_size, 0, -Math.PI/2, 0, "YOB" );
    //cube.add(YOB);

    // blue center piece
    var BC = makeCubie("center", blueSticker);
    BC.position.z = cubie_size;
    BC.rotation.x = Math.PI/2;
    //cube.add(BC);
    // orange center piece
    var OC = makeCubie("center", orangeSticker);
    OC.position.x = -cubie_size;
    OC.rotation.z = Math.PI/2;
    //cube.add(OC);
    // green center piece
    var GC = makeCubie("center", greenSticker);
    GC.position.z = -cubie_size;
    GC.rotation.x = -Math.PI/2;
    //cube.add(GC);
    // red center piece
    var RC = makeCubie("center", redSticker);
    RC.position.x = cubie_size;
    RC.rotation.z = -Math.PI/2;
    //cube.add(RC);

    // blue red edge piece
    var BR = makeEdge(blueSticker, redSticker, cubie_size, 0, cubie_size, Math.PI/2, Math.PI/2, 0,"BR" );
    //cube.add(BR);
    // blue orange edge piece
    var BO = makeEdge(blueSticker, orangeSticker, -cubie_size, 0, cubie_size, Math.PI/2, -Math.PI/2, 0, "BO" );
    //cube.add(BO);
    // green orange edge piece
    var GO = makeEdge(greenSticker, orangeSticker, -cubie_size, 0, -cubie_size, -Math.PI/2, -Math.PI/2, 0, "GO" );
    //cube.add(GO);
    // green red edge piece
    var GR = makeEdge(greenSticker, redSticker, cubie_size, 0, -cubie_size, -Math.PI/2, Math.PI/2, 0, "GR" );
    //cube.add(GR);

    // make white center
    var WC = makeCubie("center", whiteSticker);
    WC.position.y = -cubie_size;
    WC.rotation.x = Math.PI;
    //cube.add(WC);

    // make white edge pieces
    var RW = makeEdge(redSticker, whiteSticker, cubie_size, -cubie_size, 0,     Math.PI/2, 0, -Math.PI/2, "RW" );
    //cube.add(RW);    
    var OW = makeEdge(orangeSticker, whiteSticker, -cubie_size, -cubie_size, 0,  Math.PI/2, 0, Math.PI/2, "OW" );
    //cube.add(OW);
    var GW = makeEdge(greenSticker, whiteSticker, 0, -cubie_size, -cubie_size, -Math.PI/2, Math.PI, 0, "GW" );
    //cube.add(GW);
    var BW = makeEdge(blueSticker, whiteSticker, 0, -cubie_size, cubie_size,    Math.PI/2, 0, 0, "BW" );
    //cube.add(BW);


    // make white corner pieces
    var WRB = makeCorner(whiteSticker, redSticker, blueSticker,  cubie_size, -cubie_size, cubie_size, Math.PI, Math.PI/2, 0, "WRB" );
    //cube.add(WRB);
    var WGR = makeCorner(whiteSticker, greenSticker, redSticker,  cubie_size, -cubie_size, -cubie_size, Math.PI, 0, 0, "WGR" );
    //cube.add(WGR);
    var WOG = makeCorner(whiteSticker, orangeSticker, greenSticker, -cubie_size, -cubie_size, -cubie_size, Math.PI, -Math.PI/2, 0, "WOG" );
    //cube.add(WOG);
    var WBO = makeCorner(whiteSticker, blueSticker, orangeSticker, -cubie_size, -cubie_size, cubie_size, Math.PI, Math.PI, 0, "WBO" );
    //cube.add(WBO);

    // fill layerList with every individual piece
    layerList = [  // 0    1   2    3   4    5   6    7   8
                    [YC, YGO, YG, YRG, YR, YBR, YB, YOB, YO], // U Layer 0
                    [RC, YBR, YR, YRG, GR, WGR, RW, WRB, BR], // R Layer 1
                    [OC, YGO, YO, YOB, BO, WBO, OW, WOG, GO], // L Layer 2
                    [GC, YRG, YG, YGO, GO, WOG, GW, WGR, GR], // B Layer 3
                    [BC, YOB, YB, YBR, BR, WRB, BW, WBO, BO], // F Layer 4
                    [WC, WBO, BW, WRB, RW, WGR, GW, WOG, OW]  // D Layer 5
                ]
    
    ULayer = new THREE.Object3D(); ULayer.name = "ULayer";
    DLayer = new THREE.Object3D(); DLayer.name = "DLayer";
    FLayer = new THREE.Object3D(); FLayer.name = "FLayer";
    BLayer = new THREE.Object3D(); BLayer.name = "BLayer";
    RLayer = new THREE.Object3D(); RLayer.name = "RLayer";
    LLayer = new THREE.Object3D(); LLayer.name = "LLayer";

    
    for (i = 0; i < 6; i++) {
        for (j = 0; j < 9; j++) {
            obj = layerList[i][j].clone();
            if      (i == 0) { ULayer.add(obj); }
            else if (i == 1) { DLayer.add(obj); }
            else if (i == 2) { FLayer.add(obj); }
            else if (i == 3) { BLayer.add(obj); }
            else if (i == 4) { RLayer.add(obj); }
            else if (i == 5) { LLayer.add(obj); }
        }
    }
    

    
    ULayer.add(YC, YGO, YG, YRG, YR, YBR, YB, YOB, YO);
    DLayer.add(WC, WBO, BW, WRB, RW, WGR, GW, WOG, OW);
    FLayer.add(BC, YOB, YB, YBR, BR, WRB, BW, WBO, BO);
    BLayer.add(GC, YRG, YG, YGO, GO, WOG, GW, WGR, GR);
    RLayer.add(RC, YBR, YR, YRG, GR, WGR, RW, WRB, BR);
    LLayer.add(OC, YGO, YO, YOB, BO, WBO, OW, WOG, GO);
    



    faces = [ULayer, DLayer, FLayer, BLayer, RLayer, LLayer];
    
    cube.add(ULayer); cube.add(DLayer);
    cube.add(FLayer); cube.add(BLayer);
    cube.add(RLayer); cube.add(LLayer);

    console.log(ULayer);
    console.log(RLayer);

    return cube;
}

function getLayers(){
    return layerList;
}

function getState(){
    return faces;
}

/*

    Idea: make a base cube out of the usual cubies, but make them all black
    and make PlaneGeometries that have the sticker texture on those cubies.
    Now we can move the blank cubies, as the cubies being blank should make 
    the compound rotation issue go away.
    
    Now that we can move the cubes correctly, we can animate them and 
    animate/rotate the PlaneGeometries that are on the cube. Thus, we can
    keep track of the cube with references to single stickers instead of whole
    cubies.

    These should help solve the animation problems

*/