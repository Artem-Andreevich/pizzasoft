import { AboutPage, MainPage } from "../pages"
export const routes = [
        {
            index: true,
            element: <MainPage />,
        },
        {
            path: 'emloyee/:id',
            element: <AboutPage />,
        },
	]
