let numeroPokemon = 1;

async function mostrarPokemon() {

    const respuesta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`
    );

    const pokemon = await respuesta.json();

    document.getElementById("imagenPokemon").src =
        pokemon.sprites.other["official-artwork"].front_default;

    document.getElementById("nombrePokemon").textContent =
        pokemon.name.toUpperCase();
}

function siguiente() {

    numeroPokemon++;

    if (numeroPokemon > 151) {
        numeroPokemon = 1;
    }

    mostrarPokemon();
}

function anterior() {

    numeroPokemon--;

    if (numeroPokemon < 1) {
        numeroPokemon = 151;
    }

    mostrarPokemon();
}

mostrarPokemon();