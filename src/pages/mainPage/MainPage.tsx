import { EmployeesList } from "../../components/EmployeesList/EmployeesList";

export const MainPage = () => {
    return (
        <main className="page main-page">
            <div className="container">
                <section className="section">
                    <h1 className="page__title">Список сотрудников</h1>
                    <EmployeesList />
                </section>
            </div>
        </main>
    )
}