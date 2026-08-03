import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import "../styles/dashboard.css";

import Topbar from "../components/Topbar";
import FraudChart from "../components/FraudChart";
import PredictionForm from "../components/PredictionForm";
import RiskGauge from "../components/RiskGauge";
import TransactionTable from "../components/TransactionTable";
import { getDashboardStats } from "../data/dashboardStats";
import PredictionHistory from "../components/PredictionHistory";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import EnterpriseCard from "../components/EnterpriseCard";


function Dashboard() {

  const [activePage, setActivePage] = useState("dashboard");
  const [result, setResult] = useState(null);
  const [, forceUpdate] = useState(0);
useEffect(() => {

  const refreshDashboard = () => {
    forceUpdate((n) => n + 1);
  };

  window.addEventListener(
    "predictionUpdated",
    refreshDashboard
  );

  return () => {
    window.removeEventListener(
      "predictionUpdated",
      refreshDashboard
    );
  };

}, []);
  const dashboardStats = getDashboardStats();
  const { darkMode, theme } = useTheme();

  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser")
  );

  if (!loggedUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
  className="dashboard"
  style={{
    background: darkMode ? "#0f172a" : "#f3f4f6",
    color: darkMode ? "#ffffff" : "#111827",
    transition: "all .4s ease",
    minHeight: "100vh",
  }}
>

      {/* Sidebar */}

      <div
  className="sidebar"
  style={{
    background: darkMode ? "#020617" : "#1e3a8a",
    color: "white",
    transition: ".4s",
  }}
>

        <h2>🏦 FraudAI</h2>

        <ul>

  <li
    className={activePage === "dashboard" ? "active" : ""}
    onClick={() => setActivePage("dashboard")}
  >
    ⬚ Dashboard
  </li>

  <li
    className={activePage === "transactions" ? "active" : ""}
    onClick={() => setActivePage("transactions")}
  >
    ▤ Transactions
  </li>

  <li
    className={activePage === "alerts" ? "active" : ""}
    onClick={() => setActivePage("alerts")}
  >
    ◈ Fraud Alerts
  </li>

  <li
    className={activePage === "analytics" ? "active" : ""}
    onClick={() => setActivePage("analytics")}
  >
    ◫ Analytics
  </li>

  <li
    className={activePage === "prediction" ? "active" : ""}
    onClick={() => setActivePage("prediction")}
  >
    ◎ AI Prediction
  </li>

  <li
    className={activePage === "settings" ? "active" : ""}
    onClick={() => setActivePage("settings")}
  >
    ⚙ Settings
  </li>

</ul>

      </div>

      {/* Main */}

      <div className="main">

        <Topbar />

        {/* ================= DASHBOARD ================= */}

        {activePage === "dashboard" && (
          <>

            <div className="cards">

<EnterpriseCard
title="Total Transactions"
value={dashboardStats.totalTransactions.toLocaleString()}
subtitle="+12.4% Today"
subtitleColor="#22c55e"
borderColor="#2563eb"
icon={<span style={{ fontSize: "28px" }}>💳</span>}
/>

<EnterpriseCard
title="Fraud Detected"
value={dashboardStats.fraudDetected}
subtitle="+18 Cases"
subtitleColor="#ef4444"
borderColor="#ef4444"
icon={<span style={{ fontSize: "28px" }}>🛡️</span>}
/>

<EnterpriseCard
title="Risk Score"
value={`${dashboardStats.fraudPercentage}%`}
subtitle="AI Confidence"
subtitleColor="#3b82f6"
borderColor="#3b82f6"
icon={<span style={{ fontSize: "28px" }}>✅</span>}
/>

<EnterpriseCard
title="Revenue Protected"
value={`£${dashboardStats.totalRevenue.toLocaleString()}`}
subtitle="Saved Today"
subtitleColor="#22c55e"
borderColor="#22c55e"
icon={<span style={{ fontSize: "28px" }}>💷</span>}
/>

</div>

            <FraudChart />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "25px",
                marginTop: "30px",
              }}
            >
              <PredictionForm
               result={result}
               setResult={setResult}
             />
              <RiskGauge result={result} />
            </div>

            <div style={{ marginTop: "30px" }}>
              <PredictionHistory />
            </div>

          </>
        )}

        {/* ================= TRANSACTIONS ================= */}

        {activePage === "transactions" && (
          <>
            <h1
              style={{
                marginBottom: "25px",
                color: "#0f0f0f",
                fontSize: "40px",
                fontWeight: "700",
              }}
            >
              💳 Transaction Management
            </h1>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "3fr 1fr",
                gap: "25px",
                marginTop: "25px",
              }}
            >
              <PredictionHistory />

             <div className="card">

  <h2 style={{ color:"#1e3a8a" }}>
    Prediction Statistics
  </h2>

  <hr/>

  <p
    style={{
      color:"#64748b",
      marginTop:"20px",
      fontWeight:"600"
    }}
  >
    Total Predictions
  </p>

  <h2
    style={{
      color:"#111827"
    }}
  >
    {JSON.parse(localStorage.getItem("predictionHistory") || "[]").length}
  </h2>

  <p
    style={{
      color:"#64748b",
      marginTop:"20px",
      fontWeight:"600"
    }}
  >
    Latest Model
  </p>

  <h2
    style={{
      color:"#111827"
    }}
  >
    XGBoost v1.0
  </h2>

  <p
    style={{
      color:"#64748b",
      marginTop:"20px",
      fontWeight:"600"
    }}
  >
    System Status
  </p>

  <h2
    style={{
      color:"#16a34a"
    }}
  >
    🟢 Online
  </h2>

