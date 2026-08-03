import pandas as pd

from predictor import FraudPredictor
from feature_engineering import BackendFeatureEngineer
from schemas import TransactionRequest

predictor = FraudPredictor()

transaction = TransactionRequest(
    merchant="fraud_Rippin, Kub and Mann",
    category="grocery_pos",
    amt=250.75,
    gender="F",
    city="Columbia",
    state="SC",
    zip=29201,
    lat=33.9659,
    long=-80.9355,
    city_pop=100000,
    job="Teacher",
    unix_time=1325376018,
    merch_lat=33.85,
    merch_long=-81.20
)

features = BackendFeatureEngineer.create_features(transaction)

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

prediction, probability = predictor.predict(df)

print("=" * 60)
print("Prediction :", prediction)
print("Probability:", probability)
print("=" * 60)