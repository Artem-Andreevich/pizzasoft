import { useGetEmployeesQuery } from "../../store/api/api";
import { useState, useEffect, useCallback } from "react";
import { EmployeeRoleRu, IEmployee } from "../../types/Employee/Employee";
import { Employee } from "../Employee/Employee";
import { getEnumValues } from "../../helpers/getEnumValues/getEnumValues";
import { Dropdown } from "../../ui/Dropdown";
import classNames from "classnames";


interface EmployeesListProps {
    className?: string;
}

export const EmployeesList = ({className = ""}: EmployeesListProps) => {

    const { data = [] , isLoading, isSuccess, isError } = useGetEmployeesQuery()
    const [ employees, setEmployees ] = useState<IEmployee[]>([])
    const [ filteredEmployees, setFilteredEmployees ] = useState<IEmployee[]>([])
    const [ isArchive, setIsArchive ] = useState<Boolean>()
    const [ roleFilter, setRoleFilter ] = useState<EmployeeRoleRu>()

    useEffect( () => {
        if(isSuccess)
            setEmployees(data)
    }, [isSuccess, data])

    useEffect(() => {

        let filtered = employees
        if (isArchive) 
            filtered = filtered?.filter(employee => employee.isArchive === true)
        if (roleFilter) 
            filtered = filtered?.filter(employee => employee.role === roleFilter)
        setFilteredEmployees(filtered)
      }, [ employees, isArchive, roleFilter ])

    const sortedEmployeeName = useCallback(() => {
        setFilteredEmployees([...filteredEmployees].sort((a, b) => a.name > b.name ? 1 : -1))
    }, [filteredEmployees])
    const sortedEmployeeDate = useCallback(() => {
        setFilteredEmployees([...filteredEmployees].sort((a, b) => b.birthday.localeCompare(a.birthday)))
    }, [filteredEmployees])

    let content: React.ReactNode
    if (isLoading)
        content = <div>ЗАГРУЗКА...</div>
    else if (isSuccess) 
        content = filteredEmployees.map( employee => <Employee key={employee.id} employee={employee} />)
    else if (isError) 
        content = <div>Ошибка получение данных...</div> 
    
    return (
        <div className={classNames("employees-list", className)}>

            <div className={classNames("employees-list__filters")}>
                <Dropdown title="Сортировка">
                    <button className="btn-cta btn-cta--clear" onClick={sortedEmployeeName}>Сортировать по имени</button>
                    <button className="btn-cta btn-cta--clear" onClick={sortedEmployeeDate}>Сортировать по дате</button>
                </Dropdown>

                <div className="form-control">
                    <select  onChange={ (e: any) => {setRoleFilter(e.target.value)}}>
                        <option value="">Должность</option>
                            {getEnumValues(EmployeeRoleRu).map( value => (
                                <option 
                                    key={value} 
                                    value={value}
                                >
                                    {value}
                                </option>
                            ))}
                    </select>
                </div>

                <label className="page__checkbox">
                    <input type="checkbox" onChange={(e: any) => {setIsArchive(e.target.checked)}} />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 0.253167 0.253167">
                        <rect fill="#ED4300" width="0.253167" height="0.253167" rx="0.0506327" ry="0.0506327"></rect>
                        <polyline fill="none" stroke="white" strokeWidth="0.0253182" strokeLinecap="round" strokeLinejoin="round" points="0.177213,0.0885956 0.113921,0.151887 0.0759509,0.113914 "></polyline>
                    </svg>
                    <span>В архиве</span>
                </label>

            </div>

            <div className={classNames("employees-list__items")}>
                {content}
            </div>
        </div>
    )
};