
  
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const dropdowns = document.querySelectorAll(".dropdown");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// For mobile dropdown toggle
dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector("a");
    link.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle("active");
        }
    });
});

// Set active state for navigation items
const navItems = document.querySelectorAll(".nav-links a");
navItems.forEach((item) => {
    if (window.location.hash === item.getAttribute("href")) {
        item.classList.add("active");
    }

    item.addEventListener("click", () => {
        navItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
    });
});


// <!-- hero after intro  -->
      let currentSlide = 0;

      function changeSlide(direction) {
        const slides = document.querySelector(".slider");
        const totalSlides = document.querySelectorAll(".slider img").length;

        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
      //  slides.style.transform = `translateX(-${currentSlide * 100}%)`;

        updateDots();
      }

      function goToSlide(index) {
        currentSlide = index;
        document.querySelector(".slider").style.transform = `translateX(-${
          currentSlide * 100
        }%)`;
        updateDots();
      }

      function updateDots() {
        document.querySelectorAll(".dot").forEach((dot, index) => {
          dot.classList.toggle("active", index === currentSlide);
        });
      }

      // Auto slide every 3 seconds
      setInterval(() => changeSlide(1), 3000);