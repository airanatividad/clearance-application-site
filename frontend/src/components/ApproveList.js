import React from "react";

export default function ApproveList({ approver, onDelete }) {
    
    const { fname, mname, lname, email } = approver;

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
              onClick={deleteApprover}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
