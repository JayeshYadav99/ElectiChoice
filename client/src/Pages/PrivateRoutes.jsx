import React from 'react'
import { Outlet,useLocation } from 'react-router-dom';
import Cookies from "universal-cookie";

export default function PrivateRoutes() {
  console.log("Hello");
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  if (token) {
console.log("loggedin");
    return <Outlet />;
  } else {
    // sets the location a user was about to access before being redirected to login
  const location = useLocation();
  console.log("notloggedin");

    return (
      <div>
        <p>You need to log in to access this page.</p>
        <Link to={{ pathname: "/Login", state: { from: location } }}>
          Go to Login
        </Link>
      </div>
    );
}
}
