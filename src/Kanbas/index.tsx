import Dashboard from "./Dashboard";
import Courses from "./Dashboard/Courses";
import KanbasNavigation from "./Navigation";
import { Route, Routes, Navigate } from "react-router";

export default function Kanbas() {
    return (
      <div id="wd-kanbas"> 
        <div className="d-flex">
            <div className="d-none d-md-block bg-black">
              <KanbasNavigation />
            </div>  
            <div className="flex-fill p-4"> 
              <Routes>
                  <Route path="/" element={<Navigate to="Dashboard" />} />
                  <Route path="Dashboard" element={<Dashboard />} />
                  <Route path="Courses/:id/*" element={<Courses />} />
              </Routes>
            </div>
        </div> 
      </div>     
);}
  