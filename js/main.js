/*eslint-disable*/


let windowOffset;

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
    let secondSectionTitle = contentSection[1].querySelector('.content__top');

    if (window.innerWidth > 900) transformOnScroll('translateY', windowOffset, -1,'%', translateElement, secondSectionTitle, -250);

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

const appearOnScreen = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if (!entry.isIntersecting) {

            entry.target.classList.remove('appears');
        }
        else {

            entry.target.classList.add('appears');
        }
    })

}, {});

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


let minerPicture = ['expertMinerAnimated', 'amateurMinerAnimated', 'amateurMinerAnimated', 'expertMinerAnimated', 'businessmanMinerAnimated'];

minerSelection.forEach((miner, index) => {
    miner.addEventListener('click', () => {
        minerDisplay.querySelector('.selectedMiner__image.show').classList.remove('show');
        minerDisplay.querySelectorAll('.selectedMiner__image')[index].classList.add('show');
        contentSection[3].querySelector('.minerChoice__additionalInfo.active').classList.remove('active');
        minerSelection[index].firstElementChild.classList.add('active');
        contentSection[3].querySelector('.selectedMiner__info h4').textContent = minerInfoTitle[index];
        contentSection[3].querySelector('.selectedMiner__info p').innerHTML = minerInfoDescription[index];

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
            scaleY: ['0%', '800%'],
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

            let video = selectedMine.querySelector('video');

            video.querySelector('source').src = `./img/${mineContent[index]}.mp4`;
            video.muted = false;
            video.load();
            video.play();
        }
        else {
            mineType.querySelector('.mineSelector__flipFace').classList.toggle('revealed');
        }

    })
})

// Anime JS

// Second Section Title Animation

function animateTitle() {

    let seasonTitle = contentSection[1].querySelector('.seasonTitle');
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

}

// Swiper JS for Team Section & Blog/Updates Section

const swiper = new Swiper('.swiper', {
    // Optional parameters
    speed: 1000,
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    initialSlide: 1,
    autoHeight: false,
    centeredSlides: true,
    centeredSlideBounds: true,
    spaceBetween: 10,
    grabCursor: true,
    breakpoints: {
        900: {
            slidesPerView: 4,
            spaceBetween: 30,
            initialSlide: 1
        },
    },
  
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
                swiper.slideToLoop(1);
            break;
            case 1:
                swiper.slideToLoop(4);
            break;
            case 2: 
                swiper.slideToLoop(7);
            break;
            case 3:
                swiper.slideToLoop(11);
        }
    })
})


//Team Section Flip Card w/ Info

let teamCards = document.querySelectorAll('.swiper-slide .swiper-slide-img');

teamCards.forEach((card) => {
    card.addEventListener('click', function flipCard() {
        card.classList.toggle('isFlipped');
    })
})

// Blog Updates Section
let wpPosts = getWpData(addWPPost);

async function getWpData(callback) {
    let res = await fetch('https://ingeniousminer.io/actualizaciones/wp-json/wp/v2/posts?per_page=10&categories=7,4');
    wpPosts = await res.json();
    callback();
}

const swiper2 = new Swiper('.blogUpdatesSwiper', {
    speed: 1000,
    loop: true,
    centeredSlides: false,
    initialSlide: 1,
    direction: 'horizontal',
    slidesPerView: 1,
    centeredSlidesBounds: true,
    spaceBetween: 0,
    navigation: {
        nextEl: '.swiperSelector__right',
        prevEl: '.swiperSelector__left',
    }
})

function addWPPost() {

    wpPosts.forEach((post) => {

        let postLink = post.link;
        let postImage = post.yoast_head_json.og_image[0].url;
        let postTitle = post.title.rendered;
        let postDescription = post.yoast_head_json.description;

        appendPost(postLink, postImage, postTitle, postDescription);
    })

}

function appendPost(link, picture, title, description) {
    swiper2.appendSlide(
        `<div class="featured-post__item swiper-slide">
        <a class="featured-post__link" href="${link}" target="_blank">
            <div class="featured-post__picture">
                <img src="${picture}" alt="">
            </div>
            <div class="featured-post__about">
                <h3 class="featured-post__title">
                    ${title}
                </h3>
                <p class="featured-post__description">
                    ${description}
                </p>
            </div>
        </a>
    </div>`
    )
}

// Avatar Creator Preview

let outfitMainCategories = Array.from(document.querySelectorAll('.outfitSelector__categoryItem'));
let highlightedItem = document.querySelector('.outfitSelector__previewItem img');


class outfitCategory {

    constructor (category, elements) {
        this.category = category;
        //this.imagePath = './img/avatarCreator/' + image;
        this.elements = elements;
    }

    addSubCategories() {

        var subcategories = document.querySelector('.outfitSelector__subcategories');
        
        while (subcategories.lastElementChild) {
            subcategories.removeChild(subcategories.lastElementChild)
        }

        this.elements.forEach((subcategory, index) => {

            let el = document.createElement('div');
            el.className = 'outfitSelector__categoryItem';
            el.innerHTML = 
                `<div class="outfitSelector__categoryImage">
                    <img src="./img/avatarCreator${subcategory[1][0]}" alt="">
                </div>
                <div class="outfitSelector__categoryTitle">
                    <p>${subcategory[0]}</p>
                </div>`;
            

            subcategories.appendChild(el);

            el.addEventListener('click', () => {

                this.addHTMLItems(subcategory[1]);
            })

        })
        
    }

