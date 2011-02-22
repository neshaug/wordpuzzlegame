/*jslint
onevar: false, plusplus: false, nomen: false
*/

/*global
setTimeout
*/
var neshaug = neshaug || {};

neshaug.Game = function (canvas, menu, letters, words) {

    this._boardView = null;
    this._initBoardView(new neshaug.BoardView(canvas, letters));

    this._menu = menu;
    this._words = words;

    this._pause = false;
    this._board = null;
    this._currentWord = null;
    this._selected = [];
    this._shapes = [];
    this._usedIndexes = [];
    this._completeHandler = function () {};
};

neshaug.Game.prototype.constructor = neshaug.Game;

neshaug.Game.prototype.onComplete = function (callback) {
    this._completeHandler = callback;
};

neshaug.Game.prototype.pause = function () {
    this._pause = true;
};

neshaug.Game.prototype.resume = function () {
    this._pause = false;
    this._loop();
};

neshaug.Game.prototype._initBoardView = function (boardView) {
    var that = this;
    this._boardView = boardView;

    this._boardView.setOnDragHandler(function (row, column) {
        that._handleDrag(row, column);
    });

    this._boardView.setOnDragEndHandler(function (row, column) {
        that._handleDragEnd(row, column);
    });

    this._boardView.setOnDragStartHandler(function (row, column) {
        that._handleDrag(row, column);
    });
};

neshaug.Game.prototype.getBoardView = function () {
    return this._boardView;
};


neshaug.Game.prototype._initBoard = function () {
    this._board = new neshaug.Board();
    this._fill();
    this._boardView.setBoard(this._board);
    this._boardView.resize();
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
            if (this._usedIndexes.length === this._words.length) {
                this._completeHandler();
                this._pause = true;
                return;
            }
            else {
                this._board = null;
            }
        }
        this._selected = [];
    }
};

neshaug.Game.prototype._loop = function () {
    var that = this;

    if (this._board === null) {
        this._initBoard();
    }

    this._boardView.draw();

    if (!this._pause) {
        setTimeout(function () {
            that._loop();
        }, 30);
    }
};

neshaug.Game.prototype.start = function () {
    if (this._words === null || this._boardView === null) {
        throw new Error("words and board view needs to be set first");
    }
    this._loop();
};

neshaug.Game.prototype._fill = function () {
    this._currentWord = null;
    var tempIndex = 0;

    while (this._currentWord === null) {
        tempIndex = neshaug.Utils.random(0, this._words.length - 1);
        this._currentWord = this._words.splice(tempIndex, 1)[0];
    }

    var length = this._currentWord.length;

    var shape = neshaug.Shape.shapeify(this._currentWord, neshaug.Utils.random);
    shape.toOrigin();

    this._menu.draw(shape);

    var width = shape.getWidth();
    var height = shape.getHeight();

    var boardSize = width > height ? width : height;
    boardSize = boardSize;

    this._board.setSize(boardSize, boardSize);

    for (var i = 0; i < shape.points.length; i++) {
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
