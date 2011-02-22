/*jslint
nomen: false, plusplus: false
*/

/*global
    document, neshaug, Image
*/

(function () {
    var browser = neshaug.Utils.browser,
        Utils = neshaug.Utils,
        size = 0,
        canvas = null,
        container = null,
        letterPainter = null,
        bgImage = null;

    size = browser.screenHeight < browser.screenWidth ? browser.screenHeight : browser.screenWidth;
    size = size * 0.90;
    
    // main canvas (board canvas)
    canvas = document.createElement("canvas");
    canvas.height = size;
    canvas.width = size;
    canvas.style.position = "fixed";

    document.body.appendChild(canvas);
    canvas.className = "rounded";
    canvas.style.left = (browser.screenWidth - canvas.offsetWidth) / 2;
    canvas.style.top = (browser.screenHeight - canvas.offsetHeight) / 2;

    letterPainter = new neshaug.LetterPainter();

    function onReady(letters) {
        var game = null,
            menu = null,
            gameDialog;

        function start(numWords) {
            var i = 0,
                words = [];

            for (i = 0; i < numWords; i++) {
                words.push(neshaug.words[Utils.random(0, neshaug.words.length - 1)]);
            }

            game = new neshaug.Game(canvas, menu, letters, words);
            game.onComplete(function () {
                gameDialog.setText("Great, you finished the game! It is fully randomized, so have another go!");
                gameDialog.show();
                menu.hide();
            });

            // start your engines!
            game.start();
        }

        menu = new neshaug.Menu(neshaug.Utils.browser);
        menu.hide();

        gameDialog = new neshaug.GameDialog(canvas);
        gameDialog.show();
        gameDialog.onPlay(function (wordLengthLimit) {
            gameDialog.hide();
            menu.show();
            start(5);
        });


    }

    // when all letters are drawn and loaded the callback is called
    letterPainter.getLetters(onReady);
}());
