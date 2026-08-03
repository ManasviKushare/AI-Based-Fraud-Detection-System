import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";


function Login(){

const navigate = useNavigate();


const [name,setName]=useState("");
const [password,setPassword]=useState("");



const handleLogin=()=>{

const savedUser =
JSON.parse(localStorage.getItem("user"));


if(
savedUser &&
savedUser.name===name &&
savedUser.password===password
){

localStorage.setItem(
"loggedUser",
JSON.stringify(savedUser)
);


navigate("/dashboard");


}
else{

alert("Invalid login details");

}

};



return(

<div className="login-page">

<div className="login-card">


<h1>
Enterprise AI Fraud Detection
</h1>


<p>
Banking Risk Intelligence Platform
</p>


<input

type="text"

placeholder="Name"

value={name}

onChange={(e)=>setName(e.target.value)}

/>



<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>



<button onClick={handleLogin}>
  Login
</button>

<p
  style={{
    marginTop: "20px",
    color: "#334155",
    textAlign: "center",
  }}
>
  Don't have an account?
</p>

<button
  onClick={() => navigate("/signup")}
  style={{
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Create Account
</button>



</div>

</div>


);


}


export default Login;