import { useState, useEffect } from "react";

function InvestigationPanel({ prediction }) {
    const getDefaultStatus = (prediction) => {
  if (prediction === "Fraud") return "Blocked";
  if (prediction === "Needs Review") return "Pending";
  return "Approved";
};

const getDefaultNotes = (prediction) => {
  if (prediction === "Fraud")
    return "High fraud probability detected by AI model.";

  if (prediction === "Needs Review")
    return "Requires manual verification.";

  return "AI found no suspicious behaviour.";
};

const [status, setStatus] = useState(
  getDefaultStatus(prediction.prediction)
);

const [notes, setNotes] = useState(
  getDefaultNotes(prediction.prediction)
);

useEffect(() => {
  setStatus(getDefaultStatus(prediction.prediction));
  setNotes(getDefaultNotes(prediction.prediction));
}, [prediction]);

  const saveInvestigation = () => {

    const investigations =
      JSON.parse(localStorage.getItem("investigations")) || [];

    investigations.unshift({
      id: Date.now(),
      merchant: prediction.merchant,
      prediction: prediction.prediction,
      riskScore: prediction.risk_score,
      status,
      notes,
      createdAt: new Date().toLocaleString(),
    });

    localStorage.setItem(
      "investigations",
      JSON.stringify(investigations)
    );

    alert("Investigation Saved Successfully");
  };

  return (
    <div className="card">

      <h2 style={{ color: "#1e3a8a" }}>
        🕵 Fraud Investigation
      </h2>

      <hr />

      <p style={{ marginTop: 20 }}>
        <strong>Status</strong>
      </p>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
          borderRadius: 8,
        }}
      >
        <option>Pending</option>
        <option>Approved</option>
        <option>Blocked</option>
        <option>Needs Manual Review</option>
      </select>

      <p style={{ marginTop: 20 }}>
        <strong>Investigation Notes</strong>
      </p>

      <textarea
        rows={5}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write investigation notes..."
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          marginTop: 10,
        }}
      />

      <button
        onClick={saveInvestigation}
        style={{
          marginTop: 20,
          width: "100%",
          padding: 14,
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        Save Investigation
      </button>

    </div>
  );
}

export default InvestigationPanel;