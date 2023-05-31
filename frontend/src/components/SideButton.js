import React from "react";

export default function DrawerButton() {
    return (
        <>
            <button            
            class="flex flex-none flex-col rounded-md bg-100-payne pt-3 shadow shadow-p-dblue/50 hover:bg-black h-16 w-60 m-1"
            // onClick={() => setShowRooms(true)}
            >
                <label class="bold self-start text-lg text-white mt-1 ml-5">
                    Name of Button
                </label>

            </button>
        </>
    );
}
