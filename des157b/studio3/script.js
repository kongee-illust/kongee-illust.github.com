(function() {
    // import Splide from '@splidejs/splide';

    // new Splide('.splide').mount();

    document.addEventListener('DOMContentLoaded', function() {
        var splide = new Splide('.splide', {
            direction: 'ttb',
            height: 'calc(100vh - 80px)',
            wheel: true,
            arrows: false,
        });
        splide.on('moved', function(newIndex, prevIndex, destIndex) {
            document.querySelector('body').classList.toggle('reverseTheme', [1, 2, 3].includes(destIndex))
        });
        splide.mount();
    });

    $('h1', 'p').flowtype({
        minimum: 500,
        maximum: 1366,
        minFont: 14,
        maxFont: 72,
        // fontRatio: 30
    });

    // $('body').flowtype();
})();