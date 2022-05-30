//Multi-Language Support

const contentSection = document.querySelectorAll('.content');

// Get language data from JSON file

let lang = loadJSON()

async function loadJSON() {
    const response = await fetch('./js/languages.json');
    const jsonfile = await response.json();
    lang = jsonfile;
    switchLanguage('es');
}

// Language switch button

let langSelector = document.querySelector('.langSelector');

langSelector.querySelectorAll('button').forEach( (btn) => {
  btn.addEventListener('click', () => {

      let langFlag = langSelector.querySelector('.currentLang button img');
      let langList = langSelector.querySelector('.langList__inner');

    if (btn.parentElement != langList) {

      langList.classList.toggle('active');
    
    }

    else {

        langList.classList.toggle('active');

        let btnLang = btn.getAttribute('language');

        langFlag.src = `./img/Lang/${btnLang}.svg`;

        langList.querySelector('button.selected').classList.remove('selected');

        btn.classList.add('selected')

        langList.classList.remove('active');

        localStorage.setItem('langSet', btnLang)

        switchLanguage(btnLang)

    }

  })
})

// Variables

let minerInfoTitle;
let minerInfoDescription;

async function switchLanguage(choice) {

    //First Section

    let ctaLinks = contentSection[0].querySelectorAll('.content__ctaLink');
    let socialMediaFollow = contentSection[0].querySelector('.socialMedia h2');

    ctaLinks[0].innerHTML = lang[choice].section[0].ctaLinks[0];

    ctaLinks[1].innerHTML = lang[choice].section[0].ctaLinks[1];
    
    socialMediaFollow.innerHTML = lang[choice].section[0].socialMedia;

    //Second Section

    let currentSeasonTitle = contentSection[1].querySelector('.seasonTitle h3');
    currentSeasonTitle.innerHTML = lang[choice].section[1].seasonTitle;

    //Third Section (Mines)

    let firstMinesTitle = contentSection[2].querySelector('.content__top h4');
    let secondMinesTitle = contentSection[2].querySelector('.content__top h3');
    let minesCtaBtn = contentSection[2].querySelector('.content__top a');

    firstMinesTitle.innerHTML = lang[choice].section[2].minesSectionTitle;

    secondMinesTitle.innerHTML = lang[choice].section[2].minesSectionSubtitle;

    minesCtaBtn.innerHTML = lang[choice].section[2].minesCtaButton;

    //Fourth Section (Miner Selection)

    let selectYourMinerTitle = contentSection[3].querySelector('.titleContainer h3');
    let minersTitle = contentSection[3].querySelectorAll('.minerChoice__additionalInfo h4');
    let firstMinerInfoTitle = contentSection[3].querySelector('.selectedMiner__info h4');
    let firstMinerInfoDescription = contentSection[3].querySelector('.selectedMiner__info p');

    selectYourMinerTitle.innerHTML = lang[choice].section[3].minersSectionTitle;

    minersTitle.forEach((minerName, index) => {
        minerName.innerHTML = lang[choice].section[3].minersNames[index];
    })

    firstMinerInfoTitle.innerHTML = lang[choice].section[3].minerInfoTitle[0];

    firstMinerInfoDescription.innerHTML = lang[choice].section[3].minerInfoDescription[0];

    minerInfoTitle = Array.from(lang[choice].section[3].minerInfoTitle);

    minerInfoDescription = Array.from(lang[choice].section[3].minerInfoDescription);

    //Fifth Section (Game Modes)

    let gameModesTitle = contentSection[4].querySelector('.content__top .titleContainer h3');
    let minesFrontTitle = contentSection[4].querySelectorAll('.mineSelector__front h4');
    let minesFlippedTitle = contentSection[4].querySelectorAll('.mineSelector__back h4');

    gameModesTitle.innerHTML = lang[choice].section[4].gameModesSectionTitle;

    minesFrontTitle.forEach((item, index) => {
        item.innerHTML = lang[choice].section[4].minesFrontTitle[index];
    })

    minesFlippedTitle.forEach((item, index) => {
        item.innerHTML = lang[choice].section[4].minesFlippedTitle[index];
    })

    //Latest Updates Section (Wordpress Blog)

    let latestUpdatesTitle = contentSection[6].querySelector('.content__top h3');
    latestUpdatesTitle.innerHTML = lang[choice].section[6].updatesSectionTitle;

    //Last Section (Team)

    let teamSectionTitle = contentSection[7].querySelector('.content__top .titleContainer h3');
    let teamRoles = Array.from(contentSection[7].querySelectorAll('.swiper-wrapper .swiper-slide p'));
    let partnersTitle = contentSection[7].querySelector('.content__bottom .titleContainer h3');

    teamSectionTitle.innerHTML = lang[choice].section[7].teamSectionTitle;

    // Swiper JS creates additional element for context. So we have to filter the ones that contains the descriptions we want to modify.

    let teamRolesFiltered = teamRoles.filter(function (teamMember, index) {
        if (index >= 4 && index <= 16) {
            return teamMember;
        }
    })

    teamRolesFiltered.forEach((teamMember, index) => {
        teamMember.innerHTML = lang[choice].section[7].teamRoles[index];
    })

    partnersTitle.innerHTML = lang[choice].section[7].partnersSectionTitle;

}