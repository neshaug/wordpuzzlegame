/*jslint
plusplus:false
*/
/*global
expect, neshaug, beforeEach, describe, it
*/

describe("Shape", function () {
    var Shape, word;

    beforeEach(function () {
        Shape = neshaug.Shape;
        word = "ab";
    });

    it("should have a start position at the first row and first column", function () {

        function random(min, max) {
            return 0;
        }

        var shape = Shape.shapeify(word, random);

        expect(shape.points[0].x).toBe(0);
        expect(shape.points[0].y).toBe(0);
    });

    it("can move right", function () {
        var shape = null;

        function random(min, max) {
            return 1;
        }

        shape = Shape.shapeify(word, random);

        expect(shape.points[1].x).toBe(1);
        expect(shape.points[1].y).toBe(0);
    });

    it("can move left", function () {
        var shape = null;

        function random(min, max) {
            return 0;
        }

        shape = Shape.shapeify(word, random);

        expect(shape.points[1].x).toBe(-1);
        expect(shape.points[1].y).toBe(0);
    });

    it("can move up", function () {
        var shape = null;

        function random(min, max) {
            return 2;
        }

        shape = Shape.shapeify(word, random);

        expect(shape.points[1].x).toBe(0);
        expect(shape.points[1].y).toBe(-1);
    });

    it("can move down", function () {
        var shape = null;

        function random(min, max) {
            return 3;
        }

        shape = Shape.shapeify(word, random);

        expect(shape.points[1].x).toBe(0);
        expect(shape.points[1].y).toBe(1);
    });

    it("can not move on top of it self", function () {
        var shape = null,
            word = "abc",
            moves = null;

/* first we will do a right move, and second
         * we will still do a right move because the
         * left move is invalid and not in the list
         * of valid moves
         */
        moves = [1, 0];

        function random(min, max) {
            return moves.shift();
        }
        shape = Shape.shapeify(word, random);
        expect(shape.points[2].x).toBe(2);
        expect(shape.points[2].y).toBe(0);
    });

    it("should back out from a dead end", function () {
        var shape = null,
            word = "abcdefghij",
            moves = [1, 0, 2, 2, 0, 0, 1, 1, 0, 0];

        function random(min, max) {
            return moves.shift();
        }

        shape = Shape.shapeify(word, random);

        expect(shape.points[8].x).toBe(-1);
        expect(shape.points[8].y).toBe(1);
    });

    it("should move it whole self (shape) when its starting position is changed", function () {
        var shape = null,
            word = "abc",
            moves = [1, 2, 0];

        function random(min, max) {
            return moves.shift();
        }

        shape = Shape.shapeify(word, random);

        shape.setPosition(3, 4);

        expect(shape.points[0].x).toBe(3);
        expect(shape.points[0].y).toBe(4);

        expect(shape.points[1].x).toBe(4);
        expect(shape.points[1].y).toBe(4);

        expect(shape.points[2].x).toBe(4);
        expect(shape.points[2].y).toBe(5);
    });

    it("should calculate its own height and width", function () {
        var shape = null;

        shape = Shape.shapeify(word, function () {
            return 0;
        });

        expect(shape.getHeight()).toBe(1);
        expect(shape.getWidth()).toBe(2);

    });

    it("should be able to fit within the bounds of origin (of the canvas cartesian coordinate system)", function () {
        var shape = null;
        shape = Shape.shapeify(word, function () {
            return 2;
        });
        shape.toOrigin();
        expect(shape.points[1].y).toBe(0);
    });
});
