/* =========================
   GLOBAL HELPERS
========================= */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* =========================
   DOM READY
========================= */
document.addEventListener("DOMContentLoaded", () => {
  setupMenuToggle();
  setupLoginModal();
  setupBookingModal();
  setupScrollAnimations();
  setupSmoothScroll();
});

/* =========================
   HAMBURGER MENU
========================= */
function setupMenuToggle() {
  const menu = document.querySelector(".header ul");
  const openIcon = document.querySelector(".fa-bars-div .fa-bars");
  const closeIcon = document.querySelector(".fa-bars-div .fa-x");

  if (!menu || !openIcon || !closeIcon) return;

  openIcon.addEventListener("click", () => {
    menu.classList.add("show");
    openIcon.style.display = "none";
    closeIcon.style.display = "inline";
  });

  closeIcon.addEventListener("click", () => {
    menu.classList.remove("show");
    closeIcon.style.display = "none";
    openIcon.style.display = "inline";
  });
}

/* =========================
   LOGIN MODAL
========================= */
function setupLoginModal() {
  const loginContainer = $("#login-form-container");
  const loginLink = document.querySelector('a[href="#login-form-container"]');
  const loginForm = loginContainer?.querySelector("form");

  if (!loginContainer || !loginLink || !loginForm) return;

  // Open login
  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginContainer.style.display = "flex";
  });

  // Close when clicking outside
  loginContainer.addEventListener("click", (e) => {
    if (e.target === loginContainer) {
      loginContainer.style.display = "none";
    }
  });

  // Handle login submit
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const password = loginForm
      .querySelector('input[type="password"]')
      .value.trim();

    if (!email || !password) {
      alert("⚠️ Please enter both email and password.");
      return;
    }

    // Simulated backend response
    setTimeout(() => {
      alert(`✅ Welcome back!\nLogin successful for ${email}`);
      loginContainer.style.display = "none";
      loginForm.reset();
    }, 800);
  });
}

/* =========================
   BOOKING MODAL
========================= */
function setupBookingModal() {
  const bookingModal = $("#booking-modal");
  const closeBtn = $(".close-booking");
  const bookingForm = $("#bookingForm");
  const tourInput = $("#tourName");
  const bookButtons = $$(".btn4");

  if (!bookingModal || !bookingForm || !tourInput) return;

  // Open booking modal
  bookButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tourName =
        btn.closest(".card2")?.querySelector("h4")?.innerText ||
        "Selected Tour";

      tourInput.value = tourName;
      bookingModal.classList.add("active");
    });
  });

  // Close booking modal
  closeBtn.addEventListener("click", () => {
    bookingModal.classList.remove("active");
  });

  bookingModal.addEventListener("click", (e) => {
    if (e.target === bookingModal) {
      bookingModal.classList.remove("active");
    }
  });

  // Handle booking submit
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = $("#fullName").value.trim();
    const email = $("#bookEmail").value.trim();
    const persons = $("#persons").value.trim();

    if (!fullName || !email || !persons) {
      alert("⚠️ Please fill all booking fields.");
      return;
    }

    setTimeout(() => {
      alert(
        `🎉 Booking Confirmed!\n\nTour: ${tourInput.value}\nName: ${fullName}\nPersons: ${persons}`
      );
      bookingModal.classList.remove("active");
      bookingForm.reset();
    }, 800);
  });
}

/* =========================
   SCROLL ANIMATION
========================= */
function setupScrollAnimations() {
  const animatedElements = [
    ...$$(".card1"),
    ...$$(".card2"),
    ...$$(".each-reason"),
    ...$$(".contact-first"),
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedElements.forEach((el) => observer.observe(el));
}

