// SET UP SOUNDS
const foxIntro = new Audio('sounds/foxIntro.mp3');
const starWarsTheme = new Audio('sounds/starWarsTheme.mp3');
const imperialMarch = new Audio('sounds/imperialMarch.mp3');
const xWingFire = new Audio('sounds/xWingFire.mp3');
const tieFighterExplosion = new Audio('sounds/tieFighterExplode.mp3');
const invadedFinale = new Audio('sounds/invadedFinale.mp3');
const levelOneCompleteSong = new Audio('sounds/levelOneComplete.mp3');
const returnOfTheJedi = new Audio('sounds/returnOfTheJedi.mp3');
const ewokCelebration = new Audio('sounds/ewokCelebration.mp3');
let music = starWarsTheme;

// DOM ELEMENTS
// Intro Area
let enterSectionText = document.querySelector('#enter');
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
// Game Area
let gameArea = document.querySelector('#gameArea');
let playGameText = document.querySelector('#playGameText');
let instructionText = document.querySelector('#instructionText');
let galacticDefender = document.querySelector('#galacticDefender');
let gamePlayEndArea = document.querySelector('#gamePlayEndArea');
let gamePlayEndText = document.querySelector('#gamePlayEndText');
let gamePlayScoreText = document.querySelector('#gamePlayScoreText');
let scoreBoardText = document.querySelector('#scoreBoardText');
let playAgain = document.querySelector('#playAgain');
let reboot = document.querySelector('#reboot');

// GAME VARIABLES
let updateTime = 'fresh';
let frequency;
let gamePlayTimeout;
let gamePlayDuration;
let gamePlayEnded = false;
let score = 0;
let invaded = false;
let completedLevel = false;
// End of Game Play Messages
let invadedText = "* Rogue Three,\n\n* This is Echo Base.\n\n* We've been Invaded.\n\n* Repeat,\n\n* We've been Invaded."
let completedLevelOneText = "* Rogue Three,\n\n* This is Echo Base.\n\n* TIE Fighters are on retreat.\n\n* Reserve X-Wing Fighters\nare in route to replace\nyour Squadron\n\n* Return to Base."
let completedLevelTwoText = "* Rogue Three,\n\n* This is Echo Base.\n\n* The DEATH STAR is destroyed!\nThe enemy is on retreat.\n\n* We have defeated the Empire\nand defended our galaxy.\n\n*Return to Base to CELEBRATE!"
// Score Board Messages
let specialText = "\nYou did alright Kid."
// Game Motion and TIE Fighter Creation Variables
let laserSpeedInterval;
let tieFighterInvasionSpeedInterval;
let tieFighterInvasionCreationInterval;
let xWingVelocity;
let tieFighterMultiplier;
// The X Position and X Velocity of the Galactic Defender
let galacticDefenderXPosition;
let galacticDefenderXVelocity;
// TIE Fighter Object Structure
let tieFighterObject = {};
// Laser Object Structure
let laserObject = {};
// Local Storage Variables
let level;
let scoreBoard;

// LOCAL STORAGE FUNCTIONS
let getLevel = () => {
    level = localStorage.getItem('level');
    if (level === null) {
        level = 'levelOne';
    }
    console.log('Get Level from Local Storage: ' + level);
    return level;
}

getLevel();

let setLevel = (level) => {
    localStorage.setItem('level', level);
}

let getScoreBoard = () => {
    scoreBoard = localStorage.getItem('scoreBoard');
    if (scoreBoard === null) {
        scoreBoard = {
            1: '- - -',
            2: '- - -',
            3: '- - -',
            4: '- - -',
            5: '- - -'
        };
    } else {
        scoreBoard = JSON.parse(scoreBoard);
    }
    console.log('Get Score Board from Local Storage:');
    console.log(scoreBoard);
}

getScoreBoard();

let setScoreBoard = (scoreBoard) => {
    localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard));
}

// EVENT LISTENERS

// A bunch of cascading time outs  -- call backs or promises would be more elegant, but I have not really mastered that yet.
enterSectionText.addEventListener('click', function () {
    myFadeOut(titleArea);
    setTimeout(function () {
        myFadeIn(introArea);
    }, 1000)
    setTimeout(function () {
        myFadeIn(productionArea);
    }, 1500);
    handleMusic(foxIntro);
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
            handleMusic(starWarsTheme, foxIntro);
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
    myFadeOut(introArea);
    setTimeout(function () {
        myFadeIn(gameArea);
        myFadeIn(playGameText);
        myFadeIn(instructionText);
    }, 1000);
});

