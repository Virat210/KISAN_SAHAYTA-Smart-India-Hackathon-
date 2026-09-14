let data = {};
let currentLang = "en";

// Translation dictionary
const translations = {
  en: {
    chooseState: "-- Choose State --",
    chooseDistrict: "-- Choose District --",
    landLabel: "Land (in acres):",
    seasonLabel: "Season:",
    getData: "🔍 Get Recommendations",
    reset: "♻️ Reset",
    errorFill: "⚠️ Please fill all required fields correctly (state, district, land).",
    noCrops: "ℹ️ No crops found for selected filters in",
    investment: "💰 Investment",
    profit: "📈 Profit",
    water: "🌊 Water Requirement",
    buyers: "🛒 Buyers",
    fertilizers: "🌿 Fertilizers",
    pesticides: "🦠 Pesticides",
    bestPractices: "✅ Best Practices",
    storage: "🏠 Storage",
    export: "🌍 Export Potential",
    risk: "⚠️ Risk Factor"
  },
  hi: {
    chooseState: "-- राज्य चुनें --",
    chooseDistrict: "-- जिला चुनें --",
    landLabel: "भूमि (एकड़ में):",
    seasonLabel: "मौसम:",
    getData: "🔍 सिफ़ारिशें प्राप्त करें",
    reset: "♻️ रीसेट",
    errorFill: "⚠️ कृपया सभी आवश्यक फ़ील्ड सही ढंग से भरें (राज्य, जिला, भूमि)।",
    noCrops: "ℹ️ चयनित फ़िल्टर के लिए कोई फसल नहीं मिली",
    investment: "💰 निवेश",
    profit: "📈 लाभ",
    water: "🌊 पानी की आवश्यकता",
    buyers: "🛒 खरीदार",
    fertilizers: "🌿 उर्वरक",
    pesticides: "🦠 कीटनाशक",
    bestPractices: "✅ सर्वोत्तम प्रथाएं",
    storage: "🏠 भंडारण",
    export: "🌍 निर्यात संभावनाएँ",
    risk: "⚠️ जोखिम कारक"
  }
};

// Utility translation function
function t(key) {
  return translations[currentLang][key] || key;
}

// Load JSON dataset
fetch("crops_data.json")
  .then(response => {
    if (!response.ok) throw new Error("Failed to load crops_data.json");
    return response.json();
  })
  .then(json => {
    data = json;
    populateStates();
  })
  .catch(err => {
    console.error(err);
    document.getElementById("result").innerHTML =
      `<div class="error-box">❌ Error loading data. Make sure crops_data.json is in the same folder and served via http server.</div>`;
  });

// Populate states dropdown
function populateStates() {
  const stateSelect = document.getElementById("state");
  stateSelect.innerHTML = `<option value="">${t("chooseState")}</option>`;
  Object.keys(data).sort().forEach(state => {
    const opt = document.createElement("option");
    opt.value = state;
    opt.textContent = state;
    stateSelect.appendChild(opt);
  });

  // Reset districts
  const districtSelect = document.getElementById("district");
  districtSelect.innerHTML = `<option value="">${t("chooseDistrict")}</option>`;
}

// Populate districts when state changes
document.getElementById("state").addEventListener("change", function () {
  const districtSelect = document.getElementById("district");
  districtSelect.innerHTML = `<option value="">${t("chooseDistrict")}</option>`;
  if (this.value && data[this.value]) {
    Object.keys(data[this.value]).sort().forEach(district => {
      const opt = document.createElement("option");
      opt.value = district;
      opt.textContent = district;
      districtSelect.appendChild(opt);
    });
  }
});

// Handle Get Recommendations
document.getElementById("getData").addEventListener("click", function () {
  const state = document.getElementById("state").value;
  const district = document.getElementById("district").value;
  const land = parseFloat(document.getElementById("land").value);
  const season = document.getElementById("season").value;
  const result = document.getElementById("result");

  if (!state || !district || isNaN(land) || land <= 0) {
    result.innerHTML = `<div class="error-box">${t("errorFill")}</div>`;
    return;
  }

  const crops = data[state][district] || [];
  let filtered = crops;
  if (season && season !== "Any") filtered = crops.filter(c => c.seasons.includes(season));

  if (filtered.length === 0) {
    result.innerHTML = `<div class="info-box">${t("noCrops")} ${district}, ${state}.</div>`;
    return;
  }

  let html = `<h2>🌱 Recommendations for ${district}, ${state}</h2>
              <p class="muted">Based on <strong>${land}</strong> acre(s) of land</p>`;

  filtered.forEach(c => {
    const totalInvestment = (c.investment * land).toLocaleString();
    const totalProfit = (c.profit * land).toLocaleString();

    html += `<div class="crop-block">
      <h3>🌾 ${c.crop}</h3>
      <div class="crop-grid">
        <div class="crop-meta">
          <p><strong>${t("investment")}:</strong> ₹${c.investment} / acre</p>
          <p><strong>${t("profit")}:</strong> ₹${c.profit} / acre</p>
          <p><strong>${t("water")}:</strong> ${c.water}</p>
          <p><strong>${t("buyers")}:</strong> ${c.buyers.join(", ")}</p>
        </div>
        <div class="crop-meta">
          <p><strong>${t("fertilizers")}:</strong> ${c.fertilizers.join(", ")}</p>
          <p><strong>${t("pesticides")}:</strong> ${c.pesticides.join(", ")}</p>
          <p><strong>${t("bestPractices")}:</strong> ${c.best_practices.join("; ")}</p>
          <p><strong>${t("storage")}:</strong> ${c.storage}</p>
        </div>
        <div class="crop-meta">
          <p><strong>${t("export")}:</strong> ${c.export}</p>
          <p><strong>${t("risk")}:</strong> ${c.risk}</p>
          <p><strong>For ${land} acres:</strong> ${t("investment")} ≈ ₹${totalInvestment}, ${t("profit")} ≈ ₹${totalProfit}</p>
        </div>
      </div>
    </div><hr/>`;
  });

  result.innerHTML = html;
});

// Reset form
document.getElementById("reset").addEventListener("click", function () {
  document.getElementById("state").value = "";
  document.getElementById("district").innerHTML = `<option value="">${t("chooseDistrict")}</option>`;
  document.getElementById("land").value = "";
  document.getElementById("season").value = "Any";
  document.getElementById("result").innerHTML = "";
});

// Language change
document.getElementById("language").addEventListener("change", function() {
  currentLang = this.value;
  document.querySelector('label[for="land"]').textContent = t("landLabel");
  document.querySelector('label[for="season"]').textContent = t("seasonLabel");
  document.getElementById("getData").textContent = t("getData");
  document.getElementById("reset").textContent = t("reset");
  populateStates();
});
