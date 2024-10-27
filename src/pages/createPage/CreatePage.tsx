import { Link } from "react-router-dom";
import { AddEmployee } from "../../components/AddEmployee/AddEmployee";


export const CreatePage = () => {
    
    return (
        <main className="page inner-page">
            <div className='container'>
                <Link to="/">Главная</Link>
                <section>
                    <h2>Add a New Post</h2>
                    <AddEmployee />
                </section>
            </div>
        </main>
    );
};