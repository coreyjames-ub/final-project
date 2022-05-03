// SET UP SOUNDS
const foxIntro = new Audio('sounds/fox-intro.mp3');
const starWarsTheme = new Audio('sounds/star-wars-theme.mp3');
const imperialMarch = new Audio('sounds/imperialMarch.mp3');
const xWingFire = new Audio('sounds/XWing-Fire.mp3');
const tieFighterExplosion = new Audio('sounds/TIE-fighter-explode.mp3');
const invadedFinale = new Audio('sounds/invadedFinale.mp3');
const levelOneComplete = new Audio('sounds/levelOneComplete.mp3');
const returnOfTheJedi = new Audio('sounds/returnOfTheJedi.mp3');
const ewokCelebration = new Audio('sounds/ewokCelebration.mp3');

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
let tagLineTwo = document.querySelector('#tagLineTwo');
let gameArea = document.querySelector('#gameArea');
let galacticDefender = document.querySelector('#galacticDefender');
let gamePlayEndArea = document.querySelector('#gamePlayEndArea');
let gamePlayEndText = document.querySelector('#gamePlayEndText');
let gamePlayScoreText = document.querySelector('#gamePlayScoreText');
let scoreBoardText = document.querySelector('#scoreBoardText');
let playAgain = document.querySelector('#playAgain');
let reboot = document.querySelector('#reboot');
let restartArea = document.querySelector('#restartArea');

// GAME VARIABLES
let score;
let gamePlayEnded;
let invaded;
let invadedText = "* Rogue Three,\n\n* This is Echo Base.\n\n* We've been Invaded.\n\n* Repeat,\n\n* We've been Invaded."
let completedLevelOneText = "* Rogue Three,\n* This is Echo Base.\n* TIE Fighters are on retreat.\n* Reserve X-Wing Fighters\nare in route to replace\nyour Squadron\n* Return to Base."
let completedLevelTwoText = "* Rogue Three,\n* This is Echo Base.\n* The DEATH STAR\n is destroyed!\n* All Imperial Forces are retreating.\n* We have defeated the Empire\nand defended our galaxy.\n* Return to base,\nit's time to celebrate!"
let scoreBoard;
let completedLevel;
let level;
let laserSpeedInterval = 35;
let tieFighterInvasionSpeedInterval = 400;
let tieFighterInvasionCreationInterval = 4000;
let xWingVelocity = 1.5;
let tieMult = 2;

// The X Position and X Velocity of the Galactic Defender
let galacticDefenderXPosition;
let galacticDefenderXVelocity;

// TIE Fighter Object Structure
let tieFighterObject = {};

// Laser Object Structure
let laserObject = {};

// SET UP SCORE IN LOCAL STORAGE
let getScore = () => {
    score = Number(localStorage.getItem('score'));
    if (score === null) {
        score = 0;
        localStorage.setItem('score', score);
    }
    console.log("score");
    console.log(score);
};

let getGamePlayEnded = () => {
    gamePlayEnded = localStorage.getItem('gamePlayEnded');
    if (gamePlayEnded === null) {
        gamePlayEnded = false;
        localStorage.setItem('gamePlayEnded', gamePlayEnded);
    } else if (gamePlayEnded == 'true') {
        gamePlayEnded = true;
    } else if (gamePlayEnded == 'false') {
        gamePlayEnded = false;
    }
    console.log('gamePlayEnded');
    console.log(gamePlayEnded);
}

let getInvaded = () => {
    invaded = localStorage.getItem('invaded');
    if (invaded === null) {
        invaded = false;
        localStorage.setItem('invaded', invaded);
    } else if (invaded = 'true') {
        invaded = true;
    } else if (invaded = 'false') {
        invaded = false;
    }
    console.log('invaded');
    console.log(invaded);
}

let getScoreBoard = () => {
    scoreBoard = localStorage.getItem('scoreBoard');
    if (scoreBoard === null) {
        scoreBoard = [];
        localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard));
    } else {
        scoreBoard = JSON.parse(scoreBoard);
    }
    console.log('scoreBoard');
    console.log(scoreBoard);
}

let getLevel = () => {
    level = localStorage.getItem('level');
    if (level === null) {
        level = '1';
        localStorage.setItem('level', level);
    }
    if (level === '1') {
        console.log('inside level 1')
        laserSpeedInterval = 30;
        tieFighterInvasionSpeedInterval = 300;
        tieFighterInvasionCreationInterval = 3000;
        xWingVelocity = 2;
        tieMult = 2;
    }

    if (level === '2') {
        laserSpeedInterval = 10;
        tieFighterInvasionSpeedInterval = 260;
        tieFighterInvasionCreationInterval = 2600;
        xWingVelocity = 3.5;
        tieMult = 4;
    }
    console.log('level');
    console.log(level);
}

