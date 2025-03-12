// Services Data
const services = [
    {
        title: "LLM Services",
        description: "Custom language models and AI-powered text solutions",
        icon: "fa-robot"
    },
    {
        title: "AI Agents",
        description: "Intelligent automation for business processes",
        icon: "fa-brain"
    },
    // Add other services...
];

// Portfolio Data
const portfolio = [
    {
        title: "Chaitanya AI",
        description: "Revolutionary offline AI assistant for enhanced productivity and privacy",
        tags: ["AI", "Privacy", "Desktop Application"]
    },
    {
        title: "AI-Powered Customer Service",
        description: "Implemented an intelligent chatbot system for a major retail chain",
        tags: ["LLM", "AI", "Customer Service"]
    },
    // Add other portfolio items...
];

// Populate Services
const servicesGrid = document.querySelector('.services-grid');
services.forEach(service => {
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card';
    serviceCard.innerHTML = `
        <i class="fas ${service.icon}"></i>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
    `;
    servicesGrid.appendChild(serviceCard);
});

// Populate Portfolio
const portfolioGrid = document.querySelector('.portfolio-grid');
portfolio.forEach(item => {
    const portfolioCard = document.createElement('div');
    portfolioCard.className = 'portfolio-card';
    portfolioCard.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="tags">
            ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
    `;
    portfolioGrid.appendChild(portfolioCard);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});


// Form submission handler
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    fetch('php/send-email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        Toastify({
            text: data.message,
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: data.status === 'success' ? "#4CAF50" : "#f44336"
            }
        }).showToast();
        
        if(data.status === 'success') {
            document.getElementById('contact-form').reset();
        }
    })
    .catch(error => {
        Toastify({
            text: "An error occurred while sending the message",
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "#f44336"
            }
        }).showToast();
    });
});