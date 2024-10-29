import { useEffect, useRef, useState } from "react"
import { useAddEmployeeMutation } from "../../store/api/api"
import { EmployeeForm } from "../EmployeeForm/EmployeeForm"
import { FormData } from "../EmployeeForm/EmployeeForm" 
import { Tooltip } from "../../ui/Tooltip/Tooltip"


export const AddEmployee = () => {

    const [ addEmployee, { isLoading, isSuccess, isError, status } ] = useAddEmployeeMutation()
    const [ showTolltip, setShowTooltip ] = useState(false)


    const refSetTimeout = useRef<NodeJS.Timeout>()
    
    const toggleTooltip = () => {
        setShowTooltip(true)

        refSetTimeout.current = setTimeout(() => {
            setShowTooltip(false)
        }, 2000)
    }


    useEffect(() => {
        setShowTooltip(true)
    }, [isSuccess]) 

    const sendFormData = async (formData: FormData) =>  {
        try {
            await addEmployee({body: formData})
        } catch(error) {
            console.error('Ошибка: ', error)
        } finally {
            toggleTooltip()
        }
    }

    let tooltip

    if(showTolltip && isError)
        tooltip = <Tooltip timerId={refSetTimeout.current} className="error">Не удалось отправить данные</Tooltip>
    else if(showTolltip && isSuccess)
        tooltip = <Tooltip timerId={refSetTimeout.current}  className="success">Форма успешно отрпавлена</Tooltip>


    return (
        <>
            {tooltip}
            <EmployeeForm callback={sendFormData} disabled={isLoading} status={isSuccess}/>
        </>
    )
}