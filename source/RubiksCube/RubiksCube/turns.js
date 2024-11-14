/*-----------------------------------------------------------------------------
 * Ellie Camp
 * CSci 360 - Project 6
 * turns.js
 * 
 * Program contains the necessary functions for TURNING the sides of the cube
 * 
 *  ======================= How do these functions work? =======================
 *  These algorithms work in two parts: 
 *      1) animate the pieces + stickers actually moving
 *      2) update the state of the cube
 * 
 *  For both of these steps, the helper array, patients, is used.
 *      The methods that actually animate the objects moving work on an array of
 *      objects given in the parameter list, so patients is loaded with the 
 *      objects which should be animated, and is passed to the turnSide function
 * 
 *      The turning method itself is responsible for updating the state of the
 *      cube, and it also relies on patients to make that process easier. While
 *      it is currently a very inefficient, patients is loaded with the entire
 *      "old" state of the cube, and the new state is created based off of 
 *      references to the old state
 * 
 * For brevity, these steps have been highlighted with comments in the 
 * UTurn function, but have not been thoroughly updated in the remaining 
 * functions. 
-----------------------------------------------------------------------------*/

var patients = [];
function UTurn(colors, stickers){ 

    // load helper array with the black cubies to be rotated 
    patients.push(layers[0][1],layers[0][2],layers[0][3],layers[0][4],
                  layers[0][5],layers[0][6],layers[0][7],layers[0][8], layers[0][0]);
    // rotate the cubies
    turnSide(patients, 'y', 1);
    
    // clear helper array
    patients = [];

    // come up with list of indices in the colorList which will be affected 
    // by the UTurn, and load them into the helper array to then be rotated
    var U_INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 
                    9, 12, 15, 
                    24, 25, 26, 
                    27, 30, 33, 
                    42, 43, 44];
    for (i=0; i<U_INDICES.length; i++){
        index = U_INDICES[i];
        patients.push(stickers[index]);
    }    

    // turnStickers(patients, 'y', 1);  -- commented out since it does not work as expected
    // clear helper array
    patients = []; 

    // load helper array with references to old state
    for (i=0; i<colors.length; i++){
        patients.push(colors[i]);
    }
    
    // affect color list (update state)
    colors[0] = patients[6];
    colors[1] = patients[3];
    colors[2] = patients[0];
    colors[3] = patients[7];
    colors[4] = patients[4];
    colors[5] = patients[1];
    colors[6] = patients[8];
    colors[7] = patients[5];
    colors[8] = patients[2];

    colors[26] = patients[9];
    colors[25] = patients[12];
    colors[24] = patients[15];

    colors[27] = patients[26];
    colors[30] = patients[25];
    colors[33] = patients[24];   
    
    colors[42] = patients[27];
    colors[43] = patients[30];
    colors[44] = patients[33];

    colors[9] = patients[42];
    colors[12] = patients[43];
    colors[15] = patients[44];

    // update the other half of the state
    stickers = loadStickerList(colors);

    // clear arrray
    patients = [];

    return [colors, stickers];
}

function RTurn(colors, stickers){

    patients.push(layers[1][1],layers[1][2],layers[1][3],layers[1][4],
                  layers[1][5],layers[1][6],layers[1][7],layers[1][8], layers[1][0]);

    turnSide(patients, 'x', 1);

    patients = [];

    var R_INDICES = [36, 37, 38, 39, 40, 41, 42, 43, 44, 
                     6,  7,  8, 
                    15, 16, 17, 
                    27, 28, 29, 
                    51, 52, 53];
    for (i=0; i<R_INDICES.length; i++){
        index = R_INDICES[i];
        patients.push(stickers[index]);
    }

    // turnStickers(patients, 'x', 1); -- commented out since it does not work as expected
    patients = [];


    for (i=0; i<colors.length; i++){
        patients.push(colors[i]);
    }
    
    // affect color list 
    colors[36] = patients[38];
    colors[37] = patients[41];
    colors[38] = patients[44];
    colors[39] = patients[37];
    colors[40] = patients[40];
    colors[41] = patients[43];
    colors[42] = patients[36];
    colors[43] = patients[39];
    colors[44] = patients[42];

    colors[8] = patients[15];
    colors[7] = patients[16];
    colors[6] = patients[17];

    colors[15] = patients[51];
    colors[16] = patients[52];
    colors[17] = patients[53];   
    
    colors[27] = patients[6];
    colors[28] = patients[7];
    colors[29] = patients[8];

    colors[53] = patients[27];
    colors[52] = patients[28];
    colors[51] = patients[29];

    stickers = loadStickerList(colors);

    // clear arrray
    patients = [];
    return [colors, stickers];

}

