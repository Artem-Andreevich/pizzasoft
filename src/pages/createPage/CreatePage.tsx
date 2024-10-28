import { AddEmployee } from "../../components/AddEmployee/AddEmployee";

export const CreatePage = () => {
    return (
        <main className="page inner-page">
            <div className='container'>
                <section className="section">
                    <h1 className="page__title">Добавить нового сотрудника</h1>
                    <AddEmployee />
                </section>
            </div>
        </main>
    );
};