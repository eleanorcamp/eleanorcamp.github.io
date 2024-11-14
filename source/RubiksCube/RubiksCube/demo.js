/*-----------------------------------------------------------------------------
 * Ellie Camp
 * CSci 360 - Project 6
 * cube.js
-----------------------------------------------------------------------------*/
// create the scene, renderer, and camera
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;

TW.mainInit(renderer,scene);
TW.cameraSetup(renderer, scene,
                {minx: -15, maxx: 15,
                 miny: -15, maxy: 15,
                 minz: -15, maxz: 15});

// set background color, add lights
var cube = null;
function setupScene(){
    scene.background = new THREE.Color(0xf0dae8);

    // Create ambient light
    var ambientLight = new THREE.AmbientLight(0x404040); // Set the color of the ambient light
    scene.add(ambientLight);

    // Create directional light
    var dLight1 = new THREE.DirectionalLight(0xffffff, 0.7); // Set the color and intensity of the directional light
    dLight1.position.set(10, 10, 10); // Set the direction of the light
    dLight1.castShadow = true;
    scene.add(dLight1);

    // Create directional light
    var dLight2 = new THREE.DirectionalLight(0xffffff, 0.7); 
    dLight2.position.set(-10, 10, 10); 
    scene.add(dLight2);


    // Create directional light
    var dLight3 = new THREE.DirectionalLight(0xffffff, 0.7); 
    dLight3.position.set(10, -10, 10); 
    scene.add(dLight3);

    // Create directional light
    var dLight4 = new THREE.DirectionalLight(0xffffff, 0.7); 
    dLight4.position.set(-10, -10, -10); 
    scene.add(dLight4);

    cube = createCube();
    scene.add(cube);
    TW.render();
}
setupScene();

// get array to track state of the cube
var layers = getLayers();
console.log(layers);

var state = getState();
console.log("STATE:");
console.log(state);

// helper array used to pass references to cubies
var patients = [];
/*
var ULayer, DLayer, FLayer, BLayer, RLayer, LLayer;
function updateState(){
    
    ULayer = new THREE.Object3D(); ULayer.name = "ULayer";
    DLayer = new THREE.Object3D(); DLayer.name = "DLayer";
    FLayer = new THREE.Object3D(); FLayer.name = "FLayer";
    BLayer = new THREE.Object3D(); BLayer.name = "BLayer";
    RLayer = new THREE.Object3D(); RLayer.name = "RLayer";
    LLayer = new THREE.Object3D(); LLayer.name = "LLayer";

    for (i = 0; i<6; i++){
        for (j = 0; j<9; j++){
            if      (i == 0) {ULayer.add(layers[i][j]);}
            else if (i == 1) {DLayer.add(layers[i][j]);}
            else if (i == 2) {FLayer.add(layers[i][j]);}
            else if (i == 3) {BLayer.add(layers[i][j]);}
            else if (i == 4) {RLayer.add(layers[i][j]);}
            else if (i == 5) {LLayer.add(layerlayersList[i][j]);}
        }
    }
}
*/


function UTurn(){
    var tempC, tempE;

    /*
    // create an array of the pieces to be moved
    patients.push(layers[0][1],layers[0][2],layers[0][3],layers[0][4],
                  layers[0][5],layers[0][6],layers[0][7],layers[0][8], layers[0][0]);
    */

    /*    OLD FUNCTIONALITY           
    // animate pieces moving
    turnSide(patients, 'y', 1);
    // clear arrray
    patients = [];
    */

    turnSide(state[0], 'y', 1);
    console.log("NEW STUFF");

    // update the state of the cube
    tempC = layers[0][7];
    tempE = layers[0][8];

    // FOR U FACE:
    // swap corners
    layers[0][7] = layers[0][5];
    layers[0][5] = layers[0][3];
    layers[0][3] = layers[0][1];
    layers[0][1] = tempC;
    // swap edges
    layers[0][8] = layers[0][6];
    layers[0][6] = layers[0][4];
    layers[0][4] = layers[0][2];
    layers[0][2] = tempE;

    // FOR R FACE:
    //var oldVals = [ layers[1][1], layers[1][2], layers[1][3]];
    // swap corners
    layers[1][1] = layers[0][5];
    layers[1][3] = layers[0][3];
    //swap edge
    layers[1][2] = layers[0][4];

    // FOR L FACE:
    layers[2][1] = layers[0][1];
    layers[2][3] = layers[0][7];
    //swap edge
    layers[2][2] = layers[0][8];

    // FOR F FACE:
    layers[4][1] = layers[0][7];
    layers[4][3] = layers[0][5];
    //swap edge
    layers[4][2] = layers[0][6];

    // FOR B FACE:
    layers[3][1] = layers[0][3];
    layers[3][3] = layers[0][1];
    //swap edge
    layers[3][2] = layers[0][2];


    console.log("layers after u:");
    console.log(layers);

}

