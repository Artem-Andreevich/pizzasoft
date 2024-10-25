import { Link } from "react-router-dom";
import { useDeleteEmployeeMutation, useGetEmployeesQuery } from "../store/api/api";
import { memo, useEffect, useState } from "react";
import { Dropdown } from "../shared/ui/Dropdown";
import { IEmployee } from "../shared/types";
import { useAppSelector } from "../hooks/useAppSelector";




export const MainPage = memo(() => {

    const [ employees, setEmployees] = useState<IEmployee[]>([])
    const [ jobsList, setJobsList ] = useState<string[]>([])

    const { data, isLoading, isSuccess } = useGetEmployeesQuery()
    const [deleted] = useDeleteEmployeeMutation()

    useEffect( () => {
        if(isSuccess){
            setEmployees(data)
            setJobsList(Array(...new Set(data.map( item => item.role))))
        }

    }, [isLoading, data])
    





    
    const sortingBy = (by: string, order: string) => {

        const enum SortOrder {
            ASC = "ASC",
            DESC = "DESC"
        } 
        const enum SortBy {
            NAME = "name",
            DATE = "date"
        }

        switch(by){
            case SortBy.NAME:
                order === SortOrder.ASC 
                    ? setEmployees([...employees].sort( (a, b) => a.name > b.name ? 1 : -1 ))
                    : setEmployees([...employees].sort( (a, b) => a.name < b.name ? 1 : -1 ))
                break
            case SortBy.DATE:
                order === SortOrder.ASC 
                    ? setEmployees( 
                            [...employees].sort( (a, b) => {
                            const dateA = a.birthday.split('.').reverse().join()
                            const dateB = b.birthday.split('.').reverse().join()
                            return dateA < dateB ? -1 : (dateA > dateB ? 1 : 0)})
                        )
                    : setEmployees( 
                        [...employees].sort( (a, b) => {
                        const dateA = a.birthday.split('.').reverse().join()
                        const dateB = b.birthday.split('.').reverse().join()
                        return dateA > dateB ? -1 : (dateA < dateB ? 1 : 0)})
                    )
                break
        }
    }


    const filterByJob = (job: string) => {
        setEmployees([...employees].filter( a => a.role === job))
    }



    return (
        <main className="page main-page">
            <Link to="/">Главная</Link>

            <div className="container">
                {isLoading 
                    ? <div>ЗАГРУЗКА...</div> 
                    : <>
                        <Dropdown title="Сориторвка по имени">
                            <li>
                                <button onClick={() => {sortingBy("name", 'ASC')}}>По алфавиту от А-Я</button>
                            </li>
                            <li>
                                <button onClick={() => {sortingBy("name", 'DESC')}}>По алфавиту от Я-А</button>
                            </li>
                        </Dropdown>
                        <Dropdown title="Сориторвка по дате">
                            <li>
                                <button onClick={() => {sortingBy("date", 'ASC')}}>По возростанию</button>
                            </li>
                            <li>
                                <button onClick={() => {sortingBy("date", 'DESC')}}>По убыванию</button>
                            </li>
                        </Dropdown>
                        <Dropdown title="Профессия">
                            {jobsList.map( (el, inx) => (
                                <li key={inx}>
                                    <button onClick={() => filterByJob(el)}>{el}</button>
                                </li>
                            ))}
                        </Dropdown>
                        {employees.map( item => (
                            <div key={item.id}>
                                <Link to={`/emloyee/${item.id}`}>
                                    <span>{item.name}</span>
                                    <span>{item.role}</span>
                                    <span>{item.phone}</span>
                                    <strong>{item.birthday}</strong>
                                </Link>
                                <button  onClick={() => {deleted(item.id)}}>Удалить</button>
                            </div>
                        ))}
                    </>
                }
            </div>
        </main>
    );
});