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


// helper array used to pass references to cubies
var patients = [];

function addStickers(){
    for (i=0; i<stickerList.length; i++){
        scene.add(stickerList[i]);
    }
}

addStickers();


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