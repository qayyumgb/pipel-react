import {useRoutes} from "react-router-dom";


import {AppRoutes} from "./routes";
import {SnackbarProvider} from "./layout/snackbar/snackbar-context";


function App() {

    const pages = useRoutes(AppRoutes);

    return (<SnackbarProvider>
        <div>{pages}</div>
    </SnackbarProvider>)
}

export default App;
