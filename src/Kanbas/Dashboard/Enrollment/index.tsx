import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { enrollInCourse, getAllCourses } from "./client";

export default function Enrollment() {
  const [courses, setCourses] = useState<any[]>([]);
  
  // Fetch courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // const response = await axios.get("http://localhost:4000/api/courses/all");
        const response = await getAllCourses();
        setCourses(response); // Update state with fetched courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId: any) => {
    try {
      await enrollInCourse(courseId); // Call the API to enroll in the course
      alert('Enrolled successfully!');
    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert('Failed to enroll.');
    }
  };


  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Enrollment</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-4 row-cols-lg-6 row-cols-xl-8">
          {courses.map((course) => (
            <div
              className="wd-dashboard-course col"
              style={{ width: "300px", marginBottom: "30px" }}
              key={course.number}
            >
              <Link
                to={`/Kanbas/Courses/${course.number}/Home`}
                className="text-decoration-none"
              >
                <div className="card rounded-3 overflow-hidden">
                  <img
                    src="https://www.popwebdesign.net/popart_blog/wp-content/uploads/2018/03/reactjs.jpg"
                    height={160}
                    alt={course.name}
                  />
                  <div className="card-body">
                    <span
                      className="wd-dashboard-course-link"
                      style={{
                        textDecoration: "none",
                        color: "navy",
                        fontWeight: "bold",
                      }}
                    >
                      {course.name}
                    </span>
                    <p
                      className="wd-dashboard-course-title card-text"
                      style={{ maxHeight: 53, overflow: "hidden" }}
                    >
                      {course.description}
                    </p>
                    <Link
                      to={`/Kanbas/Courses/${course.number}/Home`}
                      className="btn btn-primary"
                    >
                      Go
                    </Link>
                    <button
                      onClick={() => handleEnroll(course._id)}
                      className="btn btn-success ms-2"
                    >
                      Enroll
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
