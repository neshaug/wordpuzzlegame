/*jslint
nomen:false, plusplus:false, onevar: false
*/

/*global
    HTMLImageElement: true,
    HTMLCanvasElement: true
    document: true
*/

var neshaug = neshaug || {};

neshaug.BoardView = function (canvas, letters) {
    this._tiles = [];
    this._tileSize = 0;
    this._tilesCount = 0;

    this.setCanvas(canvas);
    this.setTiles(letters);

    this._onDragStartHandler = function () {};
    this._onDragHandler = function () {};
    this._onDragEndHandler = function () {};

    this._board = null;

    this._mouseDrag = false;

    this.width = this._canvas.width;
    this.height = this._canvas.height;
};

neshaug.BoardView.prototype.constructor = neshaug.BoardView;

neshaug.BoardView.prototype.setTile = function (key, tile) {
    this._tiles[key] = tile;
    this._tilesCount++;
};

neshaug.BoardView.prototype.setTiles = function (tiles) {
    tiles.forEach(function (value, index, tiles) {
        this.setTile(value[0], value[1]);
    }, this);
};

neshaug.BoardView.prototype.setBoard = function (board) {
    this._board = board;
};

neshaug.BoardView.prototype.getBoard = function () {
    return this._board;
};

neshaug.BoardView.prototype.setCanvas = function (canvas) {
    var that = this,
        offsetTop, offsetLeft;
    this._canvas = canvas;

    offsetTop = this._canvas.offsetTop;
    offsetLeft = this._canvas.offsetLeft;

    this._canvas.onmousemove = function (e) {
        that.onMouseMove(e.clientX - offsetLeft, e.clientY - offsetTop);
    };
    this._canvas.onmousedown = function (e) {
        that.onMouseDown(e.clientX - offsetLeft, e.clientY - offsetTop);
    };
    this._canvas.onmouseup = function (e) {
        that.onMouseUp(e.clientX, e.clientY);
    };
};

neshaug.BoardView.prototype.getCanvas = function () {
    return this._canvas;
};

neshaug.BoardView.prototype.setOnDragStartHandler = function (fn) {
    this._onDragStartHandler = fn;
};

neshaug.BoardView.prototype.setOnDragHandler = function (fn) {
    this._onDragHandler = fn;
};

neshaug.BoardView.prototype.setOnDragEndHandler = function (fn) {
    this._onDragEndHandler = fn;
};


neshaug.BoardView.prototype.constructor = neshaug.BoardView;

neshaug.BoardView.prototype.resize = function () {
    var fittedWidth = parseInt(this.height / this._board.rows, 10);
    var fittedHeight = parseInt(this.width / this._board.columns, 10);
    this._tileSize = fittedWidth > fittedHeight ? fittedHeight : fittedWidth;
};

/*
* Draws a board on the canvas. Resizes to fit the canvas.
* TODO: Make the resizing smarter (mipmapping). Select a tile image
* that is closest to the resized tile size before resizing (drawing).
*/
neshaug.BoardView.prototype.draw = function () {

    if (this._board === null) {
        return;
    }

    var context = this._canvas.getContext("2d");
    context.save();

    context.fillStyle = neshaug.LetterPainter.backgroundColor;
    context.fillRect(0, 0, this.height, this.width);

    var i = 0,
        j = 0,
        xPos = 0,
        yPos = 0;
    for (i = 0; i < this._board.columns; i++) {
        for (j = 0; j < this._board.rows; j++) {
            var piece = this._board.getPiece(i, j);
            var tile = this._tiles[piece];
            context.drawImage(tile, 0, 0, tile.width, tile.height, xPos, yPos, this._tileSize, this._tileSize);
            yPos = yPos + this._tileSize;
        }
        xPos = xPos + this._tileSize;
        yPos = 0;
    }

/*if (this._mouseDrag) {
        context.beginPath();
        context.moveTo(this._startPos.x, this._startPos.y);
        context.lineTo(this._currentPos.x, this._currentPos.y);

        context.strokeStyle = "red";
        context.globalAlpha = 0.7;
        context.lineWidth = 10;
        context.stroke();

    }*/

    context.restore();
};

neshaug.BoardView.prototype.onMouseMove = function (x, y) {
    // we want to detect the mousemove as a select when the
    // pointer "really" is within the bounds of the tile
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

    if (this._mouseDrag && x < maxXLimit && x > minXLimit && y < maxYLimit && y > minYLimit) {
        this._onDragHandler(row, column);
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

    this._onDragStartHandler(row, column);
};

neshaug.BoardView.prototype.onMouseUp = function (x, y) {
    this._mouseDrag = false;
    this._endPos = {
        x: x,
        y: y
    };

    this._onDragEndHandler();
};
