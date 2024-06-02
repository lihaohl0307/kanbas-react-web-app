import GreenCheckmark from "./GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5"; 
import { BsPlus } from "react-icons/bs";
export default function ModulesControlButtons() {
    return (
        <div className="float-end"> 
            <GreenCheckmark />
            <BsPlus className="fs-2"/>
            <IoEllipsisVertical className="fs-4"/>
        </div>
    );
}