/*global
describe, it, beforeEach, neshaug, expect
*/

describe("Utils", function () {
    var Utils;

    beforeEach(function () {
        Utils = neshaug.Utils;
    });

    it("should calculate a random number between a min and max limit", function () {
        var rand = Utils.random(1, 1);
        expect(rand).toBe(1);
        rand = Utils.random(0, 1);
        expect(rand).toBeLessThan(2);
        expect(rand).toBeGreaterThan(-1);
    });

    it("should figure out the screen size", function () {
        expect(Utils.browser.screenHeight).toBeGreaterThan(0);
        expect(Utils.browser.screenWidth).toBeGreaterThan(0);
    });
});
