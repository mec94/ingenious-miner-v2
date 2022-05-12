const contentSection = document.querySelectorAll('.content');

var windowOffset;

window.addEventListener('scroll', () => {

    windowOffset = window.scrollY;

    // Scroll First Section Backgrounds

    let firstSectionBg = contentSection[0].querySelector('.background');

    if (window.innerWidth > 900) transformOnScroll('translateY', windowOffset, 0.008,'%', translateElement2, firstSectionBg.children[1], 2.5);
    if (window.innerWidth > 900) transformOnScroll('translateY', windowOffset, -0.008,'%', translateElement, firstSectionBg.children[2], -5);

    addClassOnScroll(firstSectionBg, 'brightFilter', 350);

    // Scroll First Section Content

    let firstSectionContent = contentSection[0].querySelector('.content__top');

    if (window.innerWidth > 900) transformOnScroll('translateY', windowOffset, -0.4,'%', translateElement, firstSectionContent, -100);

    // Scroll Background Second Section

    let sideRocksBg = contentSection[1].querySelector('.background');

    if (window.innerWidth > 900) transformOnScroll('translateY', windowOffset, -0.16,'%', translateElement, sideRocksBg, -50);

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

/*function scaleElement(transformation, affectedElement, displacement, maxValue) {
    if (displacement <= maxValue) {
        affectedElement.style.transform = transformation;
    }

    else {
        affectedElement.style.transform = 'scale(1)';
    }
}*/

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
    rootMargin: '-40%'
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
    translateX: [0, -3, 3, -3, 3, -3, 3, -3, 3, 0],
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
        '“Tu dame los créditos y luego hare lo que digas” <br> Este minero no es muy amigable pero puede servirte por un rato, puedes alquilarlo en el mercado negro por 7 días y tendrá un costo de 70 CM.',
        '“Salve Sam el primero de nosotros.” <br> Los pioneros fueron los primeros en llegar a Minéria, y no están disponibles a la venta, los poseedores de estos podrán, jugar partidas y obtener Medallas de Honor Minero para poder ascenderlo a Minero Principiante.',
        '“Perdón ¿Tu sabrías decirme donde tengo que picar?” <br> El minero Principiante es un NFT que te permite jugar el juego de por vida, además que con su compra obtendrás 500 CM de regalo si lo compras por 2000 CM en la sección de ofertas en el juego, también puedes comprarlo a otro usuario en el Mercado Negro, pero recuerda que esos vendrán sin CM.',
        '“Oye tu, deja de actuar como un Turister, y pica que necesitamos mas carbón” <br> El NFT Experto es uno de los mas valorados, por su posibilidad de dar becas y aumentar ese numero con Medallas de Honor, puede ser obtenido en el Mercado Negro, **o en ofertas a 8000 CM y viene con 2000 CM de regalo, y 3 espacios de becas disponibles.',
        '”¡Vamos pongan las dinamitas por ahí, quiero todos esos Diamantes!” <br> El Avaro del continente quiere todo para el, pero si no tienes NFT puedes aprovecharlos para jugar en sus becas ya que cuentan con 10 espacios para becas, valen 22000 CM y vienen con 5500 CM** de regalos. Los puedes comprar en la sección de ofertas, no creemos que encuentres en el Mercado Negro, pero prueba suerte.',
    ]

minerSelection.forEach((miner, index) => {
    miner.addEventListener('click', () => {
        minerDisplay.querySelector('.selectedMiner__image.show').classList.remove('show');
        minerDisplay.querySelectorAll('.selectedMiner__image')[index].classList.add('show');
        contentSection[3].querySelector('.minerChoice__additionalInfo.active').classList.remove('active');
        minerSelection[index].firstElementChild.classList.add('active');
        contentSection[3].querySelector('.selectedMiner__info h4').textContent = minerName[index];
        contentSection[3].querySelector('.selectedMiner__info p').innerHTML = minerInfo[index];

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

let mineContent =
    [
        'gameplayVideoUndergroundMine',
        'gameplayVideoUnderwaterMine',
        'desertMine',
        'openPitMine',
    ]

minesSelector.forEach((mineType, index) => {
    mineType.addEventListener('click', () => {
        

        if (index == 0 || index == 1) {
            selectedMine.querySelector('.selectedMine__picture .playButton').classList.add('clicked');
            selectedMine.querySelector('video source').src = `./img/${mineContent[index]}.mp4`;
            selectedMine.querySelector('video').muted = false;
            selectedMine.querySelector('video').load();
            selectedMine.querySelector('video').play();
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
    slidesPerView: 1,
    spaceBetween: 10,
    grabCursor: true,
    breakpoints: {
        900: {
            slidesPerView: 4,
            spaceBetween: 30
        },
    },
  
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

        if (document.querySelector('.teamCategorySelBar__item.clicked')) {

            document.querySelector('.teamCategorySelBar__item.clicked').classList.remove('clicked');
        }

        teamCategory.classList.add('clicked');

        switch (index) {
            case 0:
                swiper.slideToLoop(0);
            break;
            case 1:
                swiper.slideToLoop(3);
            break;
            case 2: 
                swiper.slideToLoop(6);
                //slide[15].style.opacity = '0';
            break;
            case 3:
                swiper.slideToLoop(8);
        }
    })
})