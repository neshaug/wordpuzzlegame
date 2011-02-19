/*jslint 
plusplus:false
*/

var neshaug = neshaug || {};

(function () {

    var DIR_LEFT = 0,
        DIR_RIGHT = 1,
        DIR_UP = 2,
        DIR_DOWN = 3;

    function getMaxAndMin(points) {
        var maxX = null,
            minX = null,
            maxY = null,
            minY = null,
            i = null,
            length = null;

        length = points.length;
        if (length > 0) {
            maxX = points[0].x;
            minX = points[0].x;
            maxY = points[0].y;
            minY = points[0].y;

            for (i = 1; i < length; i++) {
                if (points[i].x > maxX) {
                    maxX = points[i].x;
                }
                if (points[i].x < minX) {
                    minX = points[i].x;
                }
                if (points[i].y > maxY) {
                    maxY = points[i].y;
                }
                if (points[i].y < minY) {
                    minY = points[i].y;
                }
            }
        }
        return {
            maxX: maxX,
            minX: minX,
            maxY: maxY,
            minY: minY
        };
    }


    // private

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    Point.prototype.equals = function (point) {
        if (point.x === this.x && point.y === this.y) {
            return true;
        }
        return false;
    };

    // private

    function hasPoint(shape, point) {
        var i = 0,
            length = 0;
        length = shape.points.length;
        for (i; i < length; i++) {
            if (shape.points[i].equals(point)) {
                return true;
            }
        }
        return false;
    }

    // private

    function canMoveLeft(shape) {
        var x = 0,
            y = 0,
            length = 0;
        length = shape.points.length - 1;
        x = shape.points[length].x - 1;
        y = shape.points[length].y;
        return !hasPoint(shape, new Point(x, y));
    }

    // private

    function canMoveRight(shape) {
        var x = 0,
            y = 0,
            length = 0;
        length = shape.points.length - 1;
        x = shape.points[length].x + 1;
        y = shape.points[length].y;
        return !hasPoint(shape, new Point(x, y));
    }

    // private

    function canMoveUp(shape) {
        var x = 0,
            y = 0,
            length = 0;
        length = shape.points.length - 1;
        x = shape.points[length].x;
        y = shape.points[length].y - 1;
        return !hasPoint(shape, new Point(x, y));
    }

    //private

    function canMoveDown(shape) {
        var x = 0,
            y = 0,
            length = 0;
        length = shape.points.length - 1;
        x = shape.points[length].x;
        y = shape.points[length].y + 1;
        return !hasPoint(shape, new Point(x, y));
    }

    function Shape(word) {
        this.points = [];
        this.word = word;
        this.deadEnds = [];

        this.setPosition = function (x, y) {
            var xChange = 0,
                yChange = 0,
                i = 0;
            if (this.points.length > 0) {
                xChange = x - this.points[0].x;
                yChange = y - this.points[0].y;

                for (i = 0; i < this.points.length; i++) {
                    this.points[i].x = this.points[i].x + xChange;
                    this.points[i].y = this.points[i].y + yChange;
                }
            }
        };

        this.toOrigin = function () {
            var maxAndMin = getMaxAndMin(this.points),
                minX = maxAndMin.minX,
                minY = maxAndMin.minY;
            this.setPosition(minX * -1, minY * -1);
        };
    }

    Shape.prototype = Object.create(Object.prototype, {
        height: {
            enumerable: true,
            get: function () {
                var maxAndMin = getMaxAndMin(this.points);
                return Math.abs(maxAndMin.maxY - maxAndMin.minY) + 1;
            }
        },
        width: {
            enumerable: true,
            get: function () {
                var maxAndMin = getMaxAndMin(this.points);
                return Math.abs(maxAndMin.maxX - maxAndMin.minX) + 1;
            }
        }
    });

/*
 * Create a random shape of the word.
 * @param word {String}
 * @param random {Function} A function that returns
 * a random number given max and min.
 *
 * random(max, min)
 */
    Shape.shapeify = function (word, random) {
        var shape = null,
            i = 0,
            x = 0,
            y = 0,
            lastX = 0,
            lastY = 0,
            validMoves = null,
            direction = null;

        if (!word) {
            return null;
        }

        shape = new Shape(word);
        shape.points.push(new Point(0, 0));

        for (i = 1; i < word.length; i++) {

            lastX = shape.points[i - 1].x;
            lastY = shape.points[i - 1].y;

            validMoves = [];
            if (canMoveLeft(shape)) {
                validMoves.push(DIR_LEFT);
            }
            if (canMoveRight(shape)) {
                validMoves.push(DIR_RIGHT);
            }
            if (canMoveUp(shape)) {
                validMoves.push(DIR_UP);
            }
            if (canMoveDown(shape)) {
                validMoves.push(DIR_DOWN);
            }

            // back up if we can not move 
            if (validMoves.length === 0) {
                shape.deadEnds.push(shape.points.pop());
                i = i - 2;
                continue;
            }

            direction = validMoves[random(0, validMoves.length - 1)];

            if (direction === DIR_LEFT) {
                shape.points.push(new Point(lastX - 1, lastY));
            } else if (direction === DIR_RIGHT) {
                shape.points.push(new Point(lastX + 1, lastY));
            } else if (direction === DIR_UP) {
                shape.points.push(new Point(lastX, lastY - 1));
            } else if (direction === DIR_DOWN) {
                shape.points.push(new Point(lastX, lastY + 1));
            }
        }

        return shape;
    };

    // export
    neshaug.Shape = Shape;

}());