// DEV MODE
// enterSectionText.addEventListener('click', function () {
//     myFadeOut(titleArea);
//     setTimeout(function () {
//         myFadeIn(gameArea);
//         myFadeIn(playGameText);
//         myFadeIn(instructionText);
//     }, 1000);
// });

playGameText.addEventListener('click', function () {
    level = getLevel();
    console.log('what is level: ' + level);
    gamePlayEnded = false;
    console.log('what is gamePlayEnded: ' + gamePlayEnded);
    if (invaded === true){
        score = 0;
    }
    invaded = false;
    console.log('what is invaded: ' + invaded);
    completedLevel = false;
    console.log('what is completedLevel: ' + completedLevel);
    updateTime = 'fresh';
    console.log('what is updateTime: ' + updateTime);
    gamePlayDuration = setGamePlayDuration();
    console.log('what is gamePlayDuration: ' + gamePlayDuration);
    frequency = setUpdateFrequency();
    console.log('what is frequency: ' + frequency);
    setGamePlaySpeed();
    intialGalacticDefenderXPostion();
    myFadeOut(playGameText);
    myFadeOut(instructionText);
    myFadeOut(reboot);
    let gamePlayStartMusic = determineGamePlayMusic();
    console.log('what is music: ' + music);
    console.log('what is gamePlayStartMusic: ' + gamePlayStartMusic);
    handleMusic(gamePlayStartMusic, music)
    window.addEventListener("keydown", userArrow);
    window.addEventListener('keydown', fireLasers);
    let myTieFighterInvasionInterval = setInterval(function () {
        tieFighterInvasion(myTieFighterInvasionInterval)
    }, tieFighterInvasionCreationInterval);
    gamePlayTimeout = setTimeout(function () {
        levelCompleted(gamePlayTimeout);
    }, gamePlayDuration);
    let gamePlayUpdateInterval = setInterval(function () {
        upDateGameSpeed(gamePlayUpdateInterval);
    }, frequency);
});

reboot.addEventListener('click', function () {
    refreshReboot();
})

// HELPER FUNCTIONS
let setGamePlayDuration = () => {
    if (level === 'levelOne') {
        return gamePlayDuration = 186000;
    } else if (level === 'levelTwo') {
        return gamePlayDuration = 303000;
    }
}

let upDateGameSpeed = (gamePlayUpdateInterval) => {
    if (gamePlayEnded === true) {
        clearInterval(gamePlayUpdateInterval);
        return;
    }
    setGamePlaySpeed();
}

let setGamePlaySpeed = () => {
    if (level === 'levelOne') {
        if (updateTime === 'fresh') {
            laserSpeedInterval = 35;
            tieFighterInvasionSpeedInterval = 350;
            tieFighterInvasionCreationInterval = 3500;
            xWingVelocity = 1.25;
            tieFighterMultiplier = 3;
            updateTime = 'first';
        } else if (updateTime === 'first') {
            laserSpeedInterval = 25;
            tieFighterInvasionSpeedInterval = 320;
            tieFighterInvasionCreationInterval = 3200;
            xWingVelocity = 2;
            tieFighterMultiplier = 4;
            updateTime = 'second';
        } else {
            laserSpeedInterval = 20;
            tieFighterInvasionSpeedInterval = 300;
            tieFighterInvasionCreationInterval = 3000;
            xWingVelocity = 3;
            tieFighterMultiplier = 5;
        }
    } else if (level === 'levelTwo') {
        if (updateTime === 'fresh') {
            laserSpeedInterval = 15;
            tieFighterInvasionSpeedInterval = 290;
            tieFighterInvasionCreationInterval = 2900;
            xWingVelocity = 3.25;
            tieFighterMultiplier = 5;
            updateTime = 'first';
        } else if (updateTime === 'first') {
            laserSpeedInterval = 10;
            tieFighterInvasionSpeedInterval = 280;
            tieFighterInvasionCreationInterval = 2800;
            xWingVelocity = 3.5;
            tieFighterMultiplier = 6;
            updateTime = 'second';
        } else {
            laserSpeedInterval = 8;
            tieFighterInvasionSpeedInterval = 270;
            tieFighterInvasionCreationInterval = 2700;
            xWingVelocity = 4;
            tieFighterMultiplier = 7;
        }
    }
}

let setUpdateFrequency = () => {
    frequency = Math.round(gamePlayDuration / 3);
    return frequency;
}

let handleMusic = (playMusic, pauseMusic) => {
    if (pauseMusic != null) {
        pauseMusic.pause();
        pauseMusic.currentTime = 0;
    }
    setTimeout(function () {
        playMusic.play();
    }, 100);
    music = playMusic;
};

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

