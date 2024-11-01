import { useNavigate, useParams } from "react-router-dom";
import { useDeleteEmployeeMutation, useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from "../../store/api/api";
import { EmployeeForm } from "../EmployeeForm/EmployeeForm";
import { FormData } from "../EmployeeForm/EmployeeForm" 


export const UpdateEmployee = () => {

    const { id = ''} = useParams()
    const navigate = useNavigate();
    const { data: employee, refetch, isSuccess, isFetching} = useGetEmployeeByIdQuery(id)
    const [ updateEmployee, { status } ] = useUpdateEmployeeMutation();
    const [ deleteEmployee ] = useDeleteEmployeeMutation()

    const deleteHandler = (id: string) => {
        try {
            deleteEmployee(id)
        } catch (err) {
            console.error('Ошибка', err)
        } finally {
            navigate(`/`) 
        }
    }


    const sendFormData = async (formData: FormData) =>  {
        try {
            await updateEmployee({body: formData, id: employee?.id})
        } catch(error) {
            console.error('Ошибка добавления сотрудника: ', error)
        } finally {
            refetch()
        }
    }

    
    return (
        <>
            {isSuccess && !isFetching
                ? <EmployeeForm sendFormData={sendFormData} defaultValue={employee} status={status}/>
                : <div>Загрузка...</div>
            }
            <button 
                className="btn-cta btn-cta--main"
                onClick={() => deleteHandler(id)}
            >Удалить</button>
        </>
    )
}