// SET UP SOUNDS
const foxIntro = new Audio('sounds/fox-intro.mp3');
const starWarsTheme = new Audio('sounds/star-wars-theme.mp3')

// DOM ELEMENTS
let enterSection = document.querySelector('#enter');
let titleArea = document.querySelector('#titleArea');
let introArea = document.querySelector('#introArea');
let productionArea = document.querySelector('#productionArea');
let longTimeArea = document.querySelector('#longTimeArea');
let trailerArea = document.querySelector('#trailerArea');
let hollowStarWarsText = document.querySelector('#hollowStarWarsText');
let continueButton = document.querySelector('#continueButton');
let crawlArea = document.querySelector('#crawlArea');
let playText = document.querySelector('#playText');
let gameArea = document.querySelector('#gameArea');
let galacticDefender = document.querySelector('#galacticDefender');
let tieFighter = document.querySelector('.tieFighter')

// GAME VARIABLES
// Size of the game area (in viewport)
const GAME_AREA_WIDTH = 95;
const GAME_AREA_HEIGHT = 95;

// Size of the paddles (in viewport)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

// The x-velocity and x-position of the Galactic Defender
let galacticDefenderXPosition;
let galacticDefenderXVelocity;

// The Y Position and Velocity of the User Paddle
let tieFighterXPosition;
let tieFighterXVelocity;



// EVENT LISTENERS

//DEV MODE
// enterSection.addEventListener('click', function () {
//     myFadeOut(titleArea);
//     setTimeout(function(){
//         myFadeIn(introArea);
//         trailerArea.style.display = 'flex'
//         playText.style.display = 'flex'
//     }, 1000)
// }); 

enterSection.addEventListener('click', function () {
    myFadeOut(titleArea);
    setTimeout(function(){
        myFadeIn(introArea);
    }, 1000)
    setTimeout(function () {
        myFadeIn(productionArea);
    }, 1500);
    foxIntro.play();
    setTimeout(function () {
        myFadeOut(productionArea)
    }, 20500);
    setTimeout(function () {
        myFadeIn(longTimeArea);
    }, 22000)
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        setTimeout(function () {
            myFadeIn(continueButton);
        }, 29000)
        continueButton.addEventListener('click', function () {
            starWarsTheme.play();
            myFadeOut(longTimeArea);
            setTimeout(function () {
                playIntroCrawl();
            }, 1000);
            setTimeout(function () {
                myFadeOut(crawlArea);
            }, 84000);
            setTimeout(function () {
                myFadeIn(playText);
            }, 84000);
        });
    } else {
        setTimeout(function () {
            myFadeOut(longTimeArea);
        }, 29000)
        setTimeout(function () {
            starWarsTheme.play();
            playIntroCrawl();
        }, 30000);
        setTimeout(function () {
            myFadeOut(crawlArea);
        }, 114000);
        setTimeout(function () {
            myFadeIn(playText);
        }, 114000);
    }
});

playText.addEventListener('click', function(){
  myFadeOut(introArea);
  setTimeout(function(){
    myFadeIn(gameArea); 
    startGame();
    window.addEventListener("keydown", userArrow);
  }, 1000);
      
})

// HELPER FUNCTIONS
let userArrow = (event) => {
    if (event.key === 'ArrowLeft'){
        if (galacticDefenderXPosition >= 1){
            galacticDefenderXVelocity = -1;
            galacticDefenderXPosition = galacticDefenderXPosition + galacticDefenderXVelocity;
            galacticDefender.style.left = `${galacticDefenderXPosition}vw`;
        }
    } else if (event.key === 'ArrowRight'){
        if (galacticDefenderXPosition <= 89){
            galacticDefenderXVelocity = 1;
            galacticDefenderXPosition = galacticDefenderXPosition + galacticDefenderXVelocity;
            galacticDefender.style.left = `${galacticDefenderXPosition}vw`;

        }
    }
}

let startGame = () => {

    // The x position of Galactic Defender
    galacticDefenderXPosition = 0;
    galacticDefender.style.left = `${galacticDefenderXPosition}vw`;
}

let playIntroCrawl = () => {
    trailerArea.style.display = 'flex'
    trailerArea.style.flexDirection = 'column'
    trailerArea.style.alignItems = 'center'
    trailerArea.style.justifyContent = 'center'
    myShrinkText(hollowStarWarsText);
}

let myFadeIn = (dom) => {
    let opacity = 0;
    dom.style.display = 'flex';
    dom.style.flexDirection = 'column'
    dom.style.alignItems = 'center'
    dom.style.justifyContent = 'center'
    dom.style.opacity = '0';
    let myTimer = setInterval(function () {
        if (opacity >= 1) {
            clearInterval(myTimer);
        }
        dom.style.opacity = opacity;
        opacity += opacity + 0.1;
    }, 50)
};

let myFadeOut = (dom) => {
    let opacity = 1;
    dom.style.opacity = 1;
    let myTimer = setInterval(function () {
        if (opacity <= 0) {
            clearInterval(myTimer);
            dom.style.display = 'none';
        }
        dom.style.opacity = opacity;
        opacity = opacity - 0.1;
    }, 50)
};

let myShrinkText = (dom) => {
    dom.style.display = 'flex';
    dom.style.flexDirection = 'column';
    dom.style.alignItems = 'center';
    dom.style.alignContent = 'center';

    let fontSize = 16;
    let opacity = 1;
    let myTimer = setInterval(function () {
        if (fontSize <= 0) {
            clearInterval(myTimer);
            dom.style.display = 'none';
        }
        dom.style.fontSize = fontSize + "vw";
        dom.style.opacity = opacity;
        opacity = opacity - 0.002;
        fontSize = fontSize - 0.07;
    }, 50)
}