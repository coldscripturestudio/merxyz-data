  function toggleCredits() {
    const container = document.querySelector('.image-container');
    const overlay = container.querySelector('.glass-overlay');
    container.classList.toggle('active');
    overlay.classList.toggle('hidden');
  }

  function movePill(el) {
  const pill = document.querySelector('.pill');
  const menu = document.getElementById('menu');
  const rect = el.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();

  pill.style.width = `${rect.width}px`;
  pill.style.transform = `translateX(${rect.left - menuRect.left}px)`;
}

window.addEventListener('load', () => {
  const menu = document.getElementById('menu');
  const defaultItem = menu.querySelectorAll('span')[1]; // MER.XYZ
  movePill(defaultItem);
});

function showSection(id) {
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

function movePillAndShow(el, sectionId) {
  movePill(el);
  showSection(sectionId);
}

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 1300,
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    mousewheel: true,
     keyboard: {
    enabled: true,
    onlyInViewport: true, // optional: restrict to active viewport
  },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  let hasSwiped = false;

  // Detect first user swipe or pagination click
  swiper.on('slideChangeTransitionEnd', () => {
    hasSwiped = true;
  });

  // Dropdown control
  const select = document.getElementById("slideSelector");

  select.addEventListener("change", function () {
    const index = parseInt(this.value, 10);

    if (!hasSwiped) {
      // Activate swiper by jumping to next slide quickly, then jump to desired slide
      hasSwiped = true;
      swiper.slideNext(0); // immediate jump next
      setTimeout(() => {
        swiper.slideToLoop(index, 600);
      }, 50);
    } else {
      swiper.slideToLoop(index, 600);
    }
  });

  // Optional: sync dropdown with swiper changes
  swiper.on('slideChange', () => {
    const currentIndex = swiper.realIndex;
    if (select.value != currentIndex) {
      select.value = currentIndex;
    }
  });
});

