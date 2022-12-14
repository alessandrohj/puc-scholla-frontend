import React from "react";
import "./profile.scss";
import Header from "../../components/global/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import UserContext from "../../components/scripts/UserContext";

export default function Profile() {
  const { removeCookie, setRole, role } = useContext(UserContext);

  return (
    <div className="profile">
      <Header title="Your Profile" section="profile" />
      <div className="profile-details">
        <div className="profile-details__name">
          <div className="inner-content">
            <h3>First Name</h3>
            <p>John</p>
          </div>
          <div className="inner-content">
            <h3>Last Name</h3>
            <p>Doe</p>
          </div>
        </div>
        <div className="profile-details__email">
          <h3>Email</h3>
          <p>test</p>
        </div>
        <div className="profile-details__school">
          <h3>School</h3>
          <div className="inner-content">
            <p>Student</p>
            <p>@</p>
            <p>Test School</p>
          </div>
        </div>
        <div className="profile-details__password">
          <div>
            <h3>Password</h3>
            <p>********</p>
          </div>
          <div>
            <h3>Confirm Password</h3>
            <p>********</p>
          </div>
        </div>
        <div className="profile-details__buttons">
          <button>Edit</button>
          <button
            onClick={() => {
              removeCookie("token");
              setRole("");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