let getCompletedLevel = () => {
    completedLevel = localStorage.getItem('completedLevel');
    if (completedLevel === null) {
        completedLevel = '0';
        localStorage.setItem('completedLevel', completedLevel);
        let x = localStorage.getItem('completedLevel');
        console.log('x');
        console.log(x);
    }
    console.log('completedLevel');
    console.log(completedLevel);
}

// EVENT LISTENERS

// DEV MODE
// enterSection.addEventListener('click', function () {
//     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
// // this is for mobile.
// isMobile = true;
// window.scrollTo(0, 1);
// gameArea.style.height = '100vh';
// gameArea.style.width = '100vw';
//     }
//     myFadeOut(titleArea);
//     setTimeout(function () {
//         myFadeIn(introArea);
//         trailerArea.style.display = 'flex'
//         playText.style.display = 'flex'
//     }, 1000)
// });

enterSection.addEventListener('click', function () {
    myFadeOut(titleArea);
    setTimeout(function () {
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
            }, 85000);
            setTimeout(function () {
                myFadeIn(tagLineTwo);
            }, 87000)
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
        }, 115000);
        playText.style.position = 'absolute';
        setTimeout(function () {
            myFadeIn(tagLineTwo);
        }, 117000)
    }
});

playText.addEventListener('click', function () {
    starWarsTheme.pause();
    starWarsTheme.currentTime = 0;
    myFadeOut(introArea);
    setTimeout(function () {
        myFadeIn(gameArea);
        startGame();
        playLevelOne();
        playLevelTwo();
        window.addEventListener("keydown", userArrow);
        window.addEventListener('keydown', fireLasers);
        let myTieFighterInvasionInterval = setInterval(function () {
            tieFighterInvasion(myTieFighterInvasionInterval)
        }, tieFighterInvasionCreationInterval);
    }, 1000);
});

reboot.addEventListener('click', function () {
    refreshReboot();
})

playAgain.addEventListener('click', function () {
    if (completedLevel == '1') {
        levelOneComplete.pause();
        levelOneComplete.currentTime = 0;
    } else if (completedLevel == '2') {
        localStorage.setItem('level', '0');
        localStorage.setItem('completedLevel', '0');
        ewokCelebration.pause();
        ewokCelebration.currentTime = 0;
    } else {
        invadedFinale.pause();
        invadedFinale.currentTime = 0;
    }
    gamePlayEnded = false;
    localStorage.setItem('gamePlayEnded', gamePlayEnded);
    score = 0;
    localStorage.setItem('score', score);
    myFadeOut(restartArea);
    setTimeout(function () {
        if (completedLevel == '1') {
            returnOfTheJedi.play();
        } else {
            imperialMarch.play()
        }
        playAgain.style.display = 'none';
        reboot.style.display = 'none'
        startGame();
        playLevelOne();
        playLevelTwo();
        let myTieFighterInvasionInterval = setInterval(function () {
            tieFighterInvasion(myTieFighterInvasionInterval)
        }, tieFighterInvasionCreationInterval);
    }, 1000)
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

let moveTieFighter = (tieFighterDom, tieFighterId, myTieFighterMoveInterval, myTieFighterInvasionInterval) => {
    if (gamePlayEnded == true) {
        tieFighterDom.remove();
        delete tieFighterObject[tieFighterId];
        clearInterval(myTieFighterMoveInterval);
        return;
    }
    if (tieFighterDom.style.display == 'none') {
        tieFighterDom.remove();
        delete tieFighterObject[tieFighterId];
        clearInterval(myTieFighterMoveInterval);
        return;
    }
    let tieFighterYPosition = tieFighterObject[tieFighterId].tieFighterYPosition + 1;
    tieFighterDom.style.top = tieFighterYPosition + 'vh';
    if (tieFighterYPosition >= 80) {
        tieFighterDom.remove();
        delete tieFighterObject[tieFighterId];
        clearInterval(myTieFighterMoveInterval);
        clearInterval(myTieFighterInvasionInterval);
        tieFighterInvaded();
        imperialMarch.pause();
        imperialMarch.currentTime = 0;
        return;
    }
    tieFighterObject[tieFighterId].tieFighterYPosition = tieFighterYPosition;
}

let tieFighterInvasion = (myTieFighterInvasionInterval) => {

    if (gamePlayEnded == true) {
        return;
    }

    for (let i = 0; i < tieMult; i++) {
        let tieFighterId = generateId();
        let tieFighterDom = createTieFighterDom(tieFighterId);
        initialTieFighterXPosition(tieFighterDom, tieFighterId);
        initialTieFighterYPosition(tieFighterDom, tieFighterId);

        let myTieFighterMoveInterval = setInterval(function () {
            moveTieFighter(tieFighterDom, tieFighterId, myTieFighterMoveInterval, myTieFighterInvasionInterval);
        }, tieFighterInvasionSpeedInterval);
    }
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
    if (gamePlayEnded == true) {
        laserDom.remove();
        delete laserObject[laserId];
        clearInterval(myLaserInterval);
        return;
    }
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
            tieFighterExplosion.pause();
            tieFighterExplosion.currentTime = 0;
            setTimeout(function () {
                tieFighterExplosion.play();
            }, 10)
            let tieDom = document.getElementById(tieFighterId);
            tieDom.style.display = 'none';
            let explosionDom = explodeTieFighter(tieFighterObject[tieFighterId].tieFighterXPosition, tieFighterObject[tieFighterId].tieFighterYPosition);
            myFadeOut(explosionDom);
            setTimeout(function () {
                explosionDom.remove();
            }, 2000);
            laserDom.remove();
            delete laserObject[laserId];
            clearInterval(myLaserInterval);
            addPointsOnHit();
            return;
        }
    }
    laserObject[laserId].laserYPosition = laserYPostion;
}

