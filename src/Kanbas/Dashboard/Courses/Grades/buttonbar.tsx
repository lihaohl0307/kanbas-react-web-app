import { FaFileImport } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { LuFileInput, LuFileOutput } from "react-icons/lu";

export default function ButtonBar() {
    return (
        <div id="wd-buttonbar" className="text-nowrap"> 
            <button id="wd-grades-gear" className="btn btn-lg btn-secondary float-end me-2">
                <FaGear className="fs-5"/>
            </button>
            <div className="dropdown float-end me-2">
                <button id="wd-export-grades" className="btn btn-lg btn-secondary dropdown-toggle"
                type="button" data-bs-toggle="dropdown">
                    <LuFileOutput />
                    Export
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <a className="dropdown-item" href="#">
                            Placeholder
                        </a>
                    </li>
                </ul>
            </div>
            <button id="wd-import-grades" className="btn btn-lg btn-secondary float-end me-1">
                <LuFileInput />
                Import
            </button>
        </div>
    );
}