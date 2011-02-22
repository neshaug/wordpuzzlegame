/*jslint
plusplus: false, nomen: false
*/

var neshaug = neshaug || {};

(function () {

    function ShapeView(canvas) {
        this._canvas = canvas;

        this.width = canvas.width;
        this.height = canvas.height;
    }

    var sp = ShapeView.prototype;

    sp.draw = function (shape) {
        var height = shape.getHeight(),
            width = shape.getWidth(),
            i = 0,
            j = 0,
            x = 0,
            y = 0,
            context = null,
            tileSize = 0,
            maxSize = 0,
            margin = 2;
        
        context = this._canvas.getContext("2d");
        context.save();
        context.fillStyle = "white";
        context.fillRect(0, 0, this.width, this.height);
        
        maxSize = width > height ? width : height;

        tileSize = parseInt(this.width / (maxSize), 10);

        context.fillStyle = "gray";
        for (i = 0; i < width; i++) {
            for (j = 0; j < height; j++) {
                if (shape.hasPoint(i, j)) {
                    context.fillRect(x + margin, y + margin, tileSize - margin, tileSize - margin);
                }
                y = y + tileSize;
            }
            y = 0;
            x = x + tileSize;
        }

        context.restore();
    };

    // export
    neshaug.ShapeView = ShapeView;
}());
