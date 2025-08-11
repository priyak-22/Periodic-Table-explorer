// script.js (cleaned & consolidated)
document.addEventListener("DOMContentLoaded", () => {
  // Tooltip logic
  const elements = document.querySelectorAll(".element");
  const tooltip = document.getElementById("tooltip");

  elements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const name = el.dataset.name;
      const symbol = el.dataset.symbol;
      const number = el.dataset.number;
      const mass = el.dataset.mass;

      if (name && symbol && number && mass && tooltip) {
        tooltip.innerHTML = `
          <strong>${symbol}</strong><br>
          ${name}<br>
          Atomic Number: ${number}<br>
          Atomic Mass: ${mass}
        `;
        tooltip.classList.remove("hidden");
      }
    });

    el.addEventListener("mousemove", (e) => {
      if (tooltip) {
        tooltip.style.top = `${e.pageY + 10}px`;
        tooltip.style.left = `${e.pageX + 10}px`;
      }
    });

    el.addEventListener("mouseleave", () => {
      if (tooltip) tooltip.classList.add("hidden");
    });

    // click to show element chart (if you have that popup logic)
    el.addEventListener("click", () => {
      const elementData = {
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
      };
      if (window.showChart) showChart(elementData);
    });
  });

  // Search box (if present)
  const searchInput = document.getElementById("searchBox");
  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      const q = this.value.toLowerCase();
      elements.forEach((el) => {
        const name = (el.dataset.name || "").toLowerCase();
        const symbol = (el.dataset.symbol || "").toLowerCase();
        el.style.display = name.includes(q) || symbol.includes(q) ? "flex" : "none";
      });
    });
  }

  // Category cards
  const cardActions = {
    "Metals": () => alert("Metals are good conductors and found on the left side of the table."),
    "Non-metals": () => alert("Non-metals are brittle, poor conductors, and found on the right side."),
    "Metalloids": () => alert("Metalloids have properties of both metals and non-metals."),
    "Noble Gases": () => alert("Noble gases are stable and unreactive. Found in Group 18."),
    "Alkali & Alkaline": () => alert("Highly reactive groups found in the first two columns."),
    "Rare Earth": () => alert("Lanthanides and actinides are in the bottom rows, some are radioactive.")
  };

  document.querySelectorAll(".card-glow, .card").forEach((card) => {
    card.addEventListener("click", () => {
      const label = card.innerText.trim();
      const action = cardActions[label];
      action ? action() : null;
    });
  });

  // Accordion titles
  document.querySelectorAll(".accordion-title").forEach((title) => {
    title.addEventListener("click", () => {
      const content = title.nextElementSibling;
      title.classList.toggle("active");
      if (content) content.classList.toggle("open");
    });
  });

  // Intersection observer for trend boxes
  const trendBoxes = document.querySelectorAll(".trend-box");
  if (trendBoxes.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("highlighted");
      });
    }, { threshold: 0.3 });
    trendBoxes.forEach(box => observer.observe(box));
  }

  // Mindmap thumbnails: attach listeners (works even if you have inline onclicks)
  document.querySelectorAll(".mindmap-thumb").forEach(img => {
    img.addEventListener("click", (e) => openPopup(e.currentTarget.src));
  });

  // Popup overlay click & image stopPropagation
  const popup = document.getElementById('popup');
  const popupImg = document.getElementById('popup-img');
  const popupClose = document.getElementById('popup-close');

  if (popup) {
    popup.addEventListener('click', closePopup);
    if (popupImg) popupImg.addEventListener('click', (e) => e.stopPropagation());
    if (popupClose) popupClose.addEventListener('click', closePopup);
  }

  // Sidebar scroll-highlighting (optional)
  document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 120; // offset for header/padding
    sections.forEach(section => {
      const id = section.id;
      const link = document.querySelector(`.sidebar a[href="#${id}"]`);
      if (section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
        document.querySelectorAll(".sidebar a").forEach(a => a.classList.remove("active"));
        if (link) link.classList.add("active");
      }
    });
  });
}); // end DOMContentLoaded

// Popup functions (global so inline onclicks still work)
window.openPopup = function (src) {
  const popup = document.getElementById('popup');
  const img = document.getElementById('popup-img');
  if (!popup || !img) return;
  img.src = src;
  // remove 'hidden' then add 'visible' to trigger fade
  popup.classList.remove('hidden');
  // tiny timeout to allow CSS transition
  setTimeout(() => popup.classList.add('visible'), 10);
};

window.closePopup = function () {
  const popup = document.getElementById('popup');
  if (!popup) return;
  popup.classList.remove('visible'); // fade out
  // after transition remove from flow (restore hidden)
  setTimeout(() => popup.classList.add('hidden'), 260);
};

// Element chart popup (if used)
window.showChart = function (elementData) {
  const el = document.getElementById("elementChartPopup");
  if (!el) return;
  // fill fields (only if they exist)
  const setText = (id, value) => {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  };
  setText("chartElementName", elementData.name || "");
  setText("chartSymbol", elementData.symbol || "");
  setText("chartAtomicNumber", elementData.number || "");
  setText("chartMass", elementData.mass || "");
  setText("chartConfig", elementData.configuration || "");
  setText("chartBlock", elementData.block || "");
  setText("chartGroup", elementData.group || "");
  setText("chartPeriod", elementData.period || "");
  setText("chartCategory", elementData.category || "");
  setText("chartState", elementData.state || "");
  setText("chartDiscovery", elementData.discovery || "");
  setText("chartFact", elementData.fact || "");
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("visible"), 10);
};

window.closeChartPopup = function () {
  const el = document.getElementById("elementChartPopup");
  if (!el) return;
  el.classList.remove("visible");
  setTimeout(() => el.classList.add("hidden"), 260);
};

// Close popup with Esc key
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    closePopup();
    closeChartPopup && closeChartPopup();
  }
});
