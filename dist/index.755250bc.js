class Laser {
    constructor(x, y, direction, velocity, boundaries){
        this.x = x;
        this.y = y;
        this.direction = direction;
        if (this.direction === "left") this.velocity = -velocity;
        else this.velocity = velocity;
        this.boundaries = boundaries;
        this.laser_div = document.createElement("div");
        this.laser_div.className = "player_laser";
        this.laser_div.style.left = this.x + "px";
        this.laser_div.style.top = this.y + "px";
        document.getElementById("game_screen").appendChild(this.laser_div);
        let style = getComputedStyle(this.laser_div);
        this.width = parseInt(style.width);
        this.height = parseInt(style.height);
        this.move = this.move.bind(this);
        this.delete = this.delete.bind(this);
    }
    move() {
        this.x += this.velocity;
        if (this.x >= this.boundaries.right) return true;
        if (this.x <= this.boundaries.left) return true;
        this.laser_div.style.left = this.x + "px";
        this.laser_div.style.top = this.y + "px";
        return false;
    }
    delete() {
        this.laser_div.remove();
    }
}

//# sourceMappingURL=index.755250bc.js.map
