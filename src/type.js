import PokeService from "./services/poke-services.js";
import "./style.css";

const pService = new PokeService();
const typeSelect = document.getElementById('pokemon-type');
const enterBtn = document.getElementById('enter-btn');
const params = new URLSearchParams(window.location.search);

function fetchPokemonByType() {
    const type = params.get("type");
    pService.getPokemonByType(type).then(data => render(data));
}

//#region buttons
function goBackToIndex() {
    window.location.href = 'index.html';
}
window.goBackToIndex = goBackToIndex;
//#endregion

//#region populateDropdown
function fetchPokemonTypes() {
  const url = PokeService.BASE_URL + PokeService.TYPE_URL;
  fetch(url)
      .then(response => response.json())
      .then(data => populateDropdown(data))
      .catch(err => console.log(err));
}

function populateDropdown(data) {
  const types = data.results;
  types.forEach(type => {
      const option = document.createElement('option');
      option.value = type.name;
      option.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);  // Capitalize first letter
      typeSelect.appendChild(option);
  });
}

enterBtn.addEventListener('click', () => {
  const selectedType = typeSelect.value;
  if (selectedType) {
      window.location.href = `type.html?type=${selectedType}`;
  } else {
      alert("Please select a Pokémon type.");
  }
});
//#endregion

//#region render
function render(data) {
    const headerText = document.getElementById('type-header');
    headerText.textContent += params.get("type").toUpperCase();
    const dexContainer = document.getElementById('dex-container');
    dexContainer.innerHTML = '';
    for (const pokemon of data) {
        const pokeContainer = document.createElement("div");
        pokeContainer.classList.add("poke-container");
        const pokeImg = document.createElement('img');
        if(pokemon.sprites.front_default===null){
            pokeImg.src = "./assets/favicon.svg";
        } else {
            pokeImg.src = pokemon.sprites.front_default;
        }
        pokeImg.width = '100'
        const pokeLink = document.createElement('a');
        let node = "";
        if (pokemon.name.length >= 12) {
            node = createTextElement('span', pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1, 10) + "...");
        } else {
            node = createTextElement('span', pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1));
        }
        pokeLink.title = pokemon.name;
        pokeLink.appendChild(node);
        pokeContainer.addEventListener('click', () => {
            const pokemonId = pokemon.id || pokemon.url.split('/')[6];
            window.location.href = `detail.html?id=${pokemonId}`;
        });
        pokeContainer.append(pokeImg, pokeLink);
        dexContainer.appendChild(pokeContainer);
    }
}

function createTextElement(elementType, text) {
    const element = document.createElement(elementType);
    const node = document.createTextNode(text);
    element.appendChild(node);
    return element;
}
//#endregion

fetchPokemonByType();
fetchPokemonTypes();