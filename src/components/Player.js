class Player {
    constructor(params) {
        this.x = params.x;
        this.y = params.y;
        this.div = params.div;
        this.jet = params.jet;
        this.laser_velocity = params.laser_velocity;
        this.direction = params.direction;
        this.just_shot = false;
        this.jet_acceleration = 0;
        this.x_increment = params.left_right;
        this.x_velocity = 0;
        this.y_velocity = 0;
        this.boundaries = params.boundaries;
        this.laser_audio = new Audio(params.laser_sound_effect);
        this.gravity = params.gravity;
        this.game_tick = params.game_tick;
        this.controls = params.controls;
        this.lasers = [];

        this.handle_keydown = this.handle_keydown.bind(this);
        this.handle_keyup = this.handle_keyup.bind(this);
        this.move = this.move.bind(this);
        this.create_laser = this.create_laser.bind(this);

        

        document.addEventListener("keydown", this.handle_keydown);
        document.addEventListener("keyup", this.handle_keyup);
    }

    handle_keydown(e) {
        let key = e.key.toLowerCase();
        if(key === this.controls.right) {
            this.x_velocity = this.x_increment;            
            this.direction = "right";
            let player = document.getElementById("player");
            player.classList.remove("player_left");
            player.classList.add("player_right");

        }
        if(key === this.controls.left) {
            this.x_velocity = -this.x_increment;
            this.direction = "left";
            let player = document.getElementById("player");
            player.classList.remove("player_right");
            player.classList.add("player_left");
        }
        if(key === this.controls.up) {
            this.jet_acceleration = this.jet;
        }
        if(key === this.controls.down) {
            this.jet_acceleration = -this.jet;
        }
        if(key === this.controls.shoot) {
            this.just_shot = true;
            this.create_laser();
        }
    }

    create_laser() {
        this.lasers.push(new Laser(this.x, this.y, this.direction, this.laser_velocity, this.boundaries, this.laser_sound_effect));
        

        this.laser_audio.play();
    }

    handle_keyup(e) {
        let key = e.key.toLowerCase();
        if(key === this.controls.left) {
            this.x_velocity = 0;
        }
        if(key === this.controls.right) {
            this.x_velocity = 0;
        }
        if(key === this.controls.up || key == this.controls.down) {
            this.jet_acceleration = 0;
        }
    }
   
    move(player) {
        this.x += this.x_velocity;
        if(this.x <= this.boundaries.left) {
            this.x = this.boundaries.left;
        }
        if(this.x >= this.boundaries.right) {
            this.x = this.boundaries.right;
        }

        player.style.left = this.x + "px";

        this.y_velocity = (gravity-this.jet_acceleration) * (game_tick/1000) + this.y_velocity;
        this.y += this.y_velocity;

        if(this.y >= this.boundaries.bottom) {
            this.y = this.boundaries.bottom;
            this.y_velocity = 0;
        }

        if(this.y <= this.boundaries.top) {
            this.y = this.boundaries.top;
            this.y_velocity = 0;
        }
        player.style.top = this.y + "px";
    }
}