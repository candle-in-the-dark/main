const info = JSON.parse(localStorage.getItem('info'));

function Camera(map, width, height, radius) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.maxX = map.cols * map.tsize - width;
    this.maxY = map.rows * map.tsize - height;
}

Camera.prototype.follow = function (sprite) {
    this.following = sprite;
    sprite.screenX = 0;
    sprite.screenY = 0;
};

Camera.prototype.update = function () {
    // make the camera follow the sprite
    this.x = this.following.x - this.width / 2;
    this.y = this.following.y - this.height / 2;

    // clamp values
    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));

    // in map corners, the sprite cannot be placed in the center of the screen
    // and we have to change its screen coordinates

    // left and right sides
    if (this.following.x < this.width / 2 ||
        this.following.x > this.maxX + this.width / 2) {
        this.following.screenX = this.following.x - this.x;
    }
    // top and bottom sides
    if (this.following.y < this.height / 2 ||
        this.following.y > this.maxY + this.height / 2) {
        this.following.screenY = this.following.y - this.y;
    }
};

function Hero(map, x, y) {
    this.map = map;
    this.x = x;
    this.y = y;
    this.width = map.tsize;
    this.height = map.tsize;
    this.complete = false;

    this.image = Loader.getImage('hero');
}

Hero.SPEED = 256; // pixels per second

Hero.prototype.move = function (delta, dirx, diry) {
    // move hero
    this.x += dirx * Hero.SPEED * delta;
    this.y += diry * Hero.SPEED * delta;

    // check if we walked into a non-walkable tile
    this._collide(dirx, diry);

    // clamp values
    var maxX = this.map.cols * this.map.tsize;
    var maxY = this.map.rows * this.map.tsize;
    this.x = Math.max(0, Math.min(this.x, maxX));
    this.y = Math.max(0, Math.min(this.y, maxY));
    var end = this.map.isAtEnd(this.x, this.y)
    if(end && !this.complete){

      let endTime = Math.floor($('#timer').text().split(' ')[2]);
      let newInfo = {'lastMap':parseInt(window.location.search.split('?')[1].split('=')[1]), 'inQuest':info.inQuest, 'questions':info.questions};
      newInfo.mapScore = endTime;
      if (newInfo.inQuest) {
        newInfo.questScore = info.questScore + endTime;
      }
      localStorage.setItem('info', JSON.stringify(newInfo));
      window.location.href = 'dragon.html';
      this.complete = true;
    }
};

Hero.prototype._collide = function (dirx, diry) {
    var row, col;
    // -1 in right and bottom is because image ranges from 0..63
    // and not up to 64
    const collideHeight = this.height - 30;
    const collideWidth = this.width - 30;
    var left = this.x - collideWidth / 2;
    var right = this.x + collideWidth/ 2 - 1;
    var top = this.y - collideHeight / 2;
    var bottom = this.y + collideHeight / 2 - 1;

    // check for collisions on sprite sides
    var collision =
        this.map.isSolidTileAtXY(left, top) ||
        this.map.isSolidTileAtXY(right, top) ||
        this.map.isSolidTileAtXY(right, bottom) ||
        this.map.isSolidTileAtXY(left, bottom);
    if (!collision) { return; }

    if (diry > 0) {
        row = this.map.getRow(bottom);
        this.y = -collideHeight / 2 + this.map.getY(row);
    }
    else if (diry < 0) {
        row = this.map.getRow(top);
        this.y = collideHeight / 2 + this.map.getY(row + 1);
    }
    else if (dirx > 0) {
        col = this.map.getCol(right);
        this.x = -collideWidth / 2 + this.map.getX(col);
    }
    else if (dirx < 0) {
        col = this.map.getCol(left);
        this.x = collideWidth / 2 + this.map.getX(col + 1);
    }
};

Game.load = function () {
    return [
        Loader.loadImage('tiles', 'res/goofin.png'),
        Loader.loadImage('hero', 'res/icon.png')
    ];
};

Game.init = function (map) {
    Keyboard.listenForEvents(
        [Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
    this.tileAtlas = Loader.getImage('tiles');

    let hero_x = map.hero_x;
    let hero_y = map.hero_y;
    this.hero = new Hero(map, hero_x, hero_y);

    this.camera = new Camera(map, 192, 192, 128);
    this.camera.follow(this.hero);
};

Game.update = function (delta) {
    // handle hero movement with arrow keys
    var dirx = 0;
    var diry = 0;
    if (Keyboard.isDown(Keyboard.LEFT)) { dirx = -1; }
    else if (Keyboard.isDown(Keyboard.RIGHT)) { dirx = 1; }
    else if (Keyboard.isDown(Keyboard.UP)) { diry = -1; }
    else if (Keyboard.isDown(Keyboard.DOWN)) { diry = 1; }

    this.hero.move(delta, dirx, diry);
    this.camera.update();
};

Game._drawLayer = function (layer) {
    var startCol = 0;
    var endCol = map.cols;
    var startRow = 0;
    var endRow = map.rows;
    var offsetX = 0;//-this.camera.x + startCol * map.tsize;
    var offsetY = 0;//-this.camera.y + startRow * map.tsize;

    for (var c = startCol; c <= endCol; c++) {
        for (var r = startRow; r <= endRow; r++) {
            var tile = map.getTile(layer, c, r);
            var x = (c - startCol) * map.tsize + offsetX;
            var y = (r - startRow) * map.tsize + offsetY;

            var middleX = c * map.tsize + (map.tsize / 2 )
            var middleY = r * map.tsize + (map.tsize / 2 )

            var a2 = Math.pow(this.hero.x - middleX, 2)
            var b2 = Math.pow(this.hero.y - middleY, 2)


            if (tile !== 0 && Math.sqrt(a2+b2) < this.camera.radius) { // 0 => empty tile
                this.ctx.drawImage(
                    this.tileAtlas, // image
                    (tile - 1) * map.tsize, // source x
                    0, // source y
                    map.tsize, // source width
                    map.tsize, // source height
                    Math.round(x),  // target x
                    Math.round(y), // target y
                    map.tsize, // target width
                    map.tsize // target height
                );
            }
        }
    }


};

Game.render = function () {
    // draw map background layer
    this._drawLayer(0);

    // draw main character
    this.ctx.drawImage(
        this.hero.image,
        this.hero.x - this.hero.width / 2,
        this.hero.y - this.hero.height / 2);

    // draw map top layer
    this._drawLayer(1);

};
