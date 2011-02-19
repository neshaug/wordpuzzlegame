/*jslint
nomen: false, plusplus: false, onevar: false
*/

/*global
    document, neshaug, Image
*/

var height = document.body.clientHeight;
var width = document.body.clientWidth;

var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.height = height;
canvas.width = width;

var letterCanvas = document.createElement("canvas");
letterCanvas.height = 128;
letterCanvas.width = 128;

var letterPainter = new neshaug.LetterPainter(letterCanvas);

var bgImage = new Image();
bgImage.src = "resources/icon.png";

// resources loaded, set up game
bgImage.onload = function () {
    var images = [];

    // create letters (tiles)
    var i = 97,
        length = 123;
    for (i = 97; i < length; i++) {
        var letter = String.fromCharCode(i);

        var regular = new Image();
        regular.src = letterPainter.getLetter(letter.toUpperCase(), "black", bgImage);
        images.push([letter, regular]);

        var selected = new Image();
        selected.src = letterPainter.getLetter(letter.toUpperCase(), "red", bgImage);
        images.push([letter + "*", selected]);
    }

    // set views 
    var boardView = new neshaug.BoardView(canvas);
    boardView.setTiles(images);

    // add views and data to game
    var game = new neshaug.Game();
    game.boardView = boardView;
    game.words = ["ross", "rachel"];

    // start your engines!
    game.start();

    neshaug.game = game;
};
