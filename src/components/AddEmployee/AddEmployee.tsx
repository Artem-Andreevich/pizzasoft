import { useAddEmployeeMutation } from "../../store/api/api"
import { EmployeeForm } from "../EmployeeForm/EmployeeForm"
import { FormData } from "../EmployeeForm/EmployeeForm" 


export const AddEmployee = () => {

    const [ addEmployee, { status } ] = useAddEmployeeMutation()

    const sendFormData = async (formData: FormData) =>  {
        try {
            await addEmployee({body: formData})
        } catch(error) {
            console.error('Ошибка: ', error)
        } finally {

        }
    }

    return (
        <EmployeeForm callback={sendFormData} status={status}/>
    )
}