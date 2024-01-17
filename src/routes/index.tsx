import { Navigate } from "react-router-dom";

/******** Layouts ********/
import AppLayout from "../layout"


/******** Pages ********/
import HomePage from "../pages/home";


// 404
import NotFoundPage from "../pages/404";
import CarouelList from "../pages/home/components/carousel-list/carouel-list";
import PostList from "../pages/home/components/post-list/post-list";


export const AppRoutes = [

    { path: "/", element: <Navigate to="home" /> },

    {
        path: "/",
        element: <AppLayout />, 
        children: [
            {
                path: "home",
                element: <HomePage />,
                children:[
                    {
                        path:"carousel",
                        element: <CarouelList />
                    },
                    {
                        path:"post",
                        element: <PostList />
                    }
                ]
            },
            // More Pages Goes Here
        ]
    },

    { path: "*", element: <NotFoundPage /> },
]