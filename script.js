// Makshroom – script.js
// Mobile menu toggle

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
}

// Heart button toggle
document.querySelectorAll('.heart-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const svg = btn.querySelector('svg');
    const isLiked = svg.getAttribute('fill') === '#e53935';
    svg.setAttribute('fill', isLiked ? 'none' : '#e53935');
    svg.setAttribute('stroke', isLiked ? '#888' : '#e53935');
  });
});
document.querySelectorAll('.read-more-btn').forEach(button => {

  button.addEventListener('click', function(e) {

    e.preventDefault();

    const target = this.dataset.target;

    const items = document.querySelectorAll(`.${target}`);

    items.forEach(item => {
      item.classList.toggle('show');
    });

    this.textContent =
      this.textContent.trim() === 'Read More'
        ? 'Show Less'
        : 'Read More';

  });

});
const toggleSnacks = document.getElementById("toggleSnacks");

if (toggleSnacks) {

    const snacks = document.querySelectorAll(".more-snacks");
    const snackText = toggleSnacks.querySelector("span");

    toggleSnacks.addEventListener("click", function (e) {

        e.preventDefault();

        const expanded = toggleSnacks.classList.toggle("expanded");

        snacks.forEach(snack => {
            snack.style.display = expanded ? "flex" : "none";
        });

        snackText.textContent = expanded
            ? "View Less Snacks"
            : "View All Snacks";

    });

}
const togglePopular = document.getElementById("togglePopular");

if (togglePopular) {

    const popularItems = document.querySelectorAll(".more-popular");
    const popularText = togglePopular.querySelector("span");

    let isExpanded = false;

    popularItems.forEach(item => {
        item.style.display = "none";
    });

    togglePopular.addEventListener("click", function (e) {

        e.preventDefault();

        isExpanded = !isExpanded;

        popularItems.forEach(item => {
            item.style.display = isExpanded ? "flex" : "none";
        });

        popularText.textContent = isExpanded
            ? "View Less Popular"
            : "View All Popular";

    });

}
// Newsletter Subscription

const emailInput = document.getElementById("newsletterEmail");
const subscribeBtn = document.getElementById("newsletterSubscribeBtn");
const message = document.getElementById("newsletterMessage");

subscribeBtn.addEventListener("click", async function () {
  if (emailInput.value.trim() === "") {

    message.textContent = "🔴 Please enter your email.";
    message.className = "error";

    return;

}
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(emailInput.value.trim())) {

    message.textContent = "🔴 Please enter a valid email address.";
    message.className = "error";

    emailInput.value = "";

    return;

}

    const response = await fetch("http://localhost:5000/subscribe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: emailInput.value
        })
    });

    const result = await response.text();

    if (response.ok) {

        message.textContent = "🟢 Thanks! You're subscribed.";
        message.className = "success";

        emailInput.value = "";

    } else {

    message.textContent = "🔴 " + result;
    message.className = "error";

    emailInput.value = "";

}
});