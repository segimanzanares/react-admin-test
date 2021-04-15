import Main from './layout/Main';
import Login from './views/auth/Login';
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
                path: "/*",
                component: NoMatch
            }
        ]
    }
];

export default routes;