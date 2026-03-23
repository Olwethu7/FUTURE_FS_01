// Mobile Menu Toggle
const menu = document.querySelector('#mobile-menu');
const navList = document.querySelector('.nav-links');

menu.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Smooth Scrolling for all Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navList.classList.remove('active'); // Close mobile menu on click
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Reveal Animation
const sections = document.querySelectorAll('section');
const options = { threshold: 0.2 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});
