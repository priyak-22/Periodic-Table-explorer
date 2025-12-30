// -----------------------
// Category Highlight Logic
// -----------------------
const buttons = document.querySelectorAll(".category-controls button");
const elements = document.querySelectorAll(".element");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;

    elements.forEach(el => {
      el.classList.remove("highlight", "dim");

      if (category === "all") return;

      if (!el.classList.contains(category)) {
        el.classList.add("dim");
      } else {
        el.classList.add("highlight");
      }
    });
  });
});

// -----------------------
// Tooltip Logic
// -----------------------
const tooltip = document.createElement("div");
tooltip.className = "element-details";
document.body.appendChild(tooltip);

elements.forEach(el => {
  el.addEventListener("mouseenter", e => {
    tooltip.innerHTML = `
      <h2>${el.dataset.name}</h2>
      <p>Atomic Number: <strong>${el.dataset.number}</strong></p>
      <p>Symbol: <strong>${el.dataset.symbol}</strong></p>
    `;
    tooltip.style.left = e.pageX + 15 + "px";
    tooltip.style.top = e.pageY + 15 + "px";
    tooltip.classList.add("show");
  });

  el.addEventListener("mousemove", e => {
    tooltip.style.left = e.pageX + 15 + "px";
    tooltip.style.top = e.pageY + 15 + "px";
  });

  el.addEventListener("mouseleave", () => {
    tooltip.classList.remove("show");
  });
});

// -----------------------
// 3D Lift + Dynamic Shadow
// -----------------------
elements.forEach(el => {
  el.addEventListener("mousemove", e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const offsetX = ((x / rect.width) - 0.5) * 20;
    const offsetY = ((y / rect.height) - 0.5) * 20;

    const bgColor = window.getComputedStyle(el).backgroundColor;

    el.style.transform = `translateX(${-offsetX}px) translateY(${-offsetY}px)`;
    el.style.boxShadow = `${offsetX}px ${offsetY}px 15px ${bgColor}`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
    el.style.boxShadow = "";
  });
});

// -----------------------
// Reset Highlight (All button)
// -----------------------
const resetButton = document.querySelector(
  '.category-controls button[data-category="all"]'
);

if (resetButton) {
  resetButton.addEventListener("click", () => {
    elements.forEach(el => {
      el.classList.remove("highlight", "dim");
    });
  });
}

// -----------------------
// Element Info Section Toggle
// -----------------------
const infoSections = document.querySelectorAll(".element-info");

elements.forEach(el => {
  el.addEventListener("click", () => {
    const elementName = el.dataset.name.toLowerCase().replace(/\s+/g, "-");
    const targetSection = document.getElementById(`${elementName}-info`);

    // hide all sections first
    infoSections.forEach(sec => sec.classList.add("hidden"));

    // show the clicked element section
    if (targetSection) {
      targetSection.classList.remove("hidden");
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});





