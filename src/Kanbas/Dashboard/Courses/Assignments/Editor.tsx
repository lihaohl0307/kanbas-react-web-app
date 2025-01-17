export default function AssignmentEditor() {
    return (
    <div id="wd-assignments-editor">
        <label htmlFor="wd-name"><b>Assignment Name</b></label>
        <br /><br />
        <input id="wd-name" value="A1 - ENV + HTML" />
        <br /><br />
        <textarea id="wd-description" rows={8} cols={40}>
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
        <br /><br />
        <table>
            <tr>
                <td align="right" valign="top">
                <label htmlFor="wd-points">Points</label>
                </td>
                <td>
                <input id="wd-points" value={100}/>
                </td> 
            </tr>
            <br />
            <tr>
                <td align="right" valign="top">
                <label htmlFor="wd-group">Assignment Group</label>
                </td>
                <td>
                <select id="wd-group">
                    <option value="assignments">ASSIGNMENTS</option>
                    <option value="quizzes">QUIZZES</option>
                    <option value="exams">EXAMS</option>
                    <option value="project">PROJECT</option>
                </select>
                </td>
            </tr>
            <br />
            <tr>
                <td align="right" valign="top">
                <label htmlFor="wd-display-grade-as">Display Grade as</label>
                </td>
                <td>
                <select id="wd-display-grade-as">
                    <option value="percentage">Percentage</option>
                    <option value="points">Points</option>
                </select>
                </td>
            </tr>
            <br />
            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-submission-type">Submission Type</label>
                </td>
                <td>
                    <select id="wd-display-grade-as">
                        <option value="percentage">Online</option>
                    </select><br /><br />
                    <label>Online Entry Options</label><br />
                        <input type="checkbox"name="entry-options" id="wd-text-entry"/>
                        <label htmlFor="wd-text-entry">Text Entry</label><br/>
                        <input type="checkbox"name="entry-options" id="wd-website-url"/>
                        <label htmlFor="wd-website-url">Website URL</label><br/>
                        <input type="checkbox"name="entry-options" id="wd-media-recordings"/>
                        <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
                        <input type="checkbox"name="entry-options" id="wd-student-annotation"/>
                        <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
                        <input type="checkbox"name="entry-options" id="wd-file-upload"/>
                        <label htmlFor="wd-file-upload">File Uploads</label><br/>
                </td>
            </tr>
            <br />
            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-assign">Assign</label>
                </td>
                <td>
                    <label htmlFor="wd-assign-to">Assign to</label><br />
                    <input id = "wd-assign-to" value="Everyone"></input><br /><br />
                    <label htmlFor="wd-due-date">Due</label><br />
                    <input id = "wd-due-date" type="date"></input><br /><br />
                    <label htmlFor="wd-available-from">Available From</label><br />
                    <input id = "wd-available-from" type="date"></input><br /><br />
                    <label htmlFor="wd-available-until">Until</label><br />
                    <input id = "wd-available-until" type="date"></input><br /><br />
                </td>
            </tr>
        </table>
        <hr />
        <button>Cancel</button>
        <button>Save</button>
    </div>
  );}
