let pokemon;

// Get Pokemon data from the API.
async function getPokemon(id) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
    let json = await response.json();
    return json;
}

// Change the Pokemon using its API data.
async function changePokemon(id) {
    document.querySelector("#pokemonInfo").innerHTML = "Loading...";

    let pokemonData = await getPokemon(id);
    let pokemonImage = await loadImage(pokemonData.sprites.front_default);

    let hp = pokemonData.stats[0].base_stat;
    let speed = pokemonData.stats[5].base_stat;

    pokemon = {
        x: 0,
        img: pokemonImage,
        hp: hp,
        speed: speed,
        size: hp * 3
    };

    document.querySelector("#pokemonInfo").innerHTML =
        "Name: " + pokemonData.name +
        " | HP: " + hp +
        " | Speed: " + speed;
}

// Called when a Pokemon button is clicked.
function buttonClicked(e) {
    changePokemon(e.target.innerHTML);
}

// Set up the canvas and buttons.
async function setup() {
    createCanvas(600, 400);

    await changePokemon("pikachu");

    document.querySelector("#pikachuButton").addEventListener("click", buttonClicked);
    document.querySelector("#charmanderButton").addEventListener("click", buttonClicked);
    document.querySelector("#bulbasaurButton").addEventListener("click", buttonClicked);
}

// Draw the Pokemon and move it across the canvas.
function draw() {
    background(240);

    image(
        pokemon.img,
        pokemon.x,
        (height - pokemon.size) / 2,
        pokemon.size,
        pokemon.size
    );

    pokemon.x += pokemon.speed / 30;

    if (pokemon.x > width) {
        pokemon.x = -pokemon.size;
    }
}
