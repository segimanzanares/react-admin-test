import Main from './layout/Main';
import Login from './views/auth/Login';
import ForgotPassword from './views/auth/ForgotPassword';
import ResetPassword from './views/auth/ResetPassword';
import NoMatch from './views/errors/NoMatch';
import Home from './views/Home';
import UsersList from './views/users/List';

const routes = [
    {
        path: "/login",
        exact: true,
        secureInnerRoute: true,
        title: "Iniciar sesión",
        component: Login
    },
    {
        path: "/password/reset/:token",
        exact: true,
        secureInnerRoute: true,
        title: "Restablecer contraseña",
        component: ResetPassword
    },
    {
        path: "/password/reset",
        exact: true,
        secureInnerRoute: true,
        title: "Olvidé mi contraseña",
        component: ForgotPassword
    },
    {
        path: "*",
        exact: true,
        authRequired: true,
        component: Main,
        routes: [
            {
                path: "/",
                exact: true,
                title: "Inicio",
                component: Home
            },
            {
                path: "/home",
                exact: true,
                title: "Inicio",
                component: Home
            },
            {
                path: "/users",
                exact: true,
                title: "Usuarios",
                component: UsersList
            },
            {
                path: "/users/:id",
                exact: true,
                title: "Editar usuario",
                component: UsersList
            },
            {
                path: "/*",
                title: "Not found",
                component: NoMatch
            }
        ]
    }
];

export default routes;