/*global
document
*/

/*jslint
nomen: false
*/
var neshaug = neshaug || {};

(function () {
    var mp, byTag, createEl, append;

    byTag = document.getElementsByTagName;
    createEl = document.createElement;
    append = document.body.appendChild;

    function Menu(browser) {
        this._el = null;
        this._canvas = null;
        this._button = null;
        this._expanded = false;
        this._browser = browser;
        this._render();
        this._shapeView = new neshaug.ShapeView(this._canvas);
    }

    mp = Menu.prototype;

    mp.draw = function (shape) {
        this._shapeView.draw(shape);
    };

    mp._render = function () {
        var that = this;

        this._el = document.createElement("div");
        this._el.style.position = "fixed";
        this._el.style.top = this._browser.screenHeight / 2 - 150;
        this._el.style.left = "10px";

        this._el.innerHTML = "<span><p class=\"css-vertical-text\">shape</p></span><canvas></canvas>";
        this._canvas = this._el.getElementsByTagName("canvas")[0];
        this._canvas.height = 150;
        this._canvas.width = 150;
        this._canvas.style.height = "150px";
        this._canvas.style.width = "150px";
        this._button = this._el.getElementsByTagName("span")[0];
        this._canvas.style.display = "none";

        this._el.onclick = function () {
            that._toggle();
        };

        document.body.appendChild(this._el);
    };

    mp._toggle = function () {

        var btnStyle = this._button.style,
            cvsStyle = this._canvas.style,
            elStyle = this._el.style;

        if (this._expanded) {
            btnStyle.display = "block";
            cvsStyle.display = "none";
            elStyle.height = "20px";
            elStyle.width = "15px";
            this._expanded = false;
        } else {
            btnStyle.display = "none";
            cvsStyle.display = "block";
            elStyle.height = "150px";
            elStyle.width = "150px";
            this._expanded = true;
        }
    };

    mp.hide = function () {
        this._el.style.display = "none";
    };

    mp.show = function () {
        this._el.style.display = "block";
    };

    // export
    neshaug.Menu = Menu;

}());