function RTurn(){
    var tempC, tempE;

    patients.push(layers[1][1],layers[1][2],layers[1][3],layers[1][4],
                  layers[1][5],layers[1][6],layers[1][7],layers[1][8], layers[1][0]);

    
    //turnSide(patients, 'x', 1);

    turnSide( [state[4], 'x', 1]);
    patients = [];
    tempC = layers[1][7];
    tempE = layers[1][8];

    // FOR R FACE:
    // swap corners
    layers[1][7] = layers[1][5];
    layers[1][5] = layers[1][3];
    layers[1][3] = layers[1][1];
    layers[1][1] = tempC;
    // swap edges
    layers[1][8] = layers[1][6];
    layers[1][6] = layers[1][4];
    layers[1][4] = layers[1][2];
    layers[1][2] = tempE;

    // FOR U FACE:
    // swap corners
    layers[0][3] = layers[1][3];
    layers[0][5] = layers[1][1];
    //swap edge
    layers[0][4] = layers[1][2];

    // FOR B FACE:
    // swap corners
    layers[3][1] = layers[1][3];
    layers[3][7] = layers[1][5];
    //swap edge
    layers[3][8] = layers[1][4];

    // FOR D FACE:
    // swap corners
    layers[5][3] = layers[1][7];
    layers[5][5] = layers[1][5];
    //swap edge
    layers[5][4] = layers[1][6];

    // FOR F FACE:
    // swap corners
    layers[4][3] = layers[1][1];
    layers[4][5] = layers[1][7];
    //swap edge
    layers[4][4] = layers[1][8];

    console.log("layers after r:");
    console.log(layers);
}

function LTurn(){
    var tempC, tempE;

    patients.push(layers[2][1],layers[2][2],layers[2][3],layers[2][4],
                  layers[2][5],layers[2][6],layers[2][7],layers[2][8], layers[2][0]);
    turnSide(patients, 'x', -1);
    patients = [];
    tempC = layers[2][7];
    tempE = layers[2][8];

    // FOR L FACE:
    // swap corners
    layers[2][7] = layers[2][5];
    layers[2][5] = layers[2][3];
    layers[2][3] = layers[2][1];
    layers[2][1] = tempC;
    // swap edges
    layers[2][8] = layers[2][6];
    layers[2][6] = layers[2][4];
    layers[2][4] = layers[2][2];
    layers[2][2] = tempE;

    // FOR U FACE:
    // swap corners
    layers[0][1] = layers[2][1];
    layers[0][7] = layers[2][3];
    //swap edge
    layers[0][8] = layers[2][2];

    // FOR F FACE:
    // swap corners
    layers[4][1] = layers[2][3];
    layers[4][7] = layers[2][5];
    //swap edge
    layers[4][8] = layers[2][4];

    // FOR D FACE:
    // swap corners
    layers[5][1] = layers[2][5];
    layers[5][7] = layers[2][7];
    //swap edge
    layers[5][8] = layers[2][6];

    // FOR B FACE: w
    // swap corners
    layers[3][3] = layers[2][1];
    layers[3][5] = layers[2][7];
    //swap edge
    layers[3][4] = layers[2][8];

    console.log("layers after l:");
    console.log(layers);
}

