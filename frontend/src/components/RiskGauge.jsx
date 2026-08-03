function RiskGauge({ result }) {

  const risk = result ? result.risk_score : 0;

  const colour =
    risk >= 70
      ? "#ef4444"
      : risk >= 30
      ? "#f59e0b"
      : "#22c55e";

  return (
    <div className="card">

      <h2
        style={{
          color: "#1e3a8a",
          marginBottom: "20px",
          fontWeight: "700",
        }}
      >
        AI Risk Meter
      </h2>

      <div
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          border: `14px solid ${colour}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "25px auto",
          fontSize: "42px",
          fontWeight: "bold",
          color: "#111827",
          transition: "0.5s",
        }}
      >
        {risk}%
      </div>

      <h3
        style={{
          textAlign: "center",
          color: "#111827",
        }}
      >
        {risk >= 70
          ? "🔴 HIGH RISK"
          : risk >= 30
          ? "🟡 MEDIUM RISK"
          : "🟢 LOW RISK"}
      </h3>

      <hr style={{ margin: "20px 0" }} />

      <p style={{ color: "#111827" }}>
  <strong>Prediction :</strong>{" "}
  {result ? result.prediction : "-"}
</p>

<p style={{ color: "#111827" }}>
  <strong>Confidence :</strong>{" "}
  {result ? result.fraud_probability : "-"}
</p>

<p style={{ color: "#111827" }}>
  <strong>Risk Level :</strong>{" "}
  {result ? result.risk_level : "-"}
</p>

    </div>
  );
}

export default RiskGauge;