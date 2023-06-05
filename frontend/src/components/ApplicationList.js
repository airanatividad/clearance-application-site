import React, { useEffect, useState } from "react";
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";
import html2canvas from 'html2pdf.js'



export default function ApplicationList(props) {
    const { email } = props
    const [application, setApplication] = useState()
    const [appNumber, setAppNumber] = useState(0)
    const [adviserRemark, setAdviserRemark] = useState("N/A")
    const [coRemark, setCORemark] = useState("N/A")
    const [adviserStatus, setAdviserStatus] = useState("N/A")
    const [coStatus, setCOStatus] = useState("N/A")
    const [showButton, setShowButton] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData());
    const navigate = useNavigate();
    const [adviser, setAdviser] = useState("")
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

    function handleDelete() {
        if (adviserStatus != 'Closed' && coStatus != 'Closed') {
            fetch("http://localhost:3001/delete-application", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
            })
            .then(response => response.json()) //this returns the response in json
            .then(body => {
                if (body.success) {
                    alert("Application was successfully cancelled")
                    window.location.reload();
                } else {
                    alert("Failed to cancel application")
                }
            })
        } else {
            alert("Application already cancelled")
        }
    }   

    function printComponent() {
        const component = document.getElementById('#pdf');
        html2canvas(component).then(canvas => {
        const doc = new jsPDF();
        // doc.save('Clearance.pdf');
        });
    }

    var date = new Date()
    // var today = new Date();
    var newdat = "Date Generated: "+ date;
    // var day = date.getDate();
    // var month = date.getMonth();
    // var year = date.getFullYear();
    // var newdat = day + '-' + month + '-' + year;
    return (
        <>{showButton &&
        <div class="container w-[68%] h-min bg-100-payne p-2 rounded-lg flex justify-center p-5 flex-col">
            <div class="flex flex-row text-white content-center justify-start">
                <div class="flex flex-col w-64 p-2 border-black-200">
                    <h1 class = "font-extrabold">
                        APPLICATION
                    </h1>
                    <h1 class = "">
                        Application #{appNumber}
                    </h1>
                </div>
                <div class="flex flex-col w-64 p-2">
                    <h1 class = "font-extrabold">
                        STATUS
                    </h1>
                    <h1 class = "">
                        Adviser - {adviserStatus}
                    </h1>
                    <h1 class = "">
                        Clearance Officer - {coStatus}
                    </h1>
                </div>
                <div class="flex flex-col w-64 p-2">
                <h1 class = "font-extrabold">
                        REMARKS
                    </h1>
                    <h1 class = "">
                        Adviser - {adviserRemark}
                    </h1>
                    <h1 class = "">
                        Clearance Officer - {coRemark}
                    </h1>
                </div>
            </div>

            {!!(application?.adviserStatus == "Pending" | application?.coStatus == "Pending") && (
                <>
                    <button
                        className=" mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                        onClick={handleDelete}
                    >
                        Cancel Application
                    </button>            
       
                </>
            )}
            {!!(application?.adviserStatus == "Closed" | application?.coStatus == "Closed") && (
                <h1 class=" flex justify-end text-xs text-white"><br/><br/>
                    If status is Closed, kindly settle your deficiency and resubmit another application.
                </h1>
            )

            }
            

            {application?.adviserStatus == "Cleared" && application?.coStatus == "Cleared" && (
                <>
                    <button class=" mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black" onClick={printComponent}>
                        Generate PDF
                    </button>       
                    {/* pdf content */}
                    <div class="hidden">
                        <div id="#pdf" class="flex flex-col mx-10">
                            {/* header */}
                            <div>
                                <h1 class="flex justify-center item-center self-center align-center text-lg font-bold mt-10">
                                    University of the Philippines Los Banos
                                </h1> 
                                <div class="flex flex-col ">
                                    <h2 class="justify-center item-center self-center align-center">
                                        Pedro R. Sandoval Ave., Los Banos, Laguna 4031
                                    </h2>      
                                    <h2 class="justify-center item-center self-center align-center">
                                        College of Arts and Sciences
                                    </h2> 
                                    <h2 class="justify-center item-center self-center align-center">                                
                                        Institute of Computer Science                           
                                    </h2>                                     
                                </div>
                            </div>
                            <br/><br/><br/><br/>
                            <p>
                                {newdat} <br/><br/>
                            </p>
                            <p class="text-justify">
                            This document certifies that {user?.fname} {user?.mname} {user?.lname}, {user?.studno} has satisfied the clearance requirements of the Institute.
                            </p>
                            {/* <hr
                                style={{
                                    color: "black",
                                    backgroundColor: "white",
                                    height: 5
                                }}
                            /> */}
                            <br/><br/><br/>
                            <h1 class="">
                                Verified: <br/><br/>
                                {/* Name: <b>{user?.fname} {user?.mname} {user?.lname}</b><br/>
                                Student Number: {user?.studno}<br/> */}
                                Academic Adviser: {adviser?.fname} {adviser?.mname} {adviser?.lname} <br/>
                                {/* Status: <b>{adviserStatus}</b>  <br/>
                                Remark: {adviserRemark} <br/> */}
                                Clearance Officer: {clearoff?.fname} {clearoff?.mname} {clearoff?.lname} <br/>
                                {/* Status: <b>{coStatus}</b> <br/>
                                Remark: {coRemark} <br/> */}
                            </h1>     
                            <br/>                       
                            <h1 class="text-white">
                                ----------------------
                            </h1>
                        </div>                          
                    </div>
                </>
            )
            }
        </div>
        }
        </>
    );
}
