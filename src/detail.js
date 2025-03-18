import PokeService from "./services/poke-services.js";
import "./detail.css";

const pService = new PokeService();
const typeSelect = document.getElementById('pokemon-type');
const enterBtn = document.getElementById('enter-btn');
const params = new URLSearchParams(window.location.search);
const pokemonId = params.get("id");

function fetchPokemonDetails() {
    pService.getPokemonByNumber(pokemonId).then(data => render(data));
}

//#region buttons
function goBackToIndex() {
    window.location.href = 'index.html';
}
window.goBackToIndex = goBackToIndex;

function previousPoke() {
    const params = new URLSearchParams(window.location.search);
    let pokemonId = parseInt(params.get("id"));
    if (pokemonId > 1) {
        pokemonId -= 1;
    } else {
        pokemonId = 1025;
    }
    params.set("id", pokemonId);
    window.location.search = params.toString();
}
window.previousPoke = previousPoke;

function nextPoke() {
    const params = new URLSearchParams(window.location.search);
    let pokemonId = parseInt(params.get("id"));
    if (pokemonId < 1025) {
        pokemonId += 1;
    } else {
        pokemonId = 1;
    }
    params.set("id", pokemonId);
    window.location.search = params.toString();
}
window.nextPoke = nextPoke;
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
    headerText.textContent += data.name.toUpperCase();
    const detailContainer = document.getElementById('dex-container');
    detailContainer.innerHTML = '';
    if (data) {
        const pokeImg = document.createElement('img');
        pokeImg.src = data.sprites.front_default ? data.sprites.front_default : "./assets/favicon.svg";
        pokeImg.alt = `${data.name} (Normal)`;
        pokeImg.width = 150;
        const pokeShinyImg = document.createElement('img');
        pokeShinyImg.src = data.sprites.front_shiny ? data.sprites.front_shiny : "./assets/favicon.svg";
        pokeShinyImg.alt = `${data.name} (Shiny)`;
        pokeShinyImg.width = 150;
        const nameElement = document.createElement('h1');
        nameElement.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        const types = document.createElement('p');
        types.textContent = "Types: " + data.types.map(type => type.type.name).join(', ');
        const stats = document.createElement('p');
        stats.textContent = "Stats: " + data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ');
        const abilities = document.createElement('p');
        abilities.textContent = "Abilities: " + data.abilities.map(ability => ability.ability.name).join(', ');
        const moves = document.createElement('textarea');
        moves.rows = 5;
        moves.cols = 50;
        moves.value = "Moves: " + data.moves.map(move => move.move.name).join(', ');
        moves.disabled = true;
        detailContainer.appendChild(pokeImg);
        detailContainer.appendChild(pokeShinyImg);
        detailContainer.appendChild(nameElement);
        detailContainer.appendChild(types);
        detailContainer.appendChild(stats);
        detailContainer.appendChild(abilities);
        detailContainer.appendChild(moves);
    } else {
        detailContainer.innerHTML = "<p>Pokémon details not found.</p>";
    }
}
//#endregion

fetchPokemonDetails();
fetchPokemonTypes();