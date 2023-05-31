import React, { useEffect, useState } from "react";
import StudentAccount from "../components/StudentAccount";

export default function ManageStudents() {
    const [students, setStudents] = useState([])

    useEffect(() => {
        // fetch data from the API as the page loads
        fetch("http://localhost:3001/get-pending-users")
          .then(response => response.json())
          .then(body => {
            setStudents(body)
          })
      }, [])

    function changeHandler(id) {
        setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
    }
    return (
        <>
            <div class="w-[100%] flex flex-col">
                <div class="flex justify-center container container mx-auto">
                    <h1 class="font-extrabold flex text-4xl mt-20 mb-5">
                        Manage Students
                    </h1>
                </div>
                <div class="flex flex-col items-center place-content-center">
                    {
                        students.map((student, i) => 
                            <StudentAccount class="" student={student} onChange={changeHandler}/>
                        )
                    }
                </div>  
            </div>             
        </>

    );
}
  