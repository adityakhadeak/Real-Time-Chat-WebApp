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
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext.js';
import Chat from './Pages/Chat.js';
import { ChatContextProvider } from './Context/ChatContext.js';


function App() {
  const{user} =useContext(AuthContext)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Chat/>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Route>
    )
  )
  return (
    <ChatContextProvider user={user}>
    <RouterProvider router={router}/>
    </ChatContextProvider>
  );
}

export default App;
