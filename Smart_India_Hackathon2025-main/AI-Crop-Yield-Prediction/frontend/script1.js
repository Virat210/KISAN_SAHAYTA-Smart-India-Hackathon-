// ==========================
// Language Data
// ==========================
const translations = {
  en: {
    title: "KISAN SAHAYTA",
    subtitle: "Empowering Farmers with Technology",
    state: "Select State",
    district: "Select District",
    crop: "Select Crop",
    cropType: "Select Crop Type",
    season: "Select Season",
    year: "Select Year",
    soil: "Select Soil Type",
    area: "Enter Area (hectares)",
    generate: "Generate Advisory",
    report: "Crop Growth Advisory Report",
    cropLabel: "Crop",
    seasonLabel: "Season",
    locationLabel: "Location",
    soilLabel: "Soil Type",
    areaLabel: "Area",
    yieldLabel: "Predicted Yield",
    fertLabel: "Recommended Fertilizers",
    pestLabel: "Recommended Pesticides",
    waterLabel: "Water Requirement",
    tipsLabel: "Tips for Good Harvest",
    waterText: "Adequate irrigation is required depending on rainfall and soil moisture.",
  },
  hi: {
    title: "किसान सहायता",
    subtitle: "किसानों को तकनीक से सशक्त बनाना",
    state: "राज्य चुनें",
    district: "जिला चुनें",
    crop: "फसल चुनें",
    cropType: "फसल का प्रकार चुनें",
    season: "मौसम चुनें",
    year: "साल चुनें",
    soil: "मिट्टी का प्रकार चुनें",
    area: "क्षेत्र दर्ज करें (हेक्टेयर)",
    generate: "सलाह बनाएं",
    report: "फसल वृद्धि सलाह रिपोर्ट",
    cropLabel: "फसल",
    seasonLabel: "मौसम",
    locationLabel: "स्थान",
    soilLabel: "मिट्टी का प्रकार",
    areaLabel: "क्षेत्र",
    yieldLabel: "अनुमानित उपज",
    fertLabel: "अनुशंसित उर्वरक",
    pestLabel: "अनुशंसित कीटनाशक",
    waterLabel: "पानी की आवश्यकता",
    tipsLabel: "अच्छी फसल के लिए सुझाव",
    waterText: "वर्षा और मिट्टी की नमी के अनुसार उचित सिंचाई आवश्यक है।",
  },
};

let currentLang = "en";

// ==========================
// States, Districts & Soil
// ==========================
const stateData = {
  "Uttar Pradesh": { districts: ["Lucknow", "Kanpur", "Varanasi", "Agra"], soils: ["Alluvial", "Sandy", "Loamy", "Clay"] },
  "Madhya Pradesh": { districts: ["Bhopal", "Indore", "Gwalior", "Jabalpur"], soils: ["Black", "Red", "Laterite", "Sandy"] },
  "Punjab": { districts: ["Ludhiana", "Amritsar", "Patiala"], soils: ["Alluvial", "Sandy", "Loamy"] },
  "Haryana": { districts: ["Hisar", "Panipat", "Karnal"], soils: ["Loamy", "Clay", "Alluvial"] },
  "Bihar": { districts: ["Patna", "Gaya", "Bhagalpur"], soils: ["Alluvial", "Clay", "Sandy"] },
  "Rajasthan": { districts: ["Jaipur", "Udaipur", "Jodhpur"], soils: ["Desert", "Red", "Sandy"] },
  "Maharashtra": { districts: ["Mumbai", "Nagpur", "Pune", "Nashik"], soils: ["Black", "Laterite", "Red", "Sandy"] },
  "Gujarat": { districts: ["Ahmedabad", "Surat", "Rajkot"], soils: ["Black", "Saline", "Alluvial"] },
  "Karnataka": { districts: ["Bangalore", "Mysore", "Belgaum"], soils: ["Red", "Laterite", "Black"] },
  "Kerala": { districts: ["Kochi", "Thiruvananthapuram", "Kozhikode"], soils: ["Laterite", "Sandy", "Alluvial"] },
  "Tamil Nadu": { districts: ["Chennai", "Madurai", "Coimbatore"], soils: ["Red", "Black", "Sandy"] },
  "West Bengal": { districts: ["Kolkata", "Howrah", "Darjeeling"], soils: ["Alluvial", "Red", "Laterite"] },
  "Odisha": { districts: ["Bhubaneswar", "Cuttack", "Puri"], soils: ["Red", "Laterite", "Sandy"] },
  "Assam": { districts: ["Guwahati", "Dibrugarh", "Silchar"], soils: ["Alluvial", "Clay", "Loamy"] },
  "Telangana": { districts: ["Hyderabad", "Warangal", "Nizamabad"], soils: ["Black", "Red", "Sandy"] },
};

