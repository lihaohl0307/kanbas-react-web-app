import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as db from "../Database";

export default function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; }
) {
    return (
      <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        <h5>New Course
            <button className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}> 
              Add</button>
              <button className="btn btn-warning float-end me-2"
                onClick={updateCourse} id="wd-update-course-click">
                Update
              </button>
        </h5><hr />
        <input value={course.name} className="form-control mb-2"
                onChange={(e) => setCourse({ ...course, name: e.target.value }) }/>
        <textarea value={course.description} className="form-control"
                 onChange={(e) => setCourse({ ...course, description: e.target.value }) }/><hr />

        <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
        <div id="wd-dashboard-courses" className="row" >
          <div className="row row-cols-1 row-cols-md-4 row-cols-lg-6 row-cols-xl-8">
            {courses.map((course) => (
              <div className="wd-dashboard-course col" style={{ width: "300px", marginBottom: "30px"}}>
                <Link to={`/Kanbas/Courses/${course.number}/Home`} className="text-decoration-none">
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
                      <Link to={`/Kanbas/Courses/${course.number}/Home`} className="btn btn-primary">Go</Link>
                      <button onClick={(event) => {
                                        event.preventDefault(); // you want to perform some action without submitting the form, you call event.preventDefault() to prevent the form submission.
                                        deleteCourse(course.number);}} 
                              className="btn btn-danger float-end"
                              id="wd-delete-course-click">
                              Delete
                      </button>
                      <button id="wd-edit-course-click"
                              onClick={(event) => {
                                event.preventDefault();
                                setCourse(course);
                              }}
                              className="btn btn-warning me-2 float-end" >
                              Edit
                      </button>

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
  