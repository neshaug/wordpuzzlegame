/*jslint
onevar: false, plusplus: false, nomen: false
*/

/*global
setTimeout
*/
var neshaug = neshaug || {};

neshaug.Game = function () {
    this._boardView = null;
    this.words = null;
    this.pause = false;
    this._board = null;
    this._currentWordIndex = 0;
    this._selected = [];
    this._shapes = [];
    this.timeoutId = 0;

};

neshaug.Game.prototype = Object.create(Object.prototype, {
    boardView: {
        get: function () {
            return this._boardView;
        },
        set: function (boardView) {
            var that = this;
            this._boardView = boardView;
            this._boardView.canvas.addEventListener("onDrag", function (e) {
                that._handleDrag(e.row, e.column);
            });
            this._boardView.canvas.addEventListener("onDragEnd", function (e) {
                that._handleDragEnd();
            });
            this._boardView.canvas.addEventListener("onDragStart", function (e) {
                that._handleDrag(e.row, e.column);
            });
        },
        enumerable: true
    }
});

neshaug.Game.prototype.constructor = neshaug.Game;

neshaug.Game.prototype._initBoard = function () {
    this._board = new neshaug.Board();
    this._fill();
    this.boardView.board = this._board;
    this.boardView.resize();
};

neshaug.Game.prototype._handleDrag = function (row, column) {
    var piece = this._board.getPiece(row, column);
    if (piece && piece.indexOf("*") === -1) {
        this._selected.push([row, column]);
        this._board.setPiece(piece + "*", row, column);
    }
};

neshaug.Game.prototype._handleDragEnd = function () {
    if (this._selected.length > 0) {
        var i = 0,
            length = this._selected.length,
            word = [];
        for (i = 0; i < length; i++) {
            var piece = this._board.getPiece(this._selected[i][0], this._selected[i][1]);
            piece = piece.replace("*", "");
            word.push(piece);
            this._board.setPiece(piece, this._selected[i][0], this._selected[i][1]);
        }
        word = word.join("");
        if (word === this._currentWord) {
            this._board = null;
            this._currentWordIndex++;
        }
        this._selected = [];
    }
};

neshaug.Game.prototype.start = function () {
    if (this.words === null || this.boardView === null) {
        throw new Error("words and board view needs to be set first");
    }
    var that = this;

    function gameLoop() {
        if (this._board === null) {
            this._initBoard();
        }

        this.boardView.draw();

        if (!this.pause) {
            this.timeoutId = setTimeout(function () {
                gameLoop.call(that);
            }, 30);
        }
    }
    gameLoop.call(that);
};

neshaug.Game.prototype.place = function (word) {

};

neshaug.Game.prototype._fill = function () {
    this._currentWord = this.words[this._currentWordIndex];
    var length = this._currentWord.length;

    var shape = neshaug.Shape.shapeify(this._currentWord, neshaug.Utils.random);
    shape.toOrigin();
    var width = shape.width;
    var height = shape.height;

    this._board.setSize(10, 10);

    for(var i = 0; i < shape.points.length; i++) {
        this._board.setPiece(shape.word[i], shape.points[i].x, shape.points[i].y);
    }
    this._shapes.push(shape);

    // fill the board with random chars
    for (i = 0; i < this._board.rows; i++) {
        for (var j = 0; j < this._board.columns; j++) {
            if (this._board.getPiece(i, j) === 0) {
                // get a random letter from A to Z.
                var key = String.fromCharCode((Math.random() * 26) + 97);
                this._board.setPiece(key, i, j);
            }
        }
    }
};
