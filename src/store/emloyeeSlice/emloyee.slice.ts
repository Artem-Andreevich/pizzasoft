import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api";
import { IEmployee } from "../../types/Employee/Employee";


interface EmployeesState {
    employees: IEmployee[];
    status: 'idle' | 'pending' | 'succeeded' | 'rejected';
    error: string | null;
  }

const initialState: EmployeesState = {
    employees: [],
    status: 'idle',
    error: null
}


export const emloyeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            apiSlice.endpoints.getEmployees.matchPending,
            (state) => {
                state.status = 'pending'
            }
        )
        builder.addMatcher(
            apiSlice.endpoints.getEmployees.matchFulfilled,
            (state, { payload }) => {
                state.employees = payload
                state.status = 'succeeded';
            }
        )
        builder.addMatcher(
            apiSlice.endpoints.getEmployees.matchRejected,
            (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message ?? 'Unknown Error'
            }
        )
    }
});

export const { } = emloyeeSlice.actions
export const emloyeeReducer = emloyeeSlice.reducer