let explodeTieFighter = (left, top) => {
    let explosionDom = document.createElement('img');
    explosionDom.src = 'assets/explosion.png'
    explosionDom.style.display = 'flex';
    explosionDom.style.position = 'absolute';
    gameArea.appendChild(explosionDom);
    explosionDom.style.left = left + 'vw';
    explosionDom.style.top = top + 'vh';
    return explosionDom;
}

let displayGamePlayEndedArea = () => {
    if (gamePlayEnded == true) {
        console.log(level);
        if (level === '1') {
            imperialMarch.pause();
            imperialMarch.currentTime = 0;
        } else if (level === '2') {
            returnOfTheJedi.pause();
            returnOfTheJedi.currentTime = 0;
        }

        myFadeIn(gamePlayEndArea);
        gamePlayEndArea.style.alignItems = 'flex-start';
        gamePlayEndArea.style.justifyContent = 'flex-start';
        if (invaded === true) {
            typeText(gamePlayEndText, invadedText);
            invadedFinale.play();
        } else if (completedLevel === '1') {
            typeText(gamePlayEndText, completedLevelOneText);
            levelOneComplete.play();
        } else if (completedLevel === '2') {
            typeText(gamePlayEndText, completedLevelTwoText);
            ewokCelebration.play();
        }
        setTimeout(function () {
            myFadeOut(gamePlayEndArea);
        }, 10000);
        setTimeout(function () {
            gamePlayEndText.style.display = 'none';
            gamePlayEndText.innerText = '';
            gamePlayEndArea.style.display = 'none';
            let scoreText = `Score: ${score} pts`;
            gamePlayEndArea.style.top = '30vh';
            gamePlayEndArea.style.left = '30vw';
            gamePlayEndArea.style.display = 'flex';
            gamePlayEndArea.style.opacity = 1;
            typeText(gamePlayScoreText, scoreText)
        }, 12000);
        setTimeout(function () {
            myFadeOut(gamePlayEndArea)
        }, 16000);
        setTimeout(function () {
            gamePlayScoreText.style.display = 'none';
            gamePlayScoreText.innerText = '';
            gamePlayEndArea.style.display = 'none';
            gamePlayEndArea.style.top = '12vh';
            gamePlayEndArea.style.left = '25vw';
            gamePlayEndArea.style.display = 'flex';
            gamePlayEndArea.style.opacity = 1;
            updateScoreBoard();
            let specialText = '';
            let topScoreText = "Top Scores:"
            specialText = "You did alright Kid.\nWhat do you say?\nLet's give it another shot!"
            for (let i = 0; i < scoreBoard.length; i++) {
                topScoreText = topScoreText + "\n" + (i + 1) + ". " + scoreBoard[i] + " pts";
                if (score === scoreBoard[i]) {
                    specialText = 'Congratulations!' + "\n" + "Your Score of " + score + " pts" + "\n" + "made the Leader Board.";
                };
            };
            if (scoreBoard[0] === score) {
                specialText = 'Congratulations!\nYour Score of ' + score + ' pts\nis the new High Score!';
            };
            topScoreText = topScoreText + '\n' + specialText;
            if (completedLevel === '1') {
                topScoreText = topScoreText + '\nLooks like more\nTIE Fighters are\nin enroute and\nthey need us out there!'
            } else if (completedLevel === '2') {
                topScoreText = topScoreText + '\nNice job Kid.\nYou are a true\nGalactic Defender.'
            } else if (invaded === true) {
                topScoreText = topScoreText + '\nCome on Kid.\nWe have to get back\nout there and keep on fighting!'
            }
            typeText(scoreBoardText, topScoreText);
        }, 18000);
        setTimeout(function () {
            myFadeOut(gamePlayEndArea);
        }, 34000);
        setTimeout(function () {
            scoreBoardText.style.display = 'none';
            scoreBoardText.innerText = '';
            gamePlayEndArea.style.display = 'none';
            restartArea.style.display = 'flex';
            console.log('invaded ..')
            console.log(invaded);
            console.log('completed leve')
            console.log(completedLevel)
            console.log('level of play')
            console.log(level);
            if (invaded === true) {
                playAgain.innerText = "Play Again";

            }
            if (completedLevel === '1') {
                playAgain.innerText = "Continue";
            }
            if (completedLevel === '2') {
                playAgain.innerText = "Play Again"
                // completedLevel = '2';
                localStorage.setItem('completedLevel', completedLevel);
                // level = '2';
                localStorage.setItem('level', level);
            }
            myFadeIn(restartArea);
            myFadeIn(playAgain);
        }, 36000);
        setTimeout(function () {
            myFadeIn(reboot);
        }, 37000);
    }
}

