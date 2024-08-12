import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import { Route, Routes, Navigate, useParams, useLocation } from "react-router";
import Home from "./Home/idex";
import Assignments from "./Assignments";
import AssignmentsEditor from "./Assignments/AssignmentEditor";
import { FaAlignJustify } from 'react-icons/fa';
import Grades from "./Grades";
import PeopleTable from "./People/Table";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/QuizEditor";
import Question from "./Quizzes/Questions";
import QuestionEditor from "./Quizzes/Questions/QuestionEditor";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizPreview from "./Quizzes/QuizPreview";
// import { courses } from "../../Database";

export default function Courses({courses}:{courses : any[];}) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();
    return (
    <div id="wd-courses">
        <h2 className="text-danger">
            <FaAlignJustify className="me-4 fs-4 mb-1" /> 
            {course && course.name} &gt; {pathname.split("/")[4]}
        </h2>
        <div className="d-flex">
            <div className="d-none d-md-block">
                <CoursesNavigation /> 
            </div>
            <div className="flex-fill">    
                <Routes>
                    <Route path = "/" element = {<Navigate to = "Home" />}/>
                    <Route path = "Home" element = {<Home />}/>
                    <Route path="Modules" element={<Modules />} />
                    <Route path="Assignments" element={<Assignments />} />
                    <Route path="Assignments/:aid" element={<AssignmentsEditor />} />
                    <Route path="Assignments/new" element={<AssignmentsEditor />} />
                    <Route path="Grades" element={<Grades />}/>
                    <Route path="People" element={<PeopleTable />} />
                    <Route path="People/:uid" element={<PeopleTable />} />
                    <Route path="Quizzes" element={<Quizzes />}/>
                    <Route path="Quizzes/new" element={<QuizEditor />} />
                    <Route path="Quizzes/:qid" element={<QuizEditor />} />
                    <Route path="Quizzes/:qid/details" element={<QuizDetails />}/>
                    <Route path="Quizzes/:qid/preview" element={<QuizPreview />}/>
                    <Route path="Quizzes/:qid/Question" element={<Question />} />
                    <Route path="Quizzes/new/Questions/new" element={<QuestionEditor />} />
                    <Route path="Quizzes/:qid/Questions/new" element={<QuestionEditor />} />
                    <Route path="Quizzes/:qid/Questions/:qsid" element={<QuestionEditor />} />
                </Routes>
            </div>
        </div> 
    </div>
  );}