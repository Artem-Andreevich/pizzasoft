import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { EmployeeRoleRu, IEmployee } from "../../types/Employee/Employee";
import { getEnumValues } from "../../helpers/getEnumValues/getEnumValues";
import { convertDate } from "../../helpers/convertDate/convertDate";
import { classNames } from "../../helpers/classNames/classNames";

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
    console.log(employee)
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
            // className={classNames()}
            onSubmit={submitHandler} 
            ref={form}
        >
            <label>
                <span>Имя</span>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    defaultValue={employee ? employee.name : ""} 
                    required 
                />
            </label>
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
                    required 
                />
            </label>
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
            <label>
                <span>Должность</span>
                <select 
                    name="role" 
                    id="role" 
                    required
                >
                    <option 
                        value={employee ? employee.role : ""} 
                        hidden 
                        selected 
                        disabled
                    >Должность</option>
                    {getEnumValues(EmployeeRoleRu).map( value => (
                        <option 
                            key={value} 
                            value={value}
                            selected={
                                employee && employee.role === value
                            }
                        >
                            {value}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                <span>В архив</span>
                <input 
                    type="checkbox" 
                    name="archive" 
                    id="archive" 
                    defaultChecked={employee ? employee.isArchive : false} 
                />
            </label>
            <button disabled={isLoading}>Сохранить</button>
        </form>
    )
}