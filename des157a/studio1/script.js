(function() {
    'use strict';

    //The madlibs is dynamically generated from a simple array of labels.
    // The actual inputs themselves are not important
    // because later the inputs are used in order
    // which correlate to funSentence #'s which get replaced
    let wordTypes = ['Adjective 1','City','Animal 1','Clothing Item','Vegetable','Animal 2','Adjective 2','Past Tense Verb','Adjective 3','Noun'];
    let wordTypeWrapper = document.getElementById('word-type-wrapper');
    let formInputWrapper = document.getElementById('input-wrapper');
    wordTypes.forEach(wordType => {
        let newLabel = document.createElement('label');
        newLabel.innerText = wordType;
        wordTypeWrapper.appendChild(newLabel);
        let newInput = document.createElement('input');
        formInputWrapper.appendChild( newInput );
    })

    // edge case: clicking on the child of the overlay would close the overlay
    // so stopPropagation prevents that
    let overlayContent = document.querySelector("#overlay .content");
    overlayContent.addEventListener('click',(event)=>{
        event.stopPropagation();
    })
    
    //clicking help button, dark overlay background and soundsgood button all toggle the overlay
    let helpButton = document.getElementById("helpButton");
    helpButton.addEventListener('click', ()=>{
        overlayElem.classList.toggle("open");
    })
    let overlayElem = document.getElementById("overlay");
    overlayElem.addEventListener('click',()=>{
        overlayElem.classList.toggle("open");
    })
    let soundsGoodButton = document.querySelector("#overlay .content button");
    soundsGoodButton.addEventListener('click',()=>{
        overlayElem.classList.toggle("open");
    })

    let startOverButton = document.getElementById('back');
    let startOverButton2 = document.getElementById('startOver');
    // turns node list into normal array so i can use "every" function later
    let formInputs = Array(...document.querySelectorAll('#input-wrapper > *'));
    startOverButton.addEventListener('click',(e)=>{
        // preventdefault prevents the page from refreshing
        e.preventDefault();
        // replace all form values to empty string
        formInputs.forEach(form => {
            form.value = "";
        });
    })
    // this start over button is from the result page
    startOverButton2.addEventListener('click',(e)=>{
        e.preventDefault();
        // deletes all values from the form
        formInputs.forEach(form => {
            form.value = "";
        });
        // shows form and hides results
        resultElem.classList.toggle('hidden');
        formElem.classList.toggle('hidden');
    })

    // all the elems needed for form submit action
    let incNotice = document.getElementById("incomplete-notice");
    let submitButton = document.getElementById('next');
    let resultContent = document.querySelector('#result .content');
    let resultElem = document.getElementById('result');
    let formElem = document.getElementById('myForm');

    submitButton.addEventListener('click',(e)=>{
        // need to prevent default because buttons refresh the page
        e.preventDefault();
        // checks each item in formInputs array if they have a value not equal to blank string
        let hasValues = formInputs.every(form => form.value !== "");
        if(!hasValues) {
            // if it has some blanks, show the hidden notice by removing hidden class
            incNotice.classList.remove('hidden');
            return;
        };

        // fun sentence whose variable words are represented by #
        let funSentence = `It was a # day at #. It was Halloween night, and PPOPPI the fluffy dog and her # buddies were excited to go trick-or-treating. PPOPPI put on her spooky # and explored her neighborhood with her buddies.

        After walking past the candle-lit # and other # dressed in # costumes, PPOPPI # many doors.

        It wasn’t until she finished trick-or-treating that she realized -- one of her silly neighbors gave her a # # instead of a candy!`;

        // goes through each form input in order and replaces the fun sentence #'s
        formInputs.forEach((form,index) => {
            funSentence = funSentence.replace('#',form.value);
        })

        //need to make new paragraph and fill with the new fun sentence and append to hidden element
        let newParagraph = document.createElement('p');
        newParagraph.innerText = funSentence;
        resultContent.replaceChildren(newParagraph);
        // by default result elem is hidden and form is shown
        // but toggling it switches both then
        // result elem will show and form will be hidden
        resultElem.classList.toggle('hidden');
        formElem.classList.toggle('hidden');
    })
})();