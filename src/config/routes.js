import { Home, Final_Project, Check, ResultPage } from "../pages";

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/final_project',
        component: Final_Project,
    },
    {
        path: '/uploads',
        component: Check,
    },
    {
        path: '/result',
        component: ResultPage,
    },
];

export default routes;