let intialGalacticDefenderXPostion = () => {
    galacticDefenderXPosition = 47;
    galacticDefender.style.left = `${galacticDefenderXPosition}vw`;
}

let handleSoundEffects = (playSoundEffect) => {
    playSoundEffect.pause();
    playSoundEffect.currentTime = 0;

    setTimeout(function () {
        playSoundEffect.play();
    }, 10);
};

let determineGamePlayMusic = () => {
    let gamePlayMusic;
    if (level === 'levelOne') {
        gamePlayMusic = imperialMarch;
    } else if (level === 'levelTwo') {
        gamePlayMusic = returnOfTheJedi;
    }
    return gamePlayMusic;
};

let userArrow = (event) => {
    if (gamePlayEnded === true) {
        return;
    }
    if (event.key === 'ArrowLeft') {
        if (galacticDefenderXPosition >= 1) {
            galacticDefenderXVelocity = -(xWingVelocity);
            galacticDefenderXPosition = galacticDefenderXPosition + galacticDefenderXVelocity;
            galacticDefender.style.left = `${galacticDefenderXPosition}vw`;
        }
    } else if (event.key === 'ArrowRight') {
        if (galacticDefenderXPosition <= 93) {
            galacticDefenderXVelocity = xWingVelocity;
            galacticDefenderXPosition = galacticDefenderXPosition + galacticDefenderXVelocity;
            galacticDefender.style.left = `${galacticDefenderXPosition}vw`;

        }
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

let addPointsOnHit = () => {
    score = score + 25;
    localStorage.setItem('score', score);
    console.log(score)
};

let moveLaser = (laserDom, laserId, myLaserInterval) => {
    if (gamePlayEnded === true) {
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
            handleSoundEffects(tieFighterExplosion);
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

let fireLasers = (event) => {
    if (gamePlayEnded === true) {
        return;
    }
    if (event.code === 'Space') {

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

        handleSoundEffects(xWingFire);
    }
}

let createTieFighterDom = (tieFighterId) => {
    let tieFighterDom = document.createElement('img');
    tieFighterDom.src = 'assets/tieFighter.png';
    tieFighterDom.style.display = 'flex';
    tieFighterDom.style.position = 'absolute';
    tieFighterDom.id = tieFighterId;
    tieFighterObject[tieFighterId] = {
        tieFighterXPosition: 0,
        tieFighterYPosition: 0,
    }
    gameArea.appendChild(tieFighterDom);
    return tieFighterDom;
}

let initialTieFighterXPosition = (tieFighterDom, tieFighterId) => {
    let tieFighterXPosition = Math.ceil(Math.random() * 93);
    tieFighterDom.style.left = tieFighterXPosition + 'vw';
    tieFighterObject[tieFighterId].tieFighterXPosition = tieFighterXPosition;
}

let initialTieFighterYPosition = (tieFighterDom, tieFighterId) => {
    let tieFighterYPosition = 0;
    tieFighterDom.style.top = tieFighterYPosition + 'vh';
    tieFighterObject[tieFighterId].tieFighterYPosition = tieFighterYPosition;
}

let moveTieFighter = (tieFighterDom, tieFighterId, myTieFighterMoveInterval, myTieFighterInvasionInterval) => {
    if (gamePlayEnded === true) {
        tieFighterDom.remove();
        delete tieFighterObject[tieFighterId];
        clearInterval(myTieFighterMoveInterval);
        clearInterval(myTieFighterInvasionInterval);
        clearTimeout(gamePlayTimeout);
        return;
    }
    if (tieFighterDom.style.display === 'none') {
        tieFighterDom.remove();
        delete tieFighterObject[tieFighterId];
        clearInterval(myTieFighterMoveInterval);
        return;
    }
    let tieFighterYPosition = tieFighterObject[tieFighterId].tieFighterYPosition + 1;
    tieFighterDom.style.top = tieFighterYPosition + 'vh';
    if (tieFighterYPosition >= 90) {
        tieFighterDom.remove();
        delete tieFighterObject[tieFighterId];
        clearInterval(myTieFighterMoveInterval);
        clearInterval(myTieFighterInvasionInterval);
        tieFighterInvaded();
        return;
    }
    tieFighterObject[tieFighterId].tieFighterYPosition = tieFighterYPosition;
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

let tieFighterInvasion = (myTieFighterInvasionInterval) => {
    if (gamePlayEnded === true) {
        return;
    }
    for (let i = 0; i < tieFighterMultiplier; i++) {
        let tieFighterId = generateId();
        let tieFighterDom = createTieFighterDom(tieFighterId);
        initialTieFighterXPosition(tieFighterDom, tieFighterId);
        initialTieFighterYPosition(tieFighterDom, tieFighterId);

        let myTieFighterMoveInterval = setInterval(function () {
            moveTieFighter(tieFighterDom, tieFighterId, myTieFighterMoveInterval, myTieFighterInvasionInterval);
        }, tieFighterInvasionSpeedInterval);
    }
}

let tieFighterInvaded = () => {
    gamePlayEnded = true;
    invaded = true;
    invadedText;
    updateScoreBoard();
    displayGamePlayEndedArea(invadedFinale, invadedText);
}

let levelCompleted = (gamePlayTimeout) => {
    clearTimeout(gamePlayTimeout);
    gamePlayEnded = true;
    completedLevel = true;
    let text;
    let endMusic;
    if (level === 'levelOne') {
        text = completedLevelOneText;
        endMusic = levelOneCompleteSong;
        level = 'levelTwo';
        setLevel(level);
    } else {
        text = completedLevelTwoText;
        endMusic = ewokCelebration;
        level = 'levelOne';
        setLevel(level);
    };
    updateScoreBoard();
    displayGamePlayEndedArea(endMusic, text);
};

let printScoreBoardText = () => {
    let topScoresText = "Top Scores:"
    for (let i = 1; i < 6; i++) {
        topScoresText = topScoresText + "\n" + (i) + ". " + scoreBoard[i] + " pts";
        if (scoreBoard[i] === score) {
            specialText = "\nYour Score of " + score + " pts\nmade the Leader Board.";
        };
    };
    if (scoreBoard[1] === score) {
        specialText = '\nCongratulations, new High Score!';
    };
    topScoresText = topScoresText + '\n' + specialText;
    let gameOverText;
    if (invaded === true){
        gameOverText = "\n\nWe've been Invaded!\n\nLet's Play Again!"
    } else {
        if (level === 'levelTwo') {
            gameOverText = "\n\nYou completed Level One\n\nLet's Play Level Two!"
        } else {
            gameOverText =  "\n\nYou beat the Game!\n\nPlay again for a new High Score!"
        }
    }
    topScoresText = topScoresText + gameOverText
    typeText(scoreBoardText, topScoresText);
}

let updateScoreBoard = () => {
    let tempScore = score;
    let bump;
    for (let i = 1; i < 6; i++) {
        if (scoreBoard[i] === '- - -') {
            scoreBoard[i] = tempScore;
            break;
        }
        if (tempScore > scoreBoard[i]) {
            bump = scoreBoard[i];
            scoreBoard[i] = tempScore;
            tempScore = bump;
        }
    }
    setScoreBoard(scoreBoard);
}

let eraseTextHideArea = (dom) => {
    dom.style.display = 'none';
    dom.innerText = '';
}

let displayGamePlayEndedArea = (gamePlayEndMusic, endText) => {
    handleMusic(gamePlayEndMusic, music);
    myFadeIn(gamePlayEndArea);
    typeText(gamePlayEndText, endText);
    setTimeout(function () {
        myFadeOut(gamePlayEndArea);
    }, 10000);
    setTimeout(function () {
        eraseTextHideArea(gamePlayEndText);
        let scoreText = `Score: ${score} pts`;
        gamePlayEndArea.style.top = '30vh';
        gamePlayEndArea.style.left = '35vw';
        gamePlayEndArea.style.display = 'flex';
        myFadeIn(gamePlayEndArea);
        typeText(gamePlayScoreText, scoreText);
    }, 12000);
    setTimeout(function () {
        myFadeOut(gamePlayEndArea);
    }, 17000);
    setTimeout(function () {
        eraseTextHideArea(gamePlayScoreText);
        gamePlayEndArea.style.top = '8vh';
        gamePlayEndArea.style.left = '17vw';
        gamePlayEndArea.style.display = 'flex';
        myFadeIn(gamePlayEndArea);
        printScoreBoardText();
    }, 19000);
    setTimeout(function () {
        myFadeOut(gamePlayEndArea);
    }, 34000);
    setTimeout(function () {
        eraseTextHideArea(scoreBoardText)
        myFadeIn(playGameText);
        myFadeIn(instructionText);
    }, 36000);
    setTimeout(function () {
        myFadeIn(reboot);
    }, 38000);
}

let refreshReboot = () => {
    localStorage.clear();
    window.location.reload();
}