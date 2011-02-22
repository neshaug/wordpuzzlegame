/*global
window
*/

var neshaug = neshaug || {};

(function () {

    var Utils = {},
        floor = Math.floor,
        random = Math.random,
        screenHeight = 0,
        screenWidth = 0;

    screenHeight = window.innerHeight;
    screenWidth = window.innerWidth;

    Utils.browser = {};
    Utils.browser.screenHeight = screenHeight;
    Utils.browser.screenWidth = screenWidth;

    Utils.random = function (min, max) {
        return floor(random() * (max - min + 1)) + min;
    };

    // export
    neshaug.Utils = Utils;
}());
