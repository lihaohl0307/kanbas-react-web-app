import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const axiosWithCredentials = axios.create({ withCredentials: true });
  const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
  const COURSES_API = `${REMOTE_SERVER}/api/courses`;

  useEffect(() => {
    if (currentUser.role === "STUDENT" && currentUser.coursesEnrolled.length > 0) {
      const fetchEnrolledCourses = async () => {
        try {
          const courseDetailsPromises = currentUser.coursesEnrolled.map((courseId: any) =>
            axiosWithCredentials.get(`${COURSES_API}/id/${courseId}`)
          );
          const courseDetailsResponses = await Promise.all(courseDetailsPromises);
          const courseDetails = courseDetailsResponses.map((response) => response.data);
          setEnrolledCourses(courseDetails);
        } catch (error) {
          console.error("Error fetching enrolled courses:", error);
        }
      };

      fetchEnrolledCourses();
    }
  }, [currentUser]);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* Faculty-Specific Section */}
      {currentUser.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <hr />
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            placeholder="Course Name"
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            placeholder="Course Description"
          />
          <hr />
        </>
      )}

      {/* Student-Specific Enroll Button */}
      {currentUser.role === "STUDENT" && (
        <button
          className="btn btn-success mb-3"
          onClick={() => navigate("/Kanbas/Enroll")}
        >
          Enroll New Courses
        </button>
      )}

      <h2 id="wd-dashboard-published">
        {currentUser.role === "FACULTY"
          ? `Your Courses (${courses.length})`
          : `Enrolled Courses (${enrolledCourses.length})`}
      </h2>
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-4 row-cols-lg-6 row-cols-xl-8">
          {(currentUser.role === "FACULTY" ? courses : enrolledCourses).map((course) => (
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
                    alt={`${course.name}`}
                  />
                  <div className="card-body">
                    <span
                      className="wd-dashboard-course-link"
                      style={{
                        textDecoration: "none",
                        color: "navy",
                        fontWeight: "bold"
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

                    {/* Faculty-Specific Buttons */}
                    {currentUser.role === "FACULTY" && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course.number);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}
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
