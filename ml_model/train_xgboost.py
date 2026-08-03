import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
    classification_report
)

from imblearn.over_sampling import SMOTE
from xgboost import XGBClassifier

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
# Drop unwanted columns
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
# Features & Target
# -----------------------------

X = df.drop("is_fraud", axis=1)
y = df["is_fraud"]

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
# Preprocessing
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

# -----------------------------
# Transform Data
# -----------------------------

X_processed = preprocessor_pipeline.fit_transform(X)

# -----------------------------
# Train Test Split
# -----------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X_processed,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# -----------------------------
# SMOTE
# -----------------------------

print("Applying SMOTE...")

smote = SMOTE(random_state=42)

X_train, y_train = smote.fit_resample(X_train, y_train)

print("SMOTE Completed!")

# -----------------------------
# XGBoost
# -----------------------------

print("Training XGBoost...")

model = XGBClassifier(
    n_estimators=100,
    max_depth=6,
    learning_rate=0.1,
    random_state=42,
    eval_metric="logloss"
)

model.fit(X_train, y_train)

print("Training Completed!")

# -----------------------------
# Prediction
# -----------------------------

y_pred = model.predict(X_test)

y_prob = model.predict_proba(X_test)[:,1]

# -----------------------------
# Evaluation
# -----------------------------

print("="*60)

print("MODEL PERFORMANCE")

print("="*60)

print("Accuracy :", accuracy_score(y_test,y_pred))

print("Precision:", precision_score(y_test,y_pred))

print("Recall   :", recall_score(y_test,y_pred))

print("F1 Score :", f1_score(y_test,y_pred))

print("ROC AUC  :", roc_auc_score(y_test,y_prob))

print("\nConfusion Matrix\n")

print(confusion_matrix(y_test,y_pred))

print("\nClassification Report\n")

print(classification_report(y_test,y_pred))

# -----------------------------
# Save
# -----------------------------

joblib.dump(
    model,
    "ml_model/saved_models/xgboost_model.pkl"
)

print("\nModel Saved Successfully!")