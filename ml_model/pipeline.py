from preprocessing import DataPreprocessor
from feature_engineering import FeatureEngineer

preprocessor = DataPreprocessor()
engineer = FeatureEngineer()

df = preprocessor.preprocess("datasets/fraudTest.csv")

df = engineer.create_time_features(df)

df = engineer.create_amount_features(df)

df = engineer.haversine_distance(df)

print("=" * 60)
print("ENTERPRISE FEATURE ENGINEERING")
print("=" * 60)

print(df[[
    "amt",
    "log_amount",
    "transaction_hour",
    "transaction_day",
    "transaction_month",
    "day_of_week"
]].head())

# -------------------------------
# Distance Feature
# -------------------------------
print("\nCustomer-Merchant Distance:\n")


print(df[[
    "lat",
    "long",
    "merch_lat",
    "merch_long",
    "distance_km"
]].head())