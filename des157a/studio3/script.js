(function() {
    "use strict";
    console.log("reading js");

    //your code starts here!
    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');
    const game = document.getElementById('game');
    const score = document.getElementById('score');
    const actionArea = document.getElementById('actions');

    // sounds used for this project
    const diceRoll = new Audio("media/Shake_And_Roll_Dice.mp3")

    const gameData = {
        dice: ["images/die-1.png", "images/die-2.png", "images/die-3.png", "images/die-4.png", "images/die-5.png", "images/die-6.png"],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    }
    const gameDom = {
        player1: document.querySelector('.player-card.one'),
        score1: document.querySelector('.player-card.one .score'),
        dice11: document.querySelector('.player-card.one .dice.one'),
        dice12: document.querySelector('.player-card.one .dice.two'),
        player2: document.querySelector('.player-card.two'),
        score2: document.querySelector('.player-card.two .score'),
        dice21: document.querySelector('.player-card.two .dice.one'),
        dice22: document.querySelector('.player-card.two .dice.two'),
        gameinfo: document.getElementById('game-info')
    }

    function setGameinfoText(text) {
        gameDom.gameinfo.innerHTML = text;
    }


    let intro = gameControl.querySelector('.intro')
    let playing = gameControl.querySelector('.playing')

    startGame.addEventListener("click", function() {
        gameData.index = Math.round(Math.random());

        //changing the style of the game screen according to status of play - intro or playing
        intro.style.display = 'none';
        playing.style.display = 'block';

        console.log("set up the turn!");

        setUpTurn();
    })
    document.getElementById("quit").addEventListener("click", function() {
        location.reload();
    })
    document.getElementById("roll").addEventListener("click", function() {
        console.log("roll the dice!");
    })

    // need to follow game flow
    // fix old code for game info with new dom
    // maybe add dice animation and time delays

    function setUpTurn() {
        /* gameData player variable here! */
        setGameinfoText(`<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`)


        //dice sound plays;
        diceRoll.play;

        throwDice();
        checkWinningCondition();

    }

    function throwDice() {
        actionArea.innerHTML = "";
        gameData.roll1 = Math.floor(Math.random() * 6) + 1; //using ceil could result in a zero!
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}"> <img src="${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        //if 2 1's are rolled
        if (gameData.rollSum === 2) {
            console.log("snake eyes were rolled!");

            game.innerHTML += "<p>Oh snap! Snake eyes!</p>"
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            //show current score
            setTimeout(setUpTurn, 2000);
        }
        //if either die is a 1
        else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            console.log("one of the two dice was a 1!")

            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}</p>`
            setTimeout(setUpTurn, 2000);
        }
        //if neither is a 1
        else {
            console.log("the game proceeds...")

            gameData.score[gameData.index] += gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>';

            document.getElementById("rollagain").addEventListener("click", function() {
                setUpTurn();
            });

            document.getElementById("pass").addEventListener("click", function() {
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            //check winning condition :D !
            checkWinningCondition();
        }
    }

    function checkWinningCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`

            actionArea.innerHTML = "";
            document.getElementById("quit").innerHTML = "Start a New Game?";
        } else {
            //show current score...
            score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]} ${gameData.score[0]}</strong> and <strong>${gameData.players[1]} ${gameData.score[1]}</strong></p>`;
        }

        // checkWinningCondition();
    }

    function showCurrentScore() {
        score.innerHTML = `<p>The score is currently <strong>${gameData.players[0]} ${gameData.score[0]}</strong> and <strong>${gameData.players[1]} ${gameData.score[1]}</strong></p>`;
    }
})();