/*-----------------------------------------------------------------------------
 * Ellie Camp
 * CSci 360 - Project 6
 * demo3.js
 * 
 * Program contains the code for creating and initializing the scene, creates
 * the rubiks cube to be modified, and holds the event listener which calls the
 * turning functions for the cube.
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

var cube = null;

// set background color, add lights
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

// obtain state of the cube; state of the cube is split between 
// a list of characters representing colors, and an array of
// PlaneGeometry objects which are the stickers of the cube
var layers = getLayers();          // found in cube2.js
var colors = getColorList();       // found in list.js
var stickers = getStickerList();   // found in stickers.js


// function to load solved stickers into scene
function addStickers(list){
    // remove old elements, add new ones in the order given by list
    for (i=0; i<list.length; i++){
        scene.remove(list[i]);
        scene.add(list[i]);
    }
    TW.render();
}
addStickers(stickers);



// event handler to call turning methods
document.addEventListener('keydown', function(event) {
    // variable to hold resulting state of cube after a turn
    var res;

    if (event.key === 'u') {
        res = UTurn(colors, stickers);
        stickers = loadStickerList(res[0]);
        addStickers(stickers);
        TW.render();
    }
    else if (event.key === 'r'){
        res = RTurn(colors, stickers);
        stickers = loadStickerList(res[0]);
        addStickers(stickers);
        TW.render();
    }
    else if (event.key === 'l'){
        res = LTurn(colors, stickers);
        stickers = loadStickerList(res[0]);
        addStickers(stickers);
        TW.render();
    }
    else if (event.key === 'f'){
        res = FTurn(colors, stickers);
        stickers = loadStickerList(res[0]);
        addStickers(stickers);
        TW.render();
    }
    else if (event.key === 'b'){
        res = BTurn(colors, stickers);
        stickers = loadStickerList(res[0]);
        addStickers(stickers);
        TW.render();
    }
    else if (event.key === 'd'){
        res = DTurn(colors, stickers);
        stickers = loadStickerList(res[0]);
        addStickers(stickers);
        TW.render();
    }
    else if (event.key === 'U'){
        res = UPrime(colors, stickers);
        stickers = loadStickerList(res[0]);
        addStickers(stickers);
        TW.render();
    }
    else if (event.key === 'R'){
        res = RPrime(colors, stickers);
        stickers = loadStickerList(res[0]);
        addStickers(stickers);
        TW.render();
    }
    else if (event.key === 'L'){
        res = LPrime(colors, stickers);
        stickers = loadStickerList(res[0]);
        addStickers(stickers);
        TW.render();
    }
    else if (event.key === 'F'){
        res = FPrime(colors, stickers);
        stickers = loadStickerList(res[0]);
        addStickers(stickers);
        TW.render();
    }
    else if (event.key === 'B'){
        res = BPrime(colors, stickers);
        stickers = loadStickerList(res[0]);
        addStickers(stickers);
        TW.render();
    }
    else if (event.key === 'D'){
        res = DPrime(colors, stickers);
        stickers = loadStickerList(res[0]);
        addStickers(stickers);
        TW.render();
    }
  });


// supposed to clear current cube and redraw a new,
// already solved cube. Was not working, button 
// taken out of final demo.
function resetRubiksCube(){
    if (cube != null){
        scene.remove(cube);
    }
    
    // create base cubies
    cube = createCube(); 
    scene.add(cube);

    // get default color list
    colors = getColorList();       // found in list.js
    // load default color list
    loadStickerList(colors);
    // add stickers to scene
    addStickers(stickers);

    TW.render();
}
// document.getElementById('resetButton').addEventListener('click', resetRubiksCube);
