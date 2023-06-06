// import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import logoclearance from "../images/logo.png";
import passwordValidator from 'password-validator';
import emailValidator from 'email-validator';
import bg from "../images/bg_signup.png";
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function Signup() {

  function signUp(e) {
    e.preventDefault();
    const fname = document.getElementById("s-fname").value;
    const mname = document.getElementById("s-mname").value;
    const lname = document.getElementById("s-lname").value;
    const studno = document.getElementById("s-studno").value;

    const email = document.getElementById("s-email").value;
    const password = document.getElementById("s-password").value;
    
    // form validation 
    if (fname === "" || lname === "" || email === "" || password === "") {
      alert("Please enter all required fields.");
      return;
    }

    if (!emailValidator.validate(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const schema = new passwordValidator();
    schema.is().min(8);               // Minimum length of 8
    schema.has().digits();            // Must have digits

    if (!schema.validate(password)) {
      alert("Password must be at least 8 characters long and contain digits.");
      return;
    }

    fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname: fname,
        mname: mname,
        lname: lname,
        studno: studno,
        usertype: 1,
        email: email,
        password: password,
        status: "Pending",
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    }})

  return (
    <>
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.image}>
        <div class="top-10 flex h-screen items-center self-center justify-center flex-col p-2 ">
          <img
            src={logoclearance}
            className="object-scale-down object-left w-36"
            alt="Site Logo"
            fill
            />  
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
                  <button class="p-2 m-2 rounded-md bg-100-payne text-white hover:bg-black" onClick={signUp}>Sign Up</button>
                </form>
          </div>
        <div class="flex justify-center content-center ">
          <label className="flex pl-3 text-sm text-white ">
            Already have an account?
          </label>
          <Link to={`/login`} class="pl-1 text-sm text-white underline">Login</Link>      
        </div>
      </div>
      </ImageBackground>
    </View>

    </>

  );
}
