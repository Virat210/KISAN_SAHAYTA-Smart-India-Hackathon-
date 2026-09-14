# train_model.py

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os

# --------------------------
# 1. Load dataset
# --------------------------
df = pd.read_csv("data/Sample_Data.csv")

print("Initial Data Shape:", df.shape)
print(df.head())

# --------------------------
# 2. Handle missing values
# --------------------------
for column in df.columns:
    if df[column].dtype in ['int64', 'float64']:
        df[column] = df[column].fillna(df[column].median())
    else:
        df[column] = df[column].fillna(df[column].mode()[0])

print("\nMissing values handled:")
print(df.isnull().sum())

# --------------------------
# 3. Encode categorical variables
# --------------------------
categorical_cols = ['State_Name', 'District_Name', 'Season', 'Crop']
df = pd.get_dummies(df, columns=categorical_cols)

print("\nData after encoding:")
print(df.head())

# --------------------------
# 4. Define features & target
# --------------------------
if "Production" not in df.columns:
    raise ValueError("❌ Target column 'Production' not found in dataset!")

X = df.drop("Production", axis=1)
y = df["Production"]

# --------------------------
# 5. Train/test split
# --------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("\nTraining set shape:", X_train.shape)
print("Testing set shape:", X_test.shape)

# --------------------------
# 6. Train regression model
# --------------------------
rf_model = RandomForestRegressor(
    n_estimators=200,
    random_state=42,
    n_jobs=-1
)
rf_model.fit(X_train, y_train)

# --------------------------
# 7. Evaluate model
# --------------------------
y_pred = rf_model.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)

print("\n✅ Model Evaluation:")
print(f"RMSE: {rmse:.2f}")
print(f"R² Score: {r2:.2f}")

# --------------------------
# 8. Save model and feature columns
# --------------------------
os.makedirs("models", exist_ok=True)
joblib.dump(rf_model, "models/crop_yield_model.pkl")
joblib.dump(list(X.columns), "models/model_features.pkl")

print("\n🎉 Model training complete. Model and features saved.")