import React, { useEffect, useState } from "react";
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import SideButton from "./SideButton";
import UserDetails from "./UserDetails";

export default function SideBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData());
  const navigate = useNavigate();

  useEffect(() => {
      fetch(`http://localhost:3001/get-user-by-email?email=${email}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
      })
      .catch(error => {
        console.error("Failed to fetch user details:", error);
      });
  }, [isLoggedIn, navigate]);


  const email = localStorage.getItem("email");
  const [user, setUser] = useState(null);

  // function logout() {
  //   const cookies = new Cookies();
  //   cookies.remove("authToken");

  //   localStorage.removeItem("username");
  //   localStorage.removeItem("email");

  //   setIsLoggedIn(false);
  //   window.location.reload();
  //   // navigate(`/login`);
  // }


  // useEffect(() => {
  //   // fetch user data
   
  // }, [email]);

  return (
    <>
      <div className="flex">
        <aside className="absolute h-screen w-60 sticky left-0 bg-100-charcoal">
          <UserDetails/>
          <div className="flex flex-col items-center text-white ">
            {/* buttons */}
            <div class="mt-5">
              <SideButton redirectLink="/homepage" label="Homepage" />
              {user?.usertype == 1 && (
              <SideButton redirectLink="/dashboard" label="Dashboard" />
              )
              }
              {user?.usertype == 2 && (
              <SideButton redirectLink="/manage/apps" label="Manage Applications" />
              )
              }
              {user?.usertype == 3 && (
              <SideButton redirectLink="/manage/apps" label="Manage Applications" />
              )
              }
              {user?.usertype == 4 && (
              <>
              <SideButton redirectLink="/manage/acc" label="Manage Approvers" />
              <SideButton redirectLink="/manage/stud" label="Student Account Approval" />
              </>
              )
              }

              {/* <SideButton label="Log Out" onClick={logout} /> */}

              {/* temporary log out button */}
              <button
                onClick={() => {
                  const cookies = new Cookies();
                  cookies.remove("authToken");
                
                  localStorage.removeItem("username");
                  localStorage.removeItem("email");
                
                  setIsLoggedIn(false);
                  window.location.reload();
                    // navigate(`/login`);
                }}
                
                className="flex flex-none flex-col rounded-md bg-100-payne pt-3 shadow shadow-p-dblue/50 hover:bg-black h-16 w-60 m-1"
              >
                <label class="bold self-start text-lg text-white mt-1 ml-5">
                    Log Out
                </label>
              </button>
            </div>
          </div>
        </aside>
        <Outlet />
      </div>
    </>
  );
}