// ==========================
// Crop Data
// ==========================
const cropData = {
  Wheat: { types: ["Durum", "Emmer", "Spelt"], seasons: ["Rabi"], fertilizers: ["Urea", "DAP", "MOP"], pesticides: ["Chlorpyrifos", "Imidacloprid"], tips: ["Timely irrigation", "Weed control", "Proper seed rate"] },
  Rice: { types: ["Basmati", "Sona Masoori", "IR64"], seasons: ["Kharif", "Rabi"], fertilizers: ["Urea", "Zinc Sulphate", "SSP"], pesticides: ["Cartap Hydrochloride", "Buprofezin"], tips: ["Maintain standing water", "Pest monitoring", "Balanced fertilizer use"] },
  Maize: { types: ["Sweet Corn", "Popcorn", "Dent Corn"], seasons: ["Kharif", "Rabi"], fertilizers: ["Urea", "DAP", "Potash"], pesticides: ["Atrazine", "Pendimethalin"], tips: ["Early sowing", "Use hybrid seeds", "Irrigate at critical stages"] },
  Sugarcane: { types: ["Co-86032", "Co-419", "Co-62175"], seasons: ["Annual"], fertilizers: ["Nitrogen", "Phosphorus", "Potassium"], pesticides: ["Chlorpyrifos", "Thiamethoxam"], tips: ["Regular irrigation", "Earthing up", "Trash mulching"] },
  Cotton: { types: ["Bt Cotton", "Hybrid Cotton"], seasons: ["Kharif"], fertilizers: ["Urea", "SSP", "Potash"], pesticides: ["Monocrotophos", "Endosulfan"], tips: ["Timely sowing", "Pest management", "Intercropping"] },
  Pulses: { types: ["Moong", "Urad", "Masoor"], seasons: ["Kharif", "Rabi"], fertilizers: ["DAP", "SSP"], pesticides: ["Malathion", "Lambda-cyhalothrin"], tips: ["Use certified seeds", "Nipping technique", "Timely harvesting"] },
};

// ==========================
// Populate Dropdowns
// ==========================
function populateStates() {
  const stateSelect = document.getElementById("state");
  stateSelect.innerHTML = `<option value="">-- ${translations[currentLang].state} --</option>`;
  Object.keys(stateData).forEach(state => {
    stateSelect.innerHTML += `<option value="${state}">${state}</option>`;
  });
}

function populateDistricts() {
  const state = document.getElementById("state").value;
  const districtSelect = document.getElementById("district");
  const soilSelect = document.getElementById("soil");
  districtSelect.innerHTML = `<option value="">-- ${translations[currentLang].district} --</option>`;
  soilSelect.innerHTML = `<option value="">-- ${translations[currentLang].soil} --</option>`;
  if (state && stateData[state]) {
    stateData[state].districts.forEach(d => districtSelect.innerHTML += `<option value="${d}">${d}</option>`);
    stateData[state].soils.forEach(s => soilSelect.innerHTML += `<option value="${s}">${s}</option>`);
  }
}

function populateCrops() {
  const cropSelect = document.getElementById("crop");
  cropSelect.innerHTML = `<option value="">-- ${translations[currentLang].crop} --</option>`;
  Object.keys(cropData).forEach(crop => cropSelect.innerHTML += `<option value="${crop}">${crop}</option>`);
}

function populateCropTypes() {
  const crop = document.getElementById("crop").value;
  const typeSelect = document.getElementById("cropType");
  const seasonSelect = document.getElementById("season");
  typeSelect.innerHTML = `<option value="">-- ${translations[currentLang].cropType} --</option>`;
  seasonSelect.innerHTML = `<option value="">-- ${translations[currentLang].season} --</option>`;
  if (crop && cropData[crop]) {
    cropData[crop].types.forEach(t => typeSelect.innerHTML += `<option value="${t}">${t}</option>`);
    cropData[crop].seasons.forEach(s => seasonSelect.innerHTML += `<option value="${s}">${s}</option>`);
  }
}

// ==========================
// Generate Advisory (Local)
// ==========================
function generateAdvisory() {
  const state = document.getElementById("state").value;
  const district = document.getElementById("district").value;
  const crop = document.getElementById("crop").value;
  const cropType = document.getElementById("cropType").value;
  const season = document.getElementById("season").value;
  const year = document.getElementById("year").value;
  const soil = document.getElementById("soil").value;
  const area = document.getElementById("area").value;

  if (!state || !district || !crop || !cropType || !season || !year || !soil || !area) {
    alert("Please fill all fields!");
    return;
  }

  const { fertilizers, pesticides, tips } = cropData[crop];
  const randomYield = (Math.random() * 3 + 2).toFixed(2); // 2-5 tons/ha

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <div class="result-card">
      <h3>${translations[currentLang].report}</h3>
      <ul>
        <li><b>${translations[currentLang].cropLabel}:</b> ${crop} (${cropType})</li>
        <li><b>${translations[currentLang].seasonLabel}:</b> ${season} ${year}</li>
        <li><b>${translations[currentLang].locationLabel}:</b> ${district}, ${state}</li>
        <li><b>${translations[currentLang].soilLabel}:</b> ${soil}</li>
        <li><b>${translations[currentLang].areaLabel}:</b> ${area} hectares</li>
        <li><b>${translations[currentLang].yieldLabel}:</b> 🌾 ${randomYield} tons/hectare</li>
        <li><b>${translations[currentLang].fertLabel}:</b> ${fertilizers.join(", ")}</li>
        <li><b>${translations[currentLang].pestLabel}:</b> ${pesticides.join(", ")}</li>
        <li><b>${translations[currentLang].waterLabel}:</b> ${translations[currentLang].waterText}</li>
        <li><b>${translations[currentLang].tipsLabel}:</b> ${tips.join(" | ")}</li>
      </ul>
    </div>
  `;
}

// ==========================
// Language Toggle
// ==========================
function toggleLanguage(lang) {
  currentLang = lang;
  document.getElementById("title").innerText = translations[lang].title;
  document.getElementById("subtitle").innerText = translations[lang].subtitle;
  populateStates();
  populateCrops();
}

// ==========================
// Init
// ==========================
window.onload = () => {
  populateStates();
  populateCrops();
};
