/*-----------------------------------------------------------------------------
 * Ellie Camp
 * CSci 360 - Project 6
 * cube.js
 * 
 * Program initially created a fully textured cube with stickers on it.
 * However, the data structure for that cube proved inefficient. 
 * 
 * The new functionality of the program makes a Rubik's Cube base, that is
 * it makes a collection of 27 fully black cubies that represent our cube. 
 * There is functionality to rotate those cubies in turns.js
 * 
 * The old functionality of this code has not been removed, just commented out
-----------------------------------------------------------------------------*/
 
// global size variable
var cubie_size = 6;

// used to keep track of the state of the cube
var layerList;



// function to make cubie with variable amount of colors on it
function makeCubie(kind, color1, color2, color3){
    var cubieGeom = new THREE.BoxGeometry(cubie_size, cubie_size, cubie_size);

    cubieMaterials = [];

    // });//

    // make cubie fully black
    for (var i=0; i<6; i++){
        cubieMaterials.push( new THREE.MeshPhongMaterial( {color: 0x000000}));//, transparent: true, opacity: 0.5} ) );
        //cubieMaterials.push( new THREE.MeshNormalMaterial() );
    }

    // make material and make mesh
    var cubieMaterials = new THREE.MeshFaceMaterial( cubieMaterials );
    var cubie = new THREE.Mesh(cubieGeom, cubieMaterials);
    // cubie.castShadow = true;

    return cubie;
}

// function to create center pieces
function makeCenter(xpos, ypos, zpos, name){
    var piece = new THREE.Object3D();
    piece.name = name;

    var center = makeCubie();
    center.position.set(xpos, ypos, zpos);

    piece.add(center);
    return piece;
}

// function to create edge pieces
function makeEdge(xpos, ypos, zpos, name ){
    var piece = new THREE.Object3D();
    piece.name = name;
    // var edge = makeCubie("edge", color1, color2 );
    var edge = makeCubie();
    edge.position.set(xpos, ypos, zpos);
    // edge.rotation.set(xRot, yRot, zRot)

    piece.add(edge);
    return piece;
}

// function to create corner pieces
function makeCorner(xpos, ypos, zpos, name ){
    var piece = new THREE.Object3D();
    piece.name = name;
    // var corner = makeCubie("corner", color1, color2, color3);
    var corner = makeCubie();
    corner.position.set(xpos, ypos, zpos);
    // corner.rotation.set(xRot, yRot, zRot)

    piece.add(corner);
    return piece;
}


function createCube(){
    var cube = new THREE.Object3D();
    
    // add a black cubie to the center of the cube Object
    var core = makeCubie();
    cube.add(core);

    // make yellow center
    var YC = makeCenter(0, cubie_size, 0, "YC");
    //YC.position.y = cubie_size;
    cube.add(YC);

    // make yellow edge pieces
    var YR = makeEdge(cubie_size, cubie_size, 0, "YR");
    cube.add(YR);    
    var YO = makeEdge(-cubie_size, cubie_size, 0, "YO");
    cube.add(YO);
    var YG = makeEdge(0, cubie_size, -cubie_size, "YG");
    cube.add(YG);
    var YB = makeEdge(0, cubie_size, cubie_size, "YB");
    cube.add(YB);

    // make yellow corner pieces
    var YBR = makeCorner(cubie_size, cubie_size, cubie_size, "YBR");
    cube.add(YBR);
    var YRG = makeCorner(cubie_size, cubie_size, -cubie_size, "YRG");
    cube.add(YRG);
    var YGO = makeCorner(-cubie_size, cubie_size, -cubie_size, "YGO");
    cube.add(YGO);
    var YOB = makeCorner(-cubie_size, cubie_size, cubie_size, "YOB");
    cube.add(YOB);

    // blue center piece
    var BC = makeCenter(0, 0, cubie_size, "BC");
    //BC.position.z = cubie_size;
    //BC.rotation.x = Math.PI/2;
    cube.add(BC);

    // orange center piece
    var OC = makeCenter(-cubie_size, 0, 0, "OC");
    //OC.position.x = -cubie_size;
    //OC.rotation.z = Math.PI/2;
    cube.add(OC);

    // green center piece
    var GC = makeCenter(0, 0, -cubie_size, "GC");
    // GC.position.z = -cubie_size;
    // GC.rotation.x = -Math.PI/2;
    cube.add(GC);

    // red center piece
    var RC = makeCenter(cubie_size, 0, 0, "RC");
    // RC.position.x = cubie_size;
    // RC.rotation.z = -Math.PI/2;
    cube.add(RC);

    // blue red edge piece
    var BR = makeEdge(cubie_size, 0, cubie_size, "BR" );
    cube.add(BR);
    // blue orange edge piece
    var BO = makeEdge(-cubie_size, 0, cubie_size, "BO" );
    cube.add(BO);
    // green orange edge piece
    var GO = makeEdge(-cubie_size, 0, -cubie_size, "GO" );
    cube.add(GO);
    // green red edge piece
    var GR = makeEdge(cubie_size, 0, -cubie_size, "GR" );
    cube.add(GR);

    // make white center
    var WC = makeCenter(0, -cubie_size, 0, "WC");
    // WC.position.y = -cubie_size;
    // WC.rotation.x = Math.PI;
    cube.add(WC);

    // make white edge pieces
    var RW = makeEdge(cubie_size, -cubie_size, 0, "RW" );
    cube.add(RW);    
    var OW = makeEdge(-cubie_size, -cubie_size, 0, "OW" );
    cube.add(OW);
    var GW = makeEdge(0, -cubie_size, -cubie_size, "GW" );
    cube.add(GW);
    var BW = makeEdge(0, -cubie_size, cubie_size, "BW" );
    cube.add(BW);


    // make white corner pieces
    var WRB = makeCorner(cubie_size, -cubie_size, cubie_size, "WRB" );
    cube.add(WRB);
    var WGR = makeCorner(cubie_size, -cubie_size, -cubie_size, "WGR" );
    cube.add(WGR);
    var WOG = makeCorner(-cubie_size, -cubie_size, -cubie_size, "WOG" );
    cube.add(WOG);
    var WBO = makeCorner(-cubie_size, -cubie_size, cubie_size, "WBO" );
    cube.add(WBO);

    // fill layerList with every individual piece
    layerList = [  // 0    1   2    3   4    5   6    7   8
                    [YC, YGO, YG, YRG, YR, YBR, YB, YOB, YO], // U Layer 0
                    [RC, YBR, YR, YRG, GR, WGR, RW, WRB, BR], // R Layer 1
                    [OC, YGO, YO, YOB, BO, WBO, OW, WOG, GO], // L Layer 2
                    [GC, YRG, YG, YGO, GO, WOG, GW, WGR, GR], // B Layer 3
                    [BC, YOB, YB, YBR, BR, WRB, BW, WBO, BO], // F Layer 4
                    [WC, WBO, BW, WRB, RW, WGR, GW, WOG, OW]  // D Layer 5
                ]
    

    return cube;
}

function getLayers(){
    return layerList;
}

