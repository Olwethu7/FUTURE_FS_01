// Smooth Scroll & Active Nav Link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Reveal sections on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight / 5 * 4;
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if(sectionTop < triggerBottom) section.classList.add('reveal');
  });
});

// Console log
console.log("New Legacy Barbershop - Advanced Site Loaded");
