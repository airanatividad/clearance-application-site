import React from "react";

export default function StudentAccount(props) {

    const { student } = props;

    function approveUser(){
        fetch(`http://localhost:3001/update-user-status-by-email`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: student.email, status:"Approved" })
            })
            .then(response => response.json())
            .then(body => {
                if (body.success) {
                props.onChange(student._id);
                } else {
                alert("User status could not be modified.");
                }
            });
    }
    function rejectUser(){
        fetch(`http://localhost:3001/update-user-status-by-email`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: student.email, status:"Rejected" })
            })
            .then(response => response.json())
            .then(body => {
                if (body.success) {
                props.onChange(student._id);
                } else {
                alert("User status could not be modified.");
                }
            });
    }
    
    return (
        <>
        <div class="container w-[68%] h-min bg-100-payne p-2 rounded-lg flex justify-center p-5 flex-col m-1">
            <div class="flex flex-row text-white content-center items-center justify-between">
                <h1 class="text-xl">
                    {student.fname} {student.mname} {student.lname}    
                </h1>
                <h1 class="text-lg">
                    {student.email}
                </h1>
                <h1 class="text-lg">
                    {student.studno}
                </h1>
                <h1 class="text-lg">
                    Insert Dropdown Here
                </h1>
                <div class="flex flex-row">
                    <button
                        className=" mx-2 mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                        onClick={approveUser}
                        >
                            Approve
                    </button>         
                    <button 
                        className=" mx-2 mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                        onClick={rejectUser}
                        >
                            Reject
                    </button>                       
                </div>
          
            </div>

        </div>
        </>
    );
}
