import React from "react";
import DrawerButton from "./SideButton";

export default function SideBar() {
    return (
        <>
            <div class="flex">
                <aside class="absolute h-screen w-60 sticky left-0 bg-100-charcoal">
                    <div class="flex flex-col items-center text-white mt-10">
                        {/* user details */}
                            <div class="flex w-20 h-20 rounded-full bg-black m-3">
                                {/* <img class="rounded-full w-20 h-20" src="userimage.jpg" alt="image description">
                                </img> */}
                            </div>
                            <h1 class="font-extrabold self-center text-lg text-white">
                                KAEYA
                            </h1>
                            <p class="pb-3">
                                kalberich@up.edu.ph
                            </p>                            
                        {/* buttons */}
                        <div>
                            <DrawerButton/>
                            <DrawerButton/>
                            <DrawerButton/>
                        </div>                        
                    </div>
                </aside>
            </div>
        </>
    );
}
