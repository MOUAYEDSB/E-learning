import "./groupCard.css";
export default function GroupCard(props){
    <div>
        <div>
            <label className="group-name">{props.groupName}</label>
            <label className="group-age">{props.groupAge}</label>
        </div>
        <div>
            <img className="group_image" src={props.imageSrc}/>
        </div>
    </div>
}