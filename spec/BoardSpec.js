/*global
describe, it, expect, beforeEach, neshaug
*/

/*jslint
plusplus:false
*/

describe("Board", function () {
    var board;

    beforeEach(function () {
        board = new neshaug.Board();
    });

    it("should set its size correct", function () {
        var grid = board.getGrid(),
            i = 0,
            j = 0;
        expect(grid.length).toBe(1);
        expect(grid[0].length).toBe(0);

        board.setSize(10, 10);
        grid = board.getGrid();
        expect(grid.length).toBe(10);
        for (i = 0; i < grid.length; i++) {
            expect(grid[i].length).toBe(10);
        }
    });

    it("should be able to have a piece set at a given row and column position", function () {
        board.setSize(10, 10);
        board.setPiece("h", 5, 5);
        expect(board.getPiece(5, 5)).toEqual("h");
    });

});
