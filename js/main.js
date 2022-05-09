
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

    transformOnScroll('translateY', windowOffset, -0.5,'%', translateElement, firstSectionContent, -50);

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
    threshold: .5
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
    endDelay: 3300
})

shakeCave.add({
    targets: caveElements,
    duration: 1000,
    rotate: ['0deg', '1deg', '-1deg', '1deg', '-1deg', '1deg', '-1deg', '1deg', '0deg'],
    translateX: [0, -3, 3, -3, 3, -3, 3, -3, 3, 0],
    translateY: [0, 2, -2, 2, -2, 2, -2, 2, -2, 0],
    easing: 'linear'
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
        minerDisplay.querySelector('h4').textContent = minerName[index];
        minerDisplay.querySelector('p').textContent = minerInfo[index];

        contentSection[3].querySelector('.minerChoice__picture.colored').classList.remove('colored');
        contentSection[3].querySelectorAll('.minerChoice__picture')[index].classList.add('colored');

        minerSelectionBar.querySelector('.smallCircle.selected').classList.remove('selected');
        minerSelectionBar.querySelectorAll('.smallCircle')[index].classList.add('selected');

        function translateCircle(percentage) {
            let parentWidth = movingCircle.parentElement.offsetWidth;
            let translateC = ['translateX(',percentage * parentWidth,'px)'].join('');
            return movingCircle.style.transform = translateC;
        }

        switch(index) {
            case 0:
                movingCircle.style.transform = translateCircle(-0.010);
                break;
            case 1:
                movingCircle.style.transform = translateCircle(0.234);
                break;
            case 2:
                movingCircle.style.transform = translateCircle(0.4775);
                break;
            case 3:
                movingCircle.style.transform = translateCircle(0.721);
                break;
            case 4:
                movingCircle.style.transform = translateCircle(0.966);
                break;
        } 

        anime({
            targets: movingCircle.lastElementChild,
            scaleY: '500%',
            duration: 300,
            delay: 400,
            easing: 'linear'
        })
    })
})

// Mines Selector 

minesSelector = contentSection[4].querySelectorAll('.mineSelector__item');
mineTools = contentSection[4].querySelector('.miningTools__selection');
selectedMine = contentSection[4].querySelector('.selectedMine');


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
        

        if (index == 0 || index == 1) {
            selectedMine.querySelector('h4').textContent = mineTitle[index];
            selectedMine.querySelector('video source').src = `./img/${mineImage[index]}.mp4`;
        }

        (index == 0) ? mineTools.style.opacity = '1': mineTools.style.opacity = '0';

        if (index != 0) mineType.querySelector('.mineSelector__flipFace').classList.toggle('revealed');

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