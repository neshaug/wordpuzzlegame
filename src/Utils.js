var neshaug = neshaug || {};

(function () {

    var Utils = {},
        floor = Math.floor,
        random = Math.random;

    Utils.random = function (min, max) {
        return floor(random() * (max - min + 1)) + min;
    };

    // export
    neshaug.Utils = Utils;
}());
