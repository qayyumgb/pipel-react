
import { Outlet } from "react-router-dom";


import TopNavbar from './topNavbar';



const Index = () => {
    return (
        <div>
            <TopNavbar />

            <Outlet />

            <div>Footer</div>
        </div>
    )
}

export default Index