    addHTMLItems(subcategory) {

        let outfitDisplay = document.querySelector('.outfitSelector__display');

        while (outfitDisplay.lastElementChild) {
            outfitDisplay.removeChild(outfitDisplay.lastElementChild);
        }

        subcategory.forEach((item, index) => {

            let el = document.createElement('div');
            el.className = 'outfitSelector__itemDisplay';
            let img = document.createElement('img');
            img.src = './img/avatarCreator/' + item;
            el.appendChild(img);
    
            outfitDisplay.appendChild(el);

            el.addEventListener('click', () => {
                highlightedItem.src = img.src;
            })

        })

    }
}

let outfitSubcategories = [

    [
        ['Haircuts',
            [
                '/Head/Haircuts/Resource1.png',
                '/Head/Haircuts/Resource2.png',
                '/Head/Haircuts/Resource3.png',
                '/Head/Haircuts/Resource4.png',
                '/Head/Haircuts/Resource5.png',
                '/Head/Haircuts/Resource6.png',
                '/Head/Haircuts/Resource7.png',
                '/Head/Haircuts/Resource8.png',
            ]
        ],

        ['Helmets',
            [
                '/Head/Helmets/Resource1.png', 
                '/Head/Helmets/Resource2.png',
                '/Head/Helmets/Resource3.png',
                '/Head/Helmets/Resource4.png',
            ]
        ],

        ['Glasses',
            [
                '/Head/Glasses/Resource1.png',
                '/Head/Glasses/Resource2.png',
                '/Head/Glasses/Resource3.png',
                '/Head/Glasses/Resource4.png',
            ]
        ],

        ['Headphones',
            [
                '/Head/Headphones/Resource1.png'
            ]
        ],

        ['Masks',
            [
                '/Head/Masks/Resource1.png',
                '/Head/Masks/Resource2.png',
                '/Head/Masks/Resource3.png',
                '/Head/Masks/Resource4.png',
            ]
        ]
    ],
    [
        ['Shirts',
            [
                '/Chest/Shirts/Resource1.png',
                '/Chest/Shirts/Resource2.png',
                '/Chest/Shirts/Resource3.png',
                '/Chest/Shirts/Resource4.png',
                '/Chest/Shirts/Resource5.png',
            ]
        ],

        ['Jackets',
            [
                '/Chest/Jackets/Resource1.png',
                '/Chest/Jackets/Resource2.png',
                '/Chest/Jackets/Resource3.png',
                '/Chest/Jackets/Resource4.png',
            ]
        ],

        ['Uniforms',
            [
                '/Chest/Uniforms/Resource1.png'
            ]
        ],
    ],
    [
        ['Gadgets',
            [
                '/Hands/Gadgets/Resource1.png',
                '/Hands/Gadgets/Resource2.png'
            ]
        ],
    ],
    [
        ['Belts',
            [
                '/Waist/Belts/Resource1.png',
                '/Waist/Belts/Resource2.png',
                '/Waist/Belts/Resource3.png',
                '/Waist/Belts/Resource4.png',
            ]
        ],

        ['Harness',
            [
                '/Waist/Harness/Resource1.png',
                '/Waist/Harness/Resource2.png',
                '/Waist/Harness/Resource3.png',
            ]
        ],

        ['Waistbags',
            [
                '/Waist/Waistbags/Resource1.png',
                '/Waist/Waistbags/Resource2.png',
                '/Waist/Waistbags/Resource3.png',
                '/Waist/Waistbags/Resource4.png',
            ]
        ],
    ],
    [
        ['Trousers',
            [
                '/Footlegs/Trousers/Resource1.png',
                '/Footlegs/Trousers/Resource2.png',
                '/Footlegs/Trousers/Resource3.png',
                '/Footlegs/Trousers/Resource4.png',
                '/Footlegs/Trousers/Resource5.png',
                '/Footlegs/Trousers/Resource6.png',
                '/Footlegs/Trousers/Resource7.png',
                '/Footlegs/Trousers/Resource8.png',
                '/Footlegs/Trousers/Resource9.png',
                '/Footlegs/Trousers/Resource10.png',
            ]
        ],

        ['Overalls',
            [
                '/Footlegs/Overalls/Resource1.png',
                '/Footlegs/Overalls/Resource2.png',
            ]
        ]
    ],
    [
        ['Boots',
            [
                '/Shoes/Boots/Resource1.png',
                '/Shoes/Boots/Resource2.png',
                '/Shoes/Boots/Resource3.png',
                '/Shoes/Boots/Resource4.png',
            ]
        ],
    ]

]

let outfits = [

    new outfitCategory('Cabeza', outfitSubcategories[0]),
    new outfitCategory('Torso', outfitSubcategories[1]),
    new outfitCategory('Manos', outfitSubcategories[2]),
    new outfitCategory('Cintura', outfitSubcategories[3]),
    new outfitCategory('Piernas', outfitSubcategories[4]),
    new outfitCategory('Calzado', outfitSubcategories[5]),
]

outfitMainCategories.forEach((category, index) => {
        category.addEventListener('click', () => {

            //console.log(index)
            outfits[index].addSubCategories();
            //outfits[index].addHTMLItems();
            document.querySelector('.outfitSelector__subcategories').classList.toggle('active');

            outfitMainCategories.forEach(
                (cat, catIndex) => {
                    if (catIndex > 0) {
                        outfitMainCategories[catIndex].classList.toggle('hidden');
                    }
                    else {
                        outfitMainCategories[0].classList.toggle('flipped');
                    }
                }
            )
          
        })

    })