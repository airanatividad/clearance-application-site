import React, { useEffect, useState } from "react";

export default function ClearanceForm(props) {
    const { adviser, email } = props;

    const [link, setLink] = useState('')
    const [remark, setRemark] = useState('')

    function addApplication(e)  {        
        if (link.trim().length !== 0) {
            fetch("http://localhost:3001/add-application", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            //input in body
            body: JSON.stringify({ email: email, remark: remark, commenter: email, link: link }) //serialize to string. it's an object
            }) //called chaining
            .then(response => response.json()) //this returns the response in json
            .then(body => { //we will use the return from the previous then here !
                if (body.success) { //if true
                    alert("Subject was successfully saved")
                    setLink('')
                    setRemark('')
                } else {
                    alert("Failure to save subject")
                    setLink('')
                    setRemark('')
                }//if successful or not
            })
        } else {
            alert("Please input your Github link")
        }
    } 

    return (
        <>
        <div class="container w-[70%] h-min bg-100-charcoal p-2 rounded-lg flex justify-center">
            <div class="flex flex-row text-white content-center justify-start">
                <div class="flex flex-col">
                    <div class="p-2">
                        <h1>Adviser</h1>
                        <p class="font-bold">{adviser.fname} {adviser.mname} {adviser.lname}</p>
                    </div>
                    <div class="flex flex-row items-center">
                        <div class="p-2">
                            <h1>
                                Github Link
                            </h1>
                            <input placeholder="Github Link Here." class="p-2 m-2 rounded-md text-100-charcoal" value={link} onChange={(e) => setLink(e.target.value)}/>
                        </div>
                        <div class="p-2">
                            <h1>
                                Remarks
                            </h1>
                            <input placeholder="Insert Remarks Here." class="p-2 m-2 rounded-md text-100-charcoal" value={remark} onChange={(e) => setRemark(e.target.value)}/>
                        </div>                    
                    </div>  
                    <button
                        className=" ml-3 mb-1 rounded bg-100-payne px-4 py-2 text-white hover:bg-black"
                        onClick={addApplication}
                    >
                        Submit
                    </button>                  
                </div>


            </div>

        </div>
        </>
    );
}
