(function() {
    "use strict";
    console.log("reading js");

    //your code starts here!
    const startGame = document.getElementById('startgame');
    const gameControl = document.getElementById('gamecontrol');

    // sounds used for this project
    const diceRoll = new Audio("media/Shake_And_Roll_Dice.mp3")
    const dingDongDeng = new Audio("media/사르르.MP3")
    const startSound = new Audio("media/맞추었어.MP3")

    const gameData = {
        dice: ["images/die-1.svg", "images/die-2.svg", "images/die-3.svg", "images/die-4.svg", "images/die-5.svg", "images/die-6.svg"],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    }

    // modified dom from pig.js
    const gameDom = {
        player1: document.querySelector('.player-card.one'),
        score1: document.querySelector('.player-card.one .score'),
        dice11: document.querySelector('.player-card.one .dice-holder.dice1'),
        dice12: document.querySelector('.player-card.one .dice-holder.dice2'),
        player2: document.querySelector('.player-card.two'),
        score2: document.querySelector('.player-card.two .score'),
        dice21: document.querySelector('.player-card.two .dice-holder.dice1'),
        dice22: document.querySelector('.player-card.two .dice-holder.dice2'),
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
        //sound effect plays
        startSound.play();
    })

    // quitting game would reload the script
    document.getElementById("quit").addEventListener("click", function() {
        location.reload();
    })
    document.getElementById("roll").addEventListener("click", function() {
        if (gameData.score[gameData.index] > gameData.gameEnd) return;
        console.log("roll the dice!");
        //dice sound plays;
        diceRoll.play();

        throwDice();
    })
    document.getElementById("pass").addEventListener("click", function() {
        if (gameData.score[gameData.index] > gameData.gameEnd) return;
        gameData.index = gameData.index ? 0 : 1;
        setUpTurn();
    });

    function setUpTurn() {
        /* gameData player variable here! */
        // gameData.index = gameData.index ? 0 : 1;

        setGameinfoText(`<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`)

    }

    function throwDice() {
        gameData.roll1 = Math.floor(Math.random() * 6) + 1; //using ceil could result in a zero!
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        gameDom[`dice${(gameData.index + 1)}1`].innerHTML = `<img src="${gameData.dice[gameData.roll1 - 1]}">`
        gameDom[`dice${(gameData.index + 1)}2`].innerHTML = `<img src="${gameData.dice[gameData.roll2 - 1]}">`

        gameData.rollSum = gameData.roll1 + gameData.roll2;

        //if 2 1's are rolled
        if (gameData.rollSum === 2) {
            console.log("snake eyes were rolled!");

            setGameinfoText("<p>Oh snap! Snake eyes!</p>")
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            //show current score
            setTimeout(setUpTurn, 2000);
        }
        //if either die is a 1
        else if (gameData.roll1 === 1 || gameData.roll2 === 1) {
            console.log("one of the two dice was a 1!")

            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            setGameinfoText(`<p>One of your rolls was a 1! Switching to ${gameData.players[gameData.index]}</p>`)
            setTimeout(setUpTurn, 2000);
        }
        //if neither is a 1
        else {
            console.log("the game proceeds...")

            gameData.score[gameData.index] += gameData.rollSum;
            gameDom['score' + (gameData.index + 1)].innerHTML = gameData.score[gameData.index];

            //check winning condition :D !
            checkWinningCondition();
        }
    }

    function checkWinningCondition() {
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            setGameinfoText(`<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`)
            document.getElementById("quit").innerHTML = "New Game";
            // sound effect plays
            dingDongDeng.play();
        } else {
            //show current score...
            setGameinfoText(`<p>The score is currently <strong>${gameData.players[0]} ${gameData.score[0]}</strong> and <strong>${gameData.players[1]} ${gameData.score[1]}</strong></p>`)
        }

        // checkWinningCondition();
    }


    // edge case: clicking on the child of the overlay would close the overlay
    // so stopPropagation prevents that
    let overlayContent = document.querySelector("#overlay .content");
    overlayContent.addEventListener('click', (event) => {
        event.stopPropagation();
    })

    //clicking help button, dark overlay background and soundsgood button all toggle the overlay
    let helpButton = document.getElementById("helpButton");
    helpButton.addEventListener('click', () => {
        overlayElem.classList.toggle("open");
    })
    let overlayElem = document.getElementById("overlay");
    overlayElem.addEventListener('click', () => {
        overlayElem.classList.toggle("open");
    })
    let soundsGoodButton = document.querySelector("#overlay .content button");
    soundsGoodButton.addEventListener('click', () => {
        overlayElem.classList.toggle("open");
    })



})();