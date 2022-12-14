import React from "react";
import { useContext, useEffect } from "react";
import UserContext from "../../components/scripts/UserContext";
import Header from "../../components/global/header/Header";
import { useNavigate } from "react-router-dom";
import "./home.scss";

export default function Home() {
  const { setUser, user, cookies, removeCookie, setRole, BASE_URL } =
    useContext(UserContext);

  const navigate = useNavigate();

  const getUserData = () => {
    const url = BASE_URL + "/auth/users/me";
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
      })
      .catch((err) => {
        console.log(err);
        removeCookie("scholla");
        navigate("/");
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
