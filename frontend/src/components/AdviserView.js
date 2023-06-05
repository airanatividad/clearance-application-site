import React, { useEffect, useState } from "react";
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';


export default function AppAdviser(props) {
    const { adviserEmail, student, usertype } = props
    const { fname, mname, lname, studno, email } = student
    const [userAdviser, setUserAdviser] = useState({})
    const [adviserRemark, setAdviserRemark] = useState("N/A")
    const [application, setApplication] = useState()
    const [remark, setRemark] = useState("")
    const [link, setLink] = useState("")
    const [appNumber, setAppNumber] = useState(0)

    const [coRemark, setCORemark] = useState("N/A")
    const [adviserStatus, setAdviserStatus] = useState("N/A")
    const [coStatus, setCOStatus] = useState("N/A")
    const [showButton, setShowButton] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData());
    const navigate = useNavigate();
    const [adviser, setAdviser] = useState("")
    
    useEffect(() => {
        fetch(`http://localhost:3001/get-user-adviser-by-email?email=${email}`)
        .then(response => response.json())
        .then(data => {
            setAdviser(data)
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

    useEffect(() => {
        // get name of adviser
        if (usertype == 2) {
            // get adviser by adivser email
            fetch(`http://localhost:3001/get-user-by-email?email=${adviserEmail}`)
            .then(response => response.json())
            .then(data => {
                setUserAdviser(data)
            })
        } else if (usertype == 3) {
            // get adviser by student email
            fetch(`http://localhost:3001/get-user-adviser-by-email?email=${email}`)
            .then(response => response.json())
            .then(data => {
                setUserAdviser(data)
            })
        }

        // get application of student
        fetch(`http://localhost:3001/get-current-application-by-email?email=${email}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setApplication(data.app)
                setLink(data.app.submission.link)
            }
        })

        // get latest remark of student
        fetch(`http://localhost:3001/get-latest-remark-of-student?email=${email}`)
        .then(response => response.text())
        .then(data => {
            setRemark(data)
        })
    }, [])

    function approveApp() {
        if (usertype == 2) {
            // post update remark
            const adviserRemark = document.getElementById("adviser-remark").value;
            fetch("http://localhost:3001/update-remarks-by-email", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, remark: adviserRemark, commenter: adviserEmail, step: 2 }) //serialize to string. it's an object
            }) 

            fetch("http://localhost:3001/update-app-status-by-email", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, adviserStatus: 'Cleared'}) //serialize to string. it's an object
                }) 
                .then(response => response.json())
                .then(body => {
                    if (body.success) {
                        alert("Clearance application successfully approved")
                        props.onChange(student._id);
                    } else {
                        alert("Failed to approve application")
                    }
            })
        } else if (usertype == 3) {
            // post update remark
            const coRemark = document.getElementById("co-remark").value;
            fetch("http://localhost:3001/update-remarks-by-email", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, remark: coRemark, commenter: adviserEmail, step: 2 }) //serialize to string. it's an object
            }) 
            
            fetch("http://localhost:3001/update-app-status-by-email", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, coStatus: 'Cleared'}) //serialize to string. it's an object
                }) 
                .then(response => response.json())
                .then(body => {
                    if (body.success) {
                        alert("Clearance application successfully approved")
                        props.onChange(student._id);
                    } else {
                        alert("Failed to approve application")
                    }
            })
        }
        
    }

    function rejectApp() {
        if (usertype == 2) {
            // post update remark
            const adviserRemark = document.getElementById("adviser-remark").value;
            fetch("http://localhost:3001/update-remarks-by-email", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, remark: adviserRemark, commenter: adviserEmail, step: 2 }) //serialize to string. it's an object
            }) 

            fetch("http://localhost:3001/update-app-status-by-email", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, adviserStatus: 'Closed'}) //serialize to string. it's an object
                }) 
                .then(response => response.json())
                .then(body => {
                    if (body.success) {
                        alert("Clearance application successfully rejected")
                        props.onChange(student._id);
                    } else {
                        alert("Failed to reject application")
                    }
                })
        } else if (usertype == 3) {
            // post update remark
            const coRemark = document.getElementById("co-remark").value;
            fetch("http://localhost:3001/update-remarks-by-email", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, remark: coRemark, commenter: adviserEmail, step: 2 }) //serialize to string. it's an object
            }) 

            fetch("http://localhost:3001/update-app-status-by-email", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, coStatus: 'Closed'}) //serialize to string. it's an object
                }) 
                .then(response => response.json())
                .then(body => {
                    if (body.success) {
                        alert("Clearance application successfully rejected")
                        props.onChange(student._id);
                    } else {
                        alert("Failed to reject application")
                    }
                })
        }
    }

    return (
        <>
        <div class="container w-[25%] h-min bg-100-payne rounded-lg flex justify-center flex-col pl-3 pr-10 pb-2 m-2">
            <div class="w-[100%] flex flex-col text-white content-center justify-start">
                <div class="flex flex-col w-[100%] p-2 m-3 ">
                    <h1 class = "font-extrabold">
                        STUDENT
                    </h1>
                    <h1 class = "">
                        {fname} {mname} {lname}
                    </h1>
                    <h1 class = "">
                        {studno}
                    </h1>
                    <h1 class = "">
                        {link}
                    </h1>
                    <h1 class = "">
                        {remark}
                    </h1>
                </div>
                <div class="flex flex-col w-[100%] p-2 m-3">
                    <h1 class = "font-extrabold">
                        ADVISER
                    </h1>
                    <h1 class = "">
                        {userAdviser.fname} {userAdviser.mname} {userAdviser.lname}
                    </h1>
                </div>
            </div>
            {usertype == 2 && (
                <>
                <div>
                    <div class="flex flex-col w-[100%] p-2 m-3">
                        <h1 class="font-bold text-white">
                            ADVISER'S REMARKS
                        </h1>
                        <input id="adviser-remark" placeholder="Enter Remarks Here." class="w-[100%] p-2 rounded-md m-1 text-100-charcoal"/>
                    </div>
                </div>
                <div class=" flex flex-row justify-center" >
                    <button
                            className=" w-28 m-3 justify-center mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                            onClick={approveApp}
                        >
                            Approve
                    </button>
                    <button
                            className=" w-28 m-3 mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                            onClick={rejectApp}
                        >
                            Reject
                    </button>                
                </div>                
                </>
            )}

            {/* TODO: to be fixed CO approve, reject */}
            {usertype == 3 && (
                <>
                <div>
                    <div class="flex flex-col w-[100%] p-2 m-3">
                        <h1 class="font-bold text-white">
                            ADVISER'S REMARKS
                        </h1>
                        <h1 class ="text-white">
                            {adviserRemark}
                        </h1>                    
                    </div>
                </div>
                <div>
                    <div class="flex flex-col w-[100%] p-2 m-3">
                        <h1 class="font-bold text-white">
                            CO'S REMARKS
                        </h1>
                        <input id="co-remark" placeholder="Enter Remarks Here." class="w-[100%] p-2 rounded-md m-1 text-100-charcoal"/>
                    </div>
                </div>
                <div class=" flex flex-row justify-center" >
                    <button
                            className=" w-28 m-3 justify-center mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                            onClick={approveApp}
                        >
                            Approve
                    </button>
                    <button
                            className=" w-28 m-3 mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                            onClick={rejectApp}
                        >
                            Reject
                    </button>                
                </div>                
                </>
            )}

        </div>
        </>
    );
}
