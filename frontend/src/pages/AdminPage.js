import React, { useEffect, useState } from "react";
import ApproveList from "../components/ApproveList";
import ApproversForm from "../components/ApproversForm";
var sortBy = require('sort-by');

export default function ManageAcc() {
    const [advisers, setAdvisers] = useState([])
    const [cos, setCOs] = useState([])
    const [sortState, setSortState] = useState("none");
    
    useEffect(() => {
        fetch("http://localhost:3001/get-advisers")
            .then((response) => response.json())
            .then((body) => {
                if (!body.success) {
                    setAdvisers(body);
                }
            });

        fetch("http://localhost:3001/get-cos")
            .then((response) => response.json())
            .then((body) => {
                if (!body.success) {
                    setCOs(body);
                }
            });
    }, []);


    function deleteHandler(id) {
        setAdvisers(prevAdvisers => prevAdvisers.filter(adviser => adviser._id !== id));
        setCOs(prevCOs => prevCOs.filter(co => co._id !== id));
    }

    function sortAdvisers(e) {
        if (e.target.value === 'adviser-ascending') {
            advisers.sort((sortBy('fname')));
        } else if (e.target.value === 'adviser-descending') {
            advisers.sort((sortBy('-fname')));
        }
    }

    function sortCO(e) {
        if (e.target.value === 'co-ascending') {
            cos.sort((sortBy('fname')));
        } else if (e.target.value === 'co-descending') {
            cos.sort((sortBy('-fname')));
        }
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
                    <select defaultValue={'DEFAULT'} onChange={(e) => {
                        sortAdvisers(e)
                        setSortState(e.target.value)
                    }}>
                        <option value="DEFAULT" disabled>Sort By</option>
                        <option value="adviser-ascending">Ascending</option>
                        <option value="adviser-descending">Descending</option>
                    </select>
                    {
                        advisers.map((adviser, i) => 
                            <ApproveList class="" approver={adviser} onDelete={deleteHandler}/>
                        )
                    }
                    <h3 class="font-extrabold flex text-3xl" mt-10>Clearance Officers</h3>
                    <select defaultValue={'DEFAULT'} onChange={(e) => {
                        sortCO(e)
                        setSortState(e.target.value)
                    }}>
                        <option value="DEFAULT" disabled>Sort By</option>
                        <option value="co-ascending">Ascending</option>
                        <option value="co-descending">Descending</option>
                    </select> 
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
  