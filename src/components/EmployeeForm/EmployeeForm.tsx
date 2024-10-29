import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { EmployeeRoleRu, IEmployee } from "../../types/Employee/Employee";
import { getEnumValues } from "../../helpers/getEnumValues/getEnumValues";
import { convertDate } from "../../helpers/convertDate/convertDate";
import { Button} from "../../ui/Button/Button";
import { Tooltip } from "../../ui/Tooltip/Tooltip"
import { error } from "console";

interface FormData {
    name: string;
    role: string;
    phone: string;
    birthday: string;
    isArchive: boolean;
}

interface EmployeeFormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    role: HTMLSelectElement;
    phone: HTMLInputElement;
    birthday: HTMLInputElement;
    archive: HTMLInputElement;
}

interface EmployeeForm extends HTMLFormElement {
    readonly elements: EmployeeFormElements;
}

export interface FormDataPayload {
    body: FormData,
    id?: string
}

interface EmployeeFormProps {
    action: (payload: FormDataPayload) => void,
    isLoading: boolean,
    isSuccess?: boolean,
    isError?: boolean,
    employee?: IEmployee
}


export const EmployeeForm = (props: EmployeeFormProps) => {

    const { 
        action, 
        employee, 
        isLoading, 
        isSuccess, 
        isError 
    } = props

    const [ showTolltip, setShowTooltip ] = useState(false)
    const form = useRef<HTMLFormElement>(null)
    const refSetTimeout = useRef<NodeJS.Timeout>()

    async function submitHandler(event: FormEvent<EmployeeForm>) {
        event.preventDefault()
        const target = event.currentTarget.elements;
        const formData: FormData = {
            name: target.name.value.trim(),
            role: target.role.value.trim(),
            phone: target.phone.value.trim().replace(/ /g,''),
            birthday: convertDate(target.birthday.value),
            isArchive: target.archive.checked,
        }
        try {
            employee 
                ? await action({body: formData, id: employee.id})
                : await action({body: formData})

        } catch (err) {
            throw new Error("321321321312")
            console.log(err)
            // toggleTooltip()
        } finally {
            if(isSuccess){
                console.log('suc')
            }
            if(isError){
                console.log('er')
            }
            toggleTooltip()
            isSuccess && form.current?.reset()
        }
    }

    const toggleTooltip = () => {
        setShowTooltip(true)

        refSetTimeout.current = setTimeout(() => {
            setShowTooltip(false)
        }, 3000)
    }

    let tooltip
    if(showTolltip && isError)
        tooltip = <Tooltip timerId={refSetTimeout.current} className="error">Не удалось отправить данные</Tooltip>
    else if(showTolltip && isSuccess)
        tooltip = <Tooltip timerId={refSetTimeout.current} className="success">Форма успешно отрпавлена</Tooltip>

    return (
        <form 
            className="form"
            onSubmit={submitHandler} 
            ref={form}
        >
            <div className="form-control">
                <label>
                    <span>ФИО</span>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        placeholder="Имя Фамилия"
                        defaultValue={employee ? employee.name : ""} 
                        disabled={isLoading || showTolltip}
                        required 
                    />
                </label>
            </div>
            <div className="form-control">
                <label>
                    <span>Телефон</span>
                    <InputMask 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        defaultValue={employee ? employee.phone : ""} 
                        pattern="^\+7\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}" 
                        mask="+7 (999) 999 99 99" 
                        maskPlaceholder="+7 (___) ___-__-__" 
                        placeholder="+7 (999) 999 99 99"
                        disabled={isLoading || showTolltip}
                        required 
                    />
                </label>
            </div>
            <div className="form-control">
                <label>
                    <span>Дата рождения</span>
                    <input 
                        type="date" 
                        id="birthday" 
                        name="birthday" 
                        defaultValue={employee ? employee.birthday : ""} 
                        disabled={isLoading || showTolltip}
                        required 
                    />
                </label>
            </div>
            <div className="form-control">
                <label>
                    <span>Должность</span>
                    <select
                        name="role" 
                        id="role" 
                        disabled={isLoading || showTolltip}
                        required
                    >
                        <option 
                            value=""
                            defaultValue={employee ? employee.role : ""}
                            hidden 
                            selected 
                            disabled
                        >Должность</option>
                        {getEnumValues(EmployeeRoleRu).map( value => (
                            <option 
                                key={value} 
                                defaultValue={value}
                                selected={employee && employee.role === value}
                            >
                                {value}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="form-control">
                <label className="page__checkbox">
                    <input 
                        type="checkbox" 
                        name="archive" 
                        id="archive" 
                        defaultChecked={employee ? employee.isArchive : false} 
                        disabled={isLoading || showTolltip}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 0.253167 0.253167">
                        <rect fill="#ED4300" width="0.253167" height="0.253167" rx="0.0506327" ry="0.0506327"></rect>
                        <polyline fill="none" stroke="white" strokeWidth="0.0253182" strokeLinecap="round" strokeLinejoin="round" points="0.177213,0.0885956 0.113921,0.151887 0.0759509,0.113914 "></polyline>
                    </svg>
                    <span>Архив</span>
                </label>
            </div>
            
            <div className="form__actions">
                <Button
                    className="btn-cta btn-cta--accent"
                    disabled={isLoading || showTolltip}
                >
                    <span>Сохранить</span>
                </Button>
                {tooltip}
            </div>
            
        </form>
    )
}