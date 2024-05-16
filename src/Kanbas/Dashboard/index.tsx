export default function Dashboard() {
    return (
      <div>
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
        <div id="wd-dashboard-courses">
          <div className="wd-dashboard-course">
            <img src="https://www.popwebdesign.net/popart_blog/wp-content/uploads/2018/03/reactjs.jpg" width={200} />
            <div>
              <a className="wd-dashboard-course-link"
                href="#/Kanbas/Courses/1234/Home">
                CS1234 React JS
              </a>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>
            <br/>
            <img src="images/mobileapp.png" width={200}/>
            <div className="wd-dashboard-course"> 
              <a className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1234/Home">
                  CS5520 Mobile App Development
                </a>
                <p className="wd-dashboard-course-title">
                  android studio
                </p>
                <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>
            <br/>
            <img src="images/ML.png" width={200}/>
            <div className="wd-dashboard-course"> 
              <a className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1234/Home">
                  CS6140 Machine Learning
                </a>
                <p className="wd-dashboard-course-title">
                  Machine Learning
                </p>
                <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>
            <img src="images/algorithms.png" width={200}/>
            <div className="wd-dashboard-course"> 
              <a className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1234/Home">
                  CS5800 Algorithms
                </a>
                <p className="wd-dashboard-course-title">
                  Algo
                </p>
                <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>
            <img src="images/OOP.png" width={200}/>
            <div className="wd-dashboard-course"> 
              <a className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1234/Home">
                  CS5007 Object Oriented Programming
                </a>
                <p className="wd-dashboard-course-title">
                Object Oriented Programming
                </p>
                <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>
            <img src="images/python.png" width={200}/>
            <div className="wd-dashboard-course"> 
              <a className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1234/Home">
                  CS5000 Python
                </a>
                <p className="wd-dashboard-course-title">
                  Python
                </p>
                <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>
            <img src="images/distribution.png" width={200}/>
            <div className="wd-dashboard-course"> 
              <a className="wd-dashboard-course-link"
                  href="#/Kanbas/Courses/1234/Home">
                  CS5700 Distributed System
                </a>
                <p className="wd-dashboard-course-title">
                 Distributed System
                </p>
                <a href="#/Kanbas/Courses/1234/Home"> Go </a>
            </div>
          </div>
        </div>
      </div>
  );}
  