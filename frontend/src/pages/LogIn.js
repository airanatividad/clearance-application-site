
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import NavBar from '../components/NavBar';
import logoclearance from "../images/logo.png";

export default function LogIn() {

  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // redirect when login is successful
  useEffect(() => {
    if (isLoggedIn) {
      navigate(`/homepage`)
    }
  }, [isLoggedIn, navigate])

  function logIn(e) {
    e.preventDefault();

    // form validation goes here
    const email = document.getElementById("l-email").value
    const password = document.getElementById("l-password").value
    if (email === "" || password === "") {
      alert("Please enter all required fields.");
      return;
    }

    fetch("http://localhost:3001/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(response => response.json())
      .then(body => {
        if (body.success) {
          setIsLoggedIn(true)
          // successful log in. store the token as a cookie
          const cookies = new Cookies()
          cookies.set(
            "authToken",
            body.token,
            {
              path: "localhost:3001/",
              age: 60*60,
              sameSite: false
            });

          localStorage.setItem("username", body.username);
          localStorage.setItem("email", body.email);
        }
        else { alert("Log in failed")}
      })
  }
  
  return (
    <>
    <NavBar/>

    <div class="top-10 flex h-screen items-center self-center justify-center bg-100-payne flex-col">
    {/* <div className="h-15 relative flex w-28 flex-col self-center rounded-full"> */}
        <img
        src={logoclearance}
        className="object-scale-down object-left w-36"
        alt="Site Logo"
        fill
        />
    {/* </div> */}
      <div className="rounded-xl px-16 py-8">
            <div className="item-center flex flex-col px-2 pb-0 pt-0 drop-shadow-md">
              <h1 className="flex justify-center text-5xl font-extrabold text-white mb-5">
               Log In
              </h1>
            </div>
            <form id="log-in" class="flex flex-col">
              <input id="l-email" placeholder="Email" class=" w-96 p-2 m-2 rounded-md" />
              <input id="l-password" type="password"  placeholder="Password"  class="p-2 m-2  rounded-md" />
              <button class="p-2 m-2 rounded-md bg-100-charcoal text-white hover:bg-black"  onClick={logIn}>Log In</button>
            </form> 
      </div>
      <div class="flex justify-center content-center ">
        <label className="flex pl-3 text-sm text-white ">
          Need to create an account? 
        </label>
        <Link to={`/signup`} class="pl-1 text-sm text-white underline">Sign Up</Link>  
      </div>
    </div>

    </>
  )
}