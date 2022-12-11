import React from "react";
import { useContext, useEffect } from "react";
import UserContext from "../../components/scripts/UserContext";
import Header from "../../components/global/header/Header";
import { Navigate } from "react-router-dom";
import "./home.scss";

export default function Home() {
  const { setUser, user, cookies, removeCookie, setRole } =
    useContext(UserContext);

  const getUserData = () => {
    // const url = "https://puc-scholla-backend-production.up.railway.app/auth/users/me";
    const url = "http://localhost:3000/auth/users/me"; //TODO: change to production url
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.scholla}`,
      },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setUser(data);
        setRole(data.role);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        removeCookie("scholla");
        Navigate("/");
      });
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getUserData();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="home">
      {user && (
        <Header title={`Welcome, ${user.firstName}`} section="welcome" />
      )}
    </div>
  );
}
