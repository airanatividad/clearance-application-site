import React, { useEffect, useState } from "react";
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import ApplicationList from "../components/ApplicationList";
import ClearanceForm from "../components/ClearanceForm";

export default function Dashboard() {

    const email = localStorage.getItem("email")
    const [adviser, setAdviser] = useState("")

    useEffect(() => {
        fetch(`http://localhost:3001/get-user-adviser-by-email?email=${email}`)
        .then(response => response.json())
        .then(data => {
            setAdviser(data)
        })
    }, [])
    
    const [application, setApplication] = useState()
    const [appNumber, setAppNumber] = useState(0)
    const [adviserRemark, setAdviserRemark] = useState("N/A")
    const [coRemark, setCORemark] = useState("N/A")
    const [adviserStatus, setAdviserStatus] = useState("N/A")
    const [coStatus, setCOStatus] = useState("N/A")
    const [showButton, setShowButton] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData());
    const navigate = useNavigate();
    const [clearoff, setClearOff] = useState("")

    useEffect(() => {
        fetch(`http://localhost:3001/get-user-adviser-by-email?email=${email}`)
        .then(response => response.json())
        .then(data => {
            setAdviser(data)
        })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:3001/get-user-co-by-email?email=${email}`)
        .then(response => response.json())
        .then(data => {
            setClearOff(data)
        })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:3001/get-user-by-email?email=${email}`)
        .then(response => response.json())
        .then(data => {
          setUser(data);
        })
        .catch(error => {
          console.error("Failed to fetch user details:", error);
        });
    }, [isLoggedIn, navigate]);
  
    const id = localStorage.getItem("id");
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/get-number-of-applications?email=${email}`)
        .then(response => response.json())
        .then(data => {
            setAppNumber(data)
        })
    }, [])

    useEffect(() => {
        if (appNumber != 0) {
            fetch(`http://localhost:3001/get-current-application-by-email?email=${email}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setApplication(data.app)
                    setAdviserStatus(data.app.adviserStatus)
                    setCOStatus(data.app.coStatus)
                } else {
                    setApplication({})
                    setAdviserStatus("None")
                    setCOStatus("None")
                }
            })

            fetch(`http://localhost:3001/get-remark-of-adviser?email=${email}`)
            .then(response => response.text())
            .then(data => {
                setAdviserRemark(data)
            })

            fetch(`http://localhost:3001/get-remark-of-co?email=${email}`)
            .then(response => response.text())
            .then(data => {
                setCORemark(data)
            }) 
            setShowButton(true)
        } else {
            setShowButton(false)
        }
    }, [appNumber])

    return (
        <>
            <div class="w-[100%] flex flex-col">
                <div class="flex justify-center container container mx-auto">
                    <h1 class="font-extrabold flex text-4xl mt-10">
                        Clearance Application
                    </h1>
                </div>
                {!!(adviserStatus != "Cleared" | coStatus != "Cleared") && (
                <div class="flex flex-col items-center p-5 place-content-center">
                    <ClearanceForm class="" adviser={adviser} email={email}/>
                </div>  
                )}

                <div class="flex flex-col items-center place-content-center mt-5">
                    <ApplicationList class="" email={email}/>
                </div>  
            </div>                    
        </>

    );
}