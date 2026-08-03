import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Signup() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });


  const handleSignup = () => {

    if(
      !user.name ||
      !user.email ||
      !user.password
    ){
      alert("Please fill all details");
      return;
    }


    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );


    alert("Signup successful. Please login.");

    navigate("/login");

  };


  return (

    <div className="login-page">

      <div className="login-card">

        <h1>
          Create Account
        </h1>

        <p>
          Enterprise AI Fraud Detection
        </p>


        <input
          type="text"
          placeholder="Full Name"
          value={user.name}
          onChange={(e)=>
            setUser({
              ...user,
              name:e.target.value
            })
          }
        />


        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e)=>
            setUser({
              ...user,
              email:e.target.value
            })
          }
        />


        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e)=>
            setUser({
              ...user,
              password:e.target.value
            })
          }
        />


        <button onClick={handleSignup}>
          Signup
        </button>


      </div>

    </div>

  );
}


export default Signup;