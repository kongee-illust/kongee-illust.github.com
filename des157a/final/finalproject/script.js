(function() {
    'use strict';
    console.log("reading js");
    // your code starts here


    let scrollProgress = 0;
    let scrollPos = 0;
    // track gallery scroll 
    let gallery = document.getElementById('gallery');
    // need to reset/ sometimes it doesnt start at 0
    // so it doesnt break the scrollMax value
    gallery.scroll(0, 0);

    // first child is used to get the scroll pos of inside the div
    let galleryFirstChild = gallery.children[0];
    // lastRealChild is the last item before the loop
    let firstDummyChild = document.querySelectorAll('.gallery-item')[4];
    let scrollMax = firstDummyChild.getBoundingClientRect().top + 137.5 * 2;
    gallery.addEventListener('scroll', (e) => {
        scrollPos = -galleryFirstChild.getBoundingClientRect().top;
        // constantly update scroll progress
        scrollProgress = Math.abs(scrollPos / scrollMax)

        if (scrollMax < scrollPos) {
            gallery.scroll(0, 0);
        }
    })

    let mainContent = document.querySelector('.main-content')

    function closeAllModals() {
        Array(...gallery.children).forEach(galleryItem => {
            let modalID = galleryItem.dataset.modal;
            let modal = document.getElementById(modalID)
            modal.classList.remove('open')
        })
    }

    // gallery navigation script
    Array(...gallery.children).forEach(galleryItem => {

        let modalID = galleryItem.dataset.modal;
        let modal = document.getElementById(modalID)
        galleryItem.addEventListener('click', () => {
            closeAllModals()
            modal.classList.add('open');
            mainContent.classList.add('open');
        })

        let backButton = modal.querySelector('.back-button')

        // skip dummies so it doesnt addlisteners twice
        if (galleryItem.classList.contains('dummy')) return
        backButton.addEventListener('click', (e) => {
                // if they click on parent close the modal
                closeAllModals()
                mainContent.classList.remove('open');
            })
            // modal.addEventListener('click', (e) => {
            //         // if they click on parent close the modal
            //         e.stopPropagation()
            //         console.log(modalID, modal)
            //         closeAllModals()
            //         modal.classList.add('open');
            //         mainContent.classList.add('open');
            //     })
            // prevent closing when clicking on child
        document.querySelector(`#${modalID} .inner`).addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
        })
    })

    // smooth scrolling
    document.getElementById('up').addEventListener('click', () => {
        scrollPos = gallery.scrollTop - 340
        gallery.scroll({
            top: scrollPos,
            left: 0,
            behavior: 'smooth'
        })
    })
    console.log(gallery)
    document.getElementById('down').addEventListener('click', () => {
        scrollPos = gallery.scrollTop + 340
        gallery.scroll({
            top: scrollPos,
            left: 0,
            behavior: 'smooth'
        });
    })
})();