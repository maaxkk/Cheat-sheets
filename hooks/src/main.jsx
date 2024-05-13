import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import ErrorPage from "../pages/ErrorPage.jsx";
import {Form} from "../pages/Form.jsx";
import Profile from "../pages/Profile.jsx";
import {useLocalStorage} from "./useCustomHooks/useLocalStorage.js";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Form/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: '/profile/:username',
        element: <Profile/>,
    }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
