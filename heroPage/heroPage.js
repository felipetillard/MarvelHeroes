import {getHeroById, getHeroPicture, isFavouriteHero, toggleFavourite} from '../heroesApi.js';

let heroId;

async function getHero(){
    heroId = document.location.search.replace(/^.*?\=/,'');
    return await getHeroById(heroId); 
}


async function setValues(){
    let hero = await getHero();
    let picUrl = await getHeroPicture(hero.thumbnail.path, 'portrait_xlarge' , hero.thumbnail.extension);
    document.getElementById('heroName').textContent = hero.name;
    document.getElementById('heroDesc').textContent = hero.description;
    document.getElementById('heroImg').src = picUrl;
    
}

function goBack(){
    window.document.location = '../index.html';
}

function refreshImage(){
    let src = (isFavouriteHero(heroId))?'../assets/delete.png':'../assets/add.png';
    document.getElementById("favIcon").src = src;

}


function favClick(){
    toggleFavourite(heroId);
    refreshImage();
}


async function init(){

   setValues();
   document.getElementById('heroName').onclick = () => goBack();
   document.getElementById('favouritesBtn').addEventListener('click', () => favClick());
   refreshImage();

   

}

init();