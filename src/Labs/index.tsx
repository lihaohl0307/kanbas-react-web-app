import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import { Provider } from "react-redux";
import store from "./store";
import Lab5 from "./Lab5";
import { Link } from "react-router-dom";
export default function Labs() {
  return (
    <Provider store={store}>
      <div>
        <h1>Labs</h1>
        <h3>Full Name: Hao Li</h3>
        <h3>Team member: Hao Li</h3>
        <h4><a href="https://github.com/lihaohl0307/kanbas-react-web-app.git">Github-React</a></h4>
        <h4><a href="https://github.com/lihaohl0307/kanbas-node-server-app.git">Github-Node</a></h4>
        <h4><a href="https://kanbas-node-server-app-1-gdpv.onrender.com">Render</a></h4>

        <TOC />
        <Routes>
          <Route path="/" element={<Navigate to="Lab1" />} />
          <Route path="Lab1" element={<Lab1 />} />
          <Route path="Lab2" element={<Lab2 />} />
          <Route path="Lab3/*" element={<Lab3 />} />
          <Route path="Lab4/*" element={<Lab4 />} />
          <Route path="Lab5/*" element={<Lab5 />} />
        </Routes>
      </div>
    </Provider>
  );
}
