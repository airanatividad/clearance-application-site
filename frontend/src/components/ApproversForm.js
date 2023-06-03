import React from "react";

export default function ApproversForm() {

    function addApprover(e) {
        e.preventDefault();
        const fname = document.getElementById("s-fname").value;
        const mname = document.getElementById("s-mname").value;
        const lname = document.getElementById("s-lname").value;
    
        const email = document.getElementById("s-email").value;
        const password = document.getElementById("s-password").value;
        
        // form validation 
        if (fname === "" || mname === "" || lname === "" || email === "" || password === "") {
          alert("Please enter all required fields.");
          return;
        }
    
        fetch("http://localhost:3001/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname: fname,
            mname: mname,
            lname: lname,
            email: email,
            password: password,
            status: "Approved",
            usertype: document.querySelector('input[name="approverType"]:checked').value

          }),
        })
          .then((response) => response.json())
          .then((body) => {
            if (body.success) {
              alert("Successfully created!");
    
              document.getElementById("s-fname").value = "";
              document.getElementById("s-mname").value = "";
              document.getElementById("s-lname").value = "";
              document.getElementById("s-email").value = "";
              document.getElementById("s-password").value = "";
            } else {
              alert("Approver creation failed");
            }
          });
      }

    return (
        <>
        {/* whole box */}
        <div class="container w-[70%] h-min bg-100-charcoal p-2 rounded-lg flex justify-center">
            <div class="flex flex-row text-white justify-center w-[100%]">
                <div class="flex flex-col">
                <form>
                    <div class="flex flex-row items-center">
                        <div class="p-2">
                            <h1>
                                First Name
                            </h1>
                            <input id="s-fname" placeholder="First Name" class="p-2 rounded-md text-100-charcoal"/>
                        </div>
                        <div class="p-2">
                            <h1>
                                Middle Name
                            </h1>
                            <input id="s-mname" placeholder="Middle Name" class="p-2 rounded-md text-100-charcoal"/>
                        </div>      
                        <div class="p-2">
                            <h1>
                                Last Name
                            </h1>
                            <input id="s-lname" placeholder="Last Name" class="p-2 rounded-md text-100-charcoal"/>
                        </div>              
                    </div>  
                    <div class="flex flex-row">
                        <div class="p-2">
                            <h1>
                                UP Mail
                            </h1>
                            <input id="s-email" placeholder="Email" class="w-[100%] p-2 rounded-md text-100-charcoal"/>
                        </div>
                        <div class="p-2">
                            <h1>
                                Password
                            </h1>
                            <input id="s-password" type="password" placeholder="Password" class="w-[100%] p-2 rounded-md text-100-charcoal"/>
                        </div>
                        <div class="p-2">
                            <h1>Approver type</h1>
                            <div class="flex p-2">
                                <label for="adviser" class="mr-3">
                                <input type="radio" id="adviser" name="approverType" value="2" checked />
                                Adviser
                                </label>
                                <label for="clearance-officer">
                                <input type="radio" id="clearance-officer" name="approverType" value="3" />
                                Clearance Officer
                                </label>
                            </div>
                        </div>

                    </div>
                    <div class="w-[100%] flex flex-row">
                        <button
                            className=" w-[50%] m-2 rounded bg-100-payne px-4 py-2 text-white hover:bg-black"
                            type="reset"
                        >
                            Reset
                        </button>     
                        <button
                            className="w-[50%] m-2 rounded bg-100-payne px-4 py-2 text-white hover:bg-black"
                            onClick={addApprover}
                        >
                            Submit
                        </button>    
                    </div>
                </form>
                </div>


            </div>

        </div>
        </>
    );
}
