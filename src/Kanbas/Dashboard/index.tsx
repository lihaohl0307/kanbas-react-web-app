import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as db from "../Database";

export default function Dashboard() {
    const [courses, setCourses] = useState(db.courses);
    const course: any = {
      _id: "0", name: "New Course", number: "New Number",
      startDate: "2023-09-10", endDate: "2023-12-15",
      image: "/images/reactjs.jpg", description: "New Description"
    };
    const addNewCourse = () => {
      const newCourse = {
        ...course, _id : new Date().getTime().toString()};
        setCourses([newCourse, ...courses]);
    };

     return (
      <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        <h5>New Course
            <button className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}> 
              Add</button>
        </h5>
        <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
        <div id="wd-dashboard-courses" className="row" >
          <div className="row row-cols-1 row-cols-md-4 row-cols-lg-6 row-cols-xl-8">
            {courses.map((course) => (
              <div className="wd-dashboard-course col" style={{ width: "300px", marginBottom: "30px"}}>
                <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none">
                  <div className="card rounded-3 overflow-hidden">
                    <img src="https://www.popwebdesign.net/popart_blog/wp-content/uploads/2018/03/reactjs.jpg" height={160} />
                    <div className="card-body">
                      <span className="wd-dashboard-course-link"
                        style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }} >
                            {course.name}
                      </span>
                      <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                        {course.description}
                      </p>
                      <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">Go</Link>
                    </div>
                  </div>
                </Link>
              </div>
            ))}

            {/* <div className="wd-dashboard-course col"  style={{ width: "270px", marginBottom: "30px", paddingRight: '15px', paddingLeft: '15px' }}>
              <div className="card">
                <img src="https://www.popwebdesign.net/popart_blog/wp-content/uploads/2018/03/reactjs.jpg" height={150} />
                <div className="card-body">
                  <a className="wd-dashboard-course-link"
                    href="#/Kanbas/Courses/1234/Home"
                    style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                    CS1234 React JS
                  </a>
                  <p className="wd-dashboard-course-title card-text">
                    Full Stack software developer
                  </p>
                  <a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div>

            <div className="wd-dashboard-course col"  style={{ width: "270px", marginBottom: "30px", paddingRight: '15px', paddingLeft: '15px'}}>
              <div className="card">
                <img src="images/mobileapp.png" height={150}/>
                <div className="wd-dashboard-course card-body"> 
                  <a className="wd-dashboard-course-link"
                      href="#/Kanbas/Courses/1234/Home"
                      style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                      CS5520 Mobile App Dev
                    </a>
                    <p className="wd-dashboard-course-title card-text">
                      android studio
                    </p>
                    <a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary" > Go </a>
                </div>
              </div>
            </div>

            <div className="wd-dashboard-course col"  style={{ width: "270px", marginBottom: "30px", paddingRight: '15px', paddingLeft: '15px' }}>
              <div className="card">
                <img src="images/ML.png" height={150}/>
                <div className="wd-dashboard-course card-body"> 
                  <a className="wd-dashboard-course-link"
                      href="#/Kanbas/Courses/1234/Home"
                      style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                      CS6140 Machine Learning
                    </a>
                    <p className="wd-dashboard-course-title card-text">
                      Machine Learning
                    </p>
                    <a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div>
            
            <div className="wd-dashboard-course col"  style={{ width: "270px", marginBottom: "30px", paddingRight: '15px', paddingLeft: '15px' }}>
              <div className="card">
                <img src="images/algorithms.png" height={150}/>
                <div className="wd-dashboard-course card-body"> 
                  <a className="wd-dashboard-course-link"
                      href="#/Kanbas/Courses/1234/Home"
                      style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                      CS5800 Algorithms
                    </a>
                    <p className="wd-dashboard-course-title card-text">
                      Algo
                    </p>
                    <a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div> */}

            {/* <div className="wd-dashboard-course col"  style={{ width: "270px", marginBottom: "30px", paddingRight: '15px', paddingLeft: '15px' }}>
              <div className="card">
                <img src="images/OOP.png" height={150}/>
                <div className="wd-dashboard-course card-body"> 
                  <a className="wd-dashboard-course-link"
                      href="#/Kanbas/Courses/1234/Home"
                      style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                      CS5007 Object Oriented Design
                    </a>
                    <p className="wd-dashboard-course-title card-text">
                    Object Oriented Programming
                    </p>
                    <a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div>
            
            <div className="wd-dashboard-course col"  style={{ width: "270px", marginBottom: "30px", paddingRight: '15px', paddingLeft: '15px' }}>
              <div className="card">
                <img src="images/python.png" height={150}/>
                <div className="wd-dashboard-course card-body"> 
                  <a className="wd-dashboard-course-link"
                      href="#/Kanbas/Courses/1234/Home"
                      style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                      CS5000 Python
                    </a>
                    <p className="wd-dashboard-course-title card-text">
                      Python
                    </p>
                    <a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div>

            <div className="wd-dashboard-course col"  style={{ width: "270px" }}>
              <div className="card">
                <img src="images/distribution.png" height={150}/>
                <div className="wd-dashboard-course card-body"> 
                  <a className="wd-dashboard-course-link"
                      href="#/Kanbas/Courses/1234/Home"
                      style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                      CS5700 Distributed System
                    </a>
                    <p className="wd-dashboard-course-title card-text">
                    Distributed System
                    </p>
                    <a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary"> Go </a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
  );}
  