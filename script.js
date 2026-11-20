/**
 * Ma'ruf Portfolio — Interactive Scripts
 * ─────────────────────────────────────────
 * Handles: dark mode, navbar, mobile menu,
 * profile photo swap, scroll animations,
 * scroll-to-top, and active nav tracking.
 */

(function () {
  'use strict';

  // ── Configuration ────────────────────────
  const CONFIG = {
    // Update these paths to change profile photos
    photo1: 'assets/photo-1.jpg',
    photo2: 'assets/photo-2.jpg',
  };

  // ── DOM Elements ─────────────────────────
  const html         = document.documentElement;
  const navbar       = document.getElementById('navbar');
  const themeToggle  = document.getElementById('theme-toggle');
  const mobileBtn    = document.getElementById('mobile-menu-btn');
  const mobileMenu   = document.getElementById('mobile-menu');
  const menuOpen     = document.getElementById('menu-icon-open');
  const menuClose    = document.getElementById('menu-icon-close');
  const profilePhoto = document.getElementById('profile-photo');
  const scrollTopBtn = document.getElementById('scroll-top');
  const navLinks     = document.querySelectorAll('.nav-link');
  const sections     = document.querySelectorAll('section[id]');

  // ── Dark Mode ────────────────────────────
  function initTheme() {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      html.classList.add('dark');
    }
  }

  function toggleTheme() {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  }

  // ── Navbar Scroll Effect ─────────────────
  function handleScroll() {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll-to-top button
    if (scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }

    // Active nav link tracking
    updateActiveNav();
  }

  // ── Active Nav Tracking ──────────────────
  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ── Mobile Menu ──────────────────────────
  let mobileMenuOpen = false;

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;

    if (mobileMenuOpen) {
      mobileMenu.classList.remove('hidden');
      menuOpen.classList.add('hidden');
      menuClose.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
      menuOpen.classList.remove('hidden');
      menuClose.classList.add('hidden');
    }
  }

  function closeMobileMenu() {
    if (mobileMenuOpen) {
      mobileMenuOpen = false;
      mobileMenu.classList.add('hidden');
      menuOpen.classList.remove('hidden');
      menuClose.classList.add('hidden');
    }
  }

  // ── Profile Photo Hover/Tap Swap ─────────
  function initProfilePhoto() {
    if (!profilePhoto) return;

    // Set image sources from config
    const primary   = profilePhoto.querySelector('.profile-img-primary');
    const secondary = profilePhoto.querySelector('.profile-img-secondary');
    if (primary)   primary.src   = CONFIG.photo1;
    if (secondary) secondary.src = CONFIG.photo2;

    // Touch/tap toggle for mobile
    let tapped = false;
    profilePhoto.addEventListener('touchstart', (e) => {
      e.preventDefault();
      tapped = !tapped;
      if (tapped) {
        profilePhoto.classList.add('tapped');
      } else {
        profilePhoto.classList.remove('tapped');
      }
    }, { passive: false });
  }

  // ── Scroll-triggered Animations ──────────
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // ── Scroll to Top ────────────────────────
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Event Listeners ──────────────────────
  function bindEvents() {
    themeToggle.addEventListener('click', toggleTheme);
    mobileBtn.addEventListener('click', toggleMobileMenu);
    scrollTopBtn.addEventListener('click', scrollToTop);

    // Close mobile menu on nav link click
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Scroll events (passive for performance)
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Close mobile menu on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) closeMobileMenu();
    });
  }

  // ── Initialization ───────────────────────
  function init() {
    initTheme();
    initProfilePhoto();
    initScrollAnimations();
    bindEvents();
    handleScroll(); // initial state
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
