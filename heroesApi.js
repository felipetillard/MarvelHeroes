const url = 'http://gateway.marvel.com/v1/public/characters';
const pass = '?ts=1&apikey=47b5d8e9047e1114574041131b68fc9d&hash=8fc26cf99eb5b32db3c4fb57c56037ac';

async function getAllHeroes() {
        const jsonHeroes = await (await fetch(url + pass)).json();
        saveInCache(jsonHeroes.data.results, "heroes");     
}

function saveInCache(jsonHeroes, location){
        const jsonHeroes_serialized = JSON.stringify(jsonHeroes);
        sessionStorage.setItem(location, jsonHeroes_serialized);
}

function getAllHeroesFromCache(location){
        return JSON.parse(sessionStorage.getItem(location));
}


async function getHeroById(heroId){
        const hero = getAllHeroesFromCache("heroes").find(hero => hero.id == heroId);
        return hero;
}

async function getHeroPicture(url, size, ext){
        console.log(url + '/' + size + '.' + ext);
        return url + '/' + size + '.' + ext;

}


function getFavouriteHeroes(){
        let favHeroesId = getAllHeroesFromCache("favHeroes");
        let allHeroes = getAllHeroesFromCache("heroes");
        return allHeroes.filter((hero) => favHeroesId.includes(hero.id.toString()));

}

function toggleFavourite(heroId){
        let heroes = getAllHeroesFromCache("favHeroes");
        if (heroes == null) {
                heroes = [heroId];
        }else{
                let index = heroes.findIndex(id => id == heroId);
                if (index < 0) {
                        heroes.push(heroId);
                }else{
                        heroes.splice(index,1);
                }
        }
        
        saveInCache(heroes, "favHeroes");
        console.log(heroes);
}


function isFavouriteHero(heroId){

        let heroes = getAllHeroesFromCache("favHeroes");
        if (heroes == null) { return false; }
        let index = heroes.findIndex(id => id == heroId);
        return index >= 0;
}



async function displayHeroes(heroesList, clickHero){
        let html = "";
        heroesList.forEach(element => {
            html += createHeroItem(element.name, element.id);      
        });
    
        document.getElementById('list').innerHTML = html;
        
        heroesList.forEach(element => {
            document.getElementById('' + element.id).addEventListener('click', () => clickHero(element.id));      
        });
      
    }


function createHeroItem(heroName, id){

        let hero = 
    `        <div class="card" id="${id}" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title display-6">${heroName}</h5>
                </div>
            </div>    
            <br>
    `
        return hero;
    
    }

export {getAllHeroes, getHeroById, getHeroPicture, getAllHeroesFromCache, getFavouriteHeroes, toggleFavourite, isFavouriteHero, displayHeroes};





