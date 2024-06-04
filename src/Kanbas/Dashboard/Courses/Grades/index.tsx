import { FaChevronDown, FaSearch } from "react-icons/fa";
import ButtonBar from "./buttonbar";
import { LuFilter } from "react-icons/lu";
export default function Grades() {
    return (
        <div id="wd-grades">
            <div className="row">
                <ButtonBar />
            </div>
            <br />
            <div className="row mb-2">
                <div className="form-group col mb-2">
                    <label htmlFor="wd-student-names"><b>Student Names</b></label>
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <FaSearch />
                        </span>
                        <input id="wd-student-names" 
                            className="form-control"
                            placeholder="Search for Assignments"/>
                        <div className="dropdown input-group-text float-end bg-white p-0">
                            <button id="wd-student-names-btn" className="btn"
                            type="button" data-bs-toggle="dropdown">
                              <FaChevronDown />  
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Placeholder
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="form-group col mb-2">
                <label htmlFor="wd-assignment-names"><b>Assignment Names</b></label>
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <FaSearch />
                        </span>
                        <input id="wd-assignment-names" 
                            className="form-control"
                            placeholder="Search for Assignments"/>
                        <div className="dropdown input-group-text float-end bg-white p-0">
                            <button id="wd-assignment-names-btn" className="btn"
                            type="button" data-bs-toggle="dropdown">
                              <FaChevronDown />  
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Placeholder
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-2">
                <div className="form-group col mb-2">
                   <button className="btn btn-secondary">
                    <LuFilter />
                    Apply Filters
                </button> 
                </div>
            </div>
            <div className="row mb-2">
                <div className="form-group col mb-2">
                    <table className="table table-bordered table-striped align-middle fs-6">
                        <thead className="thead-light align-middle">
                            <tr>
                                <th>Student Name</th>
                                <th>A1 SETUP<br/><small>Out of 100</small></th>
                                <th>A2 HTML<br/><small>Out of 100</small></th>
                                <th>A3 CSS<br/><small>Out of 100</small></th>
                                <th>A4 BOOTSTRAP<br/><small>Out of 100</small></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Han Bao</td>
                                <td>100%</td>
                                <td>100%</td>
                                <td className="editable-cell-1">
                                    <input type="text" className="form-control" placeholder="88.03" />
                                </td>
                                <td>98.99%</td>
                            </tr>
                            <tr>
                                <td>Siran Cao</td>
                                <td>100%</td>
                                <td>100%</td>
                                <td className="editable-cell-2">
                                    <input type="text" className="form-control" placeholder="100" />
                                </td>
                                <td>100%</td>
                            </tr>
                            <tr>
                                <td>Mahi Sai Srinivas Bobbili</td>
                                <td>100%</td>
                                <td>96.67%</td>
                                <td>98.37%</td>
                                <td>100%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}