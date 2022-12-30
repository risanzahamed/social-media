import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main"
import About from "../Pages/About/About";
import Home from "../Pages/Home/Home";
import FullPostPage from "../Pages/Media/FullPostPage";
import Media from "../Pages/Media/Media";
import PostPage from "../Pages/Media/PostPage";
import Message from "../Pages/Message/Message";
import Notification from "../Pages/Notification/Notification.js";
import UpdateUser from "../Pages/UpdateUser/UpdateUser";
import Login from "../Shared/Auth/Login/Login";
import Register from "../Shared/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children:([
       {
        path: '/',
        element: <Home/>
       },
       {
        path: '/media',
        element: <PrivateRoute><Media/></PrivateRoute>,
       },
       {
        path: '/about',
        element: <PrivateRoute><About/></PrivateRoute>
       },
       {
        path: '/message',
        element: <PrivateRoute><Message/></PrivateRoute>
       },
       {
        path: '/notification',
        element: <Notification/>
       },
       {
        path: '/login',
        element: <Login/>
       },
       {
        path: '/register',
        element: <Register/>
       },
       {
        path:'/user/:id',
        element:<UpdateUser/>,
        loader: ({params})=>fetch(`https://social-media-server-six.vercel.app/user/${params.id}`)
       },
       {
        path:'/post/:id',
        element:<PrivateRoute><FullPostPage/></PrivateRoute>,
        loader: ({params})=>fetch(`https://social-media-server-six.vercel.app/post/${params.id}`)
       },

      ])
    }
  ])

export default router