var neshaug = neshaug || {};

neshaug.Board = function () {
    this.rows = 0;
    this.columns = 0;

    // 2d array with tile keys
    this.grid = null;
};

/*
 * Sets a piece (key) at the given row and column position.
 * @method
 * @param {Number} key The tile key
 * @param {Number} row
 * @param {Number} column
*/
neshaug.Board.prototype.setPiece = function (key, row, column) {
    if (row > this.rows || row < 0) {
        throw new Error("row is outside of the board");
    }
    if (column > this.columns || column < 0) {
        throw new Error("column is outside of the board");
    }
    this.grid[row][column] = key;
    key.selected = false;
};

neshaug.Board.prototype.getPiece = function (row, column) {
    if (this.grid.length > row && this.grid[row].length > column) {
        return this.grid[row][column];
    }
};

/*
 * Sets the number of rows and columns the board should contain.
 * @method
 * @param {Number} rows
 * @param {Number} columns
*/
neshaug.Board.prototype.setSize = function (rows, columns) {
    this.rows = rows;
    this.columns = columns;
    var i = 0,
        j = 0;
    this.grid = [];
    for (i = 0; i < rows; i++) {
        this.grid[i] = [];
        for (j = 0; j < columns; j++) {
            this.grid[i][j] = 0;
        }
    }
};
