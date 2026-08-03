import joblib

from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline

from preprocessing import DataPreprocessor
from feature_engineering import FeatureEngineer

# -----------------------------
# Load Dataset
# -----------------------------

preprocessor = DataPreprocessor()
engineer = FeatureEngineer()

df = preprocessor.preprocess("datasets/fraudTest.csv")

df = engineer.create_time_features(df)
df = engineer.create_amount_features(df)
df = engineer.haversine_distance(df)

# -----------------------------
# Remove unnecessary columns
# -----------------------------

drop_columns = [
    "Unnamed: 0",
    "trans_date_trans_time",
    "cc_num",
    "first",
    "last",
    "street",
    "trans_num",
    "dob"
]

for col in drop_columns:
    if col in df.columns:
        df.drop(columns=col, inplace=True)

# -----------------------------
# Features
# -----------------------------

X = df.drop("is_fraud", axis=1)

# -----------------------------
# Feature Lists
# -----------------------------

categorical_features = [
    "merchant",
    "category",
    "gender",
    "city",
    "state",
    "job",
    "day_of_week"
]

numerical_features = [
    "amt",
    "zip",
    "lat",
    "long",
    "city_pop",
    "unix_time",
    "merch_lat",
    "merch_long",
    "transaction_hour",
    "transaction_day",
    "transaction_month",
    "log_amount",
    "distance_km"
]

# -----------------------------
# Create Pipeline
# -----------------------------

preprocessor_pipeline = ColumnTransformer(
    transformers=[
        (
            "num",
            StandardScaler(),
            numerical_features
        ),
        (
            "cat",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_features
        )
    ]
)

pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor_pipeline)
    ]
)

print("=" * 60)
print("FITTING PREPROCESSING PIPELINE")
print("=" * 60)

pipeline.fit(X)

print("Pipeline fitted successfully.")

joblib.dump(
    pipeline,
    "ml_model/saved_models/preprocessing_pipeline.pkl"
)

print("Pipeline saved successfully.")