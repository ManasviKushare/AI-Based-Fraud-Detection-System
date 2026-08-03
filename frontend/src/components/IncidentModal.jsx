import { useState } from "react";

function IncidentModal({ incident, onClose }) {
  const [screen, setScreen] = useState("incident");

  if (!incident) return null;

  const estimatedLoss = Math.round((incident.amount || 0) * 0.12);

  const dispatchIncident = () => {
    setScreen("dispatch");

    setTimeout(() => {
      setScreen("success");
    }, 3000);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.65)",
        backdropFilter: "blur(5px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
      }}
    >
      <div
        style={{
          width: "760px",
          maxWidth: "95%",
          background: "#fff",
          borderRadius: "18px",
          padding: "35px",
          boxShadow: "0 20px 60px rgba(0,0,0,.35)",
        }}
      >

        {/* ================= INCIDENT SCREEN ================= */}

        {screen === "incident" && (
          <>
            <h1
              style={{
                color: "#dc2626",
                fontSize: "32px",
                marginBottom: "8px",
              }}
            >
              🚨 Enterprise Fraud Incident
            </h1>

            <p style={{ color: "#64748b" }}>
              AI has created a High Priority Fraud Incident.
            </p>

            <hr style={{ margin: "25px 0" }} />

            <table
              style={{
                width: "100%",
                lineHeight: "2",
                color: "#111827",
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
                  <td><strong>Threat Level</strong></td>
                  <td
                    style={{
                      color: "#dc2626",
                      fontWeight: "700",
                    }}
                  >
                    {incident.prediction}
                  </td>
                </tr>

                <tr>
                  <td><strong>Priority</strong></td>
                  <td>{incident.priority}</td>
                </tr>

                <tr>
                  <td><strong>Estimated Loss</strong></td>
                  <td>£{estimatedLoss}</td>
                </tr>

              </tbody>
            </table>

            <hr style={{ margin: "25px 0" }} />

            <h3 style={{ color: "#1e3a8a" }}>
              Departments Waiting
            </h3>

            <div
              style={{
                color: "#111827",
                lineHeight: "2",
                marginTop: "15px",
              }}
            >
              <p>⏳ Fraud Operations Team</p>
              <p>⏳ Compliance Department</p>
              <p>⏳ Bank Security Operations</p>
              <p>⏳ Regional Investigation Office</p>
            </div>

            <hr style={{ margin: "25px 0" }} />

            <div
              style={{
                display: "flex",
                gap: "15px",
              }}
            >
              <button
                onClick={dispatchIncident}
                style={{
                  flex: 1,
                  padding: "15px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#dc2626",
                  color: "#fff",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                🚨 Dispatch Incident
              </button>

              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: "15px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#2563eb",
                  color: "#fff",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {/* ================= DISPATCH SCREEN ================= */}

        {screen === "dispatch" && (
          <>
            <h1
              style={{
                color: "#2563eb",
                textAlign: "center",
                marginBottom: "15px",
              }}
            >
              📡 Dispatching Incident...
            </h1>

            <p
              style={{
                textAlign: "center",
                color: "#64748b",
                marginBottom: "30px",
              }}
            >
              Secure encrypted incident packet is being transmitted...
            </p>

            <div
              style={{
                lineHeight: "2.2",
                color: "#111827",
                fontSize: "18px",
              }}
            >
              <p>✅ Fraud Operations Team</p>
              <p>✅ Compliance Department</p>
              <p>✅ Bank Security Operations</p>
              <p>✅ Regional Investigation Office</p>
            </div>

            <div
              style={{
                marginTop: "35px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "14px",
                  background: "#e5e7eb",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#2563eb",
                  }}
                />
              </div>

              <p
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  color: "#64748b",
                }}
              >
                Dispatching...
              </p>
            </div>
          </>
        )}
        {/* ================= SUCCESS SCREEN ================= */}w

        {screen === "success" && (
          <>
            <h1
              style={{
                color: "#16a34a",
                textAlign: "center",
                fontSize: "34px",
                marginBottom: "10px",
              }}
            >
              ✅ Incident Successfully Dispatched
            </h1>

            <p
              style={{
                textAlign: "center",
                color: "#64748b",
                fontSize: "18px",
                marginBottom: "30px",
              }}
            >
              All departments have received the encrypted incident report.
            </p>

            <hr style={{ margin: "25px 0" }} />

            <table
              style={{
                width: "100%",
                lineHeight: "2",
                color: "#111827",
              }}
            >
              <tbody>

                <tr>
                  <td><strong>Incident ID</strong></td>
                  <td>{incident.incidentId}</td>
                </tr>

                <tr>
                  <td><strong>Status</strong></td>
                  <td
                    style={{
                      color: "#16a34a",
                      fontWeight: "700",
                    }}
                  >
                    ACTIVE RESPONSE
                  </td>
                </tr>

                <tr>
                  <td><strong>Priority</strong></td>
                  <td>{incident.priority}</td>
                </tr>

                <tr>
                  <td><strong>Response ETA</strong></td>
                  <td>5 Minutes</td>
                </tr>

              </tbody>
            </table>

            <hr style={{ margin: "25px 0" }} />

            <h3
              style={{
                color: "#1e3a8a",
                marginBottom: "15px",
              }}
            >
              Departments Notified
            </h3>

            <div
              style={{
                color: "#111827",
                lineHeight: "2",
                fontSize: "17px",
              }}
            >
              <p>✅ Fraud Operations Team</p>

              <p>✅ Compliance Department</p>

              <p>✅ Bank Security Operations</p>

              <p>✅ Regional Investigation Office</p>
            </div>

            <hr style={{ margin: "25px 0" }} />

            <div
              style={{
                background: "#ecfdf5",
                border: "1px solid #86efac",
                padding: "18px",
                borderRadius: "10px",
                color: "#166534",
                fontWeight: "600",
                textAlign: "center",
                marginBottom: "25px",
              }}
            >
              ✔ Incident has been securely dispatched.
              <br />
              ✔ Investigation teams have been notified.
              <br />
              ✔ AI monitoring will continue tracking this transaction.
            </div>

            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "16px",
                border: "none",
                borderRadius: "10px",
                background: "#16a34a",
                color: "white",
                fontWeight: "700",
                cursor: "pointer",
                fontSize: "17px",
              }}
            >
              Return to AI Prediction
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default IncidentModal;
