import { Link } from "react-router-dom";
import { UpdateEmployee } from "../components/UpdateEmployee/UpdateEmployee";



export const EditPage = () => {


    return (
        <main className="page inner-page">
            <div className='container'>
                <Link to="/">Главная</Link>
                <div>
                    <h1>Edit</h1>
                    <UpdateEmployee />
                </div>
            </div>
        </main>
    );
};