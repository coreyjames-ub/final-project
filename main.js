// SET UP SOUNDS
const foxIntro = new Audio('sounds/fox-intro.mp3')

// DOM ELEMENTS
let enterSection = document.querySelector('#enter');
let titleArea = document.querySelector('#titleArea');
let introArea = document.querySelector('#introArea');
let productionArea = document.querySelector('#productionArea');

// EVENT LISTENERS
enterSection.addEventListener('click', function () {
    titleArea.style.display = 'none';
    introArea.style.display = 'flex';
    productionArea.style.display = 'flex';
    productionArea.style.opacity = '0';
    setTimeout(function(){
        myFadeIn(productionArea)
    }, 1500);
    productionArea.style.flexDirection = 'column'
    productionArea.style.alignItems = 'center'
    foxIntro.play();
})


// HELPER FUNCTION

let myFadeIn = (dom) => {
    let opacity = 0;
    dom.style.opacity = 0;
    let myTimer = setInterval(function(){
        if (opacity >= 1){
            clearInterval(myTimer);
        }
        dom.style.opacity = opacity;
        opacity += opacity + 0.1;
    }, 50)
}