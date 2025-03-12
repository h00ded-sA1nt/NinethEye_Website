// Services data
const services = [
  {
    icon: "fas fa-robot",
    title: "AI Solutions",
    description:
      "Custom AI solutions to automate processes, enhance decision-making, and drive innovation across your business operations.",
  },
  {
    icon: "fas fa-brain",
    title: "Machine Learning",
    description:
      "Advanced machine learning models for predictive analytics, pattern recognition, and intelligent data processing.",
  },
  {
    icon: "fas fa-cogs",
    title: "Enterprise Resource Planning (ERP)",
    description:
      "Streamline your business operations with our custom ERP solutions. Integrate finance, HR, inventory, and operations into one powerful system for enhanced efficiency and data-driven decision making.",
  },
  {
    icon: "fas fa-chart-line",
    title: "Admin Panel & Dashboard Solutions",
    description:
      "Effortless Management with Smart Dashboards. Get real-time insights and control with our intuitive admin panels and analytics dashboards, designed for seamless business monitoring.",
  },
  {
    icon: "fas fa-laptop-code",
    title: "Web Application Development",
    description:
      "Build Scalable & Modern Web Apps. Create powerful, responsive web applications using cutting-edge technologies and best practices for optimal user experience.",
  },
  {
    icon: "fas fa-search",
    title: "SEO Optimization & Digital Marketing",
    description:
      "Boost Your Online Presence with AI-Driven SEO. Leverage advanced analytics and AI to improve your search rankings and drive meaningful traffic to your business.",
  },
];

// Populate services
const servicesGrid = document.querySelector(".services-grid");
services.forEach((service) => {
  const serviceCard = document.createElement("div");
  serviceCard.className = "service-card";
  serviceCard.innerHTML = `
        <i class="${service.icon}"></i>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
    `;
  servicesGrid.appendChild(serviceCard);
});

// Portfolio Data
const portfolio = [
  {
    title: "Chaitanya AI",
    description:
      "Revolutionary offline AI assistant for enhanced productivity and privacy",
    tags: ["AI", "Privacy", "Desktop Application"],
  },
  {
    title: "AI-Powered Customer Service",
    description:
      "Implemented an intelligent chatbot system for a major retail chain",
    tags: ["LLM", "AI", "Customer Service"],
  },
  // Add other portfolio items...
];

// Populate Portfolio
const portfolioGrid = document.querySelector(".portfolio-grid");
portfolio.forEach((item) => {
  const portfolioCard = document.createElement("div");
  portfolioCard.className = "portfolio-card";
  portfolioCard.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="tags">
            ${item.tags
              .map((tag) => `<span class="tag">${tag}</span>`)
              .join("")}
        </div>
    `;
  portfolioGrid.appendChild(portfolioCard);
});

// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Form submission handler
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("php/send-email.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        Toastify({
          text: data.message,
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: data.status === "success" ? "#4CAF50" : "#f44336",
          },
        }).showToast();

        if (data.status === "success") {
          document.getElementById("contact-form").reset();
        }
      })
      .catch((error) => {
        Toastify({
          text: "An error occurred while sending the message",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "#f44336",
          },
        }).showToast();
      });
  });