function FTurn(){
    var tempC, tempE;

    // create an array of the pieces to be moved
    patients.push(layers[4][1],layers[4][2],layers[4][3],layers[4][4],
                  layers[4][5],layers[4][6],layers[4][7],layers[4][8], layers[4][0]);

    // animate pieces moving
    turnSide(patients, 'z', 1);
    // clear arrray
    patients = [];

    // update the state of the cube
    tempC = layers[4][7];
    tempE = layers[4][8];

    // FOR F FACE:
    // swap corners
    layers[4][7] = layers[4][5];
    layers[4][5] = layers[4][3];
    layers[4][3] = layers[4][1];
    layers[4][1] = tempC;
    // swap edges
    layers[4][8] = layers[4][6];
    layers[4][6] = layers[4][4];
    layers[4][4] = layers[4][2];
    layers[4][2] = tempE;

    // FOR U FACE:
    //var oldVals = [ layers[1][1], layers[1][2], layers[1][3]];
    // swap corners
    layers[0][5] = layers[4][3];
    layers[0][7] = layers[4][1];
    //swap edge
    layers[0][6] = layers[4][2];

    // FOR R FACE:
    layers[1][1] = layers[4][3];
    layers[1][7] = layers[4][5];
    //swap edge
    layers[1][8] = layers[4][4];

    // FOR D FACE:
    layers[5][1] = layers[4][7];
    layers[5][3] = layers[4][5];
    //swap edge
    layers[5][2] = layers[4][6];

    // FOR L FACE: w
    layers[2][3] = layers[4][1];
    layers[2][5] = layers[4][7];
    //swap edge
    layers[2][4] = layers[4][8];


    console.log("layers after f:");
    console.log(layers);
}

function BTurn(){
    var tempC, tempE;

    // create an array of the pieces to be moved
    patients.push(layers[3][1],layers[3][2],layers[3][3],layers[3][4],
                  layers[3][5],layers[3][6],layers[3][7],layers[3][8], layers[3][0]);

    // animate pieces moving
    turnSide(patients, 'z', -1);
    // clear arrray
    patients = [];

    // update the state of the cube
    tempC = layers[3][7];
    tempE = layers[3][8];

    // FOR U FACE:
    // swap corners
    layers[3][7] = layers[3][5];
    layers[3][5] = layers[3][3];
    layers[3][3] = layers[3][1];
    layers[3][1] = tempC;
    // swap edges
    layers[3][8] = layers[3][6];
    layers[3][6] = layers[3][4];
    layers[3][4] = layers[3][2];
    layers[3][2] = tempE;

    // FOR U FACE:
    // swap corners
    layers[1][3] = layers[3][1];
    layers[1][1] = layers[3][3];
    //swap edge
    layers[1][2] = layers[3][2];

    // FOR L FACE:
    layers[2][1] = layers[3][3];
    layers[2][7] = layers[3][5];
    //swap edge
    layers[2][8] = layers[3][4];

    // FOR D FACE:
    layers[5][5] = layers[3][7];
    layers[5][7] = layers[3][5];
    //swap edge
    layers[5][6] = layers[3][6];

    // FOR R FACE:
    layers[1][3] = layers[3][1];
    layers[1][5] = layers[3][7];
    //swap edge
    layers[1][4] = layers[3][8];


    console.log("layers after b:");
    console.log(layers);
}

function DTurn(){
    var tempC, tempE;

    // create an array of the pieces to be moved
    patients.push(layers[5][1],layers[5][2],layers[5][3],layers[5][4],
                  layers[5][5],layers[5][6],layers[5][7],layers[5][8], layers[5][0]);

    // animate pieces moving
    turnSide(patients, 'y', -1);
    // clear arrray
    patients = [];

    // update the state of the cube
    tempC = layers[5][7];
    tempE = layers[5][8];

    // FOR U FACE:
    // swap corners
    layers[5][7] = layers[5][5];
    layers[5][5] = layers[5][3];
    layers[5][3] = layers[5][1];
    layers[5][1] = tempC;
    // swap edges
    layers[5][8] = layers[5][6];
    layers[5][6] = layers[5][4];
    layers[5][4] = layers[5][2];
    layers[5][2] = tempE;

    // FOR R FACE:
    // swap corners
    layers[1][5] = layers[5][5];
    layers[1][7] = layers[5][3];
    //swap edge
    layers[1][6] = layers[5][4];

    // FOR L FACE:
    layers[2][5] = layers[5][1];
    layers[2][7] = layers[5][7];
    //swap edge
    layers[2][6] = layers[5][8];

    // FOR F FACE:
    layers[4][5] = layers[5][3];
    layers[4][7] = layers[5][1];
    //swap edge
    layers[4][6] = layers[5][2];

    // FOR B FACE:
    layers[3][5] = layers[5][7];
    layers[3][7] = layers[5][5];
    //swap edge
    layers[3][6] = layers[5][6];


    console.log("layers after d:");
    console.log(layers);
}

