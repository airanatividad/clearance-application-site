import React, { useEffect, useState } from "react";

// approver list

export default function ApproveList({ approver, onDelete }) {
    
    const { fname, mname, lname, email } = approver;
    const [showPopUpDelete, setShowPopUpDelete] = useState(false);
    const [showPopUpEdit, setShowPopUpEdit] = useState(false);

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
  
    // EDITTODO: put editApprover function here
    function editApprover() {
      const newFname = document.getElementById("n-fname").value;
      const newMname = document.getElementById("n-mname").value;
      const newLname = document.getElementById("n-lname").value;
  
      const newEmail = document.getElementById("n-email").value;
      const newPassword = document.getElementById("n-password").value;

      // form validation 
      if (newFname === "" || newMname === "" || newLname === "" || newEmail === "" || newPassword === "") {
        alert("Please enter all required fields.");
        return;
      }

      fetch(`http://localhost:3001/update-user-by-email`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          fname: newFname, 
          mname: newMname, 
          lname: newLname, 
          email: email,
          newEmail: newEmail, 
          password: newPassword, 
          usertype: document.querySelector('input[name="n-approverType"]:checked').value })
        })
        .then(response => response.json())
        .then(body => {
            if (body.success) {
                alert("Successfully edited!")
                setShowPopUpEdit(false) //close pop-up
                window.location.reload(false); // reload only current page
            } else {
            alert("Failed to edit user account");
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
              onClick={() => setShowPopUpEdit(true)}

            >
              Edit
            </button>
            <button
              className="mx-2 mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
              onClick={() => setShowPopUpDelete(true)}
            >
              Delete
            </button>
          </div>
        </div>

        {/* POPUPS */}
        {showPopUpDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-xl bg-white p-5">
            <h1 className="flex justify-center">Delete This Approver?</h1>
            <div className="flex flex-row justify-center items-center align-center self-center">
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
      {showPopUpEdit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-xl bg-100-payne p-5 text-white">
            <>
              <div>
                <h1 className="flex justify-center text-2xl">Edit Approver Details</h1>
              </div>
              <form>
                      <div class="flex flex-row items-center">
                          <div class="p-2">
                              <h1>
                                  First Name
                              </h1>
                              <input id="n-fname" placeholder="First Name" defaultValue = {fname} class="p-2 rounded-md text-100-charcoal"/>
                          </div>
                          <div class="p-2">
                              <h1>
                                  Middle Name
                              </h1>
                              <input id="n-mname" placeholder="Middle Name" defaultValue = {mname} class="p-2 rounded-md text-100-charcoal"/>
                          </div>      
                          <div class="p-2">
                              <h1>
                                  Last Name
                              </h1>
                              <input id="n-lname" placeholder="Last Name" defaultValue = {lname} class="p-2 rounded-md text-100-charcoal"/>
                          </div>              
                      </div>  
                      <div class="flex flex-row">
                          <div class="p-2">
                              <h1>
                                  UP Mail
                              </h1>
                              <input id="n-email" placeholder="Email" defaultValue = {email} class="w-[100%] p-2 rounded-md text-100-charcoal"/>
                          </div>
                          <div class="p-2">
                              <h1>
                                  Password
                              </h1>
                              <input id="n-password" type="password" placeholder="Password" class="w-[100%] p-2 rounded-md text-100-charcoal"/>
                          </div>
                          <div class="p-2">
                              <h1>Approver type</h1>
                              <div class="flex p-2">
                                  <label for="adviser" class="mr-3">
                                  <input type="radio" id="n-adviser" name="n-approverType" value="2" checked />
                                  Adviser
                                  </label>
                                  <label for="clearance-officer">
                                  <input type="radio" id="n-clearance-officer" name="n-approverType" value="3" />
                                  Clearance Officer
                                  </label>
                              </div>
                          </div>

                      </div>
                  </form>
            </>
            <div className="flex flex-row justify-center items-center align-center self-center">
              <button
                className="mx-2 mt-4 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                // EDITTODO: uncomment
                onClick={editApprover}
              >
                Confirm
              </button>
              <button
                className="mx-2 mt-4 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                onClick={() => setShowPopUpEdit(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
