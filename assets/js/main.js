/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = $("#nav-menu"),
    navToggle = $("#nav-toggle"),
    navClose = $("#nav-close")

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.on('click', function () {
        navMenu.addClass('show-menu');
    });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.on('click', function () {
        navMenu.removeClass('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLinks = $(".nav__link").get(); // .get() will return the iterable nodelist

function linkAction() {
    // When we click on each nav__link, we remove the show-menu class
    navMenu.removeClass('show-menu');
}
navLinks.forEach(n => $(n).on('click', linkAction));

// === ALTERNATE METHOD ===

/*

const navLinks = $(".nav__link"); // $(".nav__link") will return a JQuery object instead of an actual array or a nodelist

function linkAction(){
    // When we click on each nav__link, we remove the show-menu class
    navMenu.removeClass('show-menu');
}

// .each() is used because we are iterating over a JQuery object
navLinks.each(function() {
    $(this).on('click', linkAction);
});

*/

/*==================== ACCORDION SKILLS ====================*/
// Get all elements with the class "skills__content"
const skillsContent = $(".skills__content");
const skillsTopic = $(".skills__topic");

// Attach a click event listener to the child with class "skills__header" for each element

// Outer Accordion
skillsContent.on("click", ".skills__header", function () {
    // Toggle the second class between "skills__open" and "skills__close"
    const content = $(this).closest(".skills__content");
    content.toggleClass("skills__open skills__close");

    // Close all inner accordions upon closing outer accordion
    if (content.hasClass("skills__close")) {
        content.find(".skills__topic").removeClass("skills__topic__open").addClass("skills__topic__close");
    }
});

// Inner Accordion
skillsTopic.on("click", ".skills__topic__header", function () {
    // Toggle the second class between "skills__open" and "skills__close"
    $(this).closest(".skills__topic").toggleClass("skills__topic__open skills__topic__close");
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = $('[data-target]'),
    tabContents = $('[data-content]');

tabs.on("click", function () {
    // Remove the "qualification__active" class from both tabContents
    tabContents.removeClass('qualification__active')

    // Add the "qualification__active" class to the clicked tabContent
    $($(this).data('target')).addClass('qualification__active');

    // Remove the "qualification__active" class from both tabs
    tabs.removeClass('qualification__active');

    // Add the "qualification__active" class to the clicked tab
    $(this).addClass('qualification__active');
})


/*==================== SERVICES MODAL ====================*/
const modalBtns = $('.services__button'),
    modalCloses = $('.services__modal-close');

modalBtns.on("click", function () {
    $(this).closest(".services__content").find(".services__modal").addClass("active-modal");
});

modalCloses.on("click", function () {
    console.log("Close Clicked");
    $(this).closest(".services__content").find(".services__modal").removeClass("active-modal");
});

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,
    // grabCursor: true,
    autoplay: {
        delay: 10000, // Delay between transitions in milliseconds
        disableOnInteraction: true, // Whether to disable autoplay on user interaction
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper('.testimonial__container', {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,

    autoplay: {
        delay: 10000, // Delay between transitions in milliseconds
        disableOnInteraction: true, // Whether to disable autoplay on user interaction
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    breakpoints: {
        568: {
            slidesPerView: 2,
        }
    }
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
/* const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive) */

$(window).on('scroll', function () {
    const scrollY = $(window).scrollTop();

    $('section[id]').each(function () {
        const section = $(this);
        const sectionHeight = section.outerHeight();
        const sectionTop = section.offset().top - 50;
        let sectionId = section.attr('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            $('.nav__menu a[href*=' + sectionId + ']').addClass('active-link');
        } else {
            $('.nav__menu a[href*=' + sectionId + ']').removeClass('active-link');
        }
    });
});



/*==================== CHANGE BACKGROUND HEADER ====================*/
$(window).on('scroll', function () {
    const nav = $('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 80 ? nav.addClass('scroll-header') : nav.removeClass('scroll-header');
})

/*==================== SHOW SCROLL UP ====================*/
$(window).on('scroll', function () {
    const scrollUp = $('#scroll-up'); // Add the dot to indicate it's a class selector
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-up ID
    this.scrollY >= 560 ? scrollUp.addClass('show-scroll') : scrollUp.removeClass('show-scroll');
});

/* function scrollTop(){
    const scrollTop = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop) */



/*==================== DARK LIGHT THEME ====================*/
const themeButton = $('#theme-button');

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');

// We validate on pageload, if the user previously chose a theme
if (selectedTheme) {
    // If the validation is fulfilled, it means the theme has already been selected.
    // If the theme selected is dark, only then we need to take action, because the website will in light theme by default upon pageload.
    if (selectedTheme === 'dark') {
        $('body').addClass('dark-theme');
        themeButton.removeClass('uil-moon');
        themeButton.addClass('uil-sun');
    }
}

themeButton.on("click", function () {
    // Toggle the second class between "skills__open" and "skills__close"
    $('body').toggleClass("dark-theme");
    $(this).toggleClass("uil-moon uil-sun");
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', $('body').hasClass('dark-theme') ? 'dark' : 'light');
});