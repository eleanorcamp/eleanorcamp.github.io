/*-----------------------------------------------------------------------------
 * Ellie Camp
 * CSci 360 - Project 6
 * stickers.js
 * 
 * Program contains a Sticker class which is helpful in modeling the cube
 * given a specific state. Program also contains functions useful for managing
 * the sticker related parts of the state of the cube.
-----------------------------------------------------------------------------*/

// very simple class used to associate letter values such as 'y' and 'r'
// with the sticker texture that goes with that color
class Sticker {
    constructor(mat) {
        if (mat === 'y') {
            this.mat = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                map: yellowSticker
            });
        }

        if (mat === 'w') {
            this.mat = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                map: whiteSticker
            });
        }

        if (mat === 'r') {
            this.mat = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                map: redSticker
            });
        }

        if (mat === 'o') {
            this.mat = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                map: orangeSticker
            });
        }

        if (mat === 'g') {
            this.mat = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                map: greenSticker
            });
        }

        if (mat === 'b') {
            this.mat = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                map: blueSticker
            });
        }
    }
}

// values to be used for stickers
var redSticker = new THREE.TextureLoader().load( "./colors/RED.png" );
var orangeSticker = new THREE.TextureLoader().load( "./colors/ORANGE.png" );
var yellowSticker = new THREE.TextureLoader().load( "./colors/YELLOW.png" );
var whiteSticker = new THREE.TextureLoader().load( "./colors/WHITE.png" );
var greenSticker = new THREE.TextureLoader().load( "./colors/GREEN.png" );
var blueSticker = new THREE.TextureLoader().load( "./colors/BLUE.png" );

// variable to keep references to color values
var w = 'w';
var y = 'y';
var r = 'r';
var o = 'o';
var g = 'g';
var b = 'b';
// state of the array given by a single array
/*
    can be envisioned like the following 
    (looking down onto the cube, yellow side in the middle, piece (2,26,33) 
    represents a corner with yellow, orange, and blue)
                  __________
                 | 35 32 29 |
                 | 34 31 28 |
                 | 33 30 27 |
                  __________
     __________   __________   __________   __________
    | 20 23 26 | |  2  5  8 | | 44 41 38 | | 53 50 47 |               G
    | 19 22 25 | |  1  4  7 | | 43 40 37 | | 52 49 46 |   <-->    O   Y   R   W 
    | 18 21 24 | |  0  3  6 | | 42 39 36 | | 51 48 45 |               B
     __________   __________   __________   __________
                  __________
                 |  9 12 15 |
                 | 10 13 16 |
                 | 11 14 17 |
                  __________

*/

// initial color list
var colorList = [   y, y, y, y, y, y, y, y, y, //  0 -  8
                    b, b, b, b, b, b, b, b, b, //  9 - 17
                    o, o, o, o, o, o, o, o, o, // 18 - 26
                    g, g, g, g, g, g, g, g, g, // 27 - 35
                    r, r, r, r, r, r, r, r, r, // 36 - 44
                    w, w, w, w, w, w, w, w, w, // 45 - 53
                ];
function getColorList(){
    return colorList;
}

//==============================================================================
// length to place stickers so they do not overlap with cubies. 
stickLen = 1.51 * cubie_size;

// PlaneGeometry used by every sticker
var stickerGeom = new THREE.PlaneGeometry(cubie_size, cubie_size);

// part of the state of the cube
var stickerList = null;


var mat;
var stickerObject;

// returns the sticker half of the state of the cube
function getStickerList(){
    if (stickerList == null){
        var originalColors = getColorList();
        stickerList = loadStickerList( originalColors );
    }
    return stickerList;
}

// initialize a counter and an empty array to return
// when the counter reaches certain thresholds, it is loading
// a new face. Load all 6 faces in this fashion, appending each newly 
// drawn sticker onto the "cubestate" array.
function loadStickerList(list){
    // empty the sticker list
    stickerList = [];

    var count = 0;
    while (count < 54){
        // top face
        if (count<9){
            for (i = -1; i<2; i++){
                for (j = 1; j>-2; j--){
                    stickerObject = new THREE.Object3D();

                    var mat = list[count];
                    var sticker = new Sticker(mat);
                    
                    stick = new THREE.Mesh(stickerGeom, sticker.mat);
                    stick.rotation.x = Math.PI/2;
                    stick.position.set(i*cubie_size, stickLen, j*cubie_size);
                    stickerObject.add(stick)
                    stickerList.push(stickerObject);
                    count++
                }
            }
        }
        // front face
        else if (count>=9 && count<18){
            for (i = -1; i<2; i++){
                for (j = 1; j>-2; j--){
                    stickerObject = new THREE.Object3D();

                    mat = list[count];
                    var sticker = new Sticker(mat);

                    stick = new THREE.Mesh(stickerGeom, sticker.mat);
                    stick.position.set(i*cubie_size, j*cubie_size, stickLen);
                    stickerObject.add(stick)
                    stickerList.push(stickerObject);
                    count++;
                }
            }

        }

        // left face
        else if (count>=18 && count<27){
            for (i = -1; i<2; i++){
                for (j = 1; j>-2; j--){
                    mat = list[count];
                    var sticker = new Sticker(mat);

                    stick = new THREE.Mesh(stickerGeom, sticker.mat);
                    stick.rotation.y = Math.PI/2;
                    stick.position.set(-stickLen, i*cubie_size, j*cubie_size);
                    stickerList.push(stick);
                    count++;
                }
            }

        }

        // back face
        else if (count>=27 && count<36){
            for (i = 1; i>-2; i--){
                for (j = 1; j>-2; j--){
                    mat = list[count];
                    var sticker = new Sticker(mat);

                    stick = new THREE.Mesh(stickerGeom, sticker.mat);
                    stick.position.set(i*cubie_size, j*cubie_size, -stickLen);
                    stickerList.push(stick);
                    count++;
                }
            }

        }

        // right face
        else if (count>=36 && count<45){
            for (i = -1; i<2; i++){
                for (j = 1; j>-2; j--){
                    mat = list[count];
                    var sticker = new Sticker(mat);

                    stick = new THREE.Mesh(stickerGeom, sticker.mat);
                    stick.rotation.y = Math.PI/2;
                    stick.position.set(stickLen, i*cubie_size, j*cubie_size);
                    stickerList.push(stick);
                    count++;
                }
            }

        }

        // bottom face
        else if (count>=45 && count < 54){
            for (i = -1; i<2; i++){
                for (j = 1; j>-2; j--){
                    mat = list[count];
                    var sticker = new Sticker(mat);

                    stick = new THREE.Mesh(stickerGeom, sticker.mat);
                    stick.rotation.x = Math.PI/2;
                    stick.position.set(i*cubie_size, -stickLen, j*cubie_size);
                    stickerList.push(stick);
                    count++;
                }
            }

        }
    }
    return stickerList;
}
