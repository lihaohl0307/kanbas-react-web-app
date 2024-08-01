import Dashboard from "./Dashboard";
import Courses from "./Dashboard/Courses";
import KanbasNavigation from "./Navigation";
import { Route, Routes, Navigate } from "react-router";
import "./styles.css";
// import * as db from "./Database";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import * as client from "./Dashboard/Courses/client"
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";

export default function Kanbas() {
    const [courses, setCourses] = useState<any []>([]);
    const generateUniqueNumber = () => {
      return new Date().getTime().toString(); // Using current timestamp as unique number
    };
    // get data from the server(instead of client side json)
    const fetchCourses = async () => {
      const courses = await client.fetchAllCourses();
      setCourses(courses);
    };

    useEffect(() => {
      fetchCourses();
    }, []);
  
    const initialCourseState = {
      name: "New Course",
      number: generateUniqueNumber(),
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      department: "New Department",
      credits: 4,
      description: "New Description"
  };

  const [course, setCourse] = useState<any>(initialCourseState);

    // const addNewCourse = () => {
    //   const newCourse = {
    //     ...course, name: `${course.name} ${courses.length}`,_id : new Date().getTime().toString()};
    //     setCourses([newCourse, ...courses]);
    // };
    const addNewCourse = async () => {
      const newCourse = await client.createCourse(course);
      setCourses([ newCourse, ...courses ]); // refresh page client side new courses will render at the end
      setCourse({ ...initialCourseState, number: generateUniqueNumber() }); // Reset course, so we'll have all required field in schema
    };    
  
    // const deleteCourse = (courseId: string) => {
    //   setCourses(courses.filter((course) => course._id !== courseId));
    // };
    const deleteCourse = async (courseId: string) => {
      await client.deleteCourse(courseId);
      setCourses(courses.filter(
        (c) => c.number !== courseId));
    };

    // const updateCourse = () => {
    //   setCourses(
    //     courses.map((c) => {
    //       if (c._id === course._id) {
    //         return course;
    //       } else {
    //         return c;
    //       }
    //     })
    //   );
    // }; 
    const updateCourse = async () => {
      await client.updateCourse(course);
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
                  <Route path="/Account/*" element={<Account />} />
                  <Route path="Dashboard" element={
                    <ProtectedRoute>
                      <Dashboard
                      courses={courses}
                      course={course}
                      setCourse={setCourse}
                      addNewCourse={addNewCourse}
                      deleteCourse={deleteCourse}
                      updateCourse={updateCourse}/>
                    </ProtectedRoute>
                  } />
                  <Route path="Courses/:cid/*" element={
                    <ProtectedRoute>
                      <Courses courses={courses}/>
                    </ProtectedRoute> }
                    />
                  <Route path="Calendar" element={<h1>Calendar</h1>} />
                  <Route path="Inbox" element={<h1>Inbox</h1>} />
              </Routes>
            </div>
        </div> 
      </div> 
      </Provider>    
);}
//
  