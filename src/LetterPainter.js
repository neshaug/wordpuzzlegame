/*jslint
nomen:false, plusplus:false
*/

/*global
Image, document
*/

var neshaug = neshaug || {};

neshaug.LetterPainter = function () {
    this._canvas = document.createElement("canvas");
    this._canvas.height = 128;
    this._canvas.width = 128;
};

neshaug.LetterPainter.backgroundColor = "#e0e0e0";
neshaug.LetterPainter.color = "";
neshaug.LetterPainter.selectedColor = "";

neshaug.LetterPainter.prototype.getLetter = function (letter, color) {
    var context = this._canvas.getContext("2d"),
    dataUrl = null;
    context.save();

    context.fillStyle = neshaug.LetterPainter.backgroundColor;
    context.fillRect(0, 0, this._canvas.width, this._canvas.height);

    context.textAlign = "center";
    context.fillStyle = color;
    context.font = "bold 120px Courier";
    context.fillText(letter, this._canvas.width / 2, (this._canvas.height / 2) + 35);

    context.restore();
    dataUrl = this._canvas.toDataURL();
    return dataUrl;
};

neshaug.LetterPainter.prototype.getLetters = function (callback, color, bgColor) {
    var images = [],
        i = 0,
        letter = 0,
        regular = null,
        selected = null,
        length = 0,
        counter = 0;

    function check() {
        counter = counter + 1;
        if (counter === 123 - 97) {
            callback(images);
        }
    }

    // create letters (tiles)
    length = 123;
    for (i = 97; i < length; i++) {
        letter = String.fromCharCode(i);
        regular = new Image();
        regular.src = this.getLetter(letter.toUpperCase(), "#222222");
        regular.onload = check;
        images.push([letter, regular]);

        selected = new Image();
        selected.src = this.getLetter(letter.toUpperCase(), "#5f5f5f");
        selected.onload = check;
        images.push([letter, regular]);
        images.push([letter + "*", selected]);
    }
};
