/*jslint 
    nomen: false, onevar: false, plusplus: false
*/

/*global 
    Image: true, 
    HTMLCanvasElement: true, 
    HTMLImageElement: true 
*/

var neshaug = neshaug || {};

/*
* @class
* @constructor
*/
neshaug.TileView = function () {
    this.width = 0;
    this.height = 0;
    this._tiles = [];
    this._tileSize = 0;
    this._tilesCount = 0;
};

neshaug.TileView.prototype.constructor = neshaug.TileView;

/*
* Sets the given tile to the given key.
* @method
* @param {Number} key The key used in the grid to reference the tile.
* @param {HTMLImageElement|HTMLCanvasElement} tile Image or Canvas object for the tile.
*/
neshaug.TileView.prototype.setTile = function (key, tile) {
    this._tiles[key] = tile;
    this._tilesCount++;
};

neshaug.TileView.prototype.setTiles = function (tiles) {
    tiles.forEach(function (value, index, tiles) {
        this.setTile(value[0], value[1]);
    }, this);
};

/*
 * Draws tiles to the canvas.
*/
neshaug.TileView.prototype.draw = function (canvas) {
    throw new Error("this method should be overriden");
};
