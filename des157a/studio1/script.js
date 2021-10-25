(function() {
    "use strict";
    console.log("reading js");

    var myForm = document.querySelector("#myForm");
    var madLib = document.querySelector("#madLib");
    let myText;

    myForm.addEventListener("submit", function(e) {
        e.preventDefault();
        var noun1 = document.querySelector("#noun1").value;
        var noun2 = document.querySelector('#noun2').value;
        var adjective = document.querySelector('#adjective').value;
        var verb = document.querySelector('#verb').value;

        if (noun1 && noun2 && adjective && verb) {
            myText = `Here are the words: ${noun1}, ${noun2}, ${adjective}, ${verb}`;
        } else {
            "Please complete the form so I can process your Mad Lib!"
        }

        var formData = document.querySelectorAll("input[type=text]");
        for (var eachField of formData) {
            eachField.value = "";
        }
        madLib.innerHTML = myText;
    })

})();