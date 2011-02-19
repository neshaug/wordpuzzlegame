/*jslint
nomen:false, plusplus:false, onevar: false
*/

/*global
    HTMLImageElement: true,
    HTMLCanvasElement: true
    document: true
*/

var neshaug = neshaug || {};

neshaug.BoardView = function (canvas) {

    neshaug.TileView.call(this);
    // use property
    this.canvas = canvas;

    this._onDragStart = document.createEvent("Event");
    this._onDragStart.initEvent("onDragStart", true, true);

    this._onDrag = document.createEvent("Event");
    this._onDrag.initEvent("onDrag", true, true);

    this._onDragEnd = document.createEvent("Event");
    this._onDragEnd.initEvent("onDragEnd", true, true);

    this.board = null;

    this._mouseDrag = false;

    this.width = this._canvas.width;
    this.height = this._canvas.height;
};

neshaug.BoardView.prototype = Object.create(neshaug.TileView.prototype, {
    canvas: {
        get: function () {
            return this._canvas;
        },
        set: function (canvas) {
            this._canvas = canvas;
            var that = this;
            this._canvas.onmousemove = function (e) {
                that.onMouseMove(e.x, e.y);
            };
            this._canvas.onmousedown = function (e) {
                that.onMouseDown(e.x, e.y);
            };
            this._canvas.onmouseup = function (e) {
                that.onMouseUp(e.x, e.y);
            };
        },
        enumerable: true
    }
});

neshaug.BoardView.prototype.constructor = neshaug.BoardView;

neshaug.BoardView.prototype.resize = function () {
    var fittedWidth = parseInt(this.height / this.board.rows, 10);
    var fittedHeight = parseInt(this.width / this.board.columns, 10);
    this._tileSize = fittedWidth > fittedHeight ? fittedHeight : fittedWidth;
};

/*
* Draws a board on the canvas. Resizes to fit the canvas.
* TODO: Make the resizing smarter (mipmapping). Select a tile image
* that is closest to the resized tile size before resizing (drawing).
*/
neshaug.BoardView.prototype.draw = function () {

    if (this.board === null) {
        return;
    }

    var context = this.canvas.getContext("2d");
    context.save();

    context.fillStyle = "black";
    context.fillRect(0, 0, this.height, this.width);

    var i = 0,
        j = 0,
        xPos = 0,
        yPos = 0;
    for (i = 0; i < this.board.rows; i++) {
        for (j = 0; j < this.board.columns; j++) {
            var piece = this.board.getPiece(i, j);
            var tile = this._tiles[piece];
            context.drawImage(tile, 0, 0, tile.width, tile.height, xPos, yPos, this._tileSize, this._tileSize);
            yPos = yPos + this._tileSize;
        }
        xPos = xPos + this._tileSize;
        yPos = 0;
    }

    if (this._mouseDrag) {
        context.beginPath();
        context.moveTo(this._startPos.x, this._startPos.y);
        context.lineTo(this._currentPos.x, this._currentPos.y);

        context.strokeStyle = "red";
        context.globalAlpha = 0.7;
        context.lineWidth = 10;
        context.stroke();

    }

    context.restore();
};

neshaug.BoardView.prototype.onMouseMove = function (x, y) {
    // we want to detect the mousemove as a select when the
    // pointer really is within the bounds of the tile
    var xSelectOffset = this._tileSize * 0.20;
    var ySelectOffset = this._tileSize * 0.20;

    this._currentPos = {
        x: x,
        y: y
    };
    var row = parseInt(x / this._tileSize, 10);
    var column = parseInt(y / this._tileSize, 10);
    
    var centeredX = row * this._tileSize + (this._tileSize / 2);
    var centeredY = column * this._tileSize + (this._tileSize / 2);

    var maxXLimit = centeredX + xSelectOffset;
    var minXLimit = centeredX - xSelectOffset;
    var maxYLimit = centeredY + ySelectOffset;
    var minYLimit = centeredY - ySelectOffset;

    this._onDrag.row = row;
    this._onDrag.column = column;
    if (this._mouseDrag &&
            x < maxXLimit && x > minXLimit &&
            y < maxYLimit && y > minYLimit) {
        this.canvas.dispatchEvent(this._onDrag);
    }
};

neshaug.BoardView.prototype.onMouseDown = function (x, y) {
    this._mouseDrag = true;

    // want the startpos to be centered in a tile
    var row = parseInt(x / this._tileSize, 10);
    var column = parseInt(y / this._tileSize, 10);
    x = row * this._tileSize + (this._tileSize / 2);
    y = column * this._tileSize + (this._tileSize / 2);

    this._startPos = {
        x: x,
        y: y
    };

    this._onDragStart.row = row;
    this._onDragStart.column = column;
    this.canvas.dispatchEvent(this._onDragStart);
};

neshaug.BoardView.prototype.onMouseUp = function (x, y) {
    this._mouseDrag = false;
    this._endPos = {
        x: x,
        y: y
    };
    this.canvas.dispatchEvent(this._onDragEnd);
};
