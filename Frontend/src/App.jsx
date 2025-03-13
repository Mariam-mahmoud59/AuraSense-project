
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './componants/Layout.jsx'
import Header from './componants/Header'
import Register from './componants/Register'
import Home from './componants/Home';
import Login from './componants/Login';

let routers = createBrowserRouter([{
  path : "/" , element: <Layout /> , children : [
    {path: "register" , element :  <Register/>},
    {path: "Login" , element : <Login/>},
    {index: true , element: <Home /> },
    
]
}])     
                        
                     

function App() {

  return (
    <>
      <RouterProvider router={routers} />
    </>
  )
}

export default App
