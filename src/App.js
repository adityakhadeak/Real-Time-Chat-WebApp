import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import Login from './Pages/Login.js';
import Register from './Pages/Register.js';
import RootLayout from './Layouts/RootLayout.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
    </Route>
  )
)
function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
