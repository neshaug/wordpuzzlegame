/*jslint
    nomen:false
*/

var neshaug = neshaug || {};

neshaug.LetterPainter = function (canvas) {
    this._canvas = canvas;
};

neshaug.LetterPainter.prototype.getLetter = function (letter, color, image) {
    this._canvas.height = image.height;
    this._canvas.width = image.width;
    var context = this._canvas.getContext("2d");
    context.save();
    context.drawImage(image, 0, 0, image.width, image.height);
    context.textAlign = "center";
    context.fillStyle = color;
    context.font = "30px Times New Roman";
    context.fillText(letter, image.width / 2, (image.height / 2) + 10);
    var dataUrl = this._canvas.toDataURL();
    context.restore();
    return dataUrl;
}
