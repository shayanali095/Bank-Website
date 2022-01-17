'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function() {
    const s1coords = section1.getBoundingClientRect();

    window.scrollTo({
        left: s1coords.left + window.pageXOffset,
        top: s1coords.top + window.pageYOffset,
        behavior: 'smooth'
    });
});


document.querySelector('.nav__links').addEventListener('click', function(e) {
    e.preventDefault();

    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth'
        });
    }
});

const tabs = document.querySelectorAll(".operations__tab");
const container = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

container.addEventListener('click', function(e) {
    const clicked = e.target.closest(".operations__tab");

    if (!clicked) return;
    tabs.forEach(re => re.classList.remove("operations__tab--active"));

    tabsContent.forEach(re => re.classList.remove("operations__content--active"));

    clicked.classList.add("operations__tab--active");

    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
    tabsContent;

});

const navigation = document.querySelector(".nav");

const navigationHandler = function(e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest(".nav").querySelectorAll(".nav__link");
        const logo = link.closest(".nav").querySelector("img");

        siblings.forEach(el => {
            if (el !== link) {
                el.style.opacity = this;
            }
            logo.style.opacity = this;
        });

    }

};

navigation.addEventListener('mouseover', navigationHandler.bind(0.5));

navigation.addEventListener('mouseout', navigationHandler.bind(1));

const intialCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', function() {
    if (window.scrollY > intialCoords.top) {
        navigation.classList.add('sticky');
    } else {
        navigation.classList.remove('sticky');
    }
});

const revealSection = function(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}
const allSections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
});

allSections.forEach(function(section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function() {
        entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);


};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '-200px'
});

imgTargets.forEach(function(img) {
    imgObserver.observe(img);
});

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");


let curSlide = 0;
const maxSlide = slides.length;
const gotoSlide = function(slide) {

    slides.forEach(function(s, i) {
        s.style.transform = `translateX(${100 *(i-slide)}%)`;
    });
}

const nextSlide = function() {
    if (curSlide === maxSlide - 1) {
        curSlide = 0;
    } else {
        curSlide++;
    }
    gotoSlide(curSlide);
    activateDot(curSlide);
}

const previousSlide = function() {
    if (curSlide === 0) {
        curSlide = maxSlide - 1;
    } else {
        curSlide--;
    }
    gotoSlide(curSlide);
    activateDot(curSlide);
}

btnLeft.addEventListener('click', previousSlide);
btnRight.addEventListener('click', nextSlide);

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        previousSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});


const dotContainer = document.querySelector(".dots");
const createDots = function() {
    slides.forEach(function(_, i) {
        dotContainer.insertAdjacentHTML('beforeend',
            `<button class="dots__dot" data-slide="${i}"></button>`)
    });
}

const activateDot = function(slide) {

    document.querySelectorAll(".dots__dot").forEach(function(dot) {
        dot.classList.remove("dots__dot--active");
    });

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
};

dotContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains("dots__dot")) {
        const slide = e.target.dataset.slide;
        gotoSlide(slide);
        activateDot(curSlide);
    }
});

const Slider = function() {
    gotoSlide(0);
    createDots();
    activateDot(curSlide);

}

Slider();