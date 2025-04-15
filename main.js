// --- NEWS SLIDER (10 items) ---
fetch("https://run.mocky.io/v3/e3c2b705-dd22-448b-8ed2-e2971eecd63d")
  .then(res => res.json())
  .then(data => {
    const carouselInner = document.getElementById("carouselInner");
    const indicators = document.getElementById("carouselIndicators");

    carouselInner.innerHTML = "";
    indicators.innerHTML = "";

    data.news.forEach((item, index) => {
      const isActive = index === 0 ? "active" : "";

      // SLIDE item
      const slide = document.createElement("div");
      slide.className = `carousel-item ${isActive}`;
      slide.innerHTML = `
        <img src="${item.image}" class="d-block w-100" alt="${item.title}">
        <div class="carousel-caption d-none d-md-block">
          <h5>${item.title}</h5>
        </div>
      `;
      carouselInner.appendChild(slide);

      // INDICATOR button
      const indicator = document.createElement("button");
      indicator.setAttribute("type", "button");
      indicator.setAttribute("data-bs-target", "#newsCarousel");
      indicator.setAttribute("data-bs-slide-to", index.toString());
      indicator.setAttribute("aria-label", `Slide ${index + 1}`);
      if (index === 0) {
        indicator.classList.add("active");
        indicator.setAttribute("aria-current", "true");
      }
      indicators.appendChild(indicator);
    });
  })
  .catch(err => console.error("Failed to fetch news data:", err));

// --- STATIC NEWS ---
fetch("https://run.mocky.io/v3/493a8916-acdd-4677-b7e1-da8b22f2784c")
  .then(res => res.json())
  .then(data => {
    document.getElementById("staticNewsImage").src = data.image;
    document.getElementById("staticNewsTitle").innerText = data.title;
  })
  .catch(err => console.error("Failed to fetch static news:", err));

// --- WEATHER DATA ---
fetch("https://run.mocky.io/v3/e427363d-b058-425f-bc90-23deb3a241b4")
  .then(res => res.json())
  .then(data => {
    document.getElementById("currentTemp").innerText = data.current.temp;
    document.getElementById("weatherDesc").innerText = data.current.description;

    const forecast = document.getElementById("weatherForecast");
    forecast.innerHTML = "";

    data.forecast.forEach(day => {
      forecast.innerHTML += `
        <div class="weather-day">
          <h6>${day.day}</h6>
          <img src="${day.icon}" alt="${day.desc}">
          <p>${day.high}° / ${day.low}°</p>
        </div>
      `;
    });
  })
  .catch(err => console.error("Failed to fetch weather data:", err));

// --- FINANCIAL BAR ---
fetch("https://run.mocky.io/v3/0c5f790b-9ad0-4dec-a98e-0ee0c2ee69a9")
  .then(res => res.json())
  .then(data => {
    const financeBar = document.getElementById("financeBar");
    financeBar.innerHTML = "";

    data.finance.forEach(item => {
      const span = document.createElement("span");
      span.classList.add("me-3", "fw-bold");

      const isNegative = item.change.includes("-");
      const changeColor = isNegative ? 'text-danger' : 'text-success';
      const arrow = isNegative ? '▼' : '▲';

      span.innerHTML = `
        <strong>${item.name}</strong>
        <span class="ms-1">${item.value}</span>
        <span class="${changeColor}">${item.change} ${arrow}</span>
      `;

      financeBar.appendChild(span);
    });
  })
  .catch(err => console.error("Failed to fetch financial data:", err));

// --- CLOSE ADS ---
document.querySelectorAll('.close-ad').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.parentElement.style.display = 'none';
  });
});
