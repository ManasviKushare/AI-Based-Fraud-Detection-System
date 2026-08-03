import { getPredictionHistory } from "../data/predictionHistory";

function PredictionHistory() {
  const history = getPredictionHistory();

  return (
    <div className="card">

      <h2
        style={{
          color: "#1e3a8a",
          marginBottom: "20px",
          fontWeight: "700",
        }}
      >
        📜 Prediction History
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#0f172a",
              color: "white",
            }}
          >
            <th style={th}>Merchant</th>
            <th style={th}>Category</th>
            <th style={th}>Amount (£)</th>
            <th style={th}>Prediction</th>
            <th style={th}>Risk Score</th>
            <th style={th}>Date</th>
          </tr>
        </thead>

        <tbody>

          {history.length === 0 ? (

            <tr>
              <td
                colSpan="6"
                style={{
                  padding: "30px",
                  textAlign: "center",
                  color: "#64748b",
                }}
              >
                No Predictions Yet
              </td>
            </tr>

          ) : (

            history.map((item) => (

              <tr
                key={item.id}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <td style={td}>{item.merchant}</td>

                <td style={td}>{item.category}</td>

                <td style={td}>£{item.amount}</td>

                <td style={td}>

                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      color: "white",
                      fontWeight: "600",
                      background:
                        item.prediction === "Fraud"
                          ? "#dc2626"
                          : item.prediction === "Needs Review"
                          ? "#f59e0b"
                          : "#22c55e",
                    }}
                  >
                    {item.prediction}
                  </span>

                </td>

                <td style={td}>
                  {item.riskScore}
                </td>

                <td style={td}>
                  {item.createdAt}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

const th = {
  padding: "14px",
  textAlign: "left",
  color: "white",
  fontWeight: "700",
};

const td = {
  padding: "14px",
  color: "#111827",
  fontWeight: "500",
  background: "white",
};

export default PredictionHistory;