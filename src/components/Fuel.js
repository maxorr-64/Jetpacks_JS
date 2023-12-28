class Fuel {
    constructor(x, y, vel_increment, boundaries) {
        this.x = x;
        this.y = y;
        this.velocity = 0;
        this.vel_increment = vel_increment;
        this.boundaries = boundaries;
        let screen = document.getElementById("game_screen");
        this.fuel_div = document.createElement("div");
        this.fuel_div.className = "fuel";
        this.fuel_div.style.left = this.x + "px";
        this.fuel_div.style.top = this.y + "px";
        
        screen.appendChild(this.fuel_div);
        let style = getComputedStyle(this.fuel_div);
        this.width = parseInt(style.width);
        this.height = parseInt(style.height);

        this.move = this.move.bind(this);
        this.delete = this.delete.bind(this);
        
    }

    move() {
        this.y += this.vel_increment;

        if(this.y >= this.boundaries.bottom) {
            this.y = this.boundaries.bottom + "px";
            this.velocity = 0;
            return true;
        }
        if(this.y <= 0) {
            this.y = this.boundaries.top + "px";
            this.velocity = 0;
            return true;
        }

        this.fuel_div.style.top = this.y + "px";
        this.fuel_div.style.left = this.x + "px";
        return false;
    }

    collision(entity) {

    }

    delete() {
        this.fuel_div.remove();
    }
}