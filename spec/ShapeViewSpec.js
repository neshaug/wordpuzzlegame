/*global
describe, it, beforeEach, expect, neshaug, jasmine
*/

describe("ShapeView", function () {
    var shape, shapeView, canvas, context;

    beforeEach(function () {
        shape = new neshaug.Shape.shapeify("lo", function () {
            return 1;
        });

        canvas = jasmine.createSpyObj("canvas", ["getContext"]);
        canvas.height = 100;
        canvas.width = 100;

        context = jasmine.createSpyObj("context", ["save", "strokeRect", "fillRect", "restore"]);
        canvas.getContext.andReturn(context);

        shapeView = new neshaug.ShapeView(canvas);
    });

    it("should draw a shape to a canvas", function () {
        shapeView.draw(shape);
        
        expect(canvas.getContext).toHaveBeenCalledWith("2d");
        expect(context.save.argsForCall.length).toBe(1);

        expect(context.strokeRect.argsForCall.length).toBe(2);
        expect(context.fillRect.argsForCall.length).toBe(3);

        // make the surface white
        expect(context.fillRect.argsForCall[0]).toEqual([0, 0, 100, 100]);

        expect(context.strokeRect.argsForCall[0]).toEqual([0, 0, 50, 50]);
        expect(context.fillRect.argsForCall[1]).toEqual([0, 0, 50, 50]);

        expect(context.strokeRect.argsForCall[1]).toEqual([50, 0, 50, 50]);
        expect(context.fillRect.argsForCall[2]).toEqual([50, 0, 50, 50]);

        expect(context.restore.argsForCall.length).toBe(1);
    });
});
