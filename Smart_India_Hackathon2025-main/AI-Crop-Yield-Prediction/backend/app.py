# backend/app.py
import os
import joblib
import pandas as pd
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import traceback

# Create app
app = FastAPI(title="AI Crop Yield Prediction API (robust CORS)")

# CORS (allow frontend on localhost:3000 and also allow any in dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],  # "*" ok for hackathon/dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your model and the feature list saved by training
MODEL_PATH = "models/crop_yield_model.pkl"           # trained regressor
FEATURES_PATH = "models/model_features.pkl"          # list of columns used in training (dummified)

if not os.path.exists(MODEL_PATH) or not os.path.exists(FEATURES_PATH):
    raise FileNotFoundError("Model or features file missing. Run train_model.py first.")

model = joblib.load(MODEL_PATH)
model_features = joblib.load(FEATURES_PATH)

# Input schema
class CropInput(BaseModel):
    State_Name: str = Field(..., min_length=1)
    District_Name: str = Field(..., min_length=1)
    Crop_Year: int = Field(..., ge=1900, le=2100)
    Season: str = Field(..., min_length=1)
    Crop: str = Field(..., min_length=1)
    Area: float = Field(..., gt=0)

@app.get("/")
def root():
    return {"message": "✅ Crop Yield Prediction API is running!"}

# Optional explicit preflight handler (should be covered by CORSMiddleware but added for robustness)
@app.options("/predict")
def predict_options(request: Request):
    # allow the browser to see allowed methods/headers
    return Response(status_code=200)

@app.post("/predict")
async def predict(data: CropInput, request: Request):
    try:
        # Convert to DataFrame
        input_dict = data.model_dump()   # Pydantic v2
        input_df = pd.DataFrame([input_dict])

        # Debug logging (prints on server console)
        print("=== Incoming request ===")
        print(input_df)
        print("dtypes:\n", input_df.dtypes)

        # One-hot encode categorical columns (same method used in training)
        categorical_cols = ['State_Name', 'District_Name', 'Season', 'Crop']
        input_df = pd.get_dummies(input_df, columns=categorical_cols)

        # Reindex into exact model features; fill missing columns with 0
        preprocessed_df = input_df.reindex(columns=model_features, fill_value=0)

        # If any columns are still missing (shouldn't happen), raise helpful error
        missing = [c for c in model_features if c not in preprocessed_df.columns]
        if missing:
            raise ValueError(f"Missing columns after reindexing: {missing[:10]} (total {len(missing)})")

        # Predict
        pred = model.predict(preprocessed_df)[0]
        pred_value = float(pred)

        return {"Predicted_Yield": round(pred_value, 2), "Inputs": input_dict}

    except Exception as e:
        tb = traceback.format_exc()
        print("PREDICTION ERROR:", str(e))
        print(tb)
        return {"error": f"Prediction failed: {str(e)}", "trace": tb}
