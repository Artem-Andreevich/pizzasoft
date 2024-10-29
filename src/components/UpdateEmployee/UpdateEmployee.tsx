import { useRef, useState } from "react";
import { useDeleteEmployeeMutation, useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from "../../store/api/api";
import { Tooltip } from "../../ui/Tooltip/Tooltip";
import { EmployeeForm } from "../EmployeeForm/EmployeeForm";
import { useNavigate, useParams } from "react-router-dom";
import { FormData } from "../EmployeeForm/EmployeeForm" 




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

    const [ updateEmployee, { isLoading, isSuccess, isError, status } ] = useUpdateEmployeeMutation();

    const [ showTolltip, setShowTooltip ] = useState(false)


    const getFormData = async (formData: FormData) =>  {
        try {
            await updateEmployee({body: formData, id: employee?.id})
        } catch(error) {
            console.error('Ошибка добавления сотрудника: ', error)
        } finally {
            toggleTooltip()
        }
    }

    const refSetTimeout = useRef<NodeJS.Timeout>()
    
    const toggleTooltip = () => {
        setShowTooltip(true)

        refSetTimeout.current = setTimeout(() => {
            setShowTooltip(false)
        }, 2000)
    }
    
    let tooltip

    if(showTolltip && isError)
        tooltip = <Tooltip timerId={refSetTimeout.current} className="error">Не удалось отправить данные</Tooltip>
    else if(showTolltip && isSuccess)
        tooltip = <Tooltip timerId={refSetTimeout.current}  className="success">Форма успешно отрпавлена</Tooltip>

    
    return (
        <>
            {isGetSuccess 
                ? <>
                    {tooltip}
                    <EmployeeForm callback={getFormData} defaultValue={employee} disabled={isLoading} status={isSuccess}/>
                </>
                : <div>Загрузка...</div>
            }
            <button 
                className="btn-cta btn-cta--main"
                onClick={() => deleteHandler(id)}
            >Удалить</button>
        </>
    )
}