// import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Signup() {

  function signUp(e) {
    e.preventDefault();

    // form validation goes here

    fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname: document.getElementById("s-fname").value,
        mname: document.getElementById("s-mname").value,
        lname: document.getElementById("s-lname").value,
        studno: document.getElementById("s-studno").value,

        email: document.getElementById("s-email").value,
        password: document.getElementById("s-password").value,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.success) {
          alert("Successfully sign up!");

          document.getElementById("s-fname").value = "";
          document.getElementById("s-mname").value = "";
          document.getElementById("s-lname").value = "";
          document.getElementById("s-studno").value = "";
          document.getElementById("s-email").value = "";
          document.getElementById("s-password").value = "";
        } else {
          alert("Sign up failed");
        }
      });
  }

  return (
    <>
      <NavBar/>
      <div class="top-10 flex h-screen items-center self-center justify-center bg-100-payne flex-col p-5">
      <div class="flex w-36 h-36 rounded-full bg-black">
        {/* <img class="rounded-full w-36 h-36" src="userimage.jpg" alt="image description">
        </img> */}
      </div>
        <div className="rounded-xl px-16 py-8">
              <div className="item-center flex flex-col px-2 pb-0 pt-0 drop-shadow-md">
                <h1 className="flex justify-center text-5xl font-extrabold text-white mb-5">
                Sign Up
                </h1>
              </div>
              <form id="sign-up" class="flex flex-col">
                <input id="s-fname" placeholder="First Name" class="w-96 p-2 m-2 rounded-md" />
                <input id="s-mname" placeholder="Middle Name" class="p-2 m-2 rounded-md" />
                <input id="s-lname" placeholder="Last Name"  class="p-2 m-2 rounded-md"/>
                <input id="s-studno" placeholder="Student Number" class="p-2 m-2 rounded-md" />
                <input id="s-email" placeholder="Email" class="p-2 m-2 rounded-md"/>
                <input id="s-password" type="password" placeholder="Password" class="p-2 m-2 rounded-md"/>
                <button class="p-2 m-2 rounded-md bg-100-charcoal text-white hover:bg-black" onClick={signUp}>Sign Up</button>
              </form>
        </div>
      <div class="flex justify-center content-center ">
        <label className="flex pl-3 text-sm text-white ">
          Already have an account?
        </label>
        <Link to={`/login`} class="pl-1 text-sm text-white underline">Login</Link>      
      </div>
    </div>
    </>

  );
}
