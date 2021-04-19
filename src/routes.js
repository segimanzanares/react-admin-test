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
        component: Login
    },
    {
        path: "/password/reset/:token",
        exact: true,
        secureInnerRoute: true,
        component: ResetPassword
    },
    {
        path: "/password/reset",
        exact: true,
        secureInnerRoute: true,
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
                component: Home
            },
            {
                path: "/home",
                exact: true,
                component: Home
            },
            {
                path: "/users",
                exact: true,
                component: UsersList
            },
            {
                path: "/users/:id",
                exact: true,
                component: UsersList
            },
            {
                path: "/*",
                component: NoMatch
            }
        ]
    }
];

export default routes;