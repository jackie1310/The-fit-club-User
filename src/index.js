import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from './context/UserContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Resources from './resources/Resources';
import ResetPassword from './components/Reset/Reset';
import Account from './components/Account/Account';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserContextProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/' Component={App}/>
                <Route path='/resources' Component={Resources}/>
                <Route path="/:status" Component={App}/>
                <Route path="/reset-password" Component={ResetPassword}/>
                <Route path='/account/:id' Component={Account}/>
            </Routes>
        </BrowserRouter> 
    </UserContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals