
/* eslint-disable */

//document.documentElement.scrollTop = 0;

let contentSection = document.querySelectorAll('.content');

var windowOffset;

window.addEventListener('scroll', () => {

    windowOffset = window.scrollY;

    // Scroll First Section Backgrounds

    let firstSectionBg = contentSection[0].querySelector('.background');

    transformOnScroll('translateY', windowOffset, 0.008,'%', translateElement2, firstSectionBg.children[1], 2.5);
    transformOnScroll('translateY', windowOffset, -0.008,'%', translateElement, firstSectionBg.children[2], -5);

    addClassOnScroll(firstSectionBg, 'brightFilter', 350);

    // Scroll First Section Content

    let firstSectionContent = contentSection[0].querySelector('.content__top');

    transformOnScroll('translateY', windowOffset, -0.4,'%', translateElement, firstSectionContent, -100);

    // Scroll Background Second Section

    let sideRocksBg = contentSection[1].querySelector('.background');

    transformOnScroll('translateY', windowOffset, -0.16,'%', translateElement, sideRocksBg, -50);

})

function translateElement(transformation, affectedElement, displacement, maxValue) {

    if (displacement >= maxValue) {
        affectedElement.style.transform = transformation;
    }
    else {
        affectedElement.style.transform = 'translateY(' + maxValue + '%)';
    }
}

function translateElement2(transformation, affectedElement, displacement, maxValue) {

    if (displacement <= maxValue) {
        affectedElement.style.transform = transformation;
    }
}

function scaleElement(transformation, affectedElement, displacement, maxValue) {
    if (displacement <= maxValue) {
        affectedElement.style.transform = transformation;
    }

    else {
        affectedElement.style.transform = 'scale(1)';
    }
}

function transformOnScroll(transformType, offsetObject, displaceVal, unit, condition, affectedElement, maxValue) {

    let displacement = offsetObject * displaceVal;

    let transformation = transformType + '('+ displacement + unit + ')';

    condition(transformation, affectedElement, displacement, maxValue);

}


function addClassOnScroll (element, classEl, offsetRange) {

    if (windowOffset >= offsetRange) {
        element.classList.add([classEl]);
    }
    else {
        element.classList.remove([classEl]);
    }
}


// Intersection Observer

const opacity = document.querySelectorAll('.opacity');
const fade = document.querySelectorAll('.fade');

const observOptions = {
    rootMargin: "-40%"
}

const appearOnScreen = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if (!entry.isIntersecting) {

            entry.target.classList.remove('appears');
        }
        else {

            entry.target.classList.add('appears');
        }
    })

}, observOptions);

fade.forEach(element => {
    appearOnScreen.observe(element);
})

opacity.forEach(element => {
    appearOnScreen.observe(element);
})

// Shake Cave Entrance

const caveElements = contentSection[1].querySelector('.background').querySelectorAll('.bg-animate');

const shakeCave = anime.timeline({
    loop: true,
})

shakeCave.add({
    targets: caveElements[0],
    duration: 900,
    rotate: ['0deg', '-.5deg', '.5deg', '-.5deg', '.5deg', '-.5deg', '.5deg', '-.5deg', '0deg'],
    translateX: [0, 3, -3, 3, -3, 3, -3, 3, -3, 0],
    translateY: [0, 2, -2, 2, -2, 2, -2, 2, -2, 0],
    easing: 'linear'
})

shakeCave.add({
    targets: caveElements[1],
    duration: 900,
    opacity: ['.2', '.5', '.2', '.5', '.5', '.5','.2', '.5'],
    easing: 'linear',
    endDelay: 3300
})

// Move Mines on Cursor Position

const minesBackground = document.querySelectorAll('.content')[2].querySelector('.background');
animateMines = minesBackground.querySelectorAll('.bg-animate');

// Shake Mines

const shakeMines = anime.timeline({
    loop: true,
})

shakeMines.add({
    duration: 3000
})

shakeMines.add({
    targets: animateMines,
    rotate: ['0deg', '1deg', '-1deg', '1deg', '-1deg', '1deg', '-1deg', '1deg', '0deg'],
    translateX: [0, -5, 5, -5, 5, -5, 5, -5, 5, 0],
    translateY: [0, 4, -4, 4, -4, 4, -4, 4, -4, 0],
    easing: 'easeInOutBounce',
    duration: 1200,
})

var coordsX;

minesBackground.addEventListener('mousemove', (element) => {

    moveMines(0.0012, minesBackground.children[1]);
    moveMines(0.0010, minesBackground.children[2]);
    moveMines(0.0006, minesBackground.children[3]);
    moveMines(0.0004, minesBackground.children[4]);

    coordsX = element.clientX - (window.innerWidth / 2);

    function moveMines(position, el) {

        pos = position * coordsX;
        let translate = ['translateX(', pos, '%', ')'].join('');
        
        el.style.transform = translate;
    }

})

// Miner Selector

let minerSelection = contentSection[3].querySelectorAll('.minerChoice__miner');
let minerSelectionBar = contentSection[3].querySelector('.minerChoice__selectionBar');
let minerDisplay = contentSection[3].querySelector('.selectedMiner');
var movingCircle = contentSection[3].querySelector('.minerChoice .movingCircle');

