let creature;

class Creature {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}

async function setup() {
    console.log("p5 called this a function");

    createCanvas(600, 400);
    creature = new Creature(100, 100, 5);
}

function draw() {
    background(0, 0, 0);
    fill(255, 0, 0);
    stroke(255, 255, 255);
    strokeWeight(5);

    ellipse(creature.x, creature.y, creature.radius);
}

async function getPokemon(id) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
    let json = await response.json();
    return json;
}