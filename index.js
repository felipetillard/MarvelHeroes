import {getAllHeroes, getAllHeroesFromCache, displayHeroes} from './heroesApi.js';


let heroesList = [];
let displayingHeroes = [];
let page = -5;



function clickHero(id){
    window.document.location = './heroPage/heroPage.html' + '?heroId='+ id;

}

function openFavPage(){
    window.document.location = './favouritesPage/favouritesPage.html';

}

function searchHero(value){
    page = -5;
    displayingHeroes = heroesList.filter((element) => element.name.toLowerCase().includes(value.toLowerCase()));
    nextPage(displayingHeroes);
    
}

function nextPage(){
    page = page + 5;
    if (page >= displayingHeroes.length) {page = 0;}
    let showingHeroes = displayingHeroes.slice(page,page + 5)
    displayHeroes(showingHeroes, clickHero);

    console.log(page);
}

function previousPage(){
    page = page - 5;
    if (page <= 0) {page = 0;}
    let showingHeroes = displayingHeroes.slice(page,page + 5)
    displayHeroes(showingHeroes, clickHero);    
    console.log(page);
}

async function init(){
    let favouritesButton = document.getElementById('favouritesBtn')
    let searchButton = document.getElementById('searchBtn');
    let inputVal = document.getElementById('heroTxt');
    let nextPageBtn = document.getElementById('nextPage');
    let previousPageBtn = document.getElementById('previousPage');

    favouritesButton.addEventListener('click', () => openFavPage());
    searchButton.addEventListener('click', () => {
        searchHero(inputVal.value);
       
      });
    nextPageBtn.addEventListener('click', () => nextPage(heroesList));
    previousPageBtn.addEventListener('click', () => previousPage(heroesList));

    if (sessionStorage.getItem("heroes") === null) {
        await getAllHeroes();
    }
    heroesList = getAllHeroesFromCache("heroes");
    displayingHeroes = heroesList;
    searchHero("");
   
}








init();