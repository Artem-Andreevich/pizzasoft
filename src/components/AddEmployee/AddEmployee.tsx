import { useAddEmployeeMutation } from "../../store/api/api";
import { EmployeeForm } from "../EmployeeForm/EmployeeForm";


export const AddEmployee = () => {
    const [ addEmployee, { isLoading, isSuccess, isError } ] = useAddEmployeeMutation()
    return (
        <EmployeeForm 
            action={addEmployee} 
            isLoading={isLoading} 
            isSuccess={isSuccess} 
            isError={isError} 
        />
    )
}