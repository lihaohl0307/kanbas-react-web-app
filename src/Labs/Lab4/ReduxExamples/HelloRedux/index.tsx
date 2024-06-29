import { useSelector, useDispatch } from "react-redux";
export default function HelloRedux() {
  // useSelector is a hook provided by react-redux that allows you to extract data from the Redux store's state.
  // state represents the entire Redux store state
  // state.hello accesses the part of the state managed by the hello reducer
  // { message } is a destructuring assignment that extracts the message property from the state.hello object
  const { message } = useSelector((state: any) => state.helloReducer); 
  return (
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      <h4>{message}</h4> <hr />
</div>
); }