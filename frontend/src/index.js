import React from 'react';
import ReactDOM from 'react-dom/client';
import { redirect } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import styles from "./index.css";

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppAdviser from './components/AdviserView';
import ApplicationList from './components/ApplicationList';
import ApproversForm from './components/ApproversForm';
import ClearanceForm from './components/ClearanceForm';
import AppCO from './components/COView';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import SideButton from './components/SideButton';
import StudentAccount from './components/StudentAccount';
import ManageAccounts from './pages/AdminPage';
import ManageApps from './pages/AdviserPage';
import Dashboard from './pages/Dashboard';

import LogIn from './pages/LogIn';
import ManageStudents from './pages/ManageStudents';
import Signup from './pages/Signup';
import HomePageAll from './pages/HomePageAll';

// Send a POST request to API to check if the user is logged in. Redirect the user to /dashboard if already logged in
const checkIfLoggedInOnHome = async () => {

  const res = await fetch("http://localhost:3001/checkifloggedin",
    {
      method: "POST",
      credentials: "include" 
    });

  const payload = await res.json();
  
    if (payload.isLoggedIn) {
      return redirect("/homepage")
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
      return redirect("/login")
    }
}

const router = createBrowserRouter([
  { path: '/login', element: <LogIn />, loader: checkIfLoggedInOnHome }, //page view for login with styles
  { path: '/signup', element: <Signup />, loader: checkIfLoggedInOnHome },            
  { path: '/', element: <NavBar />, loader:checkIfLoggedInOnDash, children:[
    { path: '/', element: <SideBar />, children:[
      { path: '/dashboard', element: <Dashboard /> },            //page view of student managing applications
      { path: '/manage/acc', element: <ManageAccounts /> },      //page view of admin managing approvers
      { path: '/manage/stud', element: <ManageStudents /> },     //page view for admin for managing students
      { path: '/manage/apps', element: <ManageApps /> },         //page view for managing clearance requests on adviser's end (just change component/components' fields for CO)
      { path: '/homepage', element: <HomePageAll />},            //default homepage

      ]
    },
    ]
  },

  // components

  { path: '/navbar', element: <NavBar />},                 //component for navigation bar 
  { path: '/sidebar', element: <SideBar />},               //component for side bar
  { path: '/sidebutton', element: <SideButton />},         //component for buttons on side bar
  { path: '/clearance', element: <ClearanceForm />},       //component for clearance apply form
  { path: '/applist', element: <ApplicationList />},       //component for application already submitted
  { path: '/trialadviser', element: <AppAdviser />},       //component for sent application on adviser's end
  { path: '/trialco', element: <AppCO />},                 //component for sent application on co's end

  { path: '/appform', element: <ApproversForm />},         //component for application form to be filled out

  { path: '/viewstud', element: <StudentAccount />},       //component for students for viewing details by admin
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
