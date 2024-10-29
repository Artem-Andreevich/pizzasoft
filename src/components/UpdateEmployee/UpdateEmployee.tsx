import { useDeleteEmployeeMutation, useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from "../../store/api/api";
import { EmployeeForm } from "../EmployeeForm/EmployeeForm";
import { useNavigate, useParams } from "react-router-dom";



export const UpdateEmployee = () => {

    const { id = ''} = useParams()
    const navigate = useNavigate();
    const { data: employee, isSuccess: isGetSuccess } = useGetEmployeeByIdQuery(id)
    const [ deleteEmployee ] = useDeleteEmployeeMutation()

    const deleteHandler = async (id: string) => {
        try {
            await deleteEmployee(id)
        } catch (err) {
            console.error('Ошибка', err)
        } finally {
            navigate(`/`) 
        }
    }

    const [ updateEmployee, { isLoading, isSuccess, isError } ] = useUpdateEmployeeMutation();
    return (
        <>
            {isGetSuccess 
                ? <EmployeeForm 
                    action={updateEmployee} 
                    isLoading={isLoading} 
                    isSuccess={isSuccess} 
                    isError={isError} 
                    employee={employee} 
                />
                : <div>Загрузка...</div>
            }
            <button 
                className="btn-cta btn-cta--main"
                onClick={() => deleteHandler(id)}
            >Удалить</button>
        </>
    )
}