function LTurn(colors, stickers){
    patients.push(layers[2][1],layers[2][2],layers[2][3],layers[2][4],
                  layers[2][5],layers[2][6],layers[2][7],layers[2][8], layers[2][0]);
    turnSide(patients, 'x', -1);
    patients = [];

    patients = [];

    var L_INDICES = [18, 19, 20, 21, 22, 23, 24, 25, 26, 
                     0,  1,  2, 
                     9, 10, 11, 
                    33, 34, 35, 
                    45, 46, 47];
    for (i=0; i<L_INDICES.length; i++){
        index = L_INDICES[i];
        patients.push(stickers[index]);
    }


    // turnStickers(patients, 'x', -1);  -- commented out since it does not work as expected
    patients = [];


    for (i=0; i<colors.length; i++){
        patients.push(colors[i]);
    }
    
    // affect color list 
    colors[18] = patients[24];
    colors[19] = patients[21];
    colors[20] = patients[18];
    colors[21] = patients[25];
    colors[22] = patients[22];
    colors[23] = patients[19];
    colors[24] = patients[26];
    colors[25] = patients[23];
    colors[26] = patients[20];

    colors[0] = patients[33];
    colors[1] = patients[34];
    colors[2] = patients[35];

    colors[9] = patients[2];
    colors[10] = patients[1];
    colors[11] = patients[0];   
    
    colors[45] = patients[9];
    colors[46] = patients[10];
    colors[47] = patients[11];

    colors[33] = patients[47];
    colors[34] = patients[46];
    colors[35] = patients[45];

    stickers = loadStickerList(colors);

    // clear arrray
    patients = [];
    return [colors, stickers];
    
}

function FTurn(colors, stickers){

    patients.push(layers[4][1],layers[4][2],layers[4][3],layers[4][4],
                  layers[4][5],layers[4][6],layers[4][7],layers[4][8], layers[4][0]);

    turnSide(patients, 'z', 1);
    patients = [];

    var F_INDICES = [9, 10, 11, 12, 14, 15, 16, 17, 
                     0,  3,  6, 
                    18, 21, 224, 
                    36, 39, 42, 
                    45, 48, 51];
    for (i=0; i<F_INDICES.length; i++){
        index = F_INDICES[i];
        patients.push(stickers[index]);
    }

    // turnStickers(patients, 'z', 1); -- commented out since it does not work as expected
    patients = [];

    for (i=0; i<colors.length; i++){
        patients.push(colors[i]);
    }
    
    // affect color list
    colors[9]  = patients[11];
    colors[10] = patients[14];
    colors[11] = patients[17];
    colors[12] = patients[10];
    colors[13] = patients[13];
    colors[14] = patients[16];
    colors[15] = patients[9];
    colors[16] = patients[12];
    colors[17] = patients[15];

    colors[0] = patients[18];
    colors[3] = patients[21];
    colors[6] = patients[24];

    colors[18] = patients[51];
    colors[21] = patients[48];
    colors[24] = patients[45];   
    
    colors[36] = patients[6];
    colors[39] = patients[3];
    colors[42] = patients[0];

    colors[45] = patients[36];
    colors[48] = patients[39];
    colors[51] = patients[42];

    stickers = loadStickerList(colors);

    // clear arrray
    patients = [];
    return [colors, stickers];

}

