export default class PokeService {
    static BASE_URL = "https://pokeapi.co/api/v2/";
    static POKE_URL = "pokemon/"
    static TYPE_URL = "type/"
    constructor(limit=50, offset=0){
        this.limit=limit,
        this.offset=offset
    }

    getPokemonData(){
        const url = PokeService.BASE_URL+PokeService.POKE_URL + `/?offset=${this.offset}&limit=${this.limit}"`;
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                const requests = [];
                for (const pokemonInfo of data.results) {
                    const pokemonUrl = pokemonInfo.url;
                    const request = fetch(pokemonUrl)
                        .then(response => response.json())
                        .then(data => data)
                        .catch(err => console.log(err))
                    requests.push(request);
                }
                return Promise.all(requests);               
            })
            .catch(err => console.log(err))       
    }

    nextPage(){
        if(this.offset+this.limit > 1300){
            this.offset = 0;
        } else {
            this.offset += this.limit;
        }
        this.getPokemonData();
    }

    previousPage(){
        if(this.offset-this.limit < 0){
            this.offset = 1300;
        } else {
            this.offset -= this.limit;
        }
        this.getPokemonData();
    }

    getPokemonByType(type){
        const url = PokeService.BASE_URL+PokeService.TYPE_URL + type;
        return fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => err)
    }
}
