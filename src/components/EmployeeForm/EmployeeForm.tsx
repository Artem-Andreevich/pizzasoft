import { FormEvent, useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";
import { EmployeeRoleRu, IEmployee } from "../../types/Employee/Employee";
import { getEnumValues } from "../../helpers/getEnumValues/getEnumValues";
import { convertDate } from "../../helpers/convertDate/convertDate";
import { Button} from "../../ui/Button/Button";
import classNames from "classnames";
import { Tooltip } from "../../ui/Tooltip/Tooltip";

export interface FormData {
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
    callback: (data: FormData) => void;
    defaultValue?: IEmployee;
    status?: string;
}


export const EmployeeForm = ({defaultValue, callback, status}: EmployeeFormProps) => {

    const form = useRef<HTMLFormElement>(null)
    const [ showTolltip, setShowTooltip ] = useState(false)
    const refSetTimeout = useRef<NodeJS.Timeout>()

    useEffect( () => {
        if(status === 'fulfilled')
            form.current?.reset()
        toggleTooltip()
    }, [status])


    const toggleTooltip = () => {
        setShowTooltip(true)

        refSetTimeout.current = setTimeout(() => {
            setShowTooltip(false)
        }, 2000)
    }
    
    let tooltip
    if(showTolltip && status === 'rejected')
        tooltip = <Tooltip timerId={refSetTimeout.current} className="error">Не удалось отправить данные</Tooltip>
    else if(showTolltip && status === 'fulfilled')
        tooltip = <Tooltip timerId={refSetTimeout.current}  className="success">Форма успешно отрпавлена</Tooltip>


    function submitHandler(event: FormEvent<EmployeeForm>) {
        event.preventDefault()
        const target = event.currentTarget.elements;
        const formData: FormData = {
            name: target.name.value.trim(),
            role: target.role.value.trim(),
            phone: target.phone.value.trim(),
            birthday: convertDate(target.birthday.value),
            isArchive: target.archive.checked,
        }
        callback(formData)
    }

    return (
        <form 
            className={classNames("form", {"is-loading": status === 'pending'})}
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
                        defaultValue={defaultValue?.name} 
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
                        defaultValue={defaultValue && defaultValue.phone}
                        pattern="^\+7\s\(\d{3}\)\s\d{3}-\d{4}" 
                        mask="+7 (999) 999-9999" 
                        maskPlaceholder="+7 (___) ___-____" 
                        placeholder="+7 (999) 999-9999"
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
                        defaultValue={defaultValue?.birthday}
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
                        defaultValue={defaultValue && defaultValue.role}
                        required
                    >
                        <option 
                            value=''
                            hidden 
                            disabled={defaultValue ? true : false}
                        >Должность</option>
                        {getEnumValues(EmployeeRoleRu).map( value => (
                            <option 
                                key={value}
                                defaultValue={defaultValue ? defaultValue.role : ""}
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
                        defaultChecked={defaultValue?.isArchive} 
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 0.253167 0.253167">
                        <rect fill="#ED4300" width="0.253167" height="0.253167" rx="0.0506327" ry="0.0506327"></rect>
                        <polyline fill="none" stroke="white" strokeWidth="0.0253182" strokeLinecap="round" strokeLinejoin="round" points="0.177213,0.0885956 0.113921,0.151887 0.0759509,0.113914 "></polyline>
                    </svg>
                    <span>Архив</span>
                </label>
            </div>
            
            <div className="form__actions">
                <Button className="btn-cta btn-cta--accent">
                    <span>Сохранить</span>
                </Button>
                {tooltip}
            </div>
            
        </form>
    )
}