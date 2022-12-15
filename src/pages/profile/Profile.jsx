import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.scss";
import Header from "../../components/global/header/Header";
import Input from "../../components/global/input/Input";
import UserContext from "../../components/scripts/UserContext";

export default function Profile() {
  const { removeCookie, setRole, role, user, cookies, BASE_URL } =
    useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const navigate = useNavigate();

  function handleChange(ev) {
    const { name, value } = ev.target;

    if (name === "email") {
      console.log(value);
      setUserEmail(value);
    }
    if (name === "password") {
      setUserPassword(value);
    }
    if (name === "confirmPassword") {
      setUserConfirmPassword(value);
    }
  }

  function validateFields() {
    if (userPassword !== userConfirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    if (userPassword.length < 6 && userPassword !== "") {
      alert("Password must be at least 6 characters");
      return false;
    }
    if (userEmail === user.email && userPassword === "") {
      setIsEditing(false);
      return false;
    }
    setUpdatedDetails({
      ...user,
      email: userEmail,
      password: userPassword,
    });
    return true;
  }

  function handleSave() {
    if (!validateFields()) return;
    console.log("saving");
    console.log(updatedDetails);
    const url = `${BASE_URL}/auth/users/me`;
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.scholla}`,
      },
      body: JSON.stringify(updatedDetails),
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then(({ data }) => {
        setIsEditing(false);
        setShowConfirmation(true);
        setUserEmail(data.email);
        setUserPassword("");
        setUserConfirmPassword("");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="profile">
      <Header title="Your Profile" section="profile" />
      <div className="profile-details">
        <div className="profile-details__name">
          <h3>Name</h3>
          <p>
            {user.firstName} {user.lastName}
          </p>
        </div>
        <div className="profile-details__email">
          <h3>Email</h3>
          {!isEditing ? (
            <p>{user.email}</p>
          ) : (
            <Input
              type={"email"}
              id={"email"}
              placeholder={"Email"}
              value={userEmail}
              onChange={handleChange}
              name={"email"}
              className="input-field"
            />
          )}
        </div>
        <div className="profile-details__school">
          <h3>School</h3>
          <div className="inner-content">
            <p>{role}</p>
            <p>@</p>
            <p>Test School</p>
          </div>
        </div>
        <div className="profile-details__password">
          <div>
            <h3>Password</h3>
            {!isEditing ? (
              <p>********</p>
            ) : (
              <Input
                type={"password"}
                id={"password"}
                placeholder={"Password"}
                onChange={handleChange}
                name={"password"}
                className="input-field"
              />
            )}
          </div>
          <div>
            <h3>Confirm Password</h3>
            {!isEditing ? (
              <p>********</p>
            ) : (
              <Input
                type={"password"}
                id={"confirmPassword"}
                placeholder={"Confirm Password"}
                onChange={handleChange}
                name={"confirmPassword"}
                className="input-field"
              />
            )}
          </div>
        </div>
        <div className="profile-details__buttons" hidden={showConfirmation}>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          ) : (
            <div className="profile-details__buttons-save-cancel">
              <button onClick={handleSave}>Save</button>
              <button
                onClick={() => {
                  setUpdatedDetails(""), setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </div>
          )}
          <button
            onClick={() => {
              removeCookie("token");
              setRole("");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
      {showConfirmation && (
        <div className="action-confirmation">
          <h2>Updated</h2>
          <p>Your profile has been updated</p>
          <button onClick={() => setShowConfirmation(false)}>OK</button>
        </div>
      )}
    </div>
  );
}
