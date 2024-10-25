import { Link, useParams } from "react-router-dom";
import { useGetEmployeeByIdQuery } from "../store/api/api";


export const AboutPage = () => {

    const {id} = useParams()
    const { data, isLoading } = useGetEmployeeByIdQuery(Number(id))

    if (!isLoading) {
        console.log(data)
    }

    return (
        <main className="page inner-page">
            <div className='container'>
                <Link to="/">Главная</Link>
                <div>
                    {isLoading 
                        ? <div>Загрузка...</div> 
                        : <div>
                            <p>{data?.name}</p>
                            <p>{data?.phone}</p>
                            <p>{data?.birthday}</p>
                        </div>
                    }
                </div>
            </div>
        </main>
    );
};