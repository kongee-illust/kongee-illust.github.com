(function() {
    "use strict";
    console.log("reading js");
    const menu = $('#menu')
    console.log(menu)
    $('.menu-button').click(() => {
        menu[0].classList.toggle('open')
            // console.log(123)
    })

    Window.alert('i hate you, please leave')
})();