/*
function turnSide(cubes, axis, dir) {
    var deg = 0;
    var moved = [];
    var x  = -1;
    if (dir < 0) { x = 1; }


    function animate() {
        for (var i = 0; i < cubes.length; i++) {
            if (axis == 'y') {
                cubes[i].rotation.y += TW.degrees2radians(2 * x);
            } else if (axis == 'x') {
                cubes[i].rotation.x += TW.degrees2radians(2 * x);
            } else if (axis == 'z') {
                cubes[i].rotation.z += TW.degrees2radians(2 * x);
            }

            // after turn is complete, log which pieces were 
            // just moved ---- for debugging
            if (Math.abs(deg) >= 88) {
                moved.push(cubes[i]);
            }
        }

        // if the face hasn't been moved by 90 degrees, move it again
        if (Math.abs(deg) < 88) {
            deg += 2;
            TW.render();
            requestAnimationFrame(animate);
        } else {
            // log which pieces were just moved ---- for debugging
            console.log("Just moved: ");
            console.log(moved);
        }
        TW.render();
    }
    // Start the animation loop
    animate();
}
*/

function turnSide(layer, axis, dir) {
    console.log("TURNING:");
    console.log(layer);
    var deg = 0;
    var moved = layer;
    var x  = -1;
    if (dir < 0) { x = 1; }
    


    function animate() {
            if (axis == 'y') {
                layer.rotation.y += TW.degrees2radians(2 * x);
            } else if (axis == 'x') {
                layer.rotation.x += TW.degrees2radians(2 * x);
            } else if (axis == 'z') {
                layer.rotation.z += TW.degrees2radians(2 * x);
            }

            // after turn is complete, log which pieces were 
            // just moved ---- for debugging
            // if (Math.abs(deg) >= 88) {
            //     moved.push(cubes[i]);
            // }

        // if the face hasn't been moved by 90 degrees, move it again
        if (Math.abs(deg) < 88) {
            deg += 2;
            TW.render();
            requestAnimationFrame(animate);
        } else {
            // log which pieces were just moved ---- for debugging
            console.log("Just moved: ");
            console.log(moved);
            //console.log(layer.rotation.y);
            TW.render();
        }
        TW.render();
    }
    // Start the animation loop
    animate();
}

function resetRubiksCube(){
    if (cube != null){
        scene.remove(cube);
    }
    cube = createCube();
    scene.add(cube);
    layers = getLayers();
    TW.render();
}


TW.setKeyboardCallback("u", UTurn, "rotate U face clockwise");
TW.setKeyboardCallback("d", DTurn, "rotate D face clockwise");
TW.setKeyboardCallback("r", RTurn, "rotate R face clockwise");
TW.setKeyboardCallback("l", LTurn, "rotate L face clockwise");
TW.setKeyboardCallback("f", FTurn, "rotate F face clockwise");
TW.setKeyboardCallback("b", BTurn, "rotate B face clockwise");

document.getElementById('resetButton').addEventListener('click', resetRubiksCube);

// TW.setKeyboardCallback("U", onKeyDown, "rotate U face counter-clockwise");
// TW.setKeyboardCallback("D", onKeyDown, "rotate D face counter-clockwise");
// TW.setKeyboardCallback("R", onKeyDown, "rotate R face counter-clockwise");
// TW.setKeyboardCallback("L", onKeyDown, "rotate L face counter-clockwise");
// TW.setKeyboardCallback("F", onKeyDown, "rotate F face counter-clockwise");
// TW.setKeyboardCallback("B", onKeyDown, "rotate B face counter-clockwise");