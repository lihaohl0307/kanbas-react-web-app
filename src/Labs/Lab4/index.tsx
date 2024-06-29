import ArrayStateVariable from "../Lab3/ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import EventObject from "./EventObject";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import ReduxExamples from "./ReduxExamples";
import StringStateVariables from "./StringStateVariables";

export default function Lab4() {
    const sayHello = () => alert("hello"); 
    return (
    <div id = "wd-lab4">
        <h2>Lab 4</h2>
        <ClickEvent />
        <PassingDataOnEvent />
        <PassingFunctions theFunction={sayHello}/> {/* Will invoke type error if pass in function doesn't match type annotation */}
        <EventObject />
        <Counter />
        <BooleanStateVariables />
        <StringStateVariables /> 
        <DateStateVariable />   
        <ObjectStateVariable />   
        <ArrayStateVariable /> 
        <ParentStateComponent />
        <ReduxExamples />
        
    </div>
);}