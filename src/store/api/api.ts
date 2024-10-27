import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EmployeeRole, IEmployee } from '../../types/Employee/Employee';
import { API_URL } from './base';
import { convertDate } from '../../helpers/convertDate/convertDate';


export const transformEmployeesRole = (employee: IEmployee): IEmployee => {
    employee.birthday = convertDate(employee.birthday)
    switch(employee.role) {
        case EmployeeRole.DRIVER:
            employee.role = "Водитель"
            break
        case EmployeeRole.COOK:
            employee.role = "Повар"
            break
        case EmployeeRole.WAITER:
            employee.role = "Официант"
            break
        default:
            employee.role = employee.role
    }
    return employee
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['employee'],
    endpoints: (builder) => ({
        getEmployees: builder.query<IEmployee[], void>({
            query: () => `employees`,
            providesTags: ['employee'],
            transformResponse: (employees: IEmployee[]): IEmployee[] => { 
                return employees.map( employee => {
                    return transformEmployeesRole(employee)
                })
            }
        }),
        getEmployeeById: builder.query<IEmployee, string>({
            query: (id) => `employees/${id}`,
            providesTags: ['employee'],
            transformResponse: (employee: IEmployee): IEmployee => { 
                return transformEmployeesRole(employee)
            }
        }),
        deleteEmployee: builder.mutation<{ success: boolean; id: number }, string>({
            query: (id) => {
                return {
                    url: `employees/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['employee']
        }),
        addEmployee: builder.mutation<IEmployee, any>({
            query: ({body}) => {
                return {
                    url: '/employees',
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['employee']
        }),
        updateEmployee: builder.mutation<any, any>({
            query(data) {
                const { id, body } = data
                return {
                  url: `employees/${id}`,
                  method: 'PUT',
                  body,
                }
            },
            invalidatesTags: ['employee']
        })
    })
});

export const { 
    useGetEmployeesQuery,
    useGetEmployeeByIdQuery,
    useDeleteEmployeeMutation,
    useAddEmployeeMutation,
    useUpdateEmployeeMutation,
} = apiSlice



