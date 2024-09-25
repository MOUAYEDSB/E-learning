import React, { useState } from "react";
import {assets} from "../../assets/assets";
import './Parametres.css';


function ParametresPage() {
  
  return (
    <div className="ParametresPage">
    <img src={assets.parametrespage} style={{width: 500, height: 300}}/>
    </div>
  );
}
export default ParametresPage;
