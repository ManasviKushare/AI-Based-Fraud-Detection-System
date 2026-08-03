import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";
function Topbar() {

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const themeContext = useTheme();

console.log(themeContext);

const theme = themeContext?.theme ?? {
  topbar: "#ffffff",
  text: "#111827",
  secondaryText: "#6b7280",
  shadow: "0 10px 25px rgba(0,0,0,.08)",
};

  return (
   <div
  style={{
    background: theme.topbar,
    borderRadius: "18px",
    padding: "18px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    boxShadow: theme.shadow,
  }}

>
      <div>
      <h1
  style={{
    margin: 0,
    fontSize: "26px",
    fontWeight: "700",
    color: theme.text,
  }}
>
 AI Fraud Detection
</h1>

<p
  style={{
    marginTop: "4px",
    color: theme.secondaryText,
    fontSize: "15px",
  }}
>
  Real-Time Fraud Intelligence Platform
</p>
      </div>

   <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "18px",
  }}
>
  <span
    style={{
      fontSize: "22px",
      cursor: "pointer",
    }}
  >
  </span>

  <div
  style={{
    display: "flex",
    alignItems: "center",
    padding: "4px 8px",
    borderRadius: "20px",
    background: "#f3f4f6",
  }}
>
  <ThemeToggle />
</div>

  <span
    style={{
      fontSize: "22px",
    }}
  >
    👤 Anuj
  </span>
</div>
    </div>
  );
}


export default Topbar;