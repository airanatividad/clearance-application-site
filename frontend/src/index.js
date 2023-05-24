import React from 'react';
import ReactDOM from 'react-dom/client';
import { redirect } from 'react-router-dom';
// import "./index.css";

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Dashboard from './pages/Dashboard';

// Send a POST request to API to check if the user is logged in. Redirect the user to /dashboard if already logged in
const checkIfLoggedInOnHome = async () => {
  const res = await fetch("http://localhost:3001/checkifloggedin",
    {
      method: "POST",
      credentials: "include" 
    });

  const payload = await res.json();
  
    if (payload.isLoggedIn) {
      return redirect("/dashboard")
    } else {
      return 0
    }
}

// Send a POST request to API to check if the user is logged in. Redirect the user back to / if not logged in
const checkIfLoggedInOnDash = async () => {
  const res = await fetch("http://localhost:3001/checkifloggedin",
    {
      method: "POST",
      credentials: "include" 
    });


  const payload = await res.json();
    if (payload.isLoggedIn) {
      return true
    } else {
      return redirect("/")
    }
}

const router = createBrowserRouter([
  { path: '/', element: <Home />, loader: checkIfLoggedInOnHome },
  { path: '/login', element: <LogIn /> },
  { path: '/dashboard', element: <Dashboard />, loader: checkIfLoggedInOnDash }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
