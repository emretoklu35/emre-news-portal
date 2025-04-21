// --- NEWS SLIDER (10 items) ---
fetch("https://gist.githubusercontent.com/emretoklu35/45d32321645f63569a716579560bcbe3/raw/2561ea5a7277b964b19a3bda10ad0a94cc804329/haberler.json")  .then(res => res.json())
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
        <div class="carousel-caption">
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
fetch("https://gist.githubusercontent.com/emretoklu35/6e819f735a179d92b66f97d1445a6dfe/raw/b27fb0946e49af66bfacaf6c35e39ea291240fcd/statikhaber.json")
  .then(res => res.json())
  .then(data => {
    document.getElementById("staticNewsImage").src = data.image;
    document.getElementById("staticNewsTitle").innerText = data.title;
  })
  .catch(err => console.error("Failed to fetch static news:", err));

// --- WEATHER DATA ---
fetch("https://gist.githubusercontent.com/emretoklu35/55da7de7f5d8fa95653a04dd65bb2374/raw/4e25ff8d50c8ae76a9ea7251601066bc3d6d08a4/havadurumu.json")
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
fetch("https://gist.githubusercontent.com/emretoklu35/61a9432106a22999490424d35debd74d/raw/3c760fe33c113fe2c1e43adf4378ebe7627077d1/finans.json")
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
