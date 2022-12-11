import React, { useState, useContext } from "react";
import { useEffect } from "react";
import Header from "../../components/global/header/Header";
import Dropdown from "../../components/global/input/Dropdown";
import Input from "../../components/global/input/Input";
import validateField from "../../components/scripts/validateSignUp.js";
import UserContext from "../../components/scripts/UserContext";
import "./users.scss";

export default function Users() {
  const { role } = useContext(UserContext);
  const [schools, setSchools] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("");
  const [newUserSchool, setNewUserSchool] = useState("");
  const [isValid, setIsValid] = useState(false);

  const getSchoolList = () => {
    const BASE_URL = "http://localhost:3000"; //TODO: change to production url
    fetch(`${BASE_URL}/schools/list`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then(({ data }) => {
        const schoolList = data.map((school) => {
          return { value: school.id, label: school.name };
        });
        setSchools(schoolList);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    switch (name) {
      case "firstName":
        if (validateField("name", value)) {
          console.log("name is valid");
          setFirstName(value);
        }
        break;
      case "lastName":
        if (validateField("name", value)) {
          console.log("last name is valid");
          setLastName(value);
        }
        break;
      case "email":
        if (validateField("email", value)) {
          console.log("email is valid");
          setEmail(value);
        }
        break;
      case "password":
        if (validateField("password", value)) {
          console.log("password is valid");
          setPassword(value);
        }
        break;
      case "confirmPassword":
        if (password === value) {
          console.log("passwords match");
          setConfirmPassword(value);
        }
        break;
      case "newUserRole":
        setNewUserRole(value);
        break;
      case "newUserSchool":
        setNewUserSchool(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let isLoading = true;
    if (isLoading) {
      getSchoolList();
    }
    return () => {
      isLoading = false;
    };
  }, []);

  useEffect(() => {
    if (
      firstName &&
      lastName &&
      email &&
      password &&
      confirmPassword &&
      newUserRole &&
      newUserSchool
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    newUserRole,
    newUserSchool,
  ]);

  function handleSubmit() {
    console.log("submitted");
  }

  return (
    <div className="users">
      <Header title="Manage Users" section="newAssignment" />
      <div className="users-container">
        <div className="users-container-add">
          <h3>Add New User</h3>
          <div className="users-container-add-form">
            <div className="users-container-add-form-inputs">
              <Input
                type="text"
                placeholder="First Name"
                id={"firstName"}
                name={"firstName"}
                className={"users-container-add-form-inputs__first-name"}
                onChange={handleChange}
              />
              <Input
                type="text"
                id={"lastName"}
                name={"lastName"}
                placeholder="Last Name"
                className={"users-container-add-form-inputs__last-name"}
                onChange={handleChange}
              />
              <Input
                type="email"
                id={"email"}
                name={"email"}
                placeholder="Email"
                className={"users-container-add-form-inputs__email"}
                containerStyle={{ width: "100%" }}
                style={{ width: "100%" }}
                onChange={handleChange}
              />
              <Input
                type="password"
                id={"password"}
                name={"password"}
                placeholder="Password"
                className={"users-container-add-form-inputs__password"}
                onChange={handleChange}
              />
              <Input
                type="password"
                id={"confirmPassword"}
                name={"confirmPassword"}
                placeholder="Confirm Password"
                onChange={handleChange}
                className={"users-container-add-form-inputs__confirm-password"}
              />
              <div className="users-container-add-form-inputs__dropdowns">
                <div className="users-container-add-form-inputs__role">
                  <Dropdown
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "dean", label: "Dean" },
                    ]}
                    label="Role"
                    name="newUserRole"
                    onChange={handleChange}
                  />
                </div>
                <div className="users-container-add-form-inputs__school">
                  <Dropdown
                    options={schools}
                    label="School"
                    name="newUserSchool"
                    noOption={"No schools"}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <button
              className={isValid ? "active" : "disabled"}
              onClick={handleSubmit}
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
