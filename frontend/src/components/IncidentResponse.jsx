import { useState } from "react";

function IncidentResponse({ incident }) {

  if (!incident) return null;

  const [dispatched, setDispatched] = useState(
    incident.dispatched || false
  );

  return (

    <div
      className="card"
      style={{
        marginTop: "25px",
      }}
    >

      <h2
        style={{
          color: "#dc2626",
          fontWeight: "700",
          marginBottom: "20px",
        }}
      >
        🚨 Enterprise Incident Response Center
      </h2>

      <hr />

      <table
        style={{
          width: "100%",
          marginTop: "20px",
        }}
      >

        <tbody>

          <tr>
            <td><strong>Incident ID</strong></td>
            <td>{incident.incidentId}</td>
          </tr>

          <tr>
            <td><strong>Merchant</strong></td>
            <td>{incident.merchant}</td>
          </tr>

          <tr>
            <td><strong>Priority</strong></td>
            <td>{incident.priority}</td>
          </tr>

          <tr>
            <td><strong>Status</strong></td>

            <td
              style={{
                color: dispatched
                  ? "#16a34a"
                  : "#dc2626",
                fontWeight: "700",
              }}
            >
              {dispatched
                ? "DISPATCHED"
                : "ACTIVE"}
            </td>

          </tr>

          <tr>
            <td><strong>Estimated Loss</strong></td>

            <td>
              £{Math.round(
                incident.amount * 0.12
              )}
            </td>

          </tr>

          <tr>
            <td><strong>Response ETA</strong></td>

            <td>
              {incident.priority === "P1 - CRITICAL"
                ? "2 Minutes"
                : incident.priority === "P2 - HIGH"
                ? "5 Minutes"
                : "10 Minutes"}
            </td>

          </tr>

        </tbody>

      </table>

      <hr style={{ margin: "20px 0" }} />

      <h3
        style={{
          color: "#1e3a8a",
        }}
      >
        Departments
      </h3>

      <div style={{ marginTop: "15px" }}>

        <p>✅ Fraud Operations Team</p>

        <p>✅ Compliance Department</p>

        <p>
          {dispatched
            ? "✅ Bank Security Operations"
            : "⏳ Bank Security Operations"}
        </p>

        <p>
          {dispatched
            ? "✅ Regional Investigation Office"
            : "⏳ Regional Investigation Office"}
        </p>

      </div>

      <hr style={{ margin: "20px 0" }} />

      <button

        onClick={() => setDispatched(true)}

        disabled={dispatched}

        style={{
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          background: dispatched
            ? "#16a34a"
            : "#dc2626",
          color: "white",
          fontWeight: "700",
          fontSize: "16px",
        }}

      >

        {dispatched
          ? "✅ Incident Dispatched"
          : "🚨 Dispatch Incident"}

      </button>

    </div>

  );

}

export default IncidentResponse;