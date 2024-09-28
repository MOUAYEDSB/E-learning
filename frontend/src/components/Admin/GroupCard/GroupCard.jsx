/* eslint-disable react/prop-types */
import {GroupIcon} from "../../../assets/GroupIcon";
import "./groupCard.css";
export const GroupCard = (props) =>{
    return(
    <div className="group-card" style={{backgroundColor:`${props.color}`}}>
        <div className="group-info">
            <label className="group-name">{props.groupName? props.groupName : "Group Name"}</label>
            <label className="group-age">{props.groupAge ? props.groupAge : "Group Age"}</label>
        </div>
        <div className="group-image-border">
            {props.imageSrc && <img className="group-card-icon" src={props.imageSrc}/>}
            {!props.imageSrc &&
            <div className="group-card-icon">
                <GroupIcon fillColor={props.color}/>
            </div>}
        </div>
    </div>
    );
}