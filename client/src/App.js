import './App.css';

import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom';

// Components
import Login from './components/account/Login';
import Home from './components/home/Home';
import DataProvider from './context/DataProvider';
import Header from './components/header/Header';
import { useState } from 'react';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';
import UpdatePost from './components/create/UpdatePost';


const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ?
    <>
      <Header/>
      <Outlet/>
    </> 
    : <Navigate replace to='/login' />
};

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{marginTop : 64}}>
          <Routes>
            <Route path='/login' element={ <Login isUserAuthenticated = {isUserAuthenticated}/>}/>
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}> 
              <Route path='/' element={ <Home/>}/>
            </Route>
            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}> 
              <Route path='/create' element={ <CreatePost/>}/>
            </Route>
            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView/>} />
            </Route>
            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<UpdatePost/>} />
            </Route>
          </Routes>
          
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
