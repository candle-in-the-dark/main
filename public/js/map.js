var map = {
    cols: 12,
    rows: 12,
    tsize: 64,
    layers: [],
    getTile: function (layer, col, row) {
        return this.layers[layer][row * map.cols + col];
    },
    isSolidTileAtXY: function (x, y) {
        var col = Math.floor(x / this.tsize);
        var row = Math.floor(y / this.tsize);

        // tiles 3 and 5 are solid -- the rest are walkable
        // loop through all layers and return TRUE if any tile is solid
        return this.layers.reduce(function (res, layer, index) {
            var tile = this.getTile(index, col, row);
            var isSolid = tile === 3 || tile === 5;
            return res || isSolid;
        }.bind(this), false);
    },
    heroStartPlace: function (x,y){
      let isStart = tile ==7;

    },
    isAtEnd: function (x, y) {
        let col = Math.floor(x / this.tsize);
        let row = Math.floor(y / this.tsize);
        // tile 1 is the end, other tile values can be added later for other tasks/easter eggs
        return this.layers.reduce(function(acc, layer, index) {
          let tile = this.getTile(index, col, row);
          let isEnd = tile === 6;
          return acc || isEnd;
        }.bind(this), false);
    },
    getCol: function (x) {
        return Math.floor(x / this.tsize);
    },
    getRow: function (y) {
        return Math.floor(y / this.tsize);
    },
    getX: function (col) {
        return col * this.tsize;
    },
    getY: function (row) {
        return row * this.tsize;
    }
};
