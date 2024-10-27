import { memo } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { Dropdown } from "../ui/Dropdown";
import { EmployeesList } from "../components/EmployeesList/EmployeesList";


export const MainPage = memo(() => {

    const { roleFilters } = useAppSelector( state => state.emloyee)
    const filterByJob = (event: React.ChangeEvent<HTMLInputElement>) => {}

    return (
        <main className="page main-page">
            <Link to="/">Главная</Link>
            <div className="container">
                <Dropdown title="Filter">
                    {roleFilters.map( filter => (
                        <span key={filter}>{filter}</span>
                    ))}
                </Dropdown>
                <Link to="/create">Добавить</Link>
                <EmployeesList />
            </div>
        </main>
    );
});