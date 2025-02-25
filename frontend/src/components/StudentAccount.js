import React, { useEffect, useState } from "react";

export default function StudentAccount(props) {
  const { student, advisers } = props;
  const [selectedAdviser, setSelectedAdviser] = useState("");
  const [showPopUpReject, setShowPopUpReject] = useState(false);
  const [showPopUpAccept, setShowPopupAccept] = useState(false);

  async function approveUser() {
    console.log(advisers)
    console.log(selectedAdviser)
    if (selectedAdviser === "") {
      alert("Please select an adviser.");
      return;
    }
  
    try {
      const adviserResponse = await fetch("http://localhost:3001/update-adviser-by-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: student.email,
          adviser_id: selectedAdviser,
        }),
      });
  
      const adviserResult = await adviserResponse.json();
  
      if (!adviserResult.success) {
        alert("Adviser could not be updated.");
        throw new Error("Adviser could not be updated.");
      }
  
      const statusResponse = await fetch("http://localhost:3001/update-user-status-by-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: student.email,
          status: "Approved",
        }),
      });
  
      const statusResult = await statusResponse.json();
  
      if (!statusResult.success) {
        alert("User status could not be modified.");
        return;
      }
  
      props.onChange(student._id);
      setShowPopupAccept(false);
    } catch (error) {
      console.log(error);
    }
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
          setShowPopUpReject(false);
          
        } else {
          alert("User status could not be modified.");
        }
      });
  }

  return (
    <>
      <div className="container w-[68%] h-min bg-100-payne p-2 rounded-lg flex justify-center p-5 flex-col m-1">
        <div className="flex flex-row text-white content-center items-center justify-between">
          <h1 className="text-xl w-[20%]">
            {student.fname} {student.mname} {student.lname}
          </h1>
          <h1 className="text-lg p-5">{student.email}</h1>
          <h1 className="text-lg p-5 w-[20%]">{student.studno}</h1>

          {/* Dropdown */}
          <select
            value={selectedAdviser}
            onChange={(e) => setSelectedAdviser(e.target.value)}
            className="border rounded-md py-2 px-3 text-black"
          >
          <option value="">Select an adviser</option>
            {advisers.map((adviser) => (
              <option key={adviser._id} value={adviser._id}>
                {adviser.fname} {adviser.lname}
              </option>
            ))}
          </select>

          <div className="flex flex-row justify-center align-center items-center p-3">
            <button
              className=" mx-2 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black justify-center align-center items-center"
              onClick={() => setShowPopupAccept(true)}
            >
              Approve
            </button>
            <button
              className=" mx-2 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black justify-center align-center items-center  "
              onClick={() => setShowPopUpReject(true)}
            >
              Reject
            </button> 
          </div>
        </div>

        {/* POPUPS */}
      {showPopUpReject && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-xl bg-white p-5">
            <h1 className="flex justify-center">Reject This Student?</h1>
            <div className="flex flex-row justify-center align-center items-center">
              <button
                className="mx-2 mt-4 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                onClick={rejectUser}
                >
                Yes
              </button>
              <button
                className="mx-2 mt-4 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                onClick={() => setShowPopUpReject(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {showPopUpAccept && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-xl bg-white p-5">
            <h1 className="flex justify-center">Approve This Student?</h1>
            <div className="flex flex-row justify-center align-center items-center ">
              <button
                className="mx-2 mt-4 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                onClick={approveUser}
                >
                Yes
              </button>
              <button
                className="mx-2 mt-4 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                onClick={() => setShowPopupAccept(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
