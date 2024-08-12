import "./index.css";
import { Link, useParams, useLocation } from "react-router-dom";
export default function CoursesNavigation() {
    const {cid} = useParams();
    const {pathname} = useLocation();
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

    return (
      <div id="wd-courses-navigation" className="list-group fs-5 rounded-0 me-2">
        {
          links.map((link,index) => 
            <Link key={index} to={`/Kanbas/Courses/${cid}/${link}`}
              className={`list-group-item border border-0
                ${pathname.includes(link) ? "active" : "text-danger"}`}>
              {link}
            </Link>
          ) 
        }
    </div> 
  );
}