import { Link, useLocation, useParams } from "react-router-dom";
import "./index.css";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  // if no one is signed in they see the Sign In and Sign Up links, but not the Profile link. 
  // But if someone is signed in, they should only see the Profile link.
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();
  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      {
        links.map((link) => (
        <Link to={`/Kanbas/Account/${link}`} 
            className={`wd-link border border-0 list-group-item
           ${ pathname.includes(link) ? "active text-black" : "text-danger" }`}> 
           {link} 
        </Link>
      ))}
    </div>
  );
}
