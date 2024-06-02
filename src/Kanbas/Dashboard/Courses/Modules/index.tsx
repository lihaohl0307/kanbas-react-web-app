import LessonControlButtons from "./LessonControButtons";
import ModulesControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";

export default function Modules() {
    return (
    <div id="wd-modules">
        {/* <ModulesControls /><br /><br /><br /><br /> */}
        <ul id="wd-modules" className="list-group">
            {/* use <li> directly instead of group component in <div> can remove the bullet points*/}
            <li className="list-group-item" style={{border: "none"}}>
                <ModulesControls />
                <br /><br /><br />
            </li>
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary">
                    <BsGripVertical className="me-2 fs-3" />
                    Week 1
                    <ModulesControlButtons />
                    </div>
                <ul className="wd-lessons list-group rounded-0">
                    <li className="wd-lesson list-group-item p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" />
                        Learning Objects
                        <LessonControlButtons />
                    </li>
                    <li className="wd-lesson list-group-item p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" />
                        Introduction to the course
                        <LessonControlButtons />
                    </li>
                    <li className="wd-lesson list-group-item p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" />
                        Learn what is Web Development
                        <LessonControlButtons />
                    </li>
                    <li className="wd-lesson list-group-item p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" />
                        LESSON 1
                        <LessonControlButtons />
                    </li>
                    <li className="wd-lesson list-group-item p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" />
                        LESSON 2
                        <LessonControlButtons />
                    </li>
                </ul>
            </li>
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary">
                    <BsGripVertical className="me-2 fs-3" />
                    Week 2
                    <ModulesControlButtons />
                    </div>
                <ul className="wd-lessons list-group rounded-0">
                    <li className="wd-lesson list-group-item p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" />
                        Learning Objects
                        <LessonControlButtons />
                    </li>
                    <li className="wd-lesson list-group-item p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" />
                        LESSON 1
                        <LessonControlButtons />
                    </li>
                    <li className="wd-lesson list-group-item p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" />
                        LESSON 2
                        <LessonControlButtons />
                    </li>
                </ul>
            </li> 
        </ul>
    </div>
   );
}