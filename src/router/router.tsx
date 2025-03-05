import {createBrowserRouter} from "react-router-dom";
import Dashboard from "../pages/Dashboard.tsx";
import BookForm from "../pages/BookForm.tsx";
import App from "../App.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: '/', element: <Dashboard /> },
            { path: '/add', element: <BookForm /> },
            { path: '/edit/:id', element: <BookForm /> },
        ],
    },
])
export default router