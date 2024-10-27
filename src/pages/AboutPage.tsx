import { Link, useParams } from "react-router-dom";
import { useDeleteEmployeeMutation, useGetEmployeeByIdQuery } from "../store/api/api";
import { Employee } from "../components/Employee/Employee";
import { useNavigate } from "react-router-dom";


export const AboutPage = () => {

    const { id = ''} = useParams()
    const navigate = useNavigate();
    const { data, isLoading, isSuccess } = useGetEmployeeByIdQuery(id)
    const [ deleteEmployee, { isSuccess: deleted } ] = useDeleteEmployeeMutation()


    const deleteHandler = (id: string) => {
        try {
            deleteEmployee(id)
        } catch (err) {
            console.error('Ошибка', err)
        } finally {
            navigate(`/`)
        }
    }

    return (
        <main className="page inner-page">
            <div className='container'>
                <Link to="/">Главная</Link>
                <div>
                    {isLoading
                        ? <div>Загрузка...</div> 
                        : <>
                            {data 
                                ? <Employee employee={data}/> 
                                : <div>Ошибка</div>
                            }
                            <button onClick={() => deleteHandler(id)}>Удалить</button>
                            <Link to={`/edit/${id}`}>Редактировать</Link>
                        </>
                    }
                </div>
            </div>
        </main>
    );
};