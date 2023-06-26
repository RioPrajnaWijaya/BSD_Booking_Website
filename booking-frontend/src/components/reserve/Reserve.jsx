import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Reserve = ({setOpen, roomId}) => {
    return (
        <div className="reserve">
            <div className="reserveContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="reserveClose" onClick={ () => setOpen(false)}/>
            </div>
        </div>
    )
}

export default Reserve;