let updateScoreBoard = () => {
    let newScoreBoard = [];
    let newScore = score;
    if (scoreBoard.length === 0) {
        console.log('score board empty')
        scoreBoard.push(score);
        localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard));
        return;
    }
    for (let i = 0; i < scoreBoard.length + 1; i++) {
        console.log('inside for loop');
        if (i === 5) {
            console.log('i = 5')
            break;
        }
        if (newScore > scoreBoard[i]) {
            console.log('new score is greater than scoreboard[i}');
            newScoreBoard.push(newScore);
            console.log('new score board')
            console.log(newScoreBoard);
            newScore = scoreBoard[i];
            console.log('new score become score[i]')
        }

        if (newScore < scoreBoard[i]) {
            console.log('og score is greater than new')
            console.log('og')
            console.log(scoreBoard[i]);
            console.log('new score')
            console.log('new score')
            newScoreBoard.push(scoreBoard[i]);
        }

        if ((i + 1) > scoreBoard.length) {
            console.log('in here?')
            newScoreBoard.push(newScore);
            break;
        }
    }
    scoreBoard = newScoreBoard;
    localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard));
}

let tieFighterInvaded = () => {
    gamePlayEnded = true;
    localStorage.setItem('gamePlayEnded', gamePlayEnded);
    invaded = true;
    localStorage.setItem('invaded', invaded);
    displayGamePlayEndedArea();
}

let addPointsOnHit = () => {
    score = score + 25;
    localStorage.setItem('score', score);
    console.log(score)
};

let fireLasers = (event) => {
    if (gamePlayEnded == true) {
        return;
    }
    if (event.code === 'Space') {
        xWingFire.pause();
        xWingFire.currentTime = 0;
        //LEFT LASER
        let leftLaserId = generateId()
        let leftLaserDom = createLaserDom(leftLaserId);
        initialLaserXPosition(leftLaserDom, leftLaserId, 0.05);
        initialLaserYPosition(leftLaserDom, leftLaserId);
        growLaserHeight(leftLaserDom);
        let myLeftLaserInterval = setInterval(function () {
            moveLaser(leftLaserDom, leftLaserId, myLeftLaserInterval);
        }, laserSpeedInterval);

        //RIGHT LASER
        let rightLaserId = generateId()
        let rightLaserDom = createLaserDom(rightLaserId);
        initialLaserXPosition(rightLaserDom, rightLaserId, 4.45);
        initialLaserYPosition(rightLaserDom, rightLaserId);
        growLaserHeight(rightLaserDom);
        let myRightLaserInterval = setInterval(function () {
            moveLaser(rightLaserDom, rightLaserId, myRightLaserInterval);
        }, laserSpeedInterval);

        xWingFire.play();
    }
}

let userArrow = (event) => {
    if (gamePlayEnded == true) {
        return;
    }
    if (event.key === 'ArrowLeft') {
        if (galacticDefenderXPosition >= 1) {
            galacticDefenderXVelocity = -(xWingVelocity);
            galacticDefenderXPosition = galacticDefenderXPosition + galacticDefenderXVelocity;
            galacticDefender.style.left = `${galacticDefenderXPosition}vw`;
        }
    } else if (event.key === 'ArrowRight') {
        if (galacticDefenderXPosition <= 89) {
            galacticDefenderXVelocity = xWingVelocity;
            galacticDefenderXPosition = galacticDefenderXPosition + galacticDefenderXVelocity;
            galacticDefender.style.left = `${galacticDefenderXPosition}vw`;

        }
    }
}

