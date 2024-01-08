import { Navigate } from "react-router-dom";

/******** Layouts ********/
import AppLayout from "../layout"


/******** Pages ********/
import HomePage from "../pages/home";


// 404
import NotFoundPage from "../pages/404";


export const AppRoutes = [

    { path: "/", element: <Navigate to="home" /> },

    {
        path: "/",
        element: <AppLayout />, 
        children: [
            {
                path: "home",
                element: <HomePage />
            },
            // More Pages Goes Here
        ]
    },

    { path: "*", element: <NotFoundPage /> },
]