import React from "react";
import NavBar from "../components/NavBar";
import ClearanceForm from "../components/ClearanceForm";
import SideBar from "../components/SideBar";
import ApplicationList from "../components/ApplicationList";
import ApproversForm from "../components/ApproversForm";
import ApproveList from "../components/ApproveList";
import StudentsList from "../components/StudentsList";

export default function ManageStudents() {
    return (
        <>
        {/* nakacolumn navbar and baba */}
        <NavBar/>
        <div class="flex flex-row ">
            {/* nakacolumn title and component*/}
            <div class="w-[100%] flex flex-col">
                <div class="flex justify-center container container mx-auto">
                    <h1 class="font-extrabold flex text-4xl mt-20 mb-5">
                        Manage Students
                    </h1>
                </div>
                <div class="flex flex-col items-center place-content-center">
                    <StudentsList class="" />
                </div>  
            </div>            
        </div>


                
        </>

    );
}
  