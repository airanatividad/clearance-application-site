import React from 'react';
import ReactDOM from 'react-dom/client';
import { redirect } from 'react-router-dom';
import styles from "./index.css"

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Dashboard from './pages/Dashboard';
import SamplePage from './pages/Homepage'
import NavBar from './components/NavBar';
import SideBar from './components/SideBar'
import DrawerButton from './components/SideButton';
import ClearanceForm from './components/ClearanceForm';
import ApplicationList from './components/ApplicationList';
import AppAdviser from './components/AdviserView';
import AppCO from './components/COView';
import ManageAccounts from './pages/AdminPage';
import ApproversForm from './components/ApproversForm';
import ManageStudents from './pages/ManageStudents';
import StudentsList from './components/StudentsList';
import ManageApps from './pages/AdviserPage';
import LogInTry from './pages/brokenLogIn';
import HomeTry from './pages/brokenSignUp';

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
  { path: '/dashboard', element: <Dashboard />, },
  { path: '/trialstudent', element: <SamplePage />},       //page view of student managing applications
  { path: '/navbar', element: <NavBar />},                 //component for navigation bar 
  { path: '/sidebar', element: <SideBar />},               //component for side bar
  { path: '/drawerbutton', element: <DrawerButton />},     //component for buttons on side bar
  { path: '/clearance', element: <ClearanceForm />},       //component for clearance apply form
  { path: '/applist', element: <ApplicationList />},       //component for application already submitted
  { path: '/trialadviser', element: <AppAdviser />},       //component for sent application on adviser's end
  { path: '/trialco', element: <AppCO />},                 //component for sent application on co's end
  { path: '/manageacc', element: <ManageAccounts />},      //page view of admin managing approvers
  { path: '/appform', element: <ApproversForm />},         //component for application form to be filled out
  { path: '/managestud', element: <ManageStudents />},     //page view for admin for managing students
  { path: '/viewstud', element: <StudentsList />},         //component for students for viewing details by admin
  { path: '/manageapps', element: <ManageApps />},         //page view for managing clearance requests on adviser's end (just change component/components' fields for CO)
  { path: '/triallogin', element: <LogInTry />},           //page view for login with styles
  { path: '/trialhome', element: <HomeTry />},             //page view for signup with styles




])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
