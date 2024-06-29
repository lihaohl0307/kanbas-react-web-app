import { useParams } from "react-router";
import LessonControlButtons from "./LessonControButtons";
import ModulesControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import { modules } from "../../../Database";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
    const { cid } = useParams();
    return (
    <div id="wd-modules">
        {/* <ModulesControls /><br /><br /><br /><br /> */}
        <ul id="wd-modules" className="list-group rounded-0">
            {/* filter is used to select only those modules whose course property matches the value of cid. */}
            {modules.filter((module: any) => module.course === cid)
                .map((module: any) => (
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                    <BsGripVertical className="me-2 fs-3" />
                    {module.name}
                    <ModuleControlButtons />
                    </div>
                    {module.lessons && (
                    <ul className="wd-lessons list-group rounded-0">
                        {module.lessons.map((lesson: any) => (
                        <li className="wd-lesson list-group-item p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" />
                            {lesson.name}
                            <LessonControlButtons />
                        </li>
                        ))}
                    </ul>
                    )}
                </li>
        ))}

            {/* use <li> directly instead of group component in <div> can remove the bullet points*/}
            {/* <li className="list-group-item" style={{border: "none"}}>
                <ModulesControls />
                <br /><br /><br />
            </li>
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary">
                    <BsGripVertical className="me-2 fs-3" />
                    Week 1
                    <ModulesControlButtons />
                </div>
                <ul className="wd-lessons list-group rounded-0 border-5 border-start border-success">
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
                <ul className="wd-lessons list-group rounded-0 border-5 border-start border-success">
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
            </li>  */}
        </ul>
    </div>
   );
}