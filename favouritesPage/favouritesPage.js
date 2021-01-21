import {displayHeroes, getFavouriteHeroes} from '../heroesApi.js'



function goBack(){
    window.document.location = '../index.html';
}

function clickHero(id){
    window.document.location = '../heroPage/heroPage.html' + '?heroId='+ id;
}

function init(){

    document.getElementById('favTitle').addEventListener('click', () => goBack())
    console.log(getFavouriteHeroes());
    displayHeroes(getFavouriteHeroes(), clickHero);

}



init();