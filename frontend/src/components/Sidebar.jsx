import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import {
  LayoutDashboard,
  CreditCard,
  ShieldAlert,
  BarChart3,
  BrainCircuit,
  Settings,
  LogOut,
  Building2,
} from "lucide-react";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo">

        <Building2 size={34} color="#38bdf8" />

        <span>FraudAI</span>

      </div>

      <nav>

        <NavLink to="/dashboard">
          <LayoutDashboard size={21} />
          Dashboard
        </NavLink>

        <NavLink to="/transactions">
          <CreditCard size={21} />
          Transactions
        </NavLink>

        <NavLink to="/alerts">
          <ShieldAlert size={21} />
          Fraud Alerts
        </NavLink>

        <NavLink to="/analytics">
          <BarChart3 size={21} />
          Analytics
        </NavLink>

        <NavLink to="/prediction">
          <BrainCircuit size={21} />
          AI Prediction
        </NavLink>

        <NavLink to="/settings">
          <Settings size={21} />
          Settings
        </NavLink>

      </nav>

      <div className="logout">

        <LogOut size={20} />

        Logout

      </div>

    </div>
  );
}

export default Sidebar;