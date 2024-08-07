import React, { useState } from "react";
import Switch from "../../components/Switch/Switch"
import loginBackground from "../../assets/loginBackground.png"
import grainesLogo from "../../assets/grainesLogo.svg"
import "./login.css";

export const Login = () =>{
  const [toggled, setToggled] = useState(false);
  
  return (
    <div className="background">
      <div className="background-image">
        <img src={loginBackground}></img>
      </div>
      <div className="wrapper">
        <img className="gaines-logo" src={grainesLogo}></img>
        <form className="login-form" action="">
          <h1 className="register-text">Se Connecter</h1>
          <div className="input-box">
            <text>Addresse Email</text>
            <input type="Email" placeholder="Votre addresse E-mail" required on={e => e.target.setCustomValidity("Ce champs est obligatoire")}/>
          </div>
          <div className="input-box">
            <text>Mot de passe</text>
            <input type="password" placeholder="Votre mot de passe" required onInvalid={e => e.target.setCustomValidity("Ce champs est obligatoire")}/>
          </div>
          <div className="remember-me">
            <Switch className="remember-me-switch"   
              toggled={toggled}
              onToggle={() => setToggled(!toggled)}
            ></Switch>
            <label className="remember-me-label">Se souvenir de moi</label>
          </div>
          <button type="submit" class="login-button">Se Connecter</button>
        </form>
      </div>
      <div className="footer">
        <text>
          Copyrights © 2024 Graines d’Entrepreneurs®. All rights reserved.
        </text> 
      </div>
    </div>
  );
}
