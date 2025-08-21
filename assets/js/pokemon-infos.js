const returnButtoon = document.getElementById('returnButton');
const opacityDiv = document.getElementById('opacityDiv');

function pokemonsInfosOn () {
    pokemonInfos.classList.remove("displayOFF");
    opacityDiv.classList.add("opacityEffect");
}

function pokemonInfosOff () {
    pokemonInfos.classList.add("displayOFF");
    opacityDiv.classList.remove("opacityEffect");
}

function getPokemonId (pokemon) {
    const pokemonInfoSpanId = pokemon.querySelector('.number');
    const pokemonInfoId = pokemonInfoSpanId.innerHTML.replace('#', '');
    return pokemonInfoId;
}






