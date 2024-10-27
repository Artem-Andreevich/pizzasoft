import { useGetEmployeesQuery } from "../../store/api/api";
import { useState, useEffect, useCallback } from "react";
import { IEmployee } from "../../types/Employee/Employee";
import { Employee } from "../Employee/Employee";
import { classNames } from "../../helpers/classNames/classNames";
import cls from "./EmployeesList.module.scss"


interface EmployeesListProps {
    className?: string;
}

export const EmployeesList = ({className = ""}: EmployeesListProps) => {

    const { data = [] , isLoading, isSuccess, isError, isFetching} = useGetEmployeesQuery()

    const [ employees, setEmployees ] = useState<IEmployee[]>([]);
    const [ filteredEmployees, setFilteredEmployees ] = useState<IEmployee[]>([]);
    const [ isArchive, setIsArchive ] = useState();
    const [ roleFilter, setRoleFilter ] = useState();

    useEffect( () => {
        setEmployees(data)
    }, [isSuccess])


    useEffect(() => {
        let filtered = employees;
        if (isArchive) {
            filtered = filtered?.filter(employee => employee.isArchive === true);
        }
        if (roleFilter) {
            filtered = filtered?.filter(employee => employee.role === roleFilter);
        }
    
        setFilteredEmployees(filtered);
      }, [ employees, isArchive, roleFilter ]);





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
        <div className={classNames(cls.EmployeesList, {}, [className])}>
            <button onClick={sortedEmployeeName}>Name</button>
            <button onClick={sortedEmployeeDate}>Date</button>
            <label>
                <span>Archive</span>
                <input type="checkbox" onChange={(e: any) => {setIsArchive(e.target.checked)}}  />
            </label>

            <select onChange={ (e: any) => {setRoleFilter(e.target.value)}}>
                <option value="">Все </option>
                <option value="Водитель">Водитель</option>
                <option value="Повар">Повар</option>
            </select>
            {content}
        </div>
    )
};