function BTurn(colors, stickers){

    patients.push(layers[3][1],layers[3][2],layers[3][3],layers[3][4],
                  layers[3][5],layers[3][6],layers[3][7],layers[3][8], layers[3][0]);

    turnSide(patients, 'z', -1);
    patients = [];

    var B_INDICES = [27, 28, 29, 30, 31, 32, 33, 34, 35,
                         2,  5,  8, 
                        20, 23, 26, 
                        38, 41, 44, 
                        47, 50, 53];
    for (i=0; i<B_INDICES.length; i++){
        index = B_INDICES[i];
        patients.push(stickers[index]);
    }

    // turnStickers(patients, 'z', -1);   -- commented out since it does not work as expected
    patients = [];

    for (i=0; i<colors.length; i++){
        patients.push(colors[i]);
    }

    // // affect color list
    colors[27] = patients[29];
    colors[28] = patients[32];
    colors[29] = patients[35];
    colors[30] = patients[28];
    colors[31] = patients[31];
    colors[32] = patients[34];
    colors[33] = patients[27];
    colors[34] = patients[30];
    colors[35] = patients[33];

    colors[2] = patients[44];
    colors[5] = patients[41];
    colors[8] = patients[38];

    colors[44] = patients[53];
    colors[41] = patients[50];
    colors[38] = patients[47];   

    colors[26] = patients[8];
    colors[23] = patients[5];
    colors[20] = patients[2];

    colors[47] = patients[26]; // done
    colors[50] = patients[23];
    colors[53] = patients[20];

    stickers = loadStickerList(colors);

    // clear arrray
    patients = [];
    return [colors, stickers];

}

function DTurn(colors, stickers){
    
    patients.push(layers[5][1],layers[5][2],layers[5][3],layers[5][4],
                  layers[5][5],layers[5][6],layers[5][7],layers[5][8], layers[5][0]);

    turnSide(patients, 'y', -1);
    patients = [];

    var B_INDICES = [45, 46, 47, 48, 49, 50, 51, 52, 53,
                    11, 14, 17, 
                    18, 19, 20, 
                    29, 32, 35, 
                    36, 37, 38];                
    for (i=0; i<B_INDICES.length; i++){
        index = B_INDICES[i];
        patients.push(stickers[index]);
    }

    // turnStickers(patients, 'y', -1); -- commented out since it does not work as expected
    patients = [];

    for (i=0; i<colors.length; i++){
        patients.push(colors[i]);
    }

    // // affect color list
    colors[45] = patients[47];
    colors[46] = patients[50];
    colors[47] = patients[53];
    colors[48] = patients[46];
    colors[49] = patients[49];
    colors[50] = patients[52];
    colors[51] = patients[45];
    colors[52] = patients[48];
    colors[53] = patients[51];

    colors[11] = patients[20];
    colors[14] = patients[19];
    colors[17] = patients[18];

    colors[18] = patients[35];
    colors[19] = patients[32];
    colors[20] = patients[29];   

    colors[29] = patients[36];
    colors[32] = patients[37];
    colors[35] = patients[38];

    colors[36] = patients[11]; // done
    colors[37] = patients[14];
    colors[38] = patients[17];

    stickers = loadStickerList(colors);

    // clear arrray
    patients = [];
    return [colors, stickers];
}

