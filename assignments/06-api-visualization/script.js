let pokemon;

// Get Pokemon data from the API.
async function getPokemon(id) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
    let json = await response.json();
    return json;
}


// Set up the canvas and buttons.

async function setup() {
    createCanvas(600, 400);

    let id = 1;
    let pokemonData = await getPokemon(id);
    let pokemonImage = await loadImage(pokemonData.sprites.front_default);

    pokemon = {
        x: 100,
        y: 200,
        img: pokemonImage,
        id: id,
        hp: pokemonData.stats[0].base_stat,
        speed: pokemonData.stats[5].base_stat
    };
}


// Draw and move the Pokemon.
function draw() {
    background(240);

    fill(200);
    noStroke();
    ellipse(pokemon.x, height / 2, pokemon.hp * 3);

    image(pokemon.img, pokemon.x, height / 2);

    pokemon.x += pokemon.speed / 30;

    if (pokemon.x > width) {
        pokemon.x = 0;
    }
}
