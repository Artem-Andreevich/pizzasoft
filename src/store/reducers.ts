import { combineReducers } from "@reduxjs/toolkit"
import { apiSlice } from "./api/api"
import { emloyeeReducer } from "./emloyeeSlice/emloyee.slice"

export const reducers = combineReducers({
    emloyee: emloyeeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
})