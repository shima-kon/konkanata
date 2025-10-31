document.addEventListener("DOMContentLoaded", () => {
  // ====== ハンバーガーメニュー ======
  const menuToggle = document.getElementById('menuToggle');
  const slideMenu = document.getElementById('slideMenu');

  menuToggle.addEventListener('click', function (event) {
    event.stopPropagation();
    slideMenu.classList.toggle('open');
    menuToggle.textContent = menuToggle.textContent === '☰' ? '×' : '☰';
  });

  slideMenu.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  document.addEventListener('click', function () {
    if (slideMenu.classList.contains('open')) {
      slideMenu.classList.remove('open');
      menuToggle.textContent = '☰';
    }
  });

  // ====== Title Animation ======
  const elements = document.querySelectorAll('.title');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.animate({
          opacity: [0, 1],
          transform: ['translateY(-180px)', 'translateY(0)']
        }, {
          duration: 400,
          fill: 'forwards'
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  elements.forEach(el => observer.observe(el));

  // ====== Timeline Animation ======
  const timelineElements = document.querySelectorAll('.timeline');
  timelineElements.forEach((el, i) => el.dataset.index = i);
  const timelineObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Number(entry.target.dataset.index);
        entry.target.animate({
          opacity: [0, 1],
          transform: ['translateY(50px)', 'translateY(0)']
        }, {
          duration: 800,
          delay: index * 200,
          fill: 'forwards'
        });
        setTimeout(() => observer.unobserve(entry.target), 1000);
      }
    });
  }, { threshold: 0 });
  timelineElements.forEach(el => timelineObserver.observe(el));

  // ====== Form Animation ======
  const formElements = document.querySelectorAll('.formtopdiv');
  formElements.forEach((el, i) => el.dataset.index = i);
  const formObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Number(entry.target.dataset.index);
        entry.target.animate({
          opacity: [0, 1],
          transform: ['translateY(50px)', 'translateY(0)']
        }, {
          duration: 800,
          delay: index * 200,
          fill: 'forwards'
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0 });
  formElements.forEach(el => formObserver.observe(el));

// ====== PuraibasiTop Animation ======
const praibasiTopElements = document.querySelectorAll('.praibasitopdiv');
praibasiTopElements.forEach((el, i) => el.dataset.index = i);
const praibasiTopObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = Number(entry.target.dataset.index);
      entry.target.animate({
        opacity: [0, 1],
        transform: ['translateY(50px)', 'translateY(0)']
      }, {
        duration: 800,
        delay: index * 200,
        fill: 'forwards'
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0 });
praibasiTopElements.forEach(el => praibasiTopObserver.observe(el));

// ====== Show Details Function ======
window.showDetails = function(itemId) {
  const details = document.getElementById(itemId);
  const isVisible = details.style.display === "block";
  document.querySelectorAll(".details").forEach(d => d.style.display = "none");
  if (!isVisible) {
    details.style.display = "block";
  }
};
})