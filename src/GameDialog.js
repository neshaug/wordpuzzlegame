/*jslint
nomen: false
*/

/*global
document
*/

var neshaug = neshaug || {};

(function () {

    var STATE_SHOWN = 1,
        STATE_HIDDEN = 2,
        STATE_DEFAULT = 0,
        template = "";

    template = "" + "<div class=\"text\"></div>" + "<div class=\"button\">START</div>";

    /**
     * Simple dialog that fits the board canvas
     */

    function GameDialog(canvas) {
        this._canvas = canvas;

        var elements = this._getElements();
        this._el = elements.el;
        this._button = elements.button;
        this._text = elements.text;
        
        this._text.innerHTML = "Some famous Friends are hidden in this simple word puzzle game." +
            "They can twist and turn! Click on \"shape\" to make it easier."

        this._state = STATE_DEFAULT;
    }

    GameDialog.prototype.constructor = GameDialog;

    GameDialog.prototype._getElements = function () {
        var el = document.createElement("div"),
            button = null,
            text = null;

        el.className = "rounded dialog";
        el.style.height = this._canvas.height + "px";
        el.style.width = this._canvas.width + "px";
        el.style.top = this._canvas.style.top;
        el.style.left = this._canvas.style.left;

        document.body.appendChild(el);
        el.innerHTML = template;

        button = el.getElementsByClassName("button")[0];
        text = el.getElementsByClassName("text")[0];

        return {
            el: el,
            button: button,
            text: text
        };
    };

    GameDialog.prototype.show = function () {
        this._el.style.display = "block";
        this._canvas.style.display = "none";
        this._state = STATE_SHOWN;
    };

    GameDialog.prototype.hide = function () {
        this._el.style.display = "none";
        this._canvas.style.display = "block";
        this._state = STATE_HIDDEN;
    };

    GameDialog.prototype.onPlay = function (onPlay) {
        this._button.onclick = onPlay;
    };

    GameDialog.prototype.setText = function (text) {
        this._text.innerHTML = text;
    };

    neshaug.GameDialog = GameDialog;
}());
