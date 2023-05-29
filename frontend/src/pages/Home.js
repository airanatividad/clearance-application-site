// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";

export default function Home() {

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
      <h1>Sign Up</h1>
      <form id="sign-up">
        <input id="s-fname" placeholder="First Name" />
        <input id="s-mname" placeholder="Middle Name" />
        <input id="s-lname" placeholder="Last Name" />
        <input id="s-studno" placeholder="Student Number" />

        <input id="s-email" placeholder="email" />
        <input id="s-password" type="password" placeholder="password" />
        <button onClick={signUp}>Sign Up</button>
      </form>

      <Link to={`/login`} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Login</Link>
    </>
  );
}
