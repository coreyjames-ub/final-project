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
// let tieFighter;
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

// Laser Object Structure
let laserObject = {}

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
        
        setTieFighterXPostion(createTieFighter(), 5);
        setTieFighterXPostion(createTieFighter(), 50);
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
    return tieFighter;
}

let setTieFighterXPostion = (tieFighter, num) => {
    tieFighterXPosition = num;
    tieFighter.style.left = tieFighterXPosition + 'vw';
    return tieFighterXPosition;
}


let generateLaserId = () => {
    let laserId = Math.ceil(Math.random()*1000000);
    return laserId;
}

let createLaserDom = (laserId) => {
    let laserDom = document.createElement('div');
    laserDom.style.display = 'flex';
    laserDom.style.position = 'absolute'
    laserDom.style.width = '1vh';
    laserDom.style.borderRadius = '0.5vh';
    laserDom.className = 'laser';
    laserDom.id = laserId;
    laserObject[laserId] = {
        laserXPosition: 0,
        laserYPosition: 0,
        laserVelocity: 0,
    }
    gameArea.appendChild(laserDom);
    return laserDom;
}

let intialLaserXPostion = (laserDom, laserId, xOffset) => {
    let laserXPosition = galacticDefenderXPosition + xOffset;
    laserDom.style.left = laserXPosition + 'vw';
    laserObject[laserId].laserXPosition = laserXPosition;
}

let intialLaserYPosition = (laserDom, laserId) => {
    laserYPosition = 89;
    laserDom.style.top = laserYPosition + 'vh';
    laserObject[laserId].laserYPosition = laserYPosition;
}

let growLaserHeight = (laserDom) => {
    let height = 1;
    laserDom.style.height = '1vh';
    for (let i = 0; i < 3; i++) {
        setTimeout(function () {
            height = height + 1;
            laserDom.style.height = height + 'vh';
        }, 35)

    }
}

let moveLaser = (laserDom, laserId, myLaserInterval) => {
    laserYPostion = laserObject[laserId].laserYPosition - 1;
    laserDom.style.top = laserYPostion + 'vh';
    // console.log(tieFighterXPosition)
    if (laserYPostion <= 0) {
        clearInterval(myLaserInterval);
        laserDom.style.display = 'none';
    }
    laserObject[laserId].laserYPosition = laserYPostion;
}

let fireLasers = (event) => {
    if (event.code === 'Space') {

        //LEFT LASER
        let leftLaserId = generateLaserId()
        let leftLaserDom = createLaserDom(leftLaserId);
        intialLaserXPostion(leftLaserDom, leftLaserId, 0);
        intialLaserYPosition(leftLaserDom, leftLaserId);
        growLaserHeight(leftLaserDom);

        //RIGHT LASER
        let rightLaserId = generateLaserId()
        let rightLaserDom = createLaserDom(rightLaserId);
        intialLaserXPostion(rightLaserDom, rightLaserId, 4.5);
        intialLaserYPosition(rightLaserDom, rightLaserId);
        growLaserHeight(rightLaserDom);

        let myLaserInterval = setInterval(function () {
            moveLaser(leftLaserDom, leftLaserId, myLaserInterval);
            moveLaser(rightLaserDom, rightLaserId,  myLaserInterval);
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