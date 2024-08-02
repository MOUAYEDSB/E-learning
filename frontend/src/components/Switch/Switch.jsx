import React from "react";
import "./Switch.css"
function Switch({toggled, onToggle}){
    return (
        <label className={`track ${toggled ? "toggled" : ""}`}>
            <input type="checkbox" checked={toggled} onChange={onToggle}/>
            <div className="thumb"/>
        </label>
    )
}
export default Switch;