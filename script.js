let slideIndex = 1;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Testimonials Slideshow
    showSlides(slideIndex);
    
    // Auto cycle testimonials slider every 6 seconds
    setInterval(() => {
        plusSlides(1);
    }, 6000);

    // 2. Form processing handler
    const contactForm = document.getElementById('contactForm');
    const statusBox = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitBtn.innerText = "Processing...";
        submitBtn.style.opacity = "0.7";

        setTimeout(() => {
            const email = document.getElementById('email').value;
            if (email.includes('@')) {
                statusBox.innerHTML = "THANK YOU — YOUR MESSAGE HAS BEEN SUBMITTED";
                statusBox.className = "status-box success";
                contactForm.reset();
            } else {
                statusBox.innerHTML = "ERROR — PLEASE PROVIDE A VALID EMAIL";
                statusBox.className = "status-box error";
            }
            submitBtn.innerText = "Send Message";
            submitBtn.style.opacity = "1";
        }, 1500);
    });

    // 3. Automated Counting Sequence Intersection Observer
    const metricsSection = document.getElementById('impact');
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    const startCounting = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const speed = target / 100; // Calibrate computation resolution speed
            
            const updateCount = () => {
                const current = parseInt(counter.innerText);
                if (current < target) {
                    counter.innerText = Math.ceil(current + speed) + (target > 1000 && current + speed >= target ? '+' : '');
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + (target > 1000 ? '+' : '');
                }
            };
            updateCount();
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                startCounting();
                animated = true; // Ensure transition only fires once
            }
        });
    }, { threshold: 0.3 });

    observer.observe(metricsSection);

    // Smooth Navigation Scrolling
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Slideshow Navigation Helpers
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (slides.length === 0) return;
    
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
