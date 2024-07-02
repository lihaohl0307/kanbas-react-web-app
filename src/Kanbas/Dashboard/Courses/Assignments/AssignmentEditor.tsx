import { useNavigate, useParams } from "react-router";
import { assignments } from "../../../Database";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    // const assignment = assignments && assignments.find(assignment => assignment._id === aid);
    // const title = assignment?.title;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const existingAssignment = assignments.find((assignment: any) => assignment._id === aid);
    const [title, setTitle] = useState(existingAssignment?.title || "");
    const [description, setDescription] = useState(existingAssignment?.description || "");
    const [points, setPoints] = useState(existingAssignment?.points || 100);
    const [dueDate, setDueDate] = useState(existingAssignment?.dueDate || "");
    const [availableFrom, setAvailableFrom] = useState(existingAssignment?.availableFrom || "");
    const [availableUntil, setAvailableUntil] = useState(existingAssignment?.availableUntil || "");

    const handleSave = () => {
        const newAssignment = {
          _id: aid || new Date().getTime().toString(),
          title,
          description,
          points,
          dueDate,
          availableFrom,
          availableUntil,
          course: cid,
        };
    
        if (existingAssignment) {
          dispatch(updateAssignment(newAssignment));
        } else {
          dispatch(addAssignment(newAssignment));
        }
    
        navigate(`/Kanbas/Courses/${cid}/Assignments`);
      };

    return (
    <div id="wd-assignments-editor">
        <div className="form-group mb-3">
            <label htmlFor="wd-name" className="form-label"><b>Assignment Name</b></label>
            <input 
                id="wd-name" 
                className="form-control" 
                value={existingAssignment? `${aid} ${title}`: "New Assignment"}
                onChange={(e) => setTitle(e.target.value)}
                />
        </div>
        <div className="form-group mb-3">
            <textarea 
            id="wd-description" 
            className="form-control" 
            rows={8}
            value={description ? description: "Enter assignment description..."}
            onChange={(e) => setDescription(e.target.value)}
        //     defaultValue={`
        // The assignment is available online

        // Submit a link to the landing page of your Web application running on Netlify.

        // The landing page should include the following:

        // - Your full name and section
        // -  Links to each lab assignment
        // - Link to the Kanban application
        // - Links to all relevant source code repositories
        // - The Kanban application should include a link to navigate back to the landing page.`}
            >
            </textarea>
        </div>
        <div className="form-group row mb-3">
            <label htmlFor="wd-points" className="col-form-label col-4" style={{textAlign: 'right'}}>Points</label>
            <div className="col-8">
                <input 
                    id="wd-points"
                    className="form-control"
                    type="number"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                />
            </div>
        </div>
        <div className="form-group row mb-3">
            <label htmlFor="wd-group" className="col-form-label col-4" style={{textAlign: 'right'}}>Assignment Group</label>
            <div className="col-8">
                <select id="wd-group" className="form-select">
                    <option value="assignments">ASSIGNMENTS</option>
                    <option value="quizzes">QUIZZES</option>
                    <option value="exams">EXAMS</option>
                    <option value="project">PROJECT</option>
                </select>
            </div>
        </div>    
        <div className="form-group row mb-3">
            <label htmlFor="wd-display-grade-as" className="col-form-label col-4" 
                style={{textAlign: 'right'}}>Display Grade as</label>
            <div className="col-8">
                <select id="wd-display-grade-as" className="form-select">
                    <option value="percentage">Percentage</option>
                    <option value="points">Points</option>
                </select>
            </div>
        </div>
        <div className="form-group row mb-3">
            <label htmlFor="wd-submission-type" className="col-form-label col-4"
                style={{textAlign: 'right'}}>Submission Type</label>
            <br />
            <div className="col-8">
                <div className="card p-3">
                    <select id="wd-submission-type" className="form-select">
                        <option value="online">Online</option>
                        <option value="inperson">In-person</option>
                    </select>
                    <br />
                    <b>Online Entry Options</b>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="wd-text-entry" />
                        <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="wd-website-url" checked />
                        <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="wd-media-recordings" />
                        <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="wd-student-annotation" />
                        <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="wd-file-upload" />
                        <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
                    </div>
                </div>
            </div>
        </div>
        <div className="form-group row mb-3">
            <label htmlFor="wd-assign" className="col-form-label col-4"
                style={{textAlign: 'right'}}>Assign</label>
            <br />
            <div className="col-8">
                <div className="card p-3">
                    <div className="form-group mb-2">
                        <label htmlFor="wd-assign-to"><b>Assign to</b></label>
                        <input id="wd-assign-to" className="form-control" value="Everyone"/>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="wd-due-date"><b>Due</b></label>
                        <input 
                            id="wd-due-date" 
                            type="date" 
                            className="form-control"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            />
                    </div>
                    <div className="row">
                        <div className="form-group col mb-2">
                            <label htmlFor="wd-available-from"><b>Available From</b></label>
                            <input 
                                id="wd-available-from" 
                                type="date" 
                                className="form-control"
                                value={availableFrom}
                                onChange={(e) => setAvailableFrom(e.target.value)}
                            />
                        </div>
                        <div className="form-group col mb-2">
                            <label htmlFor="wd-available-until"><b>Until</b></label>
                            <input 
                                id="wd-available-until" 
                                type="date" 
                                className="form-control"
                                value={availableUntil}
                                onChange={(e) => setAvailableUntil(e.target.value)}
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <br />
        <hr />
        <button className="btn btn-danger float-end" onClick={handleSave}>
        Save
        </button>
        <button className="btn btn-secondary float-end me-1" onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments`)}>
            Cancel
        </button>
        {/* <button className="btn btn-danger float-end">
            <Link to={`/Kanbas/Courses/${cid}/Assignments`}>Save</Link>
        </button>
        <button className="btn btn-secondary float-end me-1">
            <Link to={`/Kanbas/Courses/${cid}/Assignments`}>Cancel</Link>
        </button> */}
        
    </div>
    
  );}
