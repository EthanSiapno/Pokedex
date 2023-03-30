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

const displayPokemon = (poke) => {
    const outputHTML = poke.map((pokemon) =>
        `
    <li>
        <img src="${pokemon.sprite_default}" />
        <h2>${pokemon.id}. ${pokemon.name}</h2>
        <p>Type: ${pokemon.type}</p>
    </li>
    `
    ).join('');
    pokedex.innerHTML = outputHTML;
}

fetchPokemon();