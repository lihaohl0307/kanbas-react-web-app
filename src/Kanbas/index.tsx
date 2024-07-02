import Dashboard from "./Dashboard";
import Courses from "./Dashboard/Courses";
import KanbasNavigation from "./Navigation";
import { Route, Routes, Navigate } from "react-router";
import "./styles.css";
import * as db from "./Database";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store";

export default function Kanbas() {
    const [courses, setCourses] = useState(db.courses);
    const [course, setCourse] = useState<any>({
      _id: "0", name: "New Course", number: "New Number",
      startDate: "2023-09-10", endDate: "2023-12-15",
      image: "/images/reactjs.jpg", description: "New Description"
    });
    const addNewCourse = () => {
      const newCourse = {
        ...course, name: `${course.name} ${courses.length}`,_id : new Date().getTime().toString()};
        setCourses([newCourse, ...courses]);
    };
    const deleteCourse = (courseId: string) => {
      setCourses(courses.filter((course) => course._id !== courseId));
    };
    const updateCourse = () => {
      setCourses(
        courses.map((c) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
      );
    };  
  return (
    <Provider store={store}>
      <div id="wd-kanbas" className="h-100"> 
        <div className="d-flex h-100">
            <div className="d-none d-sm-block bg-black">
              <KanbasNavigation />
            </div>  
            <div className="flex-fill p-4"> 
              <Routes>
                  <Route path="/" element={<Navigate to="Dashboard" />} />
                  <Route path="Account" element={<h1>Account</h1>}/>
                  <Route path="Dashboard" element={
                    <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}/>
                  } />
                  <Route path="Courses/:cid/*" element={<Courses courses={courses}/>} />
                  <Route path="Calendar" element={<h1>Calendar</h1>} />
                  <Route path="Inbox" element={<h1>Inbox</h1>} />
              </Routes>
            </div>
        </div> 
      </div> 
      </Provider>    
);}
  