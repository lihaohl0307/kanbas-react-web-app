import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import { Route, Routes, Navigate } from "react-router";
import Home from "./Home/idex";
import Assignments from "./Assignments";
import AssignmentsEditor from "./Assignments/Editor";

export default function Courses() {
    return (
    <div id="wd-courses">
        <h2>Course 1234</h2>
        <hr />
        <table>
            <tr>
                <td valign="top">
                   <CoursesNavigation /> 
                </td>
                <Routes>
                    <Route path = "/" element = {<Navigate to = "Home" />}/>
                    <Route path = "Home" element = {<Home />}/>
                    <Route path="Modules" element={<Modules />} />
                    <Route path="Assignments" element={<Assignments />} />
                    <Route path="Assignments/:id" element={<AssignmentsEditor />} />
                </Routes>
            </tr>
        </table>
    </div>
  );}