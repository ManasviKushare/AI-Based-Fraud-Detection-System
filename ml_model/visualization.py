import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load Dataset
df = pd.read_csv("datasets/fraudTest.csv")

plt.style.use("ggplot")

# ==========================================
# Fraud vs Genuine Transactions
# ==========================================

plt.figure(figsize=(8,5))

ax = sns.countplot(x="is_fraud", data=df)

plt.title("Fraud vs Genuine Transactions", fontsize=16, fontweight="bold")
plt.xlabel("Transaction Type", fontsize=12)
plt.ylabel("Number of Transactions", fontsize=12)

ax.set_xticks([0, 1])
ax.set_xticklabels(["Genuine", "Fraud"])

# Show numbers on top of bars
for p in ax.patches:
    ax.annotate(
        f"{int(p.get_height()):,}",
        (p.get_x() + p.get_width()/2., p.get_height()),
        ha="center",
        va="bottom",
        fontsize=10
    )

plt.tight_layout()
plt.show()

# ==========================================
# Transaction Amount Distribution
# ==========================================

plt.figure(figsize=(8,5))

sns.histplot(df["amt"], bins=50)

plt.title("Transaction Amount Distribution")

plt.xlabel("Amount")

plt.ylabel("Frequency")

plt.show()

# ==========================================
# Gender-wise Fraud
# ==========================================

plt.figure(figsize=(6,4))

sns.countplot(x="gender", hue="is_fraud", data=df)

plt.title("Fraud Distribution by Gender")

plt.show()

# ==========================================
# Fraud by Merchant Category
# ==========================================

fraud = df[df["is_fraud"] == 1]

plt.figure(figsize=(12,6))

sns.countplot(
    y="category",
    data=fraud,
    order=fraud["category"].value_counts().index
)

plt.title("Fraud Transactions by Category")

plt.show()

# ==========================================
# Fraud by State
# ==========================================

plt.figure(figsize=(12,8))

sns.countplot(
    y="state",
    data=fraud,
    order=fraud["state"].value_counts().index
)

plt.title("Fraud Cases by State")

plt.show()