import pandas as pd

# -----------------------------
# Load Dataset
# -----------------------------
df = pd.read_csv("datasets/fraudTest.csv")

print("=" * 70)
print("      AI-BASED FRAUD DETECTION SYSTEM")
print("=" * 70)

# -----------------------------
# First 5 Rows
# -----------------------------
print("\nFIRST 5 ROWS")
print(df.head())

# -----------------------------
# Dataset Shape
# -----------------------------
print("\nDATASET SHAPE")
print(df.shape)

# -----------------------------
# Column Names
# -----------------------------
print("\nCOLUMN NAMES")
print(df.columns.tolist())

# -----------------------------
# Dataset Information
# -----------------------------
print("\nDATASET INFORMATION")
df.info()

# -----------------------------
# Missing Values
# -----------------------------
print("\nMISSING VALUES")
print(df.isnull().sum())

# -----------------------------
# Duplicate Rows
# -----------------------------
print("\nDUPLICATE ROWS")
print(df.duplicated().sum())

# -----------------------------
# Fraud Distribution
# -----------------------------
print("\nFRAUD DISTRIBUTION")
print(df["is_fraud"].value_counts())