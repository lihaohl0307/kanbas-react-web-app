import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";
const initialState = {
    assignments: assignments, //initialize assignments from json file(database)
  };
const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, {payload: assignment}) => {
            const newAssignment: any = {
                _id: new Date().getTime().toString(),
                title: assignment.title,
                course: assignment.course
            }
            state.assignments = [...state.assignments, newAssignment]
        },
        deleteAssignment: (state, {payload: assignmentId}) => {
            state.assignments = state.assignments.filter(
                (a: any) => a._id !== assignmentId
            );
        },
        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((a: any) =>
              a._id === assignment._id ? assignment : a
            ) as any;
          },
        editAssignment: (state, { payload: assignmentId }) => {
        state.assignments = state.assignments.map((a: any) =>
            a._id === assignmentId ? { ...a, editing: true } : a
        ) as any;
        },
    }
})
export const {addAssignment, deleteAssignment, editAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer