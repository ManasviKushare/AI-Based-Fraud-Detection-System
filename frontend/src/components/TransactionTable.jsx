import { useState } from "react";
import "./TransactionTable.css";

import { transactions } from "../data/transactions";

function badgeClass(value) {
  switch (value) {
    case "Fraud":
      return "badge badge-red";

    case "Genuine":
      return "badge badge-green";

    case "Review":
      return "badge badge-yellow";

    case "High":
      return "badge badge-red";

    case "Medium":
      return "badge badge-yellow";

    default:
      return "badge badge-green";
  }
}

function TransactionTable() {

  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.filter((txn) =>
    txn.customer.toLowerCase().includes(search.toLowerCase()) ||
    txn.merchant.toLowerCase().includes(search.toLowerCase()) ||
    txn.id.toLowerCase().includes(search.toLowerCase())
  );
return (
  <div className="table-card">

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        placeholder="🔍 Search by ID, Customer or Merchant..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "350px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "15px",
        }}
      />
    </div>

    <table className="transaction-table">

      <thead>

          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Location</th>
            <th>Risk</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {filteredTransactions.map((txn) => (

            <tr key={txn.id}>

              <td>{txn.id}</td>

              <td>{txn.customer}</td>

              <td>{txn.merchant}</td>

              <td>{txn.amount}</td>

              <td>{txn.location}</td>

              <td>
                <span className={badgeClass(txn.risk)}>
                  {txn.risk}
                </span>
              </td>

              <td>
                <span className={badgeClass(txn.status)}>
                  {txn.status}
                </span>
              </td>

              <td>
                <button className="view-btn">
                  View
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default TransactionTable;