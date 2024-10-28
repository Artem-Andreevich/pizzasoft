import { UpdateEmployee } from "../../components/UpdateEmployee/UpdateEmployee";

export const EditPage = () => {
    return (
        <main className="page inner-page">
            <div className='container'>
                <section className="section">
                    <h1 className="page__title">Редактировать данные сотрудника</h1>
                    <UpdateEmployee />
                </section>
            </div>
        </main>
    );
};