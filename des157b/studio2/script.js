(function() {
    "use strict ";

    let globalData;
    async function getData() {
        const songs = await fetch('./data.json');
        const data = await songs.json();
        globalData = data;
    }
    getData();

    function handleRowItemClick(elem) {
        if (!globalData) return;

        document.querySelector('section.content').classList.add('touched')

        const id = elem.dataset.id;
        const elemData = globalData[id];
        console.log(elemData)
        const imgElem = document.getElementById('image');
        imgElem.src = `./images/big/${id}.svg`
        const titleElem = document.getElementById('title');
        titleElem.innerHTML = elemData.title
        const artistElem = document.getElementById('artist');
        artistElem.innerHTML = elemData.artist
        const genreElem = document.getElementById('genre');
        genreElem.innerHTML = elemData.genre
        const languageElem = document.getElementById('language');
        languageElem.innerHTML = elemData.language
        const playedElem = document.getElementById('played');
        playedElem.innerHTML = elemData['times played this week']

    }
    [...document.querySelectorAll('.row>.item')].forEach(itemElem => {
        itemElem.addEventListener('click', () => handleRowItemClick(itemElem))
    })

})();