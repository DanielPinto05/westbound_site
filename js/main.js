// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close nav on link click (mobile)
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    }
  });
}

// Mark active nav link based on current page
document.querySelectorAll('.nav-links a').forEach((link) => {
  if (link.getAttribute('href') === window.location.pathname.split('/').pop() ||
      (window.location.pathname.endsWith('/') && link.getAttribute('href') === 'index.html')) {
    link.classList.add('active');
  }
});

// Lazy play/pause gallery videos as they enter/leave the viewport
const galleryVideos = document.querySelectorAll('.video-card video');

if (galleryVideos.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.25 }
  );
  galleryVideos.forEach((v) => observer.observe(v));
}