function UPrime(colors, stickers){
    // move black cubies
    patients.push(layers[0][1],layers[0][2],layers[0][3],layers[0][4],
                    layers[0][5],layers[0][6],layers[0][7],layers[0][8], layers[0][0]);

    turnSide(patients, 'y', -1);

    patients = [];

    var U_INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 
                    9, 12, 15, 
                    24, 25, 26, 
                    27, 30, 33, 
                    42, 43, 44];
    for (i=0; i<U_INDICES.length; i++){
        index = U_INDICES[i];
        patients.push(stickers[index]);
    }

    // turnStickers(patients, 'y', 1); -- commented out since it does not work as expected
    patients = [];

    for (i=0; i<colors.length; i++){
        patients.push(colors[i]);
    }

    // affect color list
    colors[6] = patients[0];
    colors[3] = patients[1];
    colors[0] = patients[2];
    colors[7] = patients[3];
    colors[4] = patients[4];
    colors[1] = patients[5];
    colors[8] = patients[6];
    colors[5] = patients[7];
    colors[2] = patients[8];

    colors[42] = patients[9];
    colors[43] = patients[12];
    colors[44] = patients[15];

    colors[9]  = patients[26];
    colors[12] = patients[25];
    colors[15] = patients[24];

    colors[26] = patients[27];
    colors[25] = patients[30];
    colors[24] = patients[33];

    colors[27] = patients[42];
    colors[30] = patients[43];
    colors[33] = patients[44];

    stickers = loadStickerList(colors);

    // clear arrray
    patients = [];
    return [colors, stickers];
}

function RPrime(colors, stickers){
    patients.push(layers[1][1],layers[1][2],layers[1][3],layers[1][4],
        layers[1][5],layers[1][6],layers[1][7],layers[1][8], layers[1][0]);

    turnSide(patients, 'x', -1);

    patients = [];
    var R_INDICES = [36, 37, 38, 39, 40, 41, 42, 43, 44, 
           6,  7,  8, 
          15, 16, 17, 
          27, 28, 29, 
          51, 52, 53];
    for (i=0; i<R_INDICES.length; i++){
        index = R_INDICES[i];
        patients.push(stickers[index]);
    }

    // turnStickers(patients, 'x', -1); -- commented out since it does not work as expected
    patients = [];

    for (i=0; i<colors.length; i++){
        patients.push(colors[i]);
    }

    // affect color list 
    colors[38] = patients[36];
    colors[41] = patients[37];
    colors[44] = patients[38];
    colors[37] = patients[39];
    colors[40] = patients[40];
    colors[43] = patients[41];
    colors[36] = patients[42];
    colors[39] = patients[43];
    colors[42] = patients[44];

    colors[15] = patients[8];
    colors[16] = patients[7];
    colors[17] = patients[6];

    colors[51] = patients[15];
    colors[52] = patients[16];
    colors[53] = patients[17];

    colors[6] = patients[27];
    colors[7] = patients[28];
    colors[8] = patients[29];

    colors[27] = patients[53];
    colors[28] = patients[52];
    colors[29] = patients[51];


    stickers = loadStickerList(colors);

    // clear arrray
    patients = [];
    return [colors, stickers];
}

function LPrime(colors, stickers){
    patients.push(layers[2][1],layers[2][2],layers[2][3],layers[2][4],
        layers[2][5],layers[2][6],layers[2][7],layers[2][8], layers[2][0]);
    turnSide(patients, 'x', 1);
    patients = [];

    patients = [];

    var L_INDICES = [18, 19, 20, 21, 22, 23, 24, 25, 26, 
            0,  1,  2, 
            9, 10, 11, 
            33, 34, 35, 
            45, 46, 47];
    for (i=0; i<L_INDICES.length; i++){
        index = L_INDICES[i];
        patients.push(stickers[index]);
    }


    // turnStickers(patients, 'y', 1);    -- commented out since it does not work as expected
    patients = [];

    for (i=0; i<colors.length; i++){
        patients.push(colors[i]);
    }

    // affect color list 
    colors[24] = patients[18];
    colors[21] = patients[19];
    colors[18] = patients[20];
    colors[25] = patients[21];
    colors[22] = patients[22];
    colors[19] = patients[23];
    colors[26] = patients[24];
    colors[23] = patients[25];
    colors[20] = patients[26];

    colors[33] = patients[0];
    colors[34] = patients[1];
    colors[35] = patients[2];

    colors[2] = patients[9];
    colors[1] = patients[10];
    colors[0] = patients[11];

    colors[9] = patients[45];
    colors[10] = patients[46];
    colors[11] = patients[47];

    colors[47] = patients[33];
    colors[46] = patients[34];
    colors[45] = patients[35];

    stickers = loadStickerList(colors);

    // clear arrray
    patients = [];
    return [colors, stickers];
}

