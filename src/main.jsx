import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Register from './components/Register.jsx';
import Leader from './components/Leader.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,  // Correctly rendering the Login component
      },
      {
        path: "register",
        element: <Register />,  // Correctly rendering the Login component
      },
      {
        path: "home",
        element: <Home />,  // Correctly rendering the Login component
      },
      {
        path: "leaderboard",
        element: <Leader />,  // Correctly rendering the Login component
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
 <StrictMode>
  

  
    <RouterProvider router={router} />
  
 </StrictMode>
  
);
