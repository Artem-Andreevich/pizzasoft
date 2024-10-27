import { memo } from "react";
import { Link } from "react-router-dom";
import { EmployeesList } from "../../components/EmployeesList/EmployeesList";


export const MainPage = memo(() => {

    return (
        <main className="page main-page">
            <Link to="/">Главная</Link>
            <div className="container">
                <Link to="/create">Добавить</Link>
                <EmployeesList />
            </div>
        </main>
    );
});