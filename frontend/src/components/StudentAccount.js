import React, { useState } from "react";

export default function StudentAccount(props) {
  const { student, advisers } = props;
  const [selectedAdviser, setSelectedAdviser] = useState(null);

  function approveUser() {
    if (selectedAdviser === null) {
      alert("Please select an adviser.");
      return;
    }
  
    fetch("http://localhost:3001/update-user-status-by-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: student.email,
        status: "Approved",
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.success) {
          return fetch("http://localhost:3001/update-adviser-by-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: student.email,
              adviser_id: selectedAdviser,
            }),
          });
        } else {
          alert("User status could not be modified.");
          throw new Error("User status could not be modified.");
        }
      })
      .then((response) => response.json())
      .then((body) => {
        if (body.success) {
          props.onChange(student._id);
        } else {
          alert("Adviser could not be updated.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  function rejectUser() {
    fetch("http://localhost:3001/update-user-status-by-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: student.email, status: "Rejected" }),
    })
      .then((response) => response.json())
      .then((body) => {
        if (body.success) {
          props.onChange(student._id);
        } else {
          alert("User status could not be modified.");
        }
      });
  }

  return (
    <>
      <div className="container w-[68%] h-min bg-100-payne p-2 rounded-lg flex justify-center p-5 flex-col m-1">
        <div className="flex flex-row text-white content-center items-center justify-between">
          <h1 className="text-xl">
            {student.fname} {student.mname} {student.lname}
          </h1>
          <h1 className="text-lg">{student.email}</h1>
          <h1 className="text-lg">{student.studno}</h1>

          {/* Dropdown */}
          <select
            value={selectedAdviser}
            onChange={(e) => setSelectedAdviser(e.target.value)}
            className="border rounded-md py-2 px-3 text-black"
          >
            {advisers.map((adviser) => (
              <option key={adviser._id} value={adviser._id}>
                {adviser.fname} {adviser.lname}
              </option>
            ))}
          </select>

          <div className="flex flex-row">
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
