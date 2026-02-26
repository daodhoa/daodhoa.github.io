// MUSIC
function toggleMusic() {
  const music = document.getElementById('bgMusic');
  const record = document.querySelector('.record-icon');

  if (music.paused) {
    music.play().then(() => {
      record.classList.add('playing');
    }).catch(error => console.error("Playback failed:", error));
  } else {
    music.pause();
    record.classList.remove('playing');
  }
}

// Auto-play on first interaction (required by browser security)
document.addEventListener('click', function initMusic() {
  const music = document.getElementById('bgMusic');
  const record = document.querySelector('.record-icon');
  if (music.paused) {
    music.play().then(() => {
      record.classList.add('playing');
    }).catch(e => console.log("Autoplay blocked"));
  }
  document.removeEventListener('click', initMusic);
}, { once: true });

document.addEventListener('touchstart', function initMusic() {
  const music = document.getElementById('bgMusic');
  const record = document.querySelector('.record-icon');
  if (music.paused) {
    music.play().then(() => {
      record.classList.add('playing');
    }).catch(e => console.log("Autoplay blocked"));
  }
  document.removeEventListener('touchstart', initMusic);
}, { once: true });

// COUNTDOWN
const target = new Date("2026-03-28T16:00:00").getTime();
setInterval(() => {
  const now = new Date().getTime();
  const d = target - now;
  if (d < 0) return;
  days.innerText = Math.floor(d / 86400000);
  hours.innerText = Math.floor(d / 3600000) % 24;
  minutes.innerText = Math.floor(d / 60000) % 60;
  seconds.innerText = Math.floor(d / 1000) % 60;
}, 1000);

// GALLERY
const images = [
  "assets/images/gallery1.jpg",
  "assets/images/gallery2.jpg",
  "assets/images/gallery3.jpg",
  "assets/images/gallery4.jpg",
  "assets/images/gallery5.jpg",
  "assets/images/gallery6.jpg"
];
let currentIndex = 0;

// Select image by clicking thumbnail
function selectImage(index) {
  currentIndex = index;
  updateMainImage();
  updateThumbnails();
}

// Change image with prev/next buttons
function changeImage(direction) {
  currentIndex = (currentIndex + direction + images.length) % images.length;
  updateMainImage();
  updateThumbnails();
}

// Update main image
function updateMainImage() {
  document.getElementById('mainImage').src = images[currentIndex];
}

// Update thumbnail active state
function updateThumbnails() {
  const thumbnails = document.querySelectorAll('.thumbnails img');
  thumbnails.forEach((thumb, index) => {
    const isActive = index === currentIndex;
    thumb.classList.toggle('active', isActive);
    if (isActive) {
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  });
}

// Open lightbox
function openLightbox() {
  const lightbox = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = images[currentIndex];
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Navigate in lightbox
function navigateLightbox(direction) {
  currentIndex = (currentIndex + direction + images.length) % images.length;
  document.getElementById('lightbox-img').src = images[currentIndex];
  updateThumbnails();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (lightbox.classList.contains('active')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  }
});

// GIFT MODAL
function openGiftModal() {
  const modal = document.getElementById('giftModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeGiftModal() {
  const modal = document.getElementById('giftModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Keyboard support for gift modal
document.addEventListener('keydown', (e) => {
  const giftModal = document.getElementById('giftModal');
  if (giftModal && giftModal.classList.contains('active') && e.key === 'Escape') {
    closeGiftModal();
  }
});

// PRELOADER
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('fade-out');
    document.body.style.overflow = ''; // Restore scroll
  }, 1500); // Small delay for smooth transition
});

// PERSONALIZED INVITE LOGIC
function initPersonalizedInvite() {
  const urlParams = new URLSearchParams(window.location.search);
  const u = urlParams.get('u'); // User name
  const r = urlParams.get('r'); // Relationship (Anh/Chị/Bạn...)
  const s = urlParams.get('s'); // Suffix type (1: người thương, 2: gia đình)

  const personalized = document.getElementById('personalized-invite');
  const defaultInvite = document.getElementById('default-invite');

  if (u || r) {
    if (personalized && defaultInvite) {
      defaultInvite.style.display = 'none';
      personalized.style.display = 'block';

      document.getElementById('guest-r').innerText = r || '';
      document.getElementById('guest-u').innerText = u || '';

      let suffixText = '';
      if (s === '1') suffixText = 'và người thương';
      else if (s === '2') suffixText = 'và gia đình';
      else if (s) suffixText = s; // Cho phép điền text tự do nếu cần

      document.getElementById('guest-s').innerText = suffixText;
    }
  }
}

// Ensure it runs after DOM load
document.addEventListener('DOMContentLoaded', initPersonalizedInvite);
