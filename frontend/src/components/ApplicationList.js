import React, { useEffect, useState } from "react";

export default function ApplicationList(props) {
    const { email } = props
    const [application, setApplication] = useState()
    const [appNumber, setAppNumber] = useState(0)
    const [adviserRemark, setAdviserRemark] = useState("None")
    const [coRemark, setCORemark] = useState("None")
    const [adviserStatus, setAdviserStatus] = useState("None")
    const [coStatus, setCOStatus] = useState("None")
    const [showButton, setShowButton] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:3001/get-number-of-applications?email=${email}`)
        .then(response => response.json())
        .then(data => {
            setAppNumber(data)
        })

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

        if (adviserStatus != 'Closed' && coStatus != 'Closed') {
            setShowButton(true)
        }
    }, [])

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
                    setShowButton(false);
                } else {
                    alert("Failed to cancel application")
                }
            })
        } else {
            alert("Applicaiton already cancelled")
        }
    }   

    return (
        <>
        {showButton &&
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
            <button
                    className=" mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                    onClick={handleDelete}
                >
                    Cancel Application
            </button>
        </div>
        }
        </>
    );
}
