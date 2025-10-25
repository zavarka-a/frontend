window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hide');
    }, 1000);
});

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    document.getElementById('scroll-progress').style.width = progress + '%';
});

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const burger = document.getElementById('burger');
const modalMenu = document.getElementById('modal-menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    modalMenu.classList.toggle('active');
});

modalMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        modalMenu.classList.remove('active');
    });
});

const text = "Мы создаем цифровое будущее";
const typewriter = document.getElementById('typewriter');
let i = 0;

function type() {
    if (i < text.length) {
        typewriter.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
    }
}

setTimeout(type, 1500);

window.addEventListener('scroll', () => {
    const parallaxBg = document.querySelector('.parallax-bg');
    const scrolled = window.pageYOffset;
    if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = () => {
    scrollRevealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

let counterStarted = false;
const counters = document.querySelectorAll('.stat-number');

const animateCounters = () => {
    const statsSection = document.getElementById('stats');
    const rect = statsSection.getBoundingClientRect();
    
    if (rect.top < window.innerHeight && !counterStarted) {
        counterStarted = true;
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        });
    }
};

window.addEventListener('scroll', animateCounters);

const cards = document.querySelectorAll('.card-3d');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = item.querySelector('.accordion-content');
        const isActive = item.classList.contains('active');
        
        document.querySelectorAll('.accordion-item').forEach(accItem => {
            accItem.classList.remove('active');
            accItem.querySelector('.accordion-content').style.maxHeight = null;
        });
        
        if (!isActive) {
            item.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        setTimeout(() => {
            document.getElementById(targetTab).classList.add('active');
        }, 50);
    });
});

const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let currentSlide = 0;
const totalSlides = track.children.length;

const updateCarousel = () => {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
};

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}, 5000);

const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    [nameInput, emailInput, messageInput].forEach(input => {
        input.classList.remove('error');
    });
    
    if (nameInput.value.trim() === '') {
        nameInput.classList.add('error');
        isValid = false;
        setTimeout(() => nameInput.classList.remove('error'), 500);
    }
    
    if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
        emailInput.classList.add('error');
        isValid = false;
        setTimeout(() => emailInput.classList.remove('error'), 500);
    }
    
    if (messageInput.value.trim() === '') {
        messageInput.classList.add('error');
        isValid = false;
        setTimeout(() => messageInput.classList.remove('error'), 500);
    }
    
    if (isValid) {
        alert('Спасибо! Ваше сообщение отправлено.');
        form.reset();
    }
});
const submitBtn = document.querySelector('.submit-btn');

submitBtn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});