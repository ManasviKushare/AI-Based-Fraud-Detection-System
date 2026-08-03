import pandas as pd

from sklearn.model_selection import train_test_split

from preprocessing import DataPreprocessor
from feature_engineering import FeatureEngineer

# ----------------------------------
# Load Dataset
# ----------------------------------

preprocessor = DataPreprocessor()
engineer = FeatureEngineer()

df = preprocessor.preprocess("datasets/fraudTest.csv")

df = engineer.create_time_features(df)
df = engineer.create_amount_features(df)
df = engineer.haversine_distance(df)

print("Feature Engineering Completed!")

# ----------------------------------
# Remove unnecessary columns
# ----------------------------------

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

print("\nRemaining Columns\n")
print(df.columns)

print("\nDataset Shape")
print(df.shape)