let startGame = () => {
    score = 0;
    localStorage.setItem('score', 0);
    gamePlayEnded = false;
    localStorage.setItem('gamePlayEnded', false);
    invaded = false;
    localStorage.setItem('invaded', false);
    getScore();
    getGamePlayEnded();
    getInvaded();
    getScoreBoard();
    getLevel();
    getCompletedLevel();
    if (level === '2') {
        returnOfTheJedi.play();
    } else if (level === '1') {
        imperialMarch.play()
    }
    // The x position of Galactic Defender
    galacticDefenderXPosition = 0;
    galacticDefender.style.left = `${galacticDefenderXPosition}vw`;
}

let playLevelOne = () => {
    if (level === '1') {
        let myLevelOneTimeOutOne = setTimeout(function () {
            if (invaded === true || gamePlayEnded === true) {
                clearTimeout(myLevelOneTimeOutOne);
                return;
            }
            console.log('inside level 1 faster')
            laserSpeedInterval = 20;
            tieFighterInvasionSpeedInterval = 280;
            tieFighterInvasionCreationInterval = 2800;
            xWingVelocity = 3;
            tieMult = 3;
        }, 63000);
        let myLevelOneTimeOutTwo = setTimeout(function () {
            if (invaded === true || gamePlayEnded === true) {
                clearTimeout(myLevelOneTimeOutTwo);
                return;
            }
            console.log('inside level 1 fastest')
            laserSpeedInterval = 15;
            tieFighterInvasionSpeedInterval = 270;
            tieFighterInvasionCreationInterval = 2700;
            xWingVelocity = 3.5;
            tieMult = 3;
        }, 125000);
        let myLevelOneTimeOutThree = setTimeout(function () {
            if (invaded === true || gamePlayEnded === true) {
                clearTimeout(myLevelOneTimeOutThree)
                return;
            }
            console.log('almost done with level 1')
            gamePlayEnded = true;
            localStorage.setItem('gamePlayEnded', gamePlayEnded);
            invaded = false;
            localStorage.setItem('invaded', invaded);
            completedLevel = '1';
            localStorage.setItem('completedLevel', completedLevel);
            level = '2';
            localStorage.setItem('level', level);
            displayGamePlayEndedArea();
        }, 187000)
    } else {
        return;
    }
}

let playLevelTwo = () => {
    if (level === '2') {
        let myLevelTwoTimeOutOne = setTimeout(function () {
            if (invaded === true || gamePlayEnded === true) {
                clearTimeout(myLevelTwoTimeOutOne)
                return;
            }
            laserSpeedInterval = 10;
            tieFighterInvasionSpeedInterval = 260;
            tieFighterInvasionCreationInterval = 2600;
            xWingVelocity = 3.5;
            tieMult = 4;
        }, 90000);
        let myLevelTwoTimeOutTwo = setTimeout(function () {
            if (invaded === true || gamePlayEnded === true) {
                clearTimeout(myLevelTwoTimeOutTwo)
                return;
            }
            laserSpeedInterval = 8;
            tieFighterInvasionSpeedInterval = 250;
            tieFighterInvasionCreationInterval = 2500;
            xWingVelocity = 4;
            tieMult = 4;
        }, 180000);
        let myLevelTwoTimeOutThree = setTimeout(function () {
            if (invaded === true || gamePlayEnded === true) {
                clearTimeout(myLevelTwoTimeOutThree);
                return;
            }
            gamePlayEnded = true;
            localStorage.setItem('gamePlayEnded', gamePlayEnded);
            invaded = false;
            localStorage.setItem('invaded', invaded);
            completedLevel = '2';
            localStorage.setItem('completedLevel', completedLevel);
            level = '2';
            localStorage.setItem('level', level);
            displayGamePlayEndedArea();
        }, 303000)
    } else {
        return;
    }

}

let refreshReboot = () => {
    localStorage.clear();
    window.location.reload();
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
            dom.style.opacity = 1;
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
            dom.style.opacity = 1;
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

let typeText = (dom, str) => {
    dom.style.display = 'flex'
    let strB = ''
    let i = 0;
    let myTypeInterval = setInterval(function () {
        if (i == (str.length)) {
            clearInterval(myTypeInterval)
            return;
        }
        strB = strB + str[i]
        dom.innerText = strB;
        i = i + 1;
    }, 50)
}