// Small Card Functions

function generateSmallCards(pokemonsListAsJson) {
    document.getElementById('allPokemons').innerHTML = '';
    for (let i = 0; i < pokemonsListAsJson['results'].length; i++) {
        const pokemonName = pokemonsListAsJson['results'][i]['name'];
        const pokemonNameCapitalized = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${currentPokemon + i}`

        document.getElementById('allPokemons').innerHTML += `
            <div onclick="openBigCardPage('${pokemonUrl}', ${i + 1})" id="pokemonSmallCard${i}" class="pokemonSmallCard">
                <div class="pokemonSmallCardUpperContainer">
                    <div class="pokemonSmallCardName">${pokemonNameCapitalized}</div>
                    <div class="pokemonSmallCardNumber"> # ${i + 1}</div>
                </div>
                <div class="pokemonSmallCardInfo">
                    <div id="pokemonSmallCardTypes${i}"></div>
                    <img class="pokemonSmallCardImage" id="pokemonSmallCardImage${i}">
                </div>
            </div>
    `;
        loadImage(pokemonsListAsJson['results'][i]['url'], i);
        loadTypes(pokemonsListAsJson['results'][i]['url'], i);
    }
}

async function loadImage(url, i) {
    let response = await fetch(url);
    let pokemonImage = await response.json();
    let pokemonImgFront = pokemonImage['sprites']['other']['home']['front_default'];
    document.getElementById(`pokemonSmallCardImage${i}`).src = pokemonImgFront;
}

async function loadTypes(url, i) {
    let response = await fetch(url); // downloads the array as text
    let pokemonTypes = await response.json(); // writes text as array
    renderTypesSmallCard(pokemonTypes, i);
    changeSmallCardColor(pokemonTypes['types'][0]['type']['name'], i);
}

function renderTypesSmallCard(pokemonTypes, i) {
    for (let j = 0; j < pokemonTypes['types'].length; j++) { //
        const type = pokemonTypes['types'][j]['type']['name'];

        document.getElementById(`pokemonSmallCardTypes${i}`).innerHTML += `
            <div class="pokemonSmallCardTypes">${type}</div>
        `;
    }
}

function changeSmallCardColor(type, i) {
    const smallCard = document.getElementById(`pokemonSmallCard${i}`);
    const smallCardTypesContainer = document.getElementById(`pokemonSmallCardTypes${i}`);
    const allTypeElements = smallCardTypesContainer.querySelectorAll('div');

    if (type in typeColors) {
        smallCard.style.backgroundColor = typeColors[type];
        for (let j = 0; j < allTypeElements.length; j++) {
            const typeElement = allTypeElements[j];
            typeElement.style.backgroundColor = typeColors2[type];
        }
    }
}

// Big card functions

async function generateBigCard(url, number) {
    let response = await fetch(url);
    let pokemonInfos = await response.json();
    let pokemonImage = pokemonInfos['sprites']['other']['home']['front_default'];
    let pokemonName = pokemonInfos['name'];
    let pokemonNameCapitalized = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

    renderHtmlBigCards(url, pokemonNameCapitalized, pokemonImage, number);
    renderTypesBigCard(pokemonInfos);
    renderChart(pokemonInfos);
}

function renderHtmlBigCards(url, pokemonNameCapitalized, pokemonImage, number) {
    document.getElementById('bigCardPage').innerHTML = `
        <div class="bigCardContainer" onclick="doNotClose(event)">
            <div id="bigCardUpper" class="bigCardUpper">
                <div class="bigCardNameAndIdContainer">
                    <h2 class="bigCardName">${pokemonNameCapitalized}</h2>
                    <div class="pokemonBigCardNumber"> # ${number}</div>
                </div>
                <div class="bigCardTypesContainer" id="bigCardTypesContainer"></div>
                <div class="imgContainer">
                    <div onclick="previousPokemon('${url}', event, ${number - 1})" class="arrow left">&lt;</div>
                    <img class="bigCardImg" src='${pokemonImage}'>
                    <div onclick="nextPokemon('${url}', event, ${number + 1})" class="arrow right">&gt;</div>        
                </div>
            </div>
            <div class="bigCardLower">    
            <h3 class="bigCardLowerTitle">Pokemon Stats</h3> 
                <div class="chartContainer">                
                    <canvas id="myChart"></canvas>
                </div>
            </div>
        </div>
    `
}

function renderTypesBigCard(pokemonInfos) {
    for (let j = 0; j < pokemonInfos['types'].length; j++) {
        const type = pokemonInfos['types'][j]['type']['name'];
        const firstType = pokemonInfos['types'][0]['type']['name'];

        document.getElementById('bigCardTypesContainer').innerHTML += `
        <div class="pokemonBigCardTypes">${type}</div>
        `;
        changeBigCardColor(firstType);
    }
}

function changeBigCardColor(type) {
    const bigCardUpper = document.getElementById('bigCardUpper');
    const bigCardTypesContainer = document.getElementById('bigCardTypesContainer');
    const allTypeElements = bigCardTypesContainer.querySelectorAll('div');

    if (type in typeColors) {
        bigCardUpper.style.backgroundColor = typeColors3[type];
        for (let j = 0; j < allTypeElements.length; j++) {
            const typeElement = allTypeElements[j];
            typeElement.style.backgroundColor = typeColors2[type];
        }
    }

}










