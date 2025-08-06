document.addEventListener("DOMContentLoaded", () => {
  // ✅ Tooltip logic
  const elements = document.querySelectorAll(".element");
  const tooltip = document.getElementById("tooltip");

  elements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      const name = el.dataset.name;
      const symbol = el.dataset.symbol;
      const number = el.dataset.number;
      const mass = el.dataset.mass;

      if (name && symbol && number && mass) {
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
      tooltip.style.top = `${e.pageY + 10}px`;
      tooltip.style.left = `${e.pageX + 10}px`;
    });

    el.addEventListener("mouseleave", () => {
      tooltip.classList.add("hidden");
    });

    // ✅ Click to show detailed chart (optional)
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
      showChart(elementData);
    });
  });

  // ✅ Search bar functionality
  const searchInput = document.getElementById("searchBox");
  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      const query = this.value.toLowerCase();
      elements.forEach((el) => {
        const name = el.dataset.name.toLowerCase();
        const symbol = el.dataset.symbol.toLowerCase();
        el.style.display = name.includes(query) || symbol.includes(query) ? "flex" : "none";
      });
    });
  }

  // ✅ Category card logic
  const cardActions = {
    "🛠️ Metals": () =>
      alert("Metals are good conductors and found on the left side of the table."),
    "🌿 Non-metals": () =>
      alert("Non-metals are brittle, poor conductors, and found on the right side."),
    "⚖️ Metalloids": () =>
      alert("Metalloids have properties of both metals and non-metals."),
    "💨 Noble Gases": () =>
      alert("Noble gases are stable and unreactive. Found in Group 18."),
    "🔥 Alkali & Alkaline": () =>
      alert("Highly reactive groups found in the first two columns."),
    "🧪 Rare Earth": () =>
      alert("Lanthanides and actinides are in the bottom rows, some are radioactive.")
  };

  document.querySelectorAll(".card-glow, .card").forEach((card) => {
    card.addEventListener("click", () => {
      const label = card.innerText.trim();
      const action = cardActions[label];
      action ? action() : alert("No information found for this category.");
    });
  });

  // ✅ Accordion logic
  document.querySelectorAll(".accordion-title").forEach((title) => {
    title.addEventListener("click", () => {
      const content = title.nextElementSibling;
      title.classList.toggle("active");
      content.classList.toggle("open");
    });
  });
});

// ✅ Image popup viewer
function openPopup(src) {
  const popup = document.getElementById('popup');
  const img = document.getElementById('popup-img');
  img.src = src;
  popup.classList.remove('hidden');
}

function closePopup() {
  document.getElementById('popup').classList.add('hidden');
}

document.addEventListener("DOMContentLoaded", () => {
  const trendBoxes = document.querySelectorAll(".trend-box");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("highlighted");
      }
    });
  }, { threshold: 0.3 });

  trendBoxes.forEach(box => observer.observe(box));
});
