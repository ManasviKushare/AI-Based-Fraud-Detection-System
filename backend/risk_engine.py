def calculate_risk_score(probability: float):

    score = int(probability * 100)

    # -----------------------------
    # Risk Level
    # -----------------------------
    if score >= 70:
        level = "HIGH"

    elif score >= 30:
        level = "MEDIUM"

    else:
        level = "LOW"

    # -----------------------------
    # Prediction Decision
    # -----------------------------
    if score >= 70:
        prediction = "Fraud"

    elif score >= 30:
        prediction = "Needs Review"

    else:
        prediction = "Genuine"

    return score, level, prediction