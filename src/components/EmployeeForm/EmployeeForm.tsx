import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { EmployeeRoleRu, IEmployee } from "../../types/Employee/Employee";
import { getEnumValues } from "../../helpers/getEnumValues/getEnumValues";
import { convertDate } from "../../helpers/convertDate/convertDate";
import { Button} from "../../ui/Button/Button";

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
    employee?: IEmployee
}


export const EmployeeForm = (props: EmployeeFormProps) => {

    const { action, isLoading, employee} = props
    const navigate = useNavigate();
    const form = useRef<any>()

    function submitHandler(event: FormEvent<EmployeeForm>) {
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
                ? action({body: formData, id: employee.id})
                : action({body: formData})
        } catch (err) {
            console.error('Ошибка добовления сотрудника', err)
        } finally {
            navigate(`/`)
        }
    }
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
                        required
                    >
                        <option 
                            defaultValue={employee ? employee.role : ""} 
                            hidden 
                            selected 
                            disabled
                        >Должность</option>
                        {getEnumValues(EmployeeRoleRu).map( value => (
                            <option 
                                key={value} 
                                defaultValue={value}
                                selected={
                                    employee && employee.role === value
                                }
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
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 0.253167 0.253167">
                        <rect fill="#ED4300" width="0.253167" height="0.253167" rx="0.0506327" ry="0.0506327"></rect>
                        <polyline fill="none" stroke="white" strokeWidth="0.0253182" strokeLinecap="round" strokeLinejoin="round" points="0.177213,0.0885956 0.113921,0.151887 0.0759509,0.113914 "></polyline>
                    </svg>
                    <span>Архив</span>
                </label>
            </div>
            
            <Button
                className="btn-cta btn-cta--accent"
                disabled={isLoading}
            >
                <span>Сохранить</span>
            </Button>
        </form>
    )
}