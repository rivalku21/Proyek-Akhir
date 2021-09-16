import { Login, Register, Home, Final_Project, Check, ResultPage } from "../pages";

const routes = [
    {
        path: '/',
        component: Home,
        isPublic: false,
    },
    {
        path: '/login',
        component: Login,
        isPublic: true,
    },
    {
        path: '/register',
        component: Register,
        isPublic: true,
    },
    {
        path: '/final_project',
        component: Final_Project,
        isPublic: false,
    },
    {
        path: '/uploads',
        component: Check,
        isPublic: false,
    },
    {
        path: '/result',
        component: ResultPage,
        isPublic: false,
    },
];

export default routes;