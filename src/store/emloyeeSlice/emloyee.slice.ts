import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api";
import { IEmployee } from "../../types/Employee/Employee";

const enum SortingOrder {
    ASC = "ASC",
    DESC = "DESC"
} 

interface EmployeesState {
    employees: IEmployee[];
    roleFilters: string[];
    status: 'idle' | 'pending' | 'succeeded' | 'rejected';
    error: string | null;
  }

const initialState: EmployeesState = {
    employees: [],
    roleFilters: [],
    status: 'idle',
    error: null
}


export const emloyeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        filteredByRole: (state, { payload }) => {
            const curState = [...state.employees]
            const filteredState = state.employees.filter( employee => employee.role === payload)
            payload === "none" 
                ? state.employees = curState
                : state.employees = filteredState
            // payload !== "none" 
            //     ? state.employees = filteredState
            //     : state.employees = curState
        
            
        },
        sortingByName: (state, { payload }) => {
            state.employees
                .sort((a, b) => 
                    payload === SortingOrder.ASC 
                        ? a.name > b.name ? 1 : -1 
                        : a.name < b.name ? 1 : -1
                )
        },
        sortingByBirthday: (state, { payload }) => {
            state.employees
                .sort((a, b) => {
                    const dateA = a.birthday.split('.').reverse().join()
                    const dateB = b.birthday.split('.').reverse().join()
                    return payload === SortingOrder.ASC 
                        ? dateA < dateB ? -1 : (dateA > dateB ? 1 : 0) : dateA > dateB ? -1 
                        : (dateA < dateB ? 1 : 0)
                })
        },
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
                state.roleFilters = Array(...new Set(state.employees.map( item => item.role)))
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

export const { sortingByName, sortingByBirthday, filteredByRole  } = emloyeeSlice.actions
export const emloyeeReducer = emloyeeSlice.reducer