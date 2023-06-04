import React, { useEffect, useState }from "react";
import AppAdviser from "../components/AdviserView";

export default function ManageApps() {
    const adviserEmail = localStorage.getItem("email")
    const [students, setStudents] = useState([])

    //get students with adviser (only students with open application)
    useEffect(() => {
        fetch(`http://localhost:3001/get-student-by-adviser-email?email=${adviserEmail}`)
            .then((response) => response.json())
            .then((body) => {
                setStudents(body);
            });
    }, []);

    function changeHandler(id) {
        setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
    }

    return (
        <>
            <div class="w-[100%] flex flex-col">
                <div class="flex justify-center container container mx-auto">
                    <h1 class="font-extrabold flex text-4xl mt-20">
                        Clearance Requests
                    </h1>
                </div>
                <div class="flex flex-wrap flex-row items-center p-5 place-content-center">
                    {
                        students.map((student, i) => 
                            <AppAdviser class="" adviserEmail={adviserEmail} student={student}  onChange={changeHandler}/>
                        )
                    }
                </div>           
            </div>            
        </>

    );
}
  