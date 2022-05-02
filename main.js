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

// GAME VARIABLES
// The X Position and X Velocity of the Galactic Defender
let galacticDefenderXPosition;
let galacticDefenderXVelocity;

// TIE Fighter Object Structure
let tieFighterObject = {};

// Laser Object Structure
let laserObject = {};

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
        setInterval(tieFighterInvasion, 5000);
    }, 1000);

})

// HELPER FUNCTIONS

let createTieFighterDom = (tieFighterId) => {
    let tieFighterDom = document.createElement('img');
    tieFighterDom.src = 'assets/tieFighter.png';
    tieFighterDom.style.display = 'flex';
    tieFighterDom.style.position = 'absolute';
    tieFighterDom.id = tieFighterId;
    tieFighterObject[tieFighterId] = {
        tieFighterXPosition: 0,
        tieFighterYPosition: 0,
        tieFighterVelocity: 0,
    }
    gameArea.appendChild(tieFighterDom);
    return tieFighterDom;
}

let initialTieFighterXPosition = (tieFighterDom, tieFighterId) => {
    let tieFighterXPosition = Math.floor(Math.random() * 90);
    tieFighterDom.style.left = tieFighterXPosition + 'vw';
    tieFighterObject[tieFighterId].tieFighterXPosition = tieFighterXPosition;
}

let initialTieFighterYPosition = (tieFighterDom, tieFighterId) => {
    let tieFighterYPosition = 0;
    tieFighterDom.style.top = tieFighterYPosition + 'vh';
    tieFighterObject[tieFighterId].tieFighterYPosition = tieFighterYPosition;
}

let moveTieFighter = (tieFighterDom, tieFighterId, myTieFighterInterval) => {
    if (tieFighterDom.style.display == 'none'){
        tieFighterDom.remove();
        delete tieFighterObject[tieFighterId];
        clearInterval(myTieFighterInterval);
        return;
    }
    let tieFighterYPosition = tieFighterObject[tieFighterId].tieFighterYPosition + 1;
    tieFighterDom.style.top = tieFighterYPosition + 'vh';
    if (tieFighterYPosition >= 80) {
        tieFighterDom.remove();
        delete tieFighterObject[tieFighterId];
        clearInterval(myTieFighterInterval);
        return;
    }
    // for (let laserId in laserObject) {
    //     if (laserObject[laserId].laserXPosition >= (tieFighterObject[tieFighterId].tieFighterXPosition - 0.9) &&
    //         laserObject[laserId].laserXPosition <= (tieFighterObject[tieFighterId].tieFighterXPosition + 5.9) &&
    //         laserObject[laserId].laserYPosition >= tieFighterYPosition &&
    //         laserObject[laserId].laserYPosition <= (tieFighterYPosition + 11)){

    //         tieFighterDom.remove();
    //         delete tieFighterObject[tieFighterId];
    //         clearInterval(myTieFighterInterval);

    //         return;

    //     }
    // }
    tieFighterObject[tieFighterId].tieFighterYPosition = tieFighterYPosition;
}

let tieFighterInvasion = () => {

    let tieFighterId = generateId();
    let tieFighterDom = createTieFighterDom(tieFighterId);
    initialTieFighterXPosition(tieFighterDom, tieFighterId);
    initialTieFighterYPosition(tieFighterDom, tieFighterId);

    let myTieFighterInterval = setInterval(function () {
        moveTieFighter(tieFighterDom, tieFighterId, myTieFighterInterval);
    }, 500);
}

let generateId = () => {
    let laserId = Math.ceil(Math.random() * 1000000);
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

let initialLaserXPosition = (laserDom, laserId, xOffset) => {
    let laserXPosition = galacticDefenderXPosition + xOffset;
    laserDom.style.left = laserXPosition + 'vw';
    laserObject[laserId].laserXPosition = laserXPosition;
}

let initialLaserYPosition = (laserDom, laserId) => {
    let laserYPosition = 89;
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
    let laserYPostion = laserObject[laserId].laserYPosition - 1;
    laserDom.style.top = laserYPostion + 'vh';
    if (laserYPostion <= 0) {
        laserDom.remove();
        delete laserObject[laserId];
        clearInterval(myLaserInterval);
        return;
    }
    for (let tieFighterId in tieFighterObject) {
        if (laserObject[laserId].laserXPosition >= tieFighterObject[tieFighterId].tieFighterXPosition &&
            laserObject[laserId].laserXPosition <= tieFighterObject[tieFighterId].tieFighterXPosition + 5 &&
            laserYPostion >= tieFighterObject[tieFighterId].tieFighterYPosition &&
            laserYPostion <= tieFighterObject[tieFighterId].tieFighterYPosition + 5) {
                let tieDom = document.getElementById(tieFighterId);
                tieDom.style.display = 'none';
            laserDom.remove();
            delete laserObject[laserId];
            clearInterval(myLaserInterval);
            return;
        }
    }
    laserObject[laserId].laserYPosition = laserYPostion;
}

let fireLasers = (event) => {
    if (event.code === 'Space') {

        //LEFT LASER
        let leftLaserId = generateId()
        let leftLaserDom = createLaserDom(leftLaserId);
        initialLaserXPosition(leftLaserDom, leftLaserId, 0);
        initialLaserYPosition(leftLaserDom, leftLaserId);
        growLaserHeight(leftLaserDom);
        let myLeftLaserInterval = setInterval(function () {
            moveLaser(leftLaserDom, leftLaserId, myLeftLaserInterval);
        }, 35);

        //RIGHT LASER
        let rightLaserId = generateId()
        let rightLaserDom = createLaserDom(rightLaserId);
        initialLaserXPosition(rightLaserDom, rightLaserId, 4.5);
        initialLaserYPosition(rightLaserDom, rightLaserId);
        growLaserHeight(rightLaserDom);
        let myRightLaserInterval = setInterval(function () {
            moveLaser(rightLaserDom, rightLaserId, myRightLaserInterval);
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