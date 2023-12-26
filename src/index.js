let game_tick = 20;
let gravity = 5;
let player_controls = {up:"w", down:"s", right:"d", left:'a', shoot: "f"};
let boundaries = {right: 1090, left: 378, top: 0, bottom:580};
let player_div = document.getElementById("player");
const fuel_gen_cutoff = 1;
const max_rand_val = 1000;


let player_params = {
    x: boundaries.left,
    y: boundaries.top,
    gravity: gravity,
    game_tick: game_tick,
    controls: player_controls,
    boundaries: boundaries,
    left_right: 10,
    jet: 15,
    div: player_div,
    laser_velocity: 10,
    direction:"right",
    laser_sound_effect: "../assets/laser/laser_sound.mp3"
}

let player = new Player(player_params);
let fuels = [];


let fuel_generator = () => {
    let rand_val = Math.floor(Math.random() * max_rand_val);
    if(rand_val <= fuel_gen_cutoff) {
        let x = Math.floor(Math.random() * boundaries.right);
        while(x <= boundaries.left) {
            x = Math.floor(Math.random() * boundaries.right);
        }
        let y = boundaries.top;
        fuels.push(new Fuel(x,y,gravity,boundaries));
    }
}
const delete_arr_entity = (arr, entity) => {
    arr.splice(arr.indexOf(entity), 1);
    entity.delete();
};

const move_arr = (arr) => {
    arr.forEach((val) => {
        if(val.move()) {
            delete_arr_entity(arr, val);
        }
    })
}

const rect_collision_check = (rect1, rect2) => {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

const arr_collision_check = (arr1, arr2) => {
    arr1.forEach((entity_1) => {
        arr2.forEach((entity_2) => {
            let collided = rect_collision_check(entity_1, entity_2);
            if(collided) {
                delete_arr_entity(arr1, entity_1);
                delete_arr_entity(arr2, entity_2);
            }
        })
    })
}

//Main engine:
setInterval(
    ()=> {
        player.move(player_div);
        move_arr(player.lasers);
        fuel_generator();
        move_arr(fuels);
        arr_collision_check(player.lasers, fuels);
    }, game_tick
);
