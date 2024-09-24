import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from './routes/homepage/homepage'
import Dashboard from './routes/dashboardpage/dashboardpage';
import Chatpage from './routes/chatpage/chatpage';
import RootLayout from './layouts/rootLayout/RootLayout';
import DashboardLayout from './layouts/dashboardLayout/dasboardLayout';
import Signinpage from './routes/signinpage/signinpage';
import Signuppage from './routes/signuppage/signuppage';


const router = createBrowserRouter([
  {
    element: <RootLayout/>,
    children: [
      {
        path:"/",
        element:<Homepage/>,
      },

      {
        path:"/sign-in/*",
        element:<Signinpage/>,
      },

      {
        path:"/sign-up/*",
        element:<Signuppage/>,
      },

      {
        element:<DashboardLayout/>,
        children: [
          {
            path:"/dashboard",
            element:<Dashboard/>
          },

          {
            path:"/dashboard/chats/:id",
            element:<Chatpage/>,
          }
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
