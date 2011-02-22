var neshaug = neshaug || {};

(function () {
    var tp;

    function Tile(x, y, image) {
        this.x = x;
        this.y = y;
        this._image = image;
        this._selected = false;
    }

    tp = Tile.prototype;
    
    tp.draw = function (context) {
    };

    tp.toggleSelected = function () {
    };

    // export
    neshaug.Tile = Tile;
}());