</div> 
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "20px",
                marginTop: "30px",
              }}
            >
              <div className="card">
                <p
                  style={{
                    color: "#1e3a8a",
                    fontWeight: "600",
                    marginTop: "15px",
                  }}
                >
                  Fraud Detected
                </p>

                <h2
                  style={{
                    color: "#ef4444",
                    fontWeight: "700",
                  }}
                >
                  {dashboardStats.fraudDetected}
                </h2>
              </div>

              <div className="card">
                <p
                  style={{
                    color: "#1e3a8a",
                    fontWeight: "600",
                    marginTop: "15px",
                  }}
                >
                  Genuine
                </p>

                <h2
                  style={{
                    color: "#22c55e",
                    fontWeight: "700",
                  }}
                >
                  {dashboardStats.genuineTransactions}
                </h2>
              </div>
            </div>

            <div className="card" style={{ marginTop: "20px" }}>
              <p
                style={{
                  color: "#1e3a8a",
                  fontWeight: "600",
                  marginTop: "15px",
                }}
              >
                Today's Volume
              </p>

              <h2
                style={{
                  color: "#111827",
                  fontWeight: "700",
                }}
              >
                £{dashboardStats.totalRevenue.toLocaleString()}
              </h2>
            </div>
          </>
        )}

        {/* ================= ALERTS ================= */}

{activePage === "alerts" && (

  <>
    <h1
      style={{
        color: "#1e3a8a",
        fontSize: "38px",
        fontWeight: "700",
        marginBottom: "25px",
      }}
    >
      🚨 Fraud Alerts
    </h1>

    {JSON.parse(localStorage.getItem("alerts") || "[]").length === 0 ? (

      <div className="card">

        <h3>No Alerts</h3>

        <p
          style={{
            color: "#64748b",
          }}
        >
          No fraud alerts have been generated yet.
        </p>

      </div>

    ) : (

      JSON.parse(localStorage.getItem("alerts") || "[]").map((alert) => (

        <div
          key={alert.id}
          className="card"
          style={{
            marginBottom: "20px",
            borderLeft:
              alert.prediction === "Fraud"
                ? "6px solid #dc2626"
                : alert.prediction === "Needs Review"
                ? "6px solid #f59e0b"
                : "6px solid #22c55e",
          }}
        >

          <h3>

            {alert.prediction === "Fraud"
              ? "🔴 High Risk Alert"
              : alert.prediction === "Needs Review"
              ? "🟡 Medium Risk Alert"
              : "🟢 Genuine Transaction"}

          </h3>

          <p
  style={{
    color: "#334155",
    fontSize: "16px",
    marginTop: "8px",
  }}
>
  <strong>Merchant:</strong> {alert.merchant}
</p>

          <p
  style={{
    color: "#334155",
    fontSize: "16px",
    marginTop: "8px",
  }}
>
  <strong>Amount:</strong> £{alert.amount}
</p>

<p
  style={{
    color: "#334155",
    fontSize: "16px",
    marginTop: "8px",
  }}
>
  <strong>Risk Score:</strong> {alert.riskScore}
</p>

<p
  style={{
    color: "#334155",
    fontSize: "16px",
    marginTop: "8px",
  }}
>
  <strong>Time:</strong> {alert.createdAt}
</p>

        </div>

      ))

    )}

  </>

)}


        {/* ================= ANALYTICS ================= */}

        {activePage === "analytics" && (

          <>
            <h1
  style={{
    color: "#1e3a8a",
    fontSize: "38px",
    fontWeight: "700",
    marginBottom: "25px",
  }}
>
  📈 Analytics
</h1>

            <FraudChart />

            <div
              className="cards"
              style={{ marginTop: "30px" }}
            >
            </div>
          </>
        )}

        {/* ================= AI PREDICTION ================= */}

        {activePage === "prediction" && (

          <>
          

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "25px",
                marginTop: "25px",
              }}
            >

              <PredictionForm
               result={result}
               setResult={setResult}
              />

              <RiskGauge result={result} />

            </div>

          </>

        )}

        {/* ================= SETTINGS ================= */}

        {activePage === "settings" && (

          <>
            <h1
  style={{
    color: "#1e3a8a",
    fontSize: "38px",
    fontWeight: "700",
    marginBottom: "25px",
  }}
>
  ⚙️ Settings
</h1>

            <div className="card">
<h3
style={{
color:"#1e3a8a"
}}
>
Administrator Profile
</h3>


<p style={{color:"#334155"}}>
<strong>Name:</strong>{" "}
{loggedUser?.name}
</p>


<p style={{color:"#334155"}}>
<strong>Email:</strong>{" "}
{loggedUser?.email}
</p>

              <button
  onClick={() => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      localStorage.removeItem("loggedUser");
      window.location.href = "/login";
    }
  }}
  style={{
    marginTop: "20px",
    padding: "12px 30px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  Logout
</button>

            </div>

          </>

        )}

      </div>

    </div>
  );
}

export default Dashboard;