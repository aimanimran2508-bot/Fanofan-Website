// =========================
// CAROUSEL / SLIDER LOGIC
// =========================
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const indicatorsContainer = document.querySelector('.indicators');

let currentIndex = 0;
let autoSlide;

if (slides.length > 0) {
    // Create indicators dynamically
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      if (i === 0) dot.classList.add('active');
      if (indicatorsContainer) indicatorsContainer.appendChild(dot);
      dot.addEventListener('click', () => goToSlide(i));
    });
}
// Get indicators after creation (handle case where container is null)
const indicators = indicatorsContainer ? indicatorsContainer.querySelectorAll('div') : [];

function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    indicators.forEach((d, i) => d.classList.toggle('active', i === index));
    currentIndex = index;
}

function nextSlide() {
    let newIndex = (currentIndex + 1) % slides.length;
    showSlide(newIndex);
}
function prevSlide() {
    let newIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(newIndex);
}
function goToSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

// Add checks for buttons before attaching listeners
if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

function startAutoSlide() {
    // *** UPDATE: Set interval to 6000ms (6 seconds) ***
    autoSlide = setInterval(nextSlide, 6000); 
}
function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

if (slides.length > 0) {
    startAutoSlide();
}

// ----------------------------------------------------
// =========================
// STICKY NAVBAR AND DYNAMIC MARGIN FIX
// =========================
const navbar = document.querySelector('.navbar');
const carouselDom = document.querySelector('.carousel'); 
const topHeader = document.querySelector('.top-header');
const headerHeight = (topHeader ? topHeader.offsetHeight : 0) + (navbar ? navbar.offsetHeight : 0);


// Only attach listener if both elements exist
if (navbar && carouselDom) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        // Check offset against the bottom of the non-sticky header
        const scrollThreshold = carouselDom.offsetTop; 

        if (scrollPosition >= scrollThreshold) {
            navbar.classList.add('sticky');
            // *** DYNAMIC MARGIN FIX: Add class when sticky ***
            carouselDom.classList.add('margin-fix'); 
        } else {
            navbar.classList.remove('sticky');
            // *** DYNAMIC MARGIN FIX: Remove class when not sticky ***
            carouselDom.classList.remove('margin-fix');
        }
    });
}

// ----------------------------------------------------
// =========================
// PRODUCT PREVIEW MODAL LOGIC
// =========================

const products = document.querySelectorAll('.products-container .product');
const previewContainer = document.querySelector('.products-preview');
const previewBoxes = document.querySelectorAll('.products-preview .preview');

// Only proceed if the main elements are present
if (products.length > 0 && previewContainer) {
    // Open correct preview
    products.forEach(product => {
        product.addEventListener('click', () => {
            const name = product.getAttribute('data-name');
            previewContainer.classList.add('active');

            previewBoxes.forEach(preview => {
                const target = preview.getAttribute('data-target');
                preview.classList.toggle('active', target === name);
            });
        });
    });

    // Close button
    previewBoxes.forEach(preview => {
        const closeBtn = preview.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                preview.classList.remove('active');
                previewContainer.classList.remove('active');
            });
        }
    });

    // Clicking outside preview closes modal
    previewContainer.addEventListener('click', e => {
        if (e.target === previewContainer) {
            previewBoxes.forEach(preview => preview.classList.remove('active'));
            previewContainer.classList.remove('active');
        }
    });
}