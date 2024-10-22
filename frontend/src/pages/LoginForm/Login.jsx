import { useState } from "react";
import Switch from "../../components/Switch/Switch";
import { assets } from "../../assets/assets";
import "./login.css";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function Login({ setLogin }) {
  const [toggled, setToggled] = useState(false);
  const [data, setData] = useState({ email: "", motdepasse: "" });

  const onLogin = async (event) => {
    event.preventDefault();
    let URL = "http://localhost:3000/api/user/login";

    try {
      const response = await axios.post(URL, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role.toLowerCase()); // Ensure role is in lowercase
        localStorage.setItem("profileImgURL", response.data.profileImgURL);
        localStorage.setItem("nom", response.data.nom); // Store the user's name

        setLogin(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);

      // Log additional error details for better debugging
      if (error.response) {
        console.log("Error response data:", error.response.data); // Server error response
        console.log("Error response status:", error.response.status); // HTTP status code
        console.log("Error response headers:", error.response.headers); // HTTP headers

        // Show specific error message from the server
        alert(error.response.data.message || "Login failed. Please try again.");
      } else {
        // Handle client-side or network errors
        alert("Login failed. Please try again.");
      }
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  return (
    <div className="background">
      <div className="background_image">
        <img src={assets.loginBackground} alt="Background" />
      </div>
      <div className="wrapper">
        <img className="gaines_logo" src={assets.grainesLogo} alt="Logo" />
        <form className="login_form" onSubmit={onLogin}>
          <h1 className="register_text">Se Connecter</h1>
          <div className="input-box">
            <label>Addresse Email</label>
            <input
              type="email"
              placeholder="Votre addresse E-mail"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="input-box">
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="Votre mot de passe"
              name="motdepasse"
              value={data.motdepasse}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="remember-me">
            <Switch
              className="remember-me-switch"
              toggled={toggled}
              onToggle={() => setToggled(!toggled)}
            />
            <label className="remember-me-label">Se souvenir de moi</label>
          </div>
          <button type="submit" className="login_button">
            Se Connecter
          </button>
        </form>
      </div>
      <div className="footerLogin">
        <p>Copyrights © 2024 Graines d’Entrepreneurs®. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Login;
