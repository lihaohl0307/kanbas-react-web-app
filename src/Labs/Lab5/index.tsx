import PathParameters from "../Lab5/PathParameters";
import EnvironmentVariables from "./EnvironmentVariables";
import QueryParameters from "./QueryParameters";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithObjects from "./WorkingWithObjects";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function Lab5() {
    return (
      <div id="wd-lab5">
        <h2>Lab 5</h2>
          <a href={`${REMOTE_SERVER}/lab5`}>
             <h3>Go to lab5</h3>
          </a><hr />
          <EnvironmentVariables />
          <PathParameters />
          <QueryParameters />
          <WorkingWithObjects />
          <WorkingWithArrays />
      </div>
    );
  }
  