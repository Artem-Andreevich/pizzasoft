import { Layout } from "../components/Layout/Layout"
import { CreatePage, EditPage, MainPage } from "../pages"
export const routes = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: 'create',
                element: <CreatePage />,
            },
            {
                path: 'edit/:id',
                element: <EditPage />,
            },
        ]
    }
]   