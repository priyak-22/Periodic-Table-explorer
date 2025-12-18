// ================================
// script.js – FINAL CLEAN VERSION
// ================================

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     TOOLTIP (Periodic Table)
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
      tooltip.style.top = `${e.pageY + 10}px`;
      tooltip.style.left = `${e.pageX + 10}px`;
    });

    el.addEventListener("mouseleave", () => {
      tooltip && tooltip.classList.add("hidden");
    });

    el.addEventListener("click", () => {
      if (!window.showChart) return;

      showChart({
        name: el.dataset.name,
        symbol: el.dataset.symbol,
        number: el.dataset.number,
        mass: el.dataset.mass,
        configuration: el.dataset.configuration || "N/A",
        block: el.dataset.block || "N/A",
        group: el.dataset.group || "N/A",
        period: el.dataset.period || "N/A",
        category: el.dataset.category || "N/A",
        state: el.dataset.state || "N/A",
        discovery: el.dataset.discovery || "N/A",
        fact: el.dataset.fact || "N/A"
      });
    });
  });

  /* =========================
     SEARCH BOX
  ========================== */
  const searchInput = document.getElementById("searchBox");
  if (searchInput) {
    searchInput.addEventListener("keyup", () => {
      const q = searchInput.value.toLowerCase();
      elements.forEach(el => {
        const name = (el.dataset.name || "").toLowerCase();
        const symbol = (el.dataset.symbol || "").toLowerCase();
        el.style.display =
          name.includes(q) || symbol.includes(q) ? "flex" : "none";
      });
    });
  }

  /* =========================
     CATEGORY CARDS
  ========================== */
  const cardActions = {
    "Metals": () => alert("Metals are good conductors and found on the left side."),
    "Non-metals": () => alert("Non-metals are poor conductors."),
    "Metalloids": () => alert("Metalloids have mixed properties."),
    "Noble Gases": () => alert("Noble gases are inert."),
    "Alkali & Alkaline": () => alert("Highly reactive elements."),
    "Rare Earth": () => alert("Lanthanides and actinides.")
  };

  document.querySelectorAll(".card, .card-glow").forEach(card => {
    card.addEventListener("click", () => {
      const label = card.innerText.trim();
      cardActions[label]?.();
    });
  });

  /* =========================
     ACCORDION
  ========================== */
  document.querySelectorAll(".accordion-title").forEach(title => {
    title.addEventListener("click", () => {
      title.classList.toggle("active");
      title.nextElementSibling?.classList.toggle("open");
    });
  });

  /* =========================
     INTERSECTION OBSERVER
  ========================== */
  const trendBoxes = document.querySelectorAll(".trend-box");
  if (trendBoxes.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("highlighted");
      });
    }, { threshold: 0.3 });

    trendBoxes.forEach(box => observer.observe(box));
  }

  /* =========================
     IMAGE POPUP (Mindmaps)
  ========================== */
  document.querySelectorAll(".mindmap-thumb").forEach(img => {
    img.addEventListener("click", () => openPopup(img.src));
  });

  /* =========================
     IMAGE MODAL (Orbitals)
  ========================== */
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  const closeModal = document.getElementById("closeModal");

  if (modal && modalImg && closeModal) {
    document.querySelectorAll(".subshell img").forEach(img => {
      img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
      });
    });

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", e => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

  /* =========================
     SIDEBAR TOGGLE
  ========================== */
  window.toggleSidebar = function () {
    document.getElementById("sidebar")?.classList.toggle("open");
  };

  document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("sidebar")?.classList.remove("open");
    });
  });

  /* =========================
     SIDEBAR SCROLL HIGHLIGHT
  ========================== */
  const sidebarLinks = document.querySelectorAll(".sidebar a");
  if (sidebarLinks.length) {
    document.addEventListener("scroll", () => {
      const scrollPos = window.scrollY + 120;
      document.querySelectorAll("section[id]").forEach(section => {
        const link = document.querySelector(`.sidebar a[href="#${section.id}"]`);
        if (
          section.offsetTop <= scrollPos &&
          section.offsetTop + section.offsetHeight > scrollPos
        ) {
          sidebarLinks.forEach(a => a.classList.remove("active"));
          link?.classList.add("active");
        }
      });
    });
  }
});

/* =========================
   POPUP FUNCTIONS (GLOBAL)
========================= */
window.openPopup = function (src) {
  const popup = document.getElementById("popup");
  const img = document.getElementById("popup-img");
  if (!popup || !img) return;

  img.src = src;
  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("visible"), 10);
};

window.closePopup = function () {
  const popup = document.getElementById("popup");
  if (!popup) return;

  popup.classList.remove("visible");
  setTimeout(() => popup.classList.add("hidden"), 260);
};

/* =========================
   ELEMENT CHART POPUP
========================= */
window.showChart = function (data) {
  const popup = document.getElementById("elementChartPopup");
  if (!popup) return;

  const set = (id, val) => {
    const el = document.getElementById(id);
    el && (el.textContent = val);
  };

  set("chartElementName", data.name);
  set("chartSymbol", data.symbol);
  set("chartAtomicNumber", data.number);
  set("chartMass", data.mass);
  set("chartConfig", data.configuration);
  set("chartBlock", data.block);
  set("chartGroup", data.group);
  set("chartPeriod", data.period);
  set("chartCategory", data.category);
  set("chartState", data.state);
  set("chartDiscovery", data.discovery);
  set("chartFact", data.fact);

  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("visible"), 10);
};

window.closeChartPopup = function () {
  const popup = document.getElementById("elementChartPopup");
  if (!popup) return;

  popup.classList.remove("visible");
  setTimeout(() => popup.classList.add("hidden"), 260);
};

/* =========================
   ESC KEY HANDLER
========================= */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    window.closePopup?.();
    window.closeChartPopup?.();
  }
});

/* =========================
   JSON FETCH (DATA)
========================= */
fetch("../Data/elements.json")
  .then(res => res.json())
  .then(data => console.log("Elements loaded:", data))
  .catch(err => console.error("JSON load error:", err));
