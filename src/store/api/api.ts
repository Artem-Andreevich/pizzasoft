import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IEmployee } from '../../shared/types/Employee';
import { API_URL } from './base';


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['employee'],
    endpoints: (builder) => ({
        getEmployees: builder.query<IEmployee[], void>({
            query: () => `employees`,
            providesTags: ['employee']
        }),
        getEmployeeById: builder.query<IEmployee, number>({
            query: (id) => `employees/${id}`
        }),
        deleteEmployee: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => {
                return {
                    url: `employees/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['employee']
        }),
        
    })
});

export const { 
    useGetEmployeesQuery,
    useGetEmployeeByIdQuery,
    useDeleteEmployeeMutation,
} = apiSlice



