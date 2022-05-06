
/* eslint-disable */

//document.documentElement.scrollTop = 0;

let contentSection = document.querySelectorAll('.content');

var windowOffset;

window.addEventListener('scroll', () => {

    windowOffset = window.scrollY;

    // Scroll First Section Backgrounds

    let bgFirstSection = contentSection[0].querySelector('.background');

    scrollElement(0, 0.03, 500, bgFirstSection.children[1], windowOffset);
    scrollElement(0, -0.07, 500, bgFirstSection.children[2], windowOffset);

    addClassOnScroll(bgFirstSection, 'brightFilter', 350);

    // Scroll First Section Content

    scrollElement(0, -1, 500, contentSection[0].querySelector('.content__top'), windowOffset);
    //scrollElement(0, -1, 500, contentSection[0].querySelector('.content__bottom'), windowOffset);

    // Scroll Background Second Section

    let sideRocksBg = contentSection[1].querySelector('.background');

    scrollElementWithPercent(-0.16, sideRocksBg);

    /*if (windowOffset >= 1100) {
        contentSection[1].querySelector('.background').style.opacity = '0'
        contentSection[2].querySelector('.background').style.opacity = '1';
    }
    else {
        contentSection[1].querySelector('.background').style.opacity = '1'
        contentSection[2].querySelector('.background').style.opacity = '0';
    }*/

})


function scrollElement (scrollPercentX, scrollPercentY, offsetRange, elementDisplaced) {
  
    let translate = ['translate(', windowOffset * scrollPercentX, 'px,', windowOffset * scrollPercentY, 'px)'].join('');

    if (windowOffset <= offsetRange) {

        elementDisplaced.style.transform = translate;
    }

}

function addClassOnScroll (element, classEl, offsetRange) {

    if (windowOffset >= offsetRange) {
        element.classList.add([classEl]);
    }
    else {
        element.classList.remove([classEl]);
    }
}

// Test Intersection Observer

let observOptions2 = {
    rootMargin: '4%'
}

var isIntersecting;

const intersectElement = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            
            isIntersecting = true;
            console.log('true')
        }

        else {
           
            isIntersecting = false;
            console.log('false')
        }
    })

}, observOptions2);

intersectElement.observe(contentSection[2]);

function scrollElementWithPercent (scrollPercentX, elementDisplaced) {

    let percentage = windowOffset * scrollPercentX;
  
    let translate = ['translateY(', percentage, '%)'].join('');
    

    if (percentage >= -51) {
        elementDisplaced.style.transform = translate;
    }
    else {
        elementDisplaced.style.transform = 'translateY(-51%)'
    }

}

// Intersection Observer

const sliders = document.querySelectorAll('.slide-in-left');
const sliders2 = document.querySelectorAll('.slide-in-right');
const faders = document.querySelectorAll('.brightFilter');
const opacity = document.querySelectorAll('.opacityFilter');

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

sliders.forEach(element => {
    appearOnScreen.observe(element);
})

faders.forEach(element => {
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
    duration: 1100,
    rotate: ['0deg', '1deg', '0deg', '1deg', '0deg', '1deg', '0deg', '1deg', '0deg', '1deg', '0deg', '1deg'],
    translateX: [0, 3, 0, -3, 0, 3, 0, -3, 0, 3, 0, -3],
    translateY: [-3, 0, 3 , 0, -3, 0, 3 , 0, -3, 0, 3 , 0],
    easing: 'easeInOutBounce'
})

// Move Mines on Cursor Position

const minesBackground = document.querySelectorAll('.content')[2].querySelector('.background');
const backgroundMines = minesBackground.children;

// Shake Mines

const shakeMines = anime.timeline({
    loop: true,
})

shakeMines.add({
    targets: backgroundMines,
    duration: 2000
})

shakeMines.add({
    targets: backgroundMines,
    rotate: ['0deg', '-1.5deg', '1.5deg', '-1.5deg', '1.5deg', '0deg'],
    easing: 'easeInOutElastic',
    duration: 1200,
})

shakeMines.add({
    targets: backgroundMines,
    duration: 3000
})

var coordsX;

minesBackground.addEventListener('mousemove', (element) => {

    moveMines(0.0010, backgroundMines[1]);
    moveMines(0.0008, backgroundMines[2]);
    moveMines(0.0004, backgroundMines[3]);
    moveMines(0.0003, backgroundMines[4]);

    coordsX = element.clientX - (window.innerWidth / 2);

    function moveMines(position, el) {

        pos = position * coordsX;
        let translate = ['translateX(', pos, '%', ')'].join('');
        
        el.style.transform = translate;
    }

})

// Miner Selector

let minerSelection = contentSection[3].querySelectorAll('.minerChoice__miner');
let minerDisplay = contentSection[3].querySelector('.selectedMiner');

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
        'undergroundMine',
        'subacuaticMine',
        'desertMine',
        'openPitMine',
    ]

minesSelector.forEach((mineType, index) => {
    mineType.addEventListener('click', () => {
        

        if (index == 0 || index == 1) {
            selectedMine.querySelector('h4').textContent = mineTitle[index];
            selectedMine.querySelector('img').src = `./img/${mineImage[index]}.png`;
        }

        (index == 0) ? mineTools.style.opacity = '1': mineTools.style.opacity = '0';

        if (index != 0) mineType.classList.toggle('revealed');

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

