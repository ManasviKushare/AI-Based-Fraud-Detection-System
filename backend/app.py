from fastapi import FastAPI
import pandas as pd
import traceback

from fastapi.middleware.cors import CORSMiddleware
from backend.predictor import FraudPredictor
from backend.schemas import TransactionRequest
from backend.risk_engine import calculate_risk_score
from backend.feature_engineering import BackendFeatureEngineer

app = FastAPI(
    title="AI-Based Fraud Detection System",
    description="Enterprise Real-Time Fraud Detection API",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("=" * 60)
print("STARTING ENTERPRISE FRAUD DETECTION API")
print("=" * 60)

# Load model once when API starts
predictor = FraudPredictor()


@app.get("/")
def home():

    print("HOME ENDPOINT CALLED")

    return {
        "message": "AI-Based Fraud Detection System API Running Successfully"
    }


@app.post("/predict")
def predict(transaction: TransactionRequest):

    try:

        print("\n" + "=" * 60)
        print("REQUEST RECEIVED")
        print("=" * 60)
        print(transaction)

        # -----------------------------
        # Feature Engineering
        # -----------------------------
        features = BackendFeatureEngineer.create_features(transaction)

        # -----------------------------
        # Create DataFrame
        # -----------------------------
        df = pd.DataFrame([{
            "merchant": transaction.merchant,
            "category": transaction.category,
            "amt": transaction.amt,
            "gender": transaction.gender,
            "city": transaction.city,
            "state": transaction.state,
            "zip": transaction.zip,
            "lat": transaction.lat,
            "long": transaction.long,
            "city_pop": transaction.city_pop,
            "job": transaction.job,
            "unix_time": transaction.unix_time,
            "merch_lat": transaction.merch_lat,
            "merch_long": transaction.merch_long,

            "transaction_hour": features["transaction_hour"],
            "transaction_day": features["transaction_day"],
            "transaction_month": features["transaction_month"],
            "day_of_week": features["day_of_week"],
            "log_amount": features["log_amount"],
            "distance_km": features["distance_km"]
        }])

        print("\nINPUT DATAFRAME")
        print(df)

        print("\nCOLUMNS")
        print(df.columns.tolist())

        # -----------------------------
        # Prediction
        # -----------------------------
        print("========== DEBUG ==========")
        print("Category:", transaction.category)
        print("Amount:", transaction.amt)
        print("===========================")
        prediction, probability = predictor.predict(df)

        # AI Risk Score
        risk_score = int(probability * 100)

        # -------------------------
        # Business Risk Rules
        # -------------------------

        # High Amount
        if transaction.amt >= 5000:
            risk_score += 30

        # Very High Amount
        if transaction.amt >= 10000:
            risk_score += 20

        # Cash Withdrawal
        if transaction.category.lower() == "cash withdrawal":
            risk_score += 30

        # Online Purchase
        if transaction.category.lower() == "online purchase":
            risk_score += 15

        # Unknown Merchant
        if "unknown" in transaction.merchant.lower():
            risk_score += 15

        # Night Transaction
        hour = features["transaction_hour"]

        if hour >= 23 or hour <= 5:
            risk_score += 20

        # Limit score to 100
        risk_score = min(risk_score, 100)

        # Final Decision
        if risk_score >= 70:
            prediction = "Fraud"
            level = "HIGH"
        elif risk_score >= 30:
            prediction = "Needs Review"
            level = "MEDIUM"
        else:
            prediction = "Genuine"
            level = "LOW"
            print(transaction.category)

        # -------------------------
        # Explainable AI
        # -------------------------

        explanations = []

        if transaction.amt >= 5000:
            explanations.append(
                f"High transaction amount (£{transaction.amt})"
            )

        category = transaction.category.lower().replace(" ", "_")

        if category == "cash_withdrawal":
            explanations.append(
                "Cash withdrawal transaction"
            )

        if category == "online_purchase":
            explanations.append(
                "Online purchase transaction"
            )

        if hour >= 23 or hour <= 5:
            explanations.append(
                "Transaction performed during night hours"
            )

        if probability >= 0.80:
            explanations.append(
                "AI model has very high confidence"
            )

        if probability >= 0.50 and probability < 0.80:
            explanations.append(
                "AI model detected suspicious behaviour"
            )

        if len(explanations) == 0:
            explanations.append(
                "No major fraud indicators detected"
            )

        response = {
            "prediction": prediction,
            "fraud_probability": round(float(probability), 4),
            "risk_score": risk_score,
            "risk_level": level,
            "explanations": explanations
        }

        print("\nAPI RESPONSE")
        print(response)

        return response

    except Exception as e:

        print("\n" + "=" * 60)
        print("API ERROR")
        print("=" * 60)

        traceback.print_exc()

        return {
            "status": "error",
            "message": str(e)
        }