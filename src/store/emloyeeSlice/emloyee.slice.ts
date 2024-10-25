import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmployee } from "../../shared/types";
import { API_URL } from "../api/base";


// export const fetchEmployees = createAsyncThunk(
//     'employees/fetchEmployees',
//     async (userId, thunkAPI) => {
//         console.log('123')
//         const response = await fetch(`${API_URL}/employees`);
//         return response;
//     }
//   );

const initialState: [] | IEmployee[] = []

export const emloyeeSlice = createSlice({
    name: "emloyee",
    initialState,
    reducers: {
        
    },

    // extraReducers: builder => {
    //     builder.addCase(fetchEmployees.pending, (state: any, action: any) => {
    //         console.log(state)
    //         state.entries.push(action.payload);
    //     })
    // }
})

export const { } = emloyeeSlice.actions
export const emloyeeReducer = emloyeeSlice.reducer