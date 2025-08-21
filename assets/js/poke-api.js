// Cria um Objeto PokeAPI
const pokeAPI = {}

function convertPokeApiDetailToPokemonBs (pokeDetail) {
    const pokemonBs = new PokemonBaseStats()
    pokemonBs.hp = pokeDetail.stats[0].base_stat
    pokemonBs.attack = pokeDetail.stats[1].base_stat
    pokemonBs.defense = pokeDetail.stats[2].base_stat
    pokemonBs.specialAtk = pokeDetail.stats[3].base_stat
    pokemonBs.specialDef = pokeDetail.stats[4].base_stat
    pokemonBs.speed = pokeDetail.stats[5].base_stat

    return pokemonBs
}

function convertPokeApiDetailToPokemon (pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types =  pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites?.other?.['official-artwork']?.front_default || ''

    return pokemon
}

//Função para fazer requisições do resultado da requisição da função getPokemons
//Esta função faz a requisição baseado nos links retornados da requisição getPokemons
pokeAPI.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
                
}

//Função para fazer a requisição de informações dos pokemons no pokeAPI
//É passado um link com offset e limit e é feito um fetch, deste fetch, tratamos as informações que queremos e
//mapeamos uma lista de novas requisições dos links recebidos da primeira requisição.
//Esperamos a conclusão de todas as requisições com um Promise.all e assim, temos uma lista de novas informações.
pokeAPI.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((PokemonsDetails) => {
            return PokemonsDetails
        })
}

pokeAPI.getPokemon = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    return fetch(url)
        .then((response) => response.json())
        .then(PokemonsDetails => {
            const pokemon = convertPokeApiDetailToPokemon(PokemonsDetails);
            const pokemonBs = convertPokeApiDetailToPokemonBs(PokemonsDetails);
            return [pokemon, pokemonBs]
        })
}