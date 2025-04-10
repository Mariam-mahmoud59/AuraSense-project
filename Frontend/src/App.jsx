import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './componants/Layout.jsx'
import Header from './componants/Header'
import Register from './componants/Register'
import Home from './componants/Home';
import Login from './componants/Login';
import Profile from './componants/Profile.jsx' 
import { UserProvider } from "./context/UserContext"; 
import ForgetPassword from './componants/ForgetPassword'; 
import ResetPassword from './componants/ResetPassword'; 

let routers = createBrowserRouter([{
  path: "/", element: <Layout />, children: [
    { path: "register", element: <Register /> },
    { path: "login", element: <Login /> },
    { path: "profile", element: <Profile /> },
    { path: "forgot-password", element: <ForgetPassword /> },
    { path: "reset-password/:uidb64/:token", element: <ResetPassword /> },
    { index: true, element: <Home /> },
  ]
}])

function App() {
  return (
    <UserProvider>
      <RouterProvider router={routers} />
    </UserProvider>
  );
}

export default App;
