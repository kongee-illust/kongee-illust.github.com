(function() {
    "use strict";
    console.log("reading js");
    const menu = $('#menu')
    console.log(menu)
    $('.menu-button').click(() => {
        menu[0].classList.toggle('open')
            // console.log(123)
    })

    // Window.alert('i hate you, please leave')

    function tsvToHtml(text) {
        console.log(text)
        let lines = text.split('\n')
            // gets rid of first line which is labels
        lines = lines.filter((val, index) => index)
        lines = lines.map(line => line.split('	'))

        let result = ''
        lines.forEach((item, index) => {
            // skip every second one
            if (index % 2 === 1) return
                // push item and next item to result
            let grouped = [card(item)]
            let next = lines[index + 1]
            if (next) grouped.push(card(next))

            result = result.concat(row(grouped))
        });

        return result;
    }

    function card(data) {

        //some people may not want to input their names; the google form shows "optional" for the name field
        let authorLine;
        if (data[1]) {
            authorLine = `Added by ${data[1]}`
        } else {
            authorLine = 'Added by Anonymous'
        }

        // changes url so it can be viewed in a website
        let imageUrl = data[3].replace('open', 'uc')

        return `
                <div class="cards">
                    <img src="${imageUrl}">
                    <div class="card-title-author">
                    <h2>${data[2]}</h2>
                    <p>${authorLine}</p>
                    </div>
                    <p id="card-description">${data[4]}</p>
                </div>
                `
    }

    function row(cards) {
        return `
        <div class=rows>
            ${cards.join('')}
        </div>
        `
    }

    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQ4wggNORhqrcvg48RyiXIt66i_HrJcPc46FFAQrkXo0Q9PEnTmIpq_jVnwg48_RvaDKf-TDuMlSv-4/pub?output=tsv")
        .then(res => res.text())
        .then(tsvToHtml)
        .then(html => $('#viewstories').html(html))



})();