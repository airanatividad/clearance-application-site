import React, { useEffect, useState, useSession} from "react";
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import ApplicationList from "../components/ApplicationList";
import ClearanceForm from "../components/ClearanceForm";
import logoclearance from "../images/logo.png";
import bg from "../images/bg_all.png";
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function HomePageAll() {
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData());
    const navigate = useNavigate();

    const [application, setApplication] = useState()
    const [appNumber, setAppNumber] = useState(0)
    const [adviserRemark, setAdviserRemark] = useState("N/A")
    const [coRemark, setCORemark] = useState("N/A")
    const [adviserStatus, setAdviserStatus] = useState("N/A")
    const [coStatus, setCOStatus] = useState("N/A")
    const [showButton, setShowButton] = useState(true)
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
 
    const members = ["Zachary Allen Catindig", "Aira Nicole Natividad", "Marian Stephanie Vergara"];
    const listMembers = members.map((members) =>
        <li>{members}</li>,
    );

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
  
  
    const email = localStorage.getItem("email");
    const [user, setUser] = useState(null);

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'column',
        },
        image: {
          flex: 1,
          resizeMode: 'cover',
          justifyContent: 'start',
        }})

    return (
        <>
        <View style={styles.container}>
            <ImageBackground source={bg} style={styles.image}>
                <div class="w-[100%] flex flex-col">
                    <div class="flex flex-col items-center p-5 place-content-center mx-20 ">
                        {/* <div className="flex w-24 flex-col self-center rounded-full mt-5">
                            <img
                            src={logoclearance}
                            className="object-scale-down object-center"
                            alt="Site Logo"
                            fill
                            />
                        </div> */}
                        <h1 class="font-extrabold flex self-center justify-center text-100-charcoal text-4xl p-5">
                            Welcome {user?.fname}!
                        </h1>
                    </div>
                    <div class="flex flex-col items-center p-5 place-content-center mt-10 mx-20 bg-100-gwhite rounded-md">
                        <p class="text-xl">
                        Welcome to the Clearance Application Site! To start, we would like to inform you first that this system is still under development. If you encounter any problems, errors or bugs please report it through the Support GForm: /link/. <br/> <br/> To help you navigate easily through our system, the following are the modules that are currently working: <br/>
                        {user?.usertype == 1 && (
                        <li>
                        Dashboard
                        </li>
                        )}
                        {user?.usertype == 2 &&(
                        <li>
                        Manage Applications
                        </li>
                        )}
                        {user?.usertype == 3 &&(
                        <li>
                        Manage Applications
                        </li>
                        )}
                        {user?.usertype == 4 &&(
                            <>
                                <li>
                                Manage Approvers
                                </li>
                                <li>
                                Student Account Approval
                                </li>
                            </>

                        )}
                        <br/>
                        <div class="text-sm flex flex-col">
                            This system was co-created by CMSC 100 UV5L students:
                            <ul class="ml-5">{listMembers}</ul>                        
                        </div>

                        </p>
                    </div>  
                    <div class="flex flex-col items-center place-content-center">
                        {/* <ApplicationList class="" email={email}/> */}
                    </div>  
    {/* 
                    {!!(application?.adviserStatus == null && application?.coStatus == null) && (
                        <>  
                        <i>No Current Application</i>
                        </>
                    )} */}
                    
                    {application?.adviserStatus != null && application?.coStatus != null && (
                        <div class="flex flex-col items-left p-5 place-content-center mt-10 mx-20 bg-100-gwhite">
                            <h1 class="font-bold">
                                Notification
                            </h1>

                            {/* accepted adviser only */}
                            {!!(application?.adviserStatus == "Cleared" && application?.coStatus == "Pending") && (
                                <>
                                <li>
                                    Your Application was Approved by your Adviser {adviser?.fname} {adviser?.mname} {adviser?.lname}. Kindly wait for the approval of your Clearance Officer {clearoff?.fname} {clearoff?.mname} {clearoff?.lname}.
                                </li>
                                </>
                            )}

                            {/* accepted both adviser and co */}
                            {!!(application?.adviserStatus == "Cleared" && application?.coStatus == "Cleared") && (
                                <>
                                <li>
                                    Your Application was Approved by your Adviser {adviser?.fname} {adviser?.mname} {adviser?.lname} and Clearance Officer {clearoff?.fname} {clearoff?.mname} {clearoff?.lname}. You may now print your document.
                                </li>
                                </>
                            )}

                            {/* rejected adviser and/or co */}
                            {!!(application?.adviserStatus == "Closed" | application?.coStatus == "Closed") && (
                                <>  
                                <li>
                                    Your Application was Rejected by your Adviser {adviser?.fname} {adviser?.mname} {adviser?.lname} and/or Clearance Officer {clearoff?.fname} {clearoff?.mname} {clearoff?.lname}. Kindly resolve you deficiency.
                                </li>
                                </>
                            )}

                            {/* pending adviser and co */}
                            {!!(application?.adviserStatus == "Pending" && application?.coStatus == "Pending") && (
                                <>  
                                <i>No Notifications Available</i>
                                </>
                            )}
                        </div>                    
                    )}

                </div>                   
            </ImageBackground>
        </View>
                 
        </>

    );
}