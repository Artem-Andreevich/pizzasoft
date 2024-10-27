import { CreatePage, EditPage, MainPage } from "../pages"
export const routes = [
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
