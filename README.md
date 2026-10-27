# 🌱 KISAN SAHAYTA – Smart Farming Assistant  

A project developed for **Smart India Hackathon (SIH)** to empower farmers with **AI-driven crop yield prediction and advisory support**.  
The platform helps farmers make data-driven decisions about crop selection, irrigation, and fertilizer management, ultimately increasing productivity and sustainability.  

---

## 🚩 Problem Statement  
Farmers often face challenges like:  
- Lack of reliable data on crop yield predictions.  
- Dependence on traditional practices leading to reduced productivity.  
- Difficulty in accessing modern farming insights due to language and accessibility barriers.  

---

## 💡 Our Solution  
**KISAN SAHAYTA** provides a **one-stop AI-powered web application** that:  
- 📊 Predicts crop yield using **Machine Learning models** trained on agricultural datasets.  
- 🌦️ Considers soil parameters, weather conditions, and crop type.  
- 💻 Offers a **farmer-friendly interface** for easy input and instant insights.  
- 🌍 Supports **multiple languages** for inclusivity.  
- 🚀 Can be scaled and integrated with government schemes & databases.  

---

## 🛠️ Tech Stack  
- **Frontend:** React.js, Tailwind CSS  
- **Backend:** FastAPI (Python)  
- **Machine Learning:** Scikit-learn, Pandas, NumPy  
- **Database:** SQLite / PostgreSQL  
- **Deployment:** Docker, Render/Heroku (or chosen platform)  

---

## 📂 Repository Structure  
```
- backend/ # FastAPI backend with ML model
  - main.py # API routes
  - model.pkl # Trained ML model
  - requirements.txt
- frontend/ # React.js frontend
  - src/
  - public/
  - package.json
- data/ # Dataset files (crop_yield.xlsx, data_core.xlsx, etc.)
- notebooks/ # Jupyter notebooks for model training & experiments
- docs/ # Project documentation, presentations
- README.md # Project overview (this file)
```


---

## ⚙️ Installation & Setup  

### 1. Clone the repository 
bash
git clone https://github.com/your-username/sih-kisan-sahayta.git
cd sih-kisan-sahayta

### 2. Backend Setup (Fast API and ML Model)
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
Backend will run on: http://127.0.0.1:8000

### 3. Frontend Setup
cd frontend
npm install
npm start
Frontend will run on: http://localhost:3000

---

## 🎯 Features
- ✅ AI-powered crop yield prediction
- ✅ Real-time weather & soil data integration
- ✅ Multilingual farmer-friendly UI
- ✅ Lightweight farmer-friendly UI
- ✅ Open for integration with government databases

---

## 🚀 Future Scope
- Integration with **IOT-based sensors** for real time soil data.
- Mobile app development for wider accessibility.
- Direct linkage with **government subsidy schemes**.
- AI chatbot assistant for farmer queries.

## 👥 Team - HackersInc
- Vishnukant Bajpai
- Naman Kumar Bansal 
- Saad Khan
- Virat Singh
- Nikita
- Ankit Singh
