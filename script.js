// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const torch = document.getElementById('torch');
  const the2 = document.getElementById('the2');
  const torchTarget = document.getElementById('torchTarget');
  const lightOverlay = document.getElementById('lightOverlay');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const cursor = document.getElementById('cursor');

  // NAV hamburger toggle (mobile)
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');

    // Animate menu items when opened
    if (open) {
      gsap.fromTo('#navLinks li', { x: 20, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.06, duration: 0.35, ease: 'power2.out' });
    }
  });

  // Torch overlay on the big text area (uses relative coords)
  torchTarget.addEventListener('mousemove', (e) => {
    const r = torchTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    // set CSS variables (used by .light)
    torchTarget.style.setProperty('--x', x + 'px');
    torchTarget.style.setProperty('--y', y + 'px');
  });
  torchTarget.addEventListener('mouseleave', () => {
    // fallback to center
    torchTarget.style.setProperty('--x', '50%');
    torchTarget.style.setProperty('--y', '50%');
  });

  // Stronger torch overlay on the hero image - get coords inside #the2
  the2.addEventListener('mousemove', (e) => {
    const r = the2.getBoundingClientRect();
    const x = Math.round(e.clientX - r.left);
    const y = Math.round(e.clientY - r.top);
    // radial gradient positioned relative to the element
    torch.style.background = `radial-gradient(circle 220px at ${x}px ${y}px, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.06) 10%, rgba(0,0,0,0.85) 60%)`;
  });
  the2.addEventListener('mouseleave', () => {
    torch.style.background = `radial-gradient(circle 220px at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(0,0,0,0.85) 60%)`;
  });

  // Cursor follower using GSAP for smoothing
  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.16, ease: 'power2.out' });
  });

  // Cursor reactions on interactive elements
  const interactive = Array.from(document.querySelectorAll('a, button, .swiper-slide, .hamburger'));
  interactive.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { scale: 2.2, background: 'rgba(255,0,85,0.08)', borderWidth: 1, duration: 0.18 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { scale: 1, background: 'transparent', borderWidth: 2, duration: 0.18 });
    });
  });

  // Init Swiper
  // const swiper = new Swiper('.mySwiper', {
  //   slidesPerView: 1.15,
  //   spaceBetween: 16,
  //   loop: true,
  //   navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  //   breakpoints: {
  //     640: { slidesPerView: 2.2 },
  //     1000: { slidesPerView: 3.2 }
  //   }
  // });
  const songsSwiper = new Swiper('.mySwiper', {
  slidesPerView: 1.3,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    700: { slidesPerView: 2 },
    1100: { slidesPerView: 3 }
  }
});


  // GSAP animations
  gsap.registerPlugin(ScrollTrigger);

  // Header intro
  gsap.from('.nav-logo', { y: -8, opacity: 0, duration: 0.7, ease: 'power2.out' });
  gsap.from('.nav-links li', { y: -6, opacity: 0, stagger: 0.06, duration: 0.5, delay: 0.05, ease: 'power2.out' });

  // Hero animations
  gsap.from('.torch-target h1', { y: 40, opacity: 0, duration: 1.1, ease: 'expo.out', delay: 0.08 });
  gsap.from('#the2 img', { scale: 1.06, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 });

  // About entrance on scroll
  gsap.from('#about-img img', {
    scrollTrigger: { trigger: '#about', start: 'top 80%' },
    x: -60, opacity: 0, duration: 0.9, ease: 'power3.out'
  });
  gsap.from('#about-info', {
    scrollTrigger: { trigger: '#about', start: 'top 80%' },
    y: 30, opacity: 0, duration: 0.9, delay: 0.12, ease: 'power3.out'
  });

  // Extra small bounce for achievements
  gsap.from('#extra-info', {
    scrollTrigger: { trigger: '#extra-info', start: 'top 90%' },
    scale: .96, opacity: 0, duration: 0.9, ease: 'elastic.out(1,0.6)'
  });

  // Showcase title
  gsap.from('.showcase .title', { opacity: 0, y: 20, duration: 0.9, ease: 'power3.out', delay: 0.1 });

  // small parallax on mouse move on hero image (subtle)
  the2.addEventListener('mousemove', (e) => {
    const r = the2.getBoundingClientRect();
    const posX = (e.clientX - r.left - r.width / 2) / r.width;
    const posY = (e.clientY - r.top - r.height / 2) / r.height;
    gsap.to('#the2 img', { x: posX * 12, y: posY * 8, duration: 0.9, ease: 'power3.out' });
  });
  the2.addEventListener('mouseleave', () => { gsap.to('#the2 img', { x: 0, y: 0, duration: 0.8, ease: 'power3.out' }); });

  // make nav links close menu on click (mobile)
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }));
});

gsap.utils.toArray(".timeline-item").forEach(item => {
  gsap.to(item, {
    opacity: 1,
    x: 0,
    duration: 1,
    scrollTrigger: { trigger: item, start: "top 80%" }
  });
});

function counter(id, end) {
  let obj = { val: 0 };
  gsap.to(obj, {
    val: end, duration: 2, scrollTrigger: { trigger: "#stats", start: "top 80%" },
    onUpdate: () => document.getElementById(id).textContent = Math.floor(obj.val)
  });
}
counter("grammys", 4);
counter("billboard", 20);
counter("streams", 11);
