import { useDeleteEmployeeMutation, useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from "../../store/api/api";
import { EmployeeForm } from "../EmployeeForm/EmployeeForm";
import { useNavigate, useParams } from "react-router-dom";



export const UpdateEmployee = () => {

    const { id = ''} = useParams()
    const navigate = useNavigate();
    const { data: employee, isSuccess } = useGetEmployeeByIdQuery(id)
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

    const [ updateEmployee, { isLoading } ] = useUpdateEmployeeMutation();
    return (
        <>
            {isSuccess 
                ? <EmployeeForm action={updateEmployee} isLoading={isLoading} employee={employee} />
                : <div>Не могу найти такого сотрудника</div>
            }
            <button 
                className="btn-cta btn-cta--main"
                onClick={() => deleteHandler(id)}
            >Удалить</button>
        </>
    )
}