function FPrime(colors, stickers){
    patients.push(layers[4][1],layers[4][2],layers[4][3],layers[4][4],
        layers[4][5],layers[4][6],layers[4][7],layers[4][8], layers[4][0]);

    turnSide(patients, 'z', -1);
    patients = [];

    var F_INDICES = [9, 10, 11, 12, 14, 15, 16, 17, 
            0,  3,  6, 
            18, 21, 224, 
            36, 39, 42, 
            45, 48, 51];
    for (i=0; i<F_INDICES.length; i++){
        index = F_INDICES[i];
        patients.push(stickers[index]);
    }

    // turnStickers(patients, 'y', 1);  -- commented out since it does not work as expected
    patients = [];


    for (i=0; i<colors.length; i++){
        patients.push(colors[i]);
    }

    // affect color list
    colors[11] = patients[9];
    colors[14] = patients[10];
    colors[17] = patients[11];
    colors[10] = patients[12];
    colors[13] = patients[13];
    colors[16] = patients[14];
    colors[9] = patients[15];
    colors[12] = patients[16];
    colors[15] = patients[17];

    colors[18] = patients[0];
    colors[21] = patients[3];
    colors[24] = patients[6];

    colors[51] = patients[18];
    colors[48] = patients[21];
    colors[45] = patients[24];

    colors[6] = patients[36];
    colors[3] = patients[39];
    colors[0] = patients[42];

    colors[36] = patients[45];
    colors[39] = patients[48];
    colors[42] = patients[51];

    stickers = loadStickerList(colors);

    // clear arrray
    patients = [];
    return [colors, stickers];
}

function BPrime(colors, stickers){
    patients.push(layers[3][1],layers[3][2],layers[3][3],layers[3][4],
        layers[3][5],layers[3][6],layers[3][7],layers[3][8], layers[3][0]);

    turnSide(patients, 'z', 1);
    patients = [];

    var B_INDICES = [27, 28, 29, 30, 31, 32, 33, 34, 35,
                2,  5,  8, 
                20, 23, 26, 
                38, 41, 44, 
                47, 50, 53];              
    for (i=0; i<B_INDICES.length; i++){
        index = B_INDICES[i];
        patients.push(stickers[index]);
    }

    // turnStickers(patients, 'y', 1);   -- commented out since it does not work as expected
    patients = [];

    for (i=0; i<colors.length; i++){
        patients.push(colors[i]);
    }

    // // affect color list
    colors[29] = patients[27];
    colors[32] = patients[28];
    colors[35] = patients[29];
    colors[28] = patients[30];
    colors[31] = patients[31];
    colors[34] = patients[32];
    colors[27] = patients[33];
    colors[30] = patients[34];
    colors[33] = patients[35];

    colors[44] = patients[2];
    colors[41] = patients[5];
    colors[38] = patients[8];

    colors[53] = patients[44];
    colors[50] = patients[41];
    colors[47] = patients[38];

    colors[8] = patients[26];
    colors[5] = patients[23];
    colors[2] = patients[20];

    colors[26] = patients[47];
    colors[23] = patients[50];
    colors[20] = patients[53];

    stickers = loadStickerList(colors);

    // clear arrray
    patients = [];
    return [colors, stickers];
}

