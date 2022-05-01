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
let tieFighter;
let leftLaser;
let rightLaser;
// let tieFighter = document.querySelector('.tieFighter');
// let leftLaser = document.querySelector('.leftLaser');
// let rightLaser = document.querySelector('.rightLaser');

// GAME VARIABLES
// The X Position and X Velocity of the Galactic Defender
let galacticDefenderXPosition;
let galacticDefenderXVelocity;

// The X Position and Y Position & Y Velocity of the Tie Fighter
let tieFighterXPosition;
let tieFighterYPosition;
let tieFighterYVelocity;

// The X Postion and Y Position and Y Velocity of the Lasers
let leftLaserYPosition;
let leftLaserXPosition;
let rightLaserXPosition;
let rightLaserYPosition;

// EVENT LISTENERS

//DEV MODE
enterSection.addEventListener('click', function () {
    myFadeOut(titleArea);
    setTimeout(function () {
        myFadeIn(introArea);
        trailerArea.style.display = 'flex'
        playText.style.display = 'flex'
    }, 1000)
});

// enterSection.addEventListener('click', function () {
//     myFadeOut(titleArea);
//     setTimeout(function(){
//         myFadeIn(introArea);
//     }, 1000)
//     setTimeout(function () {
//         myFadeIn(productionArea);
//     }, 1500);
//     foxIntro.play();
//     setTimeout(function () {
//         myFadeOut(productionArea)
//     }, 20500);
//     setTimeout(function () {
//         myFadeIn(longTimeArea);
//     }, 22000)
//     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//         setTimeout(function () {
//             myFadeIn(continueButton);
//         }, 29000)
//         continueButton.addEventListener('click', function () {
//             starWarsTheme.play();
//             myFadeOut(longTimeArea);
//             setTimeout(function () {
//                 playIntroCrawl();
//             }, 1000);
//             setTimeout(function () {
//                 myFadeOut(crawlArea);
//             }, 84000);
//             setTimeout(function () {
//                 myFadeIn(playText);
//             }, 85000);
//         });
//     } else {
//         setTimeout(function () {
//             myFadeOut(longTimeArea);
//         }, 29000)
//         setTimeout(function () {
//             starWarsTheme.play();
//             playIntroCrawl();
//         }, 30000);
//         setTimeout(function () {
//             myFadeOut(crawlArea);
//         }, 114000);
//         setTimeout(function () {
//             myFadeIn(playText);
//         }, 115000);
//     }
// });

playText.addEventListener('click', function () {
    myFadeOut(introArea);
    setTimeout(function () {
        myFadeIn(gameArea);
        startGame();
        window.addEventListener("keydown", userArrow);
        window.addEventListener('keydown', fireLasers);
        createTieFighter();
        setTieFighterPostion();
    }, 1000);

})

// HELPER FUNCTIONS

let createTieFighter = () => {
    tieFighter = document.createElement('img');
    tieFighter.src = 'assets/tieFighter.png';
    tieFighter.style.display = 'flex';
    tieFighter.style.position = 'absolute';
    tieFighterYPosition = 0;
    tieFighter.style.top = tieFighterYPosition + 'vh';
    gameArea.appendChild(tieFighter);
    // return tieFighter;
}

let setTieFighterPostion = () => {
    tieFighterXPosition = 0;
    tieFighter.style.left = tieFighterXPosition + 'vw';
}

let growLaserHeight = (laserSide) => {
    let height = 1;
    laserSide.style.height = '1vh';
    for (let i = 0; i < 3; i++) {
        setTimeout(function () {
            height = height + 1;
            laserSide.style.height = height + 'vh';
        }, 35)

    }
}

let makeLaserDisplay = (laserSide) => {
    laserSide.style.display = 'flex';
    laserSide.style.position = 'absolute'
    laserSide.style.width = '1vh';
    laserSide.style.borderRadius = '0.5vh';
    laserSide.className = 'laser';
    gameArea.appendChild(laserSide);
}

let intialLaserXPostion = (laserSide, laserXPosition, xOffset) => {
    laserXPosition = galacticDefenderXPosition + xOffset;
    laserSide.style.left = laserXPosition + 'vw';
    //might have to return the x pos -- not sure -- should be ok with global variables
}

let intialLaserYPosition = (laserSide, laserYPosition) => {
    laserYPosition = 89;
    laserSide.style.top = laserYPosition + 'vh';
    return laserYPosition;
}

let moveLaser = (laserSide, laserYPostion, myLaserInterval) => {
    laserYPostion = laserYPostion - 1;
    laserSide.style.top = laserYPostion + 'vh';
    if (laserYPostion <= 0) {
        clearInterval(myLaserInterval);
        laserSide.style.display = 'none';
    }
    return laserYPostion;
}

let fireLasers = (event) => {
    if (event.code === 'Space') {

        //The X Postion and Y Position & Y Velocity of the Left Laser
        // let leftLaserXPosition;
        // let rightLaserXPosition;
        // leftLaserYPosition;
        // rightLaserYPosition;
        // let leftLaserYVelocity;
        // let rightLaserYVelocity;

        let leftLaser = document.createElement('div');
        let rightLaser = document.createElement('div');

        //make Laser Display
        makeLaserDisplay(leftLaser);
        makeLaserDisplay(rightLaser);

        //set intial Laser X and Y Position
        intialLaserXPostion(leftLaser, leftLaserXPosition, 0);
        intialLaserXPostion(rightLaser, rightLaserXPosition, 4);
        // I THINK BC OF GLOBAL VARIABLE
        // leftLaserYPosition = intialLaserYPosition(leftLaser, leftLaserYPosition);
        // rightLaserYPosition = intialLaserYPosition(rightLaser, rightLaserYPosition);
        intialLaserYPosition(leftLaser, leftLaserYPosition);
        intialLaserYPosition(rightLaser, rightLaserYPosition);

        //growLaserHeighht
        growLaserHeight(leftLaser);
        growLaserHeight(rightLaser);

        let myLaserInterval = setInterval(function () {
            leftLaserYPosition = moveLaser(leftLaser, leftLaserYPosition, myLaserInterval);
            rightLaserYPosition = moveLaser(rightLaser, rightLaserYPosition), myLaserInterval;
        }, 35);

    }
}

let userArrow = (event) => {
    if (event.key === 'ArrowLeft') {
        if (galacticDefenderXPosition >= 1) {
            galacticDefenderXVelocity = -1;
            galacticDefenderXPosition = galacticDefenderXPosition + galacticDefenderXVelocity;
            galacticDefender.style.left = `${galacticDefenderXPosition}vw`;
        }
    } else if (event.key === 'ArrowRight') {
        if (galacticDefenderXPosition <= 89) {
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