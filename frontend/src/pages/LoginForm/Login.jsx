import React, { useState } from "react";
import Switch from "../../components/Switch/Switch"
import {assets} from "../../assets/assets"
import "./login.css";
import axios from "axios";

function Login({setLogin}) {
  const [toggled, setToggled] = useState(false);
  const [data , setData] = useState({email:"",motdepasse:""});
  const onLogin = async (event)=>{
    event.preventDefault();
    let URL = "http://localhost:3000/api/user/login"; 
    

    const response = await axios.post(URL,data,{headers:{"Content-Type":"application/json"}});
    
    if (response.data.success) {
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("role",response.data.role);

      setLogin(true);
    } else {
      alert(response.data.message);
    }
  }
  const onChangeHandler = (event)=>{
    const name = event.target.name ;
    const value = event.target.value ;

    setData(data=>({...data,[name]:value}))
  }
  return (
    <div className="background">
      <div className="background_image">
        <img src={assets.loginBackground}/>
      </div>
      <div className="wrapper">
        <img className="gaines_logo" src={assets.grainesLogo}></img>
        <form className="login_form" onSubmit={onLogin}>
          <h1 className="register_text">Se Connecter</h1>
          <div className="input-box">
            <text>Addresse Email</text>
            <input type="Email" placeholder="Votre addresse E-mail" name="email" value={data.email} onChange={onChangeHandler} required />
          </div>
          <div className="input-box">
            <text>Mot de passe</text>
            <input type="password" placeholder="Votre mot de passe" name="motdepasse" value={data.motdepasse} onChange={onChangeHandler} required />
          </div>
          <div className="remember-me">
            <Switch className="remember-me-switch"   
              toggled={toggled}
              onToggle={() => setToggled(!toggled)}
            ></Switch>
            <label className="remember-me-label">Se souvenir de moi</label>
          </div>
          <button type="submit" class="login_button">Se Connecter</button>
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
export default Login;