function DPrime(colors, stickers){
    patients.push(layers[5][1],layers[5][2],layers[5][3],layers[5][4],
        layers[5][5],layers[5][6],layers[5][7],layers[5][8], layers[5][0]);

    turnSide(patients, 'y', 1);
    patients = [];

    var B_INDICES = [45, 46, 47, 48, 49, 50, 51, 52, 53,
            11, 14, 17, 
            18, 19, 20, 
            29, 32, 35, 
            36, 37, 38];                
    for (i=0; i<B_INDICES.length; i++){
        index = B_INDICES[i];
        patients.push(stickers[index]);
    }

    // turnStickers(patients, 'y', 1); -- commented out since it does not work as expected
    patients = [];

    for (i=0; i<colors.length; i++){
        patients.push(colors[i]);
    }

    // // affect color list
    colors[47] = patients[45];
    colors[50] = patients[46];
    colors[53] = patients[47];
    colors[46] = patients[48];
    colors[49] = patients[49];
    colors[52] = patients[50];
    colors[45] = patients[51];
    colors[48] = patients[52];
    colors[51] = patients[53];

    colors[20] = patients[11];
    colors[19] = patients[14];
    colors[18] = patients[17];

    colors[35] = patients[18];
    colors[32] = patients[19];
    colors[29] = patients[20];

    colors[36] = patients[29];
    colors[37] = patients[32];
    colors[38] = patients[35];

    colors[11] = patients[36];
    colors[14] = patients[37];
    colors[17] = patients[38];

    stickers = loadStickerList(colors);

    // clear arrray
    patients = [];
    return [colors, stickers];
}

function turnSide(cubes, axis, dir) {
    var deg = 0;
    var x  = -1;
    if (dir < 0) { x = 1; }

    function animate() {
        // animate face turning
        for (var i = 0; i < cubes.length; i++) {
            if (axis == 'y') {
                cubes[i].rotation.y += TW.degrees2radians(2 * x);
            } else if (axis == 'x') {
                cubes[i].rotation.x += TW.degrees2radians(2 * x);
            } else if (axis == 'z') {
                cubes[i].rotation.z += TW.degrees2radians(2 * x);
            }
        }

        // if the face hasn't been moved by 90 degrees, move it again
        if (Math.abs(deg) < 88) {
            deg += 2;
            TW.render();
            requestAnimationFrame(animate);
        } else {
            // after the face has completed it's turn, reset its
            // rotation to avoid compound rotations
            for (var i = 0; i < cubes.length; i++) {
                if (axis == 'y') {
                    cubes[i].rotation.y =0;
                } else if (axis == 'x') {
                    cubes[i].rotation.x =0;
                } else if (axis == 'z') {
                    cubes[i].rotation.z =0;
                }
            }
        }
        
        TW.render();
    }
    // Start the animation loop
    animate();
}
/*-----------------------------------------------------------------------------
// the goal of this function was to work the same as 
// turnSide, but with an array of stickerObjects instead
// of cubies. Could not figure out how to get it to work,
// so it is not implemented in the demo, however I wanted
// to leave it here.
function turnStickers(stickers, axis, dir) {
    // layer = new THREE.Object3D();
    // for (i=0; i<stickers.length; i++){
    //     layer.add(stickers[i]);
    // }
    // cube.add(layer);

    console.log(stickers);
    var deg = 0;
    var x  = -1;
    if (dir < 0) { x = 1; }


    function animate() {
        // animate face turning
        if (axis == 'y') {
            layer.rotation.y += TW.degrees2radians(2 * x);
        } else if (axis == 'x') {
            layer.rotation.x += TW.degrees2radians(2 * x);
        } else if (axis == 'z') {
            layer.rotation.z += TW.degrees2radians(2 * x);
        }

        // if the face hasn't been moved by 90 degrees, move it again
        if (Math.abs(deg) < 88) {
            deg += 2;

            TW.render();
            requestAnimationFrame(animate);
        }
        
        TW.render();
    }
    // Start the animation loop
    animate();
}
-----------------------------------------------------------------------------*/