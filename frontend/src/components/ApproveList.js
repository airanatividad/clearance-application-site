import React, { useEffect, useState } from "react";


export default function ApproveList({ approver, onDelete }) {
    
    const { fname, mname, lname, email } = approver;
    const [showPopUpDelete, setShowPopUpDelete] = useState(false);

    function deleteApprover() {
        fetch(`http://localhost:3001/delete-user-by-email`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(body => {
            if (body.success) {
                onDelete(approver._id);
                setShowPopUpDelete(false);
            } else {
            alert("Student could not be rejected.");
            }
        });
    }

  return (
    <>
      <div className="container w-[68%] h-min bg-100-payne p-2 rounded-lg flex justify-center p-5 flex-col m-1">
        <div className="flex flex-row text-white content-center items-center justify-between">
          <h1 className="text-xl">
            {fname} {mname} {lname}
          </h1>
          <h1 className="text-lg">{email}</h1>
          <div className="flex flex-row">
            <button
              className="mx-2 mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
            >
              Edit
            </button>
            <button
              className="mx-2 mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
              onClick={() => setShowPopUpDelete(true)}
            >
              {/* onClick={deleteApprover} */}
              Delete
            </button>
          </div>
        </div>

        {/* POPUPS */}
        {showPopUpDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-xl bg-white p-5">
            <h1 className="flex justify-center">Delete This Approver?</h1>
            <div className="flex flex-row">
              <button
                className="mx-2 mt-4 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                onClick={deleteApprover}
              >
                Yes
              </button>
              <button
                className="mx-2 mt-4 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                onClick={() => setShowPopUpDelete(false)}
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
