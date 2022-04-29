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
let hollowStarWars = document.querySelector('#hollowStarWars');
let continueButton = document.querySelector('#continueButton')

// EVENT LISTENERS
enterSection.addEventListener('click', function () {
    titleArea.style.display = 'none';
    introArea.style.display = 'flex';
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
        continueButton.addEventListener('click', function(){
            myFadeOut(longTimeArea);
        })
        setTimeout(function () {
            starWarsTheme.play();
            trailerArea.style.display = 'flex'
            trailerArea.style.alignItems = 'center'
            trailerArea.style.justifyContent = 'center'
            myShrinkText(hollowStarWars);
        }, 2000)
    } else {
        setTimeout(function () {
            myFadeOut(longTimeArea);
        }, 29000)
        setTimeout(function () {
            starWarsTheme.play();
            trailerArea.style.display = 'flex'
            trailerArea.style.alignItems = 'center'
            trailerArea.style.justifyContent = 'center'
            myShrinkText(hollowStarWars);
        }, 30000)
    }

});


// HELPER FUNCTION
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
    let fontSize = 16;
    let opacity = 1;
    let myTimer = setInterval(function () {
        if (fontSize <= 0) {
            clearInterval(myTimer);
            dom.style.display = 'none';
        }
        dom.style.fontSize = fontSize + "vw";
        dom.style.opacity = opacity;
        opacity = opacity - 0.005;
        fontSize = fontSize - 0.1;
    }, 50)
}