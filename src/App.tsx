import { useRoutes } from "react-router-dom";


import { AppRoutes } from "./routes";



function App() {

  const pages = useRoutes(AppRoutes);

  return <div>{pages}</div>
}

export default App;
