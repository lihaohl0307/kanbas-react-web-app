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

export default function Kanbas() {
    const [courses, setCourses] = useState<any []>([]);
    
    // get data from the server(instead of client side json)
    const fetchCourses = async () => {
      const courses = await client.fetchAllCourses();
      setCourses(courses);
    };

    useEffect(() => {
      fetchCourses();
    }, []);
  
    const [course, setCourse] = useState<any>({
      // id : "0",
      name: "New Course", number: "New Number",
      startDate: "2023-09-10", endDate: "2023-12-15",
      department: "New Department",
      credits: 4,
      // image: "/images/reactjs.jpg", 
      description: "New Description"
    });

    // const addNewCourse = () => {
    //   const newCourse = {
    //     ...course, name: `${course.name} ${courses.length}`,_id : new Date().getTime().toString()};
    //     setCourses([newCourse, ...courses]);
    // };
    const addNewCourse = async () => {
      const newCourse = await client.createCourse(course);
      setCourses([ newCourse, ...courses ]); // refresh page client side new courses will render at the end
    };
  

    // const deleteCourse = (courseId: string) => {
    //   setCourses(courses.filter((course) => course._id !== courseId));
    // };
    const deleteCourse = async (courseId: string) => {
      await client.deleteCourse(courseId);
      setCourses(courses.filter(
        (c) => c._id !== courseId));
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
  