const typeColors = { 'grass': 'rgba(102, 247, 10, 0.8)', 'fire': 'rgba(255, 87, 34, 0.8)', 'water': 'rgba(33, 150, 243, 0.8)', 'bug': 'rgba(121, 85, 72, 0.8)', 'normal': 'rgba(158, 158, 158, 0.8)', 'poison': 'rgba(156, 39, 176, 0.8)', 'electric': 'rgba(255, 193, 7, 0.8)', 'ground': 'rgba(188, 170, 164, 0.8)', 'fairy': 'rgba(255, 64, 129, 0.8)', 'fighting': 'rgba(255, 82, 82, 0.8)', 'psychic': 'rgba(255, 64, 129, 0.8)', 'rock': 'rgba(255, 193, 7, 0.8)', 'ghost': 'rgba(96, 108, 139, 0.8)', 'ice': 'rgba(0, 188, 212, 0.8)', 'dragon': 'rgba(83, 109, 254, 0.8)', 'dark': 'rgba(112, 88, 72, 0.8)', 'steel': 'rgba(184, 184, 208, 0.8)' };
const typeColors2 = { 'grass': '#5DAB3A', 'fire': '#FF7F50', 'water': '#4AA6E7', 'bug': '#B78C5D', 'normal': '#7F8C8D', 'poison': '#B36DAB', 'electric': '#FFD700', 'ground': '#D2B48C', 'fairy': '#FF6F81', 'fighting': '#E74C3C', 'psychic': '#FF6F81', 'rock': '#F39C12', 'ghost': '#6C648B', 'ice': '#76D7C4', 'dragon': '#8E44AD', 'dark': '#6F6F6F', 'steel': '#AEB6BF' };
const typeColors3 = { 'grass': '#66F70A', 'fire': '#FF5722', 'water': '#2196F3', 'bug': '#795548', 'normal': '#9E9E9E', 'poison': '#9C27B0', 'electric': '#FFC107', 'ground': '#BCAAA4', 'fairy': '#FF4081', 'fighting': '#FF5252', 'psychic': '#FF4081', 'rock': '#FFC107', 'ghost': '#60708B', 'ice': '#00BCD4', 'dragon': '#536DFE', 'dark': '#705848', 'steel': '#B8B8D0' };

let pokemonsListAsJson;
let numberOfPokemons = 20;
let currentPokemon = 1;

async function init() {
    await loadPokemonSmallCards();
    generateSmallCards(pokemonsListAsJson);
}

async function loadPokemonSmallCards() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemons}&offset=0`;
    let response = await fetch(url);
    pokemonsListAsJson = await response.json();
    
}

function loadMore() {
    numberOfPokemons += 20;
    init();
    if (numberOfPokemons > 1000) {
        document.getElementById('loadMoreButton').style.display = "none";
    }
}

async function openBigCardPage(url, number) {
    document.getElementById('bigCardPage').style.display = '';
    generateBigCard(url, number);
    document.body.style.overflow = 'hidden';
}

function closeBigCardPage() {
    document.getElementById('bigCardPage').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function doNotClose(event) {
    event.stopPropagation();
}

function nextPokemon(url, event, number) {
    let lastSlashIndex = url.lastIndexOf('/');
    let pokemonNumberString = url.slice(lastSlashIndex + 1);
    let currentPokemonNumber = parseInt(pokemonNumberString);
    const lastPokemonNumber = 10277;

    if (currentPokemonNumber !== lastPokemonNumber) {
        let newPokemonNumber = currentPokemonNumber + 1;
        let newUrl = url.substring(0, lastSlashIndex + 1) + newPokemonNumber;
        openBigCardPage(newUrl, number);
    }
    event.stopPropagation();
}

function previousPokemon(url, event, number) {
    let lastSlashIndex = url.lastIndexOf('/');
    let pokemonNumberString = url.slice(lastSlashIndex + 1);
    let currentPokemonNumber = parseInt(pokemonNumberString);
    let firstPokemonNumber = 1;

    if (currentPokemonNumber !== firstPokemonNumber) {
        currentPokemonNumber = (currentPokemonNumber === 1) ? 9 : currentPokemonNumber;
        let newPokemonNumber = currentPokemonNumber - 1;
        let newUrl = url.substring(0, lastSlashIndex + 1) + newPokemonNumber;
        openBigCardPage(newUrl, number);
    }
    event.stopPropagation();
}