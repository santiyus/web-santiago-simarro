const iconMenu = document.getElementById('menu-icon');
const menu = document.getElementById('menu');
const btnTop = document.getElementById('logo-menu');
const allLinkMenu = document.querySelectorAll('.menu__link');


const sSobreMi = document.getElementById('sobre-mi');
const sConocimientos = document.getElementById('conocimientos');
const sHobbies = document.getElementById('hobbies');
const sContacto = document.getElementById('contacto');


//Click logo subir arriba
btnTop.addEventListener('click', (e) => {
    window.scrollTo({ top: 0 });
})

//Boton responsive en movil y tablet
iconMenu.addEventListener('click', (e) => {
    menu.classList.toggle('menu--show')
})


//scroll y marcar el menu 
window.addEventListener('scroll', (e) => {
    allLinkMenu.forEach(link => link.classList.remove('menu__link--active'))

    if (checkElement(sSobreMi)) {
        addActiveMenuItem(sSobreMi.dataset.index)

    } else if (checkElement(sConocimientos)) {
        addActiveMenuItem(sConocimientos.dataset.index)

    } else if (checkElement(sHobbies)) {
        addActiveMenuItem(sHobbies.dataset.index)

    } else if (checkElement(sContacto)) {
        addActiveMenuItem(sContacto.dataset.index)
    }
});

const checkElement = (element) =>
    element.getBoundingClientRect().top > -100 && element.getBoundingClientRect().top < 350;

const addActiveMenuItem = (index) =>
    allLinkMenu[index].classList.add('menu__link--active')


// Añdir clase Active
menu.addEventListener('click', (e) => {
    if (menu.classList.contains('menu--show'))
        menu.classList.remove('menu--show')
        // else {
        //     allLinkMenu.forEach(link => link.classList.remove('menu__link--active'))
        //     if (e.target.localName == 'li') {
        //         e.target.children[0].classList.add('menu__link--active')
        //     } else if (e.target.localName == 'a')
        //         e.target.classList.add('menu__link--active')
        // }
})