import { ArrowUpRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function EnterpriseCard({
  title,
  value,
  subtitle,
  subtitleColor,
  icon,
  borderColor,
}) {

  const { theme } = useTheme();

  return (
    <div
      style={{
        background: theme.card,
        border: `1px solid ${theme.border}`,
        borderTop: `5px solid ${borderColor}`,
        borderRadius: "18px",
        padding: "22px",
        boxShadow: theme.shadow,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            margin: 0,
            color: borderColor,
            fontSize: "16px",
            fontWeight: "700",
          }}
        >
          {title}
        </h3>

        {icon}
      </div>

      <h1
        style={{
          marginTop: "18px",
          marginBottom: "8px",
          fontSize: "44px",
          color: theme.text,   // ✅ This is correct
          fontWeight: "700",
        }}
      >
        {value}
      </h1>

      <p
        style={{
          color: subtitleColor,
          fontWeight: "600",
        }}
      >
        ↗ {subtitle}
      </p>
    </div>
  );
}

export default EnterpriseCard;