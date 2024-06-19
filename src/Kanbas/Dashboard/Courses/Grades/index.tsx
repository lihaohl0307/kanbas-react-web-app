import { FaChevronDown, FaSearch } from "react-icons/fa";
import ButtonBar from "./buttonbar";
import { LuFilter } from "react-icons/lu";
import { users, enrollments, grades, assignments} from "../../../Database";
import { useParams } from "react-router";

export default function Grades() {
    const { cid } = useParams();
    // Find the enrollment for the current course
    const currentEnrollments = enrollments.filter(enrollment => enrollment.course === cid);
    console.log(currentEnrollments);

    // Map the enrollments to user details
    const enrollmentDetails = currentEnrollments.map(enrollment => {
        const user = users.find(user => user._id === enrollment.user);
        return {
            firstName: user?.firstName,
            lastName: user?.lastName,
            _id: user?._id
        };
    });
    console.log(enrollmentDetails);

    // Extract assignments for the current course
    const courseAssignments = assignments.filter(assignment => assignment.course === cid);

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
                                {assignments.filter(assignment => assignment.course === cid)
                                    .map((assignment, index) => (
                                    <th key={index}>
                                        {assignment._id}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>                       
                            {enrollmentDetails.map((details, index) => (
                                <tr key={index}>
                                    <td>{details.firstName} {details.lastName}</td>
                                    {courseAssignments.map((assignment, index) => {
                                        const grade = grades.find(grade => grade.student === details._id && grade.assignment === assignment._id);
                                        return (
                                            <td key={index}>
                                                {grade ? grade.grade : 'N/A'}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}