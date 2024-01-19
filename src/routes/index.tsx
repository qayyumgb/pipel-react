import {Navigate} from "react-router-dom";

/******** Layouts ********/
import AppLayout from "../layout"


/******** Pages ********/
import HomePage from "../pages/home";


// 404
import NotFoundPage from "../pages/404";
import PostList from "../pages/home/components/post-list/post-list";
import {Carousel} from "../pages/carousel/carousel";


export const AppRoutes = [

    {path: "/", element: <Navigate to="home/carousel"/>},

    {
        path: "/",
        element: <AppLayout/>,
        children: [
            {
                path: "home",
                element: <HomePage/>,
                children: [
                    {
                        path: "carousel",
                        element: <Carousel/>
                    },
                    {
                        path: "post",
                        element: <PostList/>
                    }
                ]
            },
            // More Pages Goes Here
        ]
    },

    {path: "*", element: <NotFoundPage/>},
]