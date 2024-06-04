export default function AssignmentEditor() {
    return (
    <div id="wd-assignments-editor">
        <div className="form-group mb-3">
            <label htmlFor="wd-name" className="form-label"><b>Assignment Name</b></label>
            <input id="wd-name" className="form-control" value="A1"/>
        </div>
        <div className="form-group mb-3">
            <textarea id="wd-description" className="form-control" rows={8}>
                The assignment is available online
                Submit a link to the landing page of your Web application
                running on Netlify. 
                The landing page should include the following: 
                Your full name and section
                Links to each lab assignments
                Link to the Kanbas application
                Links to all relevant source code repositories
                The Kanbas application should include a link to navigate back to the landing page.
            </textarea>
        </div>
        <div className="form-group row mb-3">
            <label htmlFor="wd-points" className="col-form-label col-4" style={{textAlign: 'right'}}>Points</label>
            <div className="col-8">
                <input id="wd-points" className="form-control" value="100"/>
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
                        <input id="wd-due-date" type="date" className="form-control"/>
                    </div>
                    <div className="row">
                        <div className="form-group col mb-2">
                            <label htmlFor="wd-available-from"><b>Available From</b></label>
                            <input id="wd-available-from" type="date" className="form-control"/>
                        </div>
                        <div className="form-group col mb-2">
                            <label htmlFor="wd-available-until"><b>Until</b></label>
                            <input id="wd-available-until" type="date" className="form-control"/>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <br />
        <hr />
        <button className="btn btn-danger float-end">
            Save
        </button>
        <button className="btn btn-secondary float-end me-1">
            Cancel
        </button>
        
    </div>
    
  );}
