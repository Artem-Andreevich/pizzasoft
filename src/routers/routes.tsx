import { AboutPage, CreatePage, EditPage, MainPage } from "../pages"
export const routes = [
        {
            index: true,
            element: <MainPage />,
        },
        {
            path: 'employee/:id',
            element: <AboutPage />,
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
