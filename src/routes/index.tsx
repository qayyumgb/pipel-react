import { Navigate } from "react-router-dom";

/******** Layouts ********/
import AppLayout from "../layout"


/******** Pages ********/


// 404
import NotFoundPage from "../pages/404";
import {Home} from "../pages/home/home";


export const AppRoutes = [

    { path: "/", element: <Navigate to="home" /> },

    {
        path: "/",
        element: <AppLayout />, 
        children: [
            {
                path: "home",
                element: <Home />
            },
            // More Pages Goes Here
        ]
    },

    { path: "*", element: <NotFoundPage /> },
]