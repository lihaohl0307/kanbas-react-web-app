import { useParams } from "react-router";
import LessonControlButtons from "./LessonControButtons";
import ModulesControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
// import { modules } from "../../../Database";
import ModuleControlButtons from "./ModuleControlButtons";
import * as db from "../../../Database";
import React, { useState, useEffect } from "react";
import { setModules, addModule, editModule, updateModule, deleteModule }from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";

export default function Modules() {
    const { cid } = useParams();
    // const [modules, setModules] = useState<any[]>(db.modules);
    const [moduleName, setModuleName] = useState("test")
    const [moduleDescription, setModuleDescription] = useState("test123");
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();
    
    const saveModule = async (module: any) => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
      };    

    const removeModule = async (moduleId: string) => {
        await client.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
      };    

    const createModule = async (module: any) => {
        const newModule = await client.createModule(cid as string, module);
        dispatch(addModule(newModule));
    };
    
    const fetchModules = async () => {
        const modules = await client.findModulesForCourse(cid as string);
        dispatch(setModules(modules));
      };

    useEffect(() => {
        fetchModules();
    }, []);
       
    
    return (
    <div id="wd-modules">
        <ModulesControls
                moduleName={moduleName}
                setModuleName={setModuleName}
                moduleDescription={moduleDescription}
                setModuleDescription={setModuleDescription}
                addModule={() => {
                    createModule({ name: moduleName, description: moduleDescription, courseNumber: cid });
                }}
            />
        <br /><br /><br /><br />
        <ul id="wd-modules" className="list-group rounded-0">
            {/* filter is used to select only those modules whose course property matches the value of cid. */}
            {modules
                .filter((module: any) => module.course === cid)
                .map((module: any) => (
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                    <BsGripVertical className="me-2 fs-3" />
                    {!module.editing && module.name}
                    { module.editing && (
                        <input className="form-control w-50 d-inline-block"
                            onChange={(e) => 
                                // dispatch(updateModule({ ...module, name: e.target.value }))}
                                saveModule({ ...module, name: e.target.value })}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                // dispatch(updateModule({ ...module, editing: false }));
                                saveModule({ ...module, editing: false });
                                }
                            }}
                    value={module.name}/>
                    )}
                    <ModuleControlButtons 
                        moduleId={module._id}
                        deleteModule={(moduleId) => {
                            // dispatch(deleteModule(moduleId));
                            removeModule(moduleId);
                          }}
                          editModule={(moduleId) => dispatch(editModule(moduleId))}
                        />
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
        </ul>
    </div>
   );
}