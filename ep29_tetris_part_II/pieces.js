
var jTetrominoe = [
    [0,0,1],
    [0,0,1],
    [0,1,1]
];

var lTetrominoe = [
    [1,0,0],
    [1,0,0],
    [1,1,0]
];

var iTetrominoe = [
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]
];

var oTetrominoe = [
    [1,1],
    [1,1]
];

var zTetrominoe = [
    [1,1,0],
    [0,1,1],
    [0,0,0]
];

var sTetrominoe = [
    [0,1,1],
    [1,1,0],
    [0,0,0]
];

var tTetrominoe = [
    [1,1,1],
    [0,1,0],
    [0,0,0]
];

var allTetrominoes = [
    jTetrominoe, lTetrominoe, iTetrominoe, oTetrominoe,
    zTetrominoe, sTetrominoe, tTetrominoe
];

//A counter to see count how many of each piee were generated.
var piecesCount = {
    0: 0, 1: 0, 2: 0, 3: 0,
    4: 0, 5: 0, 6: 0
};

var piecesLabel = {
    0: "J", 1: "L", 2: "I", 3: "O",
    4: "Z", 5: "S", 6: "T"
};
