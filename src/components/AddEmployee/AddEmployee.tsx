import { useAddEmployeeMutation } from "../../store/api/api";
import { EmployeeForm } from "../EmployeeForm/EmployeeForm";


export const AddEmployee = () => {
    const [ addEmployee, { isLoading } ] = useAddEmployeeMutation();
    return (
        <EmployeeForm action={addEmployee} isLoading={isLoading} />
    )
}