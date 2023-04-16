const pokedex = document.getElementById('pokedex');
console.log(pokedex);

/**
 * API call to get original 151 Pokemon
 */
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 151; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));

    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((data) => ({
            name: data.name,
            id: data.id,
            type: data.types.map((type) => type.type.name).join(', '),
            sprite_default: data.sprites.front_default,
            sprite_shiny: data.sprites.front_shiny
        }));
        displayPokemon(pokemon);
    })
    // fetch(url)
    //     .then(res => {
    //         return res.json()
    //     })
    //     .then(data => {
    //         const pokemon = {}
    //         pokemon['name'] = data.name
    //         pokemon['id'] = data.id
    //         pokemon['type'] = data.types.map((type) => type.type.name).join(', ')
    //         pokemon['sprite_default'] = data.sprites.front_default
    //         pokemon['sprite_shiny'] = data.sprites.front_shiny
    //         console.log(pokemon)
    //     })
    // displayPokemon(i);
}

const displayPokemon = (pokemonList) => {
    const outputHTML = pokemonList.map((pokemon) =>
        `
    <li class="card">
        <div class="flip-card">
            <div class="flip-card-front">
                <img class="card-image" src="${pokemon.sprite_default}" />
            </div>
            <div class="flip-card-back">
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle">Type: ${pokemon.type}</p>
            </div>
        </div>
    </li>
    `
    ).join('');
    pokedex.innerHTML = outputHTML;
}

fetchPokemon();



