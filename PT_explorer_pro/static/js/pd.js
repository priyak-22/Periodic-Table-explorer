document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     SIDEBAR TOGGLE
  ========================== */
  window.toggleSidebar = function () {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.toggle("open");
  };

  function openElementPopup() {
  const popup = document.getElementById("elementChartPopup");
  if (!popup) return;

  // Reset scroll every time
  popup.scrollTop = 0;

  popup.classList.remove("hidden");

  requestAnimationFrame(() => {
    popup.scrollTop = 0;
    popup.classList.add("visible");
  });
}

  /* =========================
     ELEMENT TOOLTIP
  ========================== */
  const elements = document.querySelectorAll(".element");
  const tooltip = document.getElementById("tooltip");

  elements.forEach(el => {

    el.addEventListener("mouseenter", () => {
      if (!tooltip) return;

      const { name, symbol, number, mass } = el.dataset;
      if (!name || !symbol || !number || !mass) return;

      tooltip.innerHTML = `
        <strong>${symbol}</strong><br>
        ${name}<br>
        Atomic Number: ${number}<br>
        Atomic Mass: ${mass}
      `;

      tooltip.classList.remove("hidden");
    });

    el.addEventListener("mousemove", e => {
      if (!tooltip) return;
      tooltip.style.top = e.clientY + 15 + "px";
      tooltip.style.left = e.clientX + 15 + "px";
    });

    el.addEventListener("mouseleave", () => {
      tooltip && tooltip.classList.add("hidden");
    });
  });

  /* =========================
     CATEGORY FILTER (HIGHLIGHT / DIM)
  ========================== */
  const buttons = document.querySelectorAll(".category-controls button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;

      elements.forEach(el => {
        el.classList.remove("highlight", "dim");

        if (category === "all") return;

        if (el.classList.contains(category)) {
          el.classList.add("highlight");
        } else {
          el.classList.add("dim");
        }
      });

      // Active button state
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

   /* =========================
     ELEMENT INFO + AUTO SCROLL
  ========================== */
  elements.forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault(); // stops <a href="#"> jump

      const name = el.dataset.name;
      if (!name) return;

      const targetId = name.toLowerCase() + "-info";
      const section = document.getElementById(targetId);

      if (!section) return;

      // Hide all info sections
      document.querySelectorAll(".element-info").forEach(info => {
        info.classList.add("hidden");
      });

      // Show selected section
      section.classList.remove("hidden");

      // Smooth scroll to info
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

});
