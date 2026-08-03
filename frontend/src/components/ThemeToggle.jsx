import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {

  const { darkMode, toggleTheme } = useTheme();

  return (

<div
style={{
display:"flex",
justifyContent:"flex-end",
marginBottom:"20px",
}}
>

<button

onClick={toggleTheme}

style={{

width:"80px",

height:"40px",

borderRadius:"50px",

border:"none",

cursor:"pointer",

background:darkMode ? "#2563eb" : "#d1d5db",

position:"relative",

transition:"0.4s",

}}

>

<div

style={{

width:"32px",

height:"32px",

borderRadius:"50%",

background:"white",

position:"absolute",

top:"4px",

left:darkMode ? "44px" : "4px",

transition:"0.4s",

display:"flex",

justifyContent:"center",

alignItems:"center",

fontSize:"18px",

}}

>

{darkMode ? "🌙" : "☀"}

</div>

</button>

</div>

  );
}

export default ThemeToggle;