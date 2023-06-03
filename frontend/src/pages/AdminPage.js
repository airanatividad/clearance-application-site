import React, { useEffect, useState } from "react";
import ApproveList from "../components/ApproveList";
import ApproversForm from "../components/ApproversForm";

export default function ManageAcc() {
    const [advisers, setAdvisers] = useState([])
    const [cos, setCOs] = useState([])
    
    useEffect(() => {
        fetch("http://localhost:3001/get-advisers")
            .then((response) => response.json())
            .then((body) => {
            setAdvisers(body);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:3001/get-cos")
            .then((response) => response.json())
            .then((body) => {
                setCOs(body);
            });
    }, []);

    function deleteHandler(id) {
        setAdvisers(prevAdvisers => prevAdvisers.filter(adviser => adviser._id !== id));
        setCOs(prevCOs => prevCOs.filter(co => co._id !== id));
    }

    return (
        <>
            <div class="w-[100%] flex flex-col">
                <div class="flex justify-center container container mx-auto">
                    <h1 class="font-extrabold flex text-4xl mt-20">
                        Manage Approvers
                    </h1>
                </div>
                <div class="flex flex-col items-center p-5 place-content-center">
                    <ApproversForm class="" />
                </div>  
                <div class="flex flex-col items-center place-content-center">
                    <h3 class="font-extrabold flex text-3xl">Advisers</h3>
                    {
                        advisers.map((adviser, i) => 
                            <ApproveList class="" approver={adviser} onDelete={deleteHandler}/>
                        )
                    }
                    <h3 class="font-extrabold flex text-3xl" mt-10>Clearance Officers</h3>
                    {
                        cos.map((co, i) => 
                            <ApproveList class="" approver={co} onDelete={deleteHandler}/>
                        )
                    }
                </div>  
            </div>                 
        </>

    );
}
  