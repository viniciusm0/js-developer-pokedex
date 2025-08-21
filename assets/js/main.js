const pokemonOl = document.getElementById('pokemonList');
const pokemonInfos = document.getElementById('pokemonInfos');
const loadMoreButton = document.getElementById('loadMoreButton');
let limit = 5;
let offset = 0;

const maxRecords = 386;

function loadPokemonItens(offset, limit) {
    pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `).join('')
        pokemonOl.innerHTML += newHtml
    });
}

function calcStatsValue (pokemonBs) {
    const maxStats = 160;
    const witdhMax = 100;
    result = []
    const stats = Object.values(pokemonBs)
    const results = stats.map(status => {
       return result.push = (witdhMax * status) / maxStats
    })
    return results
}

function changeWidthProgressBar (pokemonBs) {
    //O retorno dos valores das progress bars esta na mesma ordem do json progressBarsStats
    const progressBarsValues = calcStatsValue(pokemonBs)
    const progressBarsStats = {
        "hp": document.querySelector('.hp'),
        "atk": document.querySelector('.atk'),
        "def": document.querySelector('.def'),
        "sAtk": document.querySelector('.sAtk'),
        "sDef": document.querySelector('.sDef'),
        "spe": document.querySelector('.spe'),
    }
    
    progressBarsStats.hp.style.width = `${progressBarsValues[0]}%`
    progressBarsStats.atk.style.width = `${progressBarsValues[1]}%`
    progressBarsStats.def.style.width = `${progressBarsValues[2]}%`
    progressBarsStats.sAtk.style.width = `${progressBarsValues[3]}%`
    progressBarsStats.sDef.style.width = `${progressBarsValues[4]}%`
    progressBarsStats.spe.style.width = `${progressBarsValues[5]}%`
} 

function loadPokemonInfos (id) {
    pokeAPI.getPokemon(id).then((pokemon = []) => {
        const newHtml = `
            <div class="infoContainer ${pokemon[0].type}">
                <i id="returnButton" class="bi bi-arrow-left"></i>
                <div class="infoHeader">    
                    <span class="infoName">${pokemon[0].name}</span>
                    <ol class="infoTypes">
                        ${pokemon[0].types.map((type) => `<li class="infoType ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
                <span class="infoNumber">#${pokemon[0].number}</span>
                <img src="${pokemon[0].photo}" alt="${pokemon[0].name}">
            </div>
            <div class="infoAbout">
                <span class="infoBaseStats">Base Stats</span>
                <div class="stats">
                    <span class="infoStats">HP</span>
                    <div class="progressBar">
                        <div class="progress hp green">${pokemon[1].hp}</div>
                    </div>
                </div>
                <div class="stats">
                    <span class="infoStats">Attack</span>
                    <div class="progressBar">
                        <div class="progress atk red">${pokemon[1].attack}</div>
                    </div>
                </div>
                <div class="stats">
                    <span class="infoStats">Defense</span>
                    <div class="progressBar">
                        <div class="progress def green">${pokemon[1].defense}</div>
                    </div>
                </div>
                <div class="stats">
                    <span class="infoStats">Special-Atk</span>
                    <div class="progressBar">
                        <div class="progress sAtk red">${pokemon[1].specialAtk}</div>
                    </div>
                </div>
                <div class="stats">
                    <span class="infoStats">Special-Def</span>
                    <div class="progressBar">
                        <div class="progress sDef green">${pokemon[1].specialDef}</div>
                    </div>
                </div>
                <div class="stats">
                    <span class="infoStats">Speed</span>
                    <div class="progressBar">
                        <div class="progress spe red">${pokemon[1].speed}</div>
                    </div>
                </div>
            </div>
            `
        pokemonInfos.innerHTML = newHtml;
        changeWidthProgressBar(pokemon[1]);
    });
}

loadPokemonItens(offset, limit = 5);

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit);
        
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
    
});

pokemonInfos.addEventListener('click', (eventClick) => {
    const clicked = eventClick.target.closest('#returnButton')
    if(!clicked) return;
    pokemonInfosOff();
})

pokemonOl.addEventListener('click', (eventClick) => {
    const clicked = eventClick.target.closest('.pokemon');
    if (!clicked) return;
    const id = getPokemonId(clicked)
    loadPokemonInfos(id);
    pokemonsInfosOn();
});