let minerName = ['Mercenario', 'Pionero', 'Principiante', 'Experto', 'Empresario'];
let minerPicture = ['expertMinerAnimated', 'amateurMinerAnimated', 'amateurMinerAnimated', 'expertMinerAnimated', 'businessmanMinerAnimated'];
let minerInfo = 
    [
        'Lorem ipsum mercenario amet consectetur adipisicing elit. Aspernatur voluptas eaque exercitationem excepturi.',
        'Lorem ipsum pionero sit amet consectetur adipisicing elit. Aspernatur voluptas eaque exercitationem excepturi.',
        'Lorem ipsum principiante sit amet consectetur adipisicing elit. Aspernatur voluptas eaque exercitationem excepturi.',
        'Lorem ipsum experto sit amet consectetur adipisicing elit. Aspernatur voluptas eaque exercitationem excepturi.',
        'Lorem ipsum empresario sit amet consectetur adipisicing elit. Aspernatur voluptas eaque exercitationem excepturi.',
    ]

minerSelection.forEach((miner, index) => {
    miner.addEventListener('click', () => {
        minerDisplay.querySelector('.selectedMiner__image.show').classList.remove('show');
        minerDisplay.querySelectorAll('.selectedMiner__image')[index].classList.add('show');
        contentSection[3].querySelector('.minerChoice__additionalInfo.active').classList.remove('active');
        minerSelection[index].firstElementChild.classList.add('active');
        contentSection[3].querySelector('.selectedMiner__info h4').textContent = minerName[index];
        contentSection[3].querySelector('.selectedMiner__info p').textContent = minerInfo[index];

        contentSection[3].querySelector('.minerChoice__picture.colored').classList.remove('colored');
        contentSection[3].querySelectorAll('.minerChoice__picture')[index].classList.add('colored');

        minerSelectionBar.querySelector('.smallCircle.selected').classList.remove('selected');
        minerSelectionBar.querySelectorAll('.smallCircle')[index].classList.add('selected');

        function translateCircle(percentage) {
            let parentWidth = movingCircle.parentElement.offsetWidth;
            let translateC = 'translateX(' + percentage * parentWidth + 'px)';
            return movingCircle.style.transform = translateC;
        }

        switch(index) {
            case 0:
                movingCircle.style.transform = translateCircle(0);
                break;
            case 1:
                movingCircle.style.transform = translateCircle(0.2);
                break;
            case 2:
                movingCircle.style.transform = translateCircle(0.4);
                break;
            case 3:
                movingCircle.style.transform = translateCircle(0.6);
                break;
            case 4:
                movingCircle.style.transform = translateCircle(0.8);
                break;
        } 

        anime({
            targets: movingCircle.lastElementChild,
            scaleY: '800%',
            duration: 300,
            delay: 400,
            easing: 'linear'
        })
    })
})

// Mines Selector 

let minesSelector = contentSection[4].querySelectorAll('.mineSelector__item');
let selectedMine = contentSection[4].querySelector('.selectedMine');

selectedMine.querySelector('.selectedMine__picture .playButton').addEventListener('click', (event) => {

    if (selectedMine.querySelector('video').paused == true) {

        event.target.parentElement.classList.add('clicked');
        selectedMine.querySelector('video').play();
    }
    else {
        event.target.parentElement.classList.remove('clicked');
        selectedMine.querySelector('video').pause();
    }
})

let mineTitle =
    [
        'Video Mina Subterránea',
        'Video Mina Subacuática',
        'Mina Desértica',
        'Mina Cielo Abierto'
    ]

let mineImage =
    [
        'gameplayVideoUndergroundMine',
        'subacuaticMine',
        'desertMine',
        'openPitMine',
    ]

minesSelector.forEach((mineType, index) => {
    mineType.addEventListener('click', () => {
        

        if (index == 0) {
            selectedMine.querySelector('video').muted = false;
            selectedMine.querySelector('video').play();
            selectedMine.querySelector('.selectedMine__picture .playButton').classList.add('clicked');
            //selectedMine.querySelector('video source').src = `./img/${mineImage[index]}.mp4`;
        }
        else {
            mineType.querySelector('.mineSelector__flipFace').classList.toggle('revealed');
        }

    })
})

// Anime JS

// Second Section Title Animation

let seasonTitle = document.querySelector('.seasonTitle');
seasonTitle.firstElementChild.innerHTML = seasonTitle.textContent.replace(/\S/g, "<span>$&</span>");

    anime.timeline({
        loop: true
    })

    .add({
        targets: seasonTitle.querySelectorAll('span'),
        rotate: ['-0deg', '5deg', '-5deg', '5deg', '-5deg', '0deg'],
        scale: [1, 1.1, 1],
        easing: "linear",
        delay: anime.stagger(60),
        endDelay: 2000
    })

// Swiper JS for Team Section

const swiper = new Swiper('.swiper', {
    // Optional parameters
    speed: 1000,
    direction: 'horizontal',
    loop: true,
    slidesPerView: 3,
    spaceBetween: 80,
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

//Team Section Category Selector
let slide = document.querySelectorAll('.swiper-slide');
let teamCategorySelector = document.querySelector('.teamCategorySelBar').querySelectorAll('.teamCategorySelBar__item');

teamCategorySelector.forEach((teamCategory, index )=> {
    teamCategory.addEventListener('click', () => {
        switch (index) {
            case 0:
                swiper.slideToLoop(0);
            break;
            case 1:
                swiper.slideToLoop(3);
            break;
            case 2: 
                swiper.slideToLoop(7);
                //slide[15].style.opacity = '0';
            break;
            case 3:
                swiper.slideToLoop(9);
        }
    })
})