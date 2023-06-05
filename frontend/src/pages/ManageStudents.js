import React, { useEffect, useState } from "react";
import StudentAccount from "../components/StudentAccount";
var sortBy = require('sort-by');

export default function ManageStudents() {
    const [students, setStudents] = useState([]);
    const [advisers, setAdvisers] = useState([]);
    const [sortState, setSortState] = useState("none");

    useEffect(() => {
        // fetch data from the API as the page loads
        fetch("http://localhost:3001/get-pending-users")
          .then(response => response.json())
          .then(body => {
            setStudents(body)
          })
        // fetch all advisers
        fetch("http://localhost:3001/get-advisers")
        .then((response) => response.json())
        .then((body) => {
            setAdvisers(body);
        });
    }, []);

    function changeHandler(id) {
        setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
    }

    function sortAccounts(e) {
        if (e.target.value == 'name-ascending') {
            students.sort((sortBy('fname')));
        } else if (e.target.value == 'name-descending') {
            students.sort((sortBy('-fname')));
        } else if (e.target.value == 'studno-ascending') {
            students.sort((sortBy('studno')));
        } else if (e.target.value == 'studno-descending') {
            students.sort((sortBy('-studno')));
        }
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
                    <select defaultValue={'DEFAULT'} onChange={(e) => {
                        sortAccounts(e)
                        setSortState(e.target.value)
                        }}>
                        <option value="DEFAULT" disabled>Sort By</option>
                        <option value="name-ascending">Name (Ascending)</option>
                        <option value="name-descending">Name (Descending)</option>
                        <option value="studno-ascending">Student Number (Ascending)</option>
                        <option value="studno-descending">Student Number (Descending)</option>
                    </select>
                </div>
                <div class="flex flex-col items-center place-content-center">
                    {
                        students.map((student, i) => 
                            <StudentAccount class="" student={student} advisers={advisers} onChange={changeHandler} />
                        )
                    }
                </div>  
            </div>             
        </>

    );
}
  