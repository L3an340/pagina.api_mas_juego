let pokemonActual = null;
let pokemonAtrapados = [];

async function buscarPokemon() {

    const nombre = document.getElementById("buscador").value;

    if (nombre === "") {
        document.getElementById("informacion").innerHTML = "escribi un pokemon";
        return;
    }

    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
        if (!respuesta.ok) {
            throw new Error("pokemon no encontrado");
        }

        const pokemon = await respuesta.json();

        if (pokemon.id > 151) {
            document.getElementById("informacion").innerHTML =
                "ese no es de la primera gen";
            return;
        }

        pokemonActual = pokemon;

        document.getElementById("informacion").innerHTML = `
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Tipo: ${pokemon.types[0].type.name}</p>
            <p>Altura: ${pokemon.height}</p>
            <p>Peso: ${pokemon.weight}</p>
        `;

        document.getElementById("nombre").textContent = pokemon.name;

        const imagen = document.getElementById("pokemon");

        imagen.classList.remove("se-va");
        imagen.src = pokemon.sprites.front_default;
        imagen.style.display = "block";

        document.getElementById("mensaje").textContent =
            "Aparecio un pokemon. Intenta atraparlo";

    } catch (error) {

        document.getElementById("informacion").innerHTML =
            "no se encontro ese pokemon";
    }
}

function atrapar() {

    if (pokemonActual === null) {
        document.getElementById("mensaje").textContent =
            "primero busca un pokemon";
        return;
    }

    const probabilidad = Math.random();
    if (probabilidad < 0.6) {
        document.getElementById("mensaje").textContent =
            "atrapaste a " + pokemonActual.name + "!";
        pokemonAtrapados.push(pokemonActual);
        mostrarColeccion();
    } else {

        document.getElementById("mensaje").textContent =
            pokemonActual.name + " se escapo!";

        const imagen = document.getElementById("pokemon");

        imagen.classList.add("se-va");
        setTimeout(function() {
            imagen.src = "";
            imagen.style.display = "none";
            imagen.classList.remove("se-va");
        }, 800);

        document.getElementById("nombre").textContent = "";

        pokemonActual = null;
    }
}

function escapar() {

    if (pokemonActual === null) {
        document.getElementById("mensaje").textContent =
            "primero busca un pokemon";
        return;
    }

    document.getElementById("mensaje").textContent =
        "Escapaste del encuentro";

    const imagen = document.getElementById("pokemon");

    imagen.classList.add("se-va");

    setTimeout(function() {
        imagen.src = "";
        imagen.style.display = "none";
        imagen.classList.remove("se-va");
    }, 800);

    document.getElementById("nombre").textContent = "";

    pokemonActual = null;
}

function mostrarColeccion() {

    const coleccion = document.getElementById("coleccion");

    coleccion.innerHTML = "";

    pokemonAtrapados.forEach(function(pokemon) {

        coleccion.innerHTML += `
            <div>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p>${pokemon.name}</p>
            </div>
        `;

    });

    document.getElementById("contador").textContent =
        "Pokemon atrapados: " + pokemonAtrapados.length;
}
