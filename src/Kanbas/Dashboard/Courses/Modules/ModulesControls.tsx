import { FaPlus } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
import { GoCircleSlash } from "react-icons/go";
import ModuleEditor from "./ModuleEditor";
export default function ModulesControls(
    { moduleName, moduleDescription, setModuleName, addModule }:
    { moduleName: string; moduleDescription: string; 
        setModuleName: (title: string) => void; 
        addModule: () => void; 
        setModuleDescription: (title: string) => void; 
    }
) {
    return (
        <div id="wd-modules-controls" className="text-nowrap">
            <button id="wd-add-module-btn" className="btn btn-lg btn-danger float-end me-1"
                data-bs-toggle="modal" data-bs-target="#wd-add-module-dialog">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }}/>
                Module
            </button>
            <div className="dropdown d-inline me-1 float-end">
                <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle"
                type="button" data-bs-toggle="dropdown">
                    <GreenCheckmark />
                    Publish All
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item" href="#">
                        <GreenCheckmark />
                        Publish all modules and items
                        </a>
                    </li>
                    <li>
                        <a id="wd-publish-modules-only-button" className="dropdown-item" href="#">
                        <GreenCheckmark />
                        Publish modules only
                        </a>
                    </li>
                    <li>
                        <a id="wd-unpublish-all-modules-and-items" className="dropdown-item" href="#">
                        <GoCircleSlash className="me-2"/>
                        Unpublish all modules and items
                        </a>
                    </li>
                    <li>
                        <a id="wd-unpublish-modules-only" className="dropdown-item" href="#">
                        <GoCircleSlash className="me-2"/>
                        Unpublish modules only
                        </a>
                    </li>
                </ul>
            </div>
            <button id="wd-view-progress" className="btn btn-lg btn-light float-end me-1">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }}/>
                View Progress
            </button>
            <button id="wd-collapse-all" className="btn btn-lg btn-light float-end me-1">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }}/>
                Collapse All
            </button>
            <ModuleEditor dialogTitle="Add Module" moduleName={moduleName}
                    setModuleName={setModuleName} addModule={addModule} />
        </div> 
    );
}