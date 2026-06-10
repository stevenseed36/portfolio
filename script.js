// navbar scroll effect
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a:not(.btn-resume)');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // highlight active nav link
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksMenu.classList.toggle('open');
});

navLinksMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksMenu.classList.remove('open');
  });
});

// fade in on scroll
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el));

// contact form validation
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function showError(inputId, errorId, message) {
  document.getElementById(inputId).classList.add('error');
  document.getElementById(errorId).textContent = message;
}

function clearError(inputId, errorId) {
  document.getElementById(inputId).classList.remove('error');
  document.getElementById(errorId).textContent = '';
}

['name', 'email', 'message'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => clearError(id, `${id}Error`));
});

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  let valid = true;

  if (!name) { showError('name', 'nameError', 'Please enter your name.'); valid = false; }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) { showError('email', 'emailError', 'Please enter your email.'); valid = false; }
  else if (!emailRegex.test(email)) { showError('email', 'emailError', 'Please enter a valid email.'); valid = false; }

  if (!message) { showError('message', 'messageError', 'Please enter a message.'); valid = false; }
  else if (message.length < 10) { showError('message', 'messageError', 'At least 10 characters please.'); valid = false; }

  if (!valid) return;

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      contactForm.reset();
      formSuccess.classList.add('show');
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    } else {
      throw new Error('error');
    }
  } catch (err) {
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
    alert('Something went wrong. Please try again.');
  }
});

// dark/light mode toggle
const darkToggle = document.getElementById('darkToggle');

// default to light mode, apply dark if previously saved
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  darkToggle.checked = true;
}

darkToggle.addEventListener('change', () => {
  if (darkToggle.checked) {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
});

// back to top
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
