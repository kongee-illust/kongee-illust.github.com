(function() {
    "use strict";

    console.log("reading js");
    console.log('root')
    const menu = $('#menu')
    console.log(menu)
    $('.menu-button').click(() => {
        menu[0].classList.toggle('open')
            // console.log(123)
    })

    let collection;
    async function initMongo() {
        const app = new Realm.App({ id: 'application-0-kusvt' });
        // Create an anonymous credential
        const credentials = Realm.Credentials.anonymous();
        // Authenticate the user
        const user = await app.logIn(credentials);
        // `App.currentUser` updates to match the logged in user
        console.assert(user.id === app.currentUser.id);
        const mongo = app.currentUser.mongoClient('mongodb-atlas');
        collection = mongo.db('SchoolDB').collection('Stories');

        let stories = await collection.find({})
            .then(storiesToHtml)
            .then(html => $('#viewstories').html(html))

    }
    initMongo()

    // window.alert('thank you for testing my product! please: 1. scroll through the landing page, 2. add your story using the file provided to you, and 3. view our stories! note: you may have to wait a few minutes for your submission to show up.')

    function storiesToHtml(stories) {
        let result = ''
        stories.forEach((item, index) => {
            // skip every second one
            if (index % 2 === 1) return
                // push item and next item to result
            let grouped = [card(item)]
            let next = stories[index + 1]
            if (next) grouped.push(card(next))

            result = result.concat(row(grouped))
        })
        return result
    }

    //compiling spreadsheet data into my project WEEEEEE
    function tsvToHtml(text) {
        console.log(text)
        let lines = text.split('\n')
            // gets rid of first line which is labels/timestamp
        lines = lines.filter((val, index) => index)
        lines = lines.map(line => line.split('	'))
            //for the sake of card design the code must skip every 2nd entry
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

        return `
                <div class="cards">
                    <img src="${data.image}">
                    <div class="card-title-author">
                    <h2>${data.title}</h2>
                    <p>Story told by ${data.name}</p>
                    </div>
                    <p id="card-description">${data.desciption
                    }</p>
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

    // fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQ4wggNORhqrcvg48RyiXIt66i_HrJcPc46FFAQrkXo0Q9PEnTmIpq_jVnwg48_RvaDKf-TDuMlSv-4/pub?output=tsv")
    //     .then(res => res.text())
    //     .then(tsvToHtml)
    //     .then(html => $('#viewstories').html(html))



})();