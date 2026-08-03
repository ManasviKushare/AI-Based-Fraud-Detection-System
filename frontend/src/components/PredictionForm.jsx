import { useState } from "react";
import api from "../services/api";
import { savePrediction } from "../data/predictionHistory";
import { saveAlert } from "../data/alerts";
import InvestigationPanel from "./InvestigationPanel";
import { showFraudNotification } from "../utils/notification";
import {
  saveIncident,
  getIncidentHistory,
} from "../data/incidentManager";
import IncidentModal from "./IncidentModal";
import { useTheme } from "../context/ThemeContext";

function PredictionForm({ result, setResult }) {
  const [merchant, setMerchant] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [time, setTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [showIncident, setShowIncident] = useState(false);
  const { theme } = useTheme();

  const predict = async () => {
    if (
      !merchant ||
      !category ||
      !amount ||
      !gender ||
      !city ||
      !time
    ) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    const selectedHour = Number(time.split(":")[0]);
    const fakeUnix = 1700000000 + selectedHour * 3600;

    try {
      const response = await api.post("/predict", {
        merchant: merchant,
        category: category,
        amt: Number(amount),
        gender: gender,
        city: city,
        state: "NY",
        zip: 10001,
        lat: 40.7128,
        long: -74.006,
        city_pop: 8000000,
        job: "Customer",
        unix_time: fakeUnix,
        merch_lat: 40.713,
        merch_long: -74.005,
      });

      setResult(response.data);

      if (
  response.data.prediction === "Fraud" ||
  response.data.prediction === "Needs Review"
) {
  saveIncident({
    merchant,
    amount: Number(amount),
    prediction: response.data.prediction,
    riskScore: response.data.risk_score,
  });
  setShowIncident(true);
}
      showFraudNotification(
  response.data.prediction,
  merchant,
  response.data.risk_score
);

      savePrediction({

  merchant,

  category,

  amount,

  city,

  prediction: response.data.prediction,

  riskScore: response.data.risk_score,

  createdAt: new Date().toLocaleString(),

});

saveAlert({
  merchant,
  amount,
  prediction: response.data.prediction,
  riskScore: response.data.risk_score,
});

    } catch (err) {
      console.log(err);
      alert("Backend not running");
    }

    setLoading(false);
  };

  return (
    <div className="card">

      <h1
        style={{
          color: "#1e3a8a",
          fontSize: "40px",
          fontWeight: "700",
          marginBottom: "25px",
        }}
      >
       AI Prediction
      </h1>

      <input
        type="text"
        placeholder="Merchant Name"
        value={merchant}
        onChange={(e) => setMerchant(e.target.value)}
        style={inputStyle}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={inputStyle}
      >
        <option value="">Select Category</option>
        <option value="shopping_pos">Shopping</option>
        <option value="grocery_pos">Grocery</option>
        <option value="travel">Travel</option>
        <option value="entertainment">Entertainment</option>
        <option value="food_dining">Food & Dining</option>
        <option value="health_fitness">Healthcare</option>
        <option value="gas_transport">Fuel</option>
        <option value="utilities">Utilities</option>
        <option value="online_purchase">Online Purchase</option>
        <option value="cash_withdrawal">Cash Withdrawal</option>
      </select>

      <input
        type="number"
        placeholder="Transaction Amount (£)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={inputStyle}
      />

      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        style={inputStyle}
      >
        <option value="">Select Gender</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>

      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={inputStyle}
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        style={inputStyle}
      />

      <button
        onClick={predict}
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "14px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        {loading ? "Predicting..." : "Predict Fraud"}
      </button>

      {result && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            borderRadius: "12px",
            background:
  result.prediction === "Fraud"
    ? "#3b0d11"
    : result.prediction === "Needs Review"
    ? "#78350f"
    : "#10351d",
          }}
        >
          <h2
            style={{
              color:
  result.prediction === "Fraud"
    ? "#ff4d4d"
    : result.prediction === "Needs Review"
    ? "#facc15"
    : "#22c55e",
            }}
          >
            {result.prediction}
          </h2>

          <hr style={{ margin: "15px 0" }} />

          <p>
            <strong>Fraud Probability:</strong>{" "}
            {result.fraud_probability}
          </p>

          <p>
            <strong>Risk Score:</strong>{" "}
            {result.risk_score}
          </p>

          <p>
            <strong>Risk Level:</strong>{" "}
            {result.risk_level}
          </p>

          <hr style={{ margin: "20px 0" }} />

          <p>
            <strong>Confidence:</strong>{" "}
            {result.fraud_probability}
          </p>

          <p>
  <strong>Recommendation:</strong>{" "}

  {result.prediction === "Fraud"
    ? "🚫 Block Transaction Immediately"

    : result.prediction === "Needs Review"

    ? "⚠️ Hold Transaction for Manual Investigation"

    : "✅ Approve Transaction"}

</p>

          <p>
            <strong>AI Engine:</strong> XGBoost Fraud Detection Model
          </p>

          <p>
            <strong>Generated:</strong>{" "}
            {new Date().toLocaleString()}
          </p>
          <hr style={{ margin: "20px 0" }} />

<h3
  style={{
    color: "#1e3a8a",
    marginBottom: "15px",
  }}
>
  🧠 AI Explanation
</h3>

{result.explanations &&
  result.explanations.map((reason, index) => (
    <div
      key={index}
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
        background: "rgba(255,255,255,0.08)",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <span
        style={{
          color: "#22c55e",
          fontSize: "20px",
          marginRight: "10px",
        }}
      >
        ✔
      </span>

      <span>{reason}</span>
    </div>
))}
        
        </div>
      )}

      {result && (
        <div style={{ marginTop: "25px" }}>
          <InvestigationPanel
            prediction={{
              merchant,
              prediction: result.prediction,
              risk_score: result.risk_score,
            }}
          />
        <div style={{ marginTop: "25px" }}>
        </div>
        </div>
      )}

      {result &&
  (result.prediction === "Fraud" ||
    result.prediction === "Needs Review") && null}

    {showIncident && (
  <IncidentModal
    incident={getIncidentHistory()[0]}
    onClose={() => setShowIncident(false)}
  />
)}

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
};

export default PredictionForm;