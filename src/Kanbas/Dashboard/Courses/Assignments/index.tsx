import { BsGripVertical, BsPlus } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import ModulesControlButtons from "../Modules/ModuleControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import { GiNotebook } from "react-icons/gi";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { TbNotebook } from "react-icons/tb";
import { MdCheckCircle } from "react-icons/md";
import { useParams } from "react-router";
import { assignments } from "../../../Database";
import { Link } from "react-router-dom";
import Editor from "./AssignmentEditor";
import AssignmentEditor from "./AssignmentEditor";

export default function Assignments() {
  const { cid, aid } = useParams();
  return (
      <div id="wd-assignments">
        <div className="d-flex flex-row">
          <div className="input-group" style={{ width: '300px' }}>
            <span className="input-group-text bg-white border-end-0">
                <FaSearch />
            </span>
            <input
                id="wd-search-assignment"
                placeholder="Search for Assignments"
                className="form-control border-start-0 fs-5"
            />
          </div>
          <div className="ms-auto">
          {/* "margin-start: auto." It is used to push elements to the far end (right) of a flex container by applying automatic left margin */}
            <button id="wd-add-assignment-group" className="btn btn-lg btn-light text-nowrap me-2">
              + Group</button>
            <button id="wd-add-assignment" className="btn btn-lg btn-danger text-nowrap">
              + Assignment
              </button>
          </div>
        </div>
        <br /><br />
        <div id="wd-assignment">
          <ul id="wd-assignment" className="list-group rounded-0">
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary fw-bold">
                    <BsGripVertical className="me-2 fs-3" />
                      ASSIGNMENTS
                    <div className="float-end">
                      <button className="btn btn-light">
                        40% of Total
                      </button>
                      <BsPlus className="fs-2"/>
                      <IoEllipsisVertical className="fs-4"/>
                    </div>
                </div>
              <ul id="wd-assignment-list" className="list-group rounded-0 border-5 border-start border-success">
                {assignments && 
                  assignments.filter((assignment) => cid === assignment.course)
                    .map((assignment) => (
                      <li className="wd-assignment-list-item list-group-item p-3 d-flex align-items-center">
                        <BsGripVertical className="me-3 fs-4" style={{flexShrink: "0"}}/>
                        <TbNotebook className="me-3 fs-2" style={{ color: 'green', flexShrink: "0"}} />
                        <div className="flex-grow-1">
                            <Link to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment-link fw-bold text-black" >
                              {assignment._id}: {assignment.title}
                            </Link>
                            <div className="fs-6">
                                <span className="text-danger me-1">Multiple Modules</span>
                                <span>| <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts</span>
                            </div>
                        </div>
                        <MdCheckCircle className="fs-4 text-success me-2" style={{flexShrink: "0"}} />
                        <IoEllipsisVertical className="fs-4" style={{flexShrink: "0"}}/>
                      </li>
                    )

                )}

                {/* <li className="wd-assignment-list-item list-group-item p-3 d-flex align-items-center">
                  <BsGripVertical className="me-3 fs-4" style={{flexShrink: "0"}}/>
                  <TbNotebook className="me-3 fs-2" style={{ color: 'green', flexShrink: "0"}} />
                  <div className="flex-grow-1">
                      <a className="wd-assignment-link fw-bold" href="#/Kanbas/Courses/1234/Assignments/123"
                      style={{color: 'black'}}>
                          A1
                      </a>
                      <div className="fs-6">
                          <span className="text-danger me-1">Multiple Modules</span>
                          <span>| <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts</span>
                      </div>
                  </div>
                  <MdCheckCircle className="fs-4 text-success me-2" style={{flexShrink: "0"}} />
                  <IoEllipsisVertical className="fs-4" style={{flexShrink: "0"}}/>
                </li> */}
                {/* <li className="wd-assignment-list-item list-group-item p-3 d-flex align-items-center">
                  <BsGripVertical className="me-3 fs-4" style={{flexShrink: "0"}}/>
                  <TbNotebook className="me-3 fs-2" style={{ color: 'green', flexShrink: "0"}} />
                  <div className="flex-grow-1">
                      <a className="wd-assignment-link fw-bold" href="#/Kanbas/Courses/1234/Assignments/123"
                      style={{color: 'black'}}>
                          A2
                      </a>
                      <div className="fs-6">
                          <span className="text-danger me-1">Multiple Modules</span>
                          <span>| <b>Not available until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100 pts</span>
                      </div>
                  </div>
                  <MdCheckCircle className="fs-4 text-success me-2" style={{flexShrink: "0"}} />
                  <IoEllipsisVertical className="fs-4" style={{flexShrink: "0"}}/>
                </li> */}
                {/* <li className="wd-assignment-list-item list-group-item p-3 d-flex align-items-center">
                  <BsGripVertical className="me-3 fs-4" style={{flexShrink: "0"}}/>
                  <TbNotebook className="me-3 fs-2" style={{ color: 'green', flexShrink: "0"}} />
                  <div className="flex-grow-1">
                      <a className="wd-assignment-link fw-bold" href="#/Kanbas/Courses/1234/Assignments/123"
                      style={{color: 'black'}}>
                          A3
                      </a>
                      <div className="fs-6">
                          <span className="text-danger me-1">Multiple Modules</span>
                          <span>| <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100 pts</span>
                      </div>
                  </div>
                  <MdCheckCircle className="fs-4 text-success me-2" style={{flexShrink: "0"}} />
                  <IoEllipsisVertical className="fs-4" style={{flexShrink: "0"}}/>
                </li> */}
              </ul>
            </li>
          </ul>
        </div>
      </div>
);}

function useRouter() {
  throw new Error("Function not implemented.");
}
