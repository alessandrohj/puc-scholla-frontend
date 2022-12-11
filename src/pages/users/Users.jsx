import React, { useState, useContext } from "react";
import { useEffect } from "react";
import Header from "../../components/global/header/Header";
import Dropdown from "../../components/global/input/Dropdown";
import Input from "../../components/global/input/Input";
import validateField from "../../components/scripts/validateSignUp.js";
import UserContext from "../../components/scripts/UserContext";
import "./users.scss";

export default function Users() {
  const { cookies } = useContext(UserContext);
  const [schools, setSchools] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("");
  const [newUserSchool, setNewUserSchool] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = "http://localhost:3000"; //TODO: change to production url
  const getSchoolList = () => {
    fetch(`${BASE_URL}/schools/list`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then(({ data }) => {
        const schoolList = data.map((school) => {
          return { value: school._id, label: school.name };
        });
        setSchools(schoolList);
      })
      .catch((err) => console.log(err));
  };

  const createAccount = () => {
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      role: newUserRole.label,
      school: newUserSchool,
    };

    const url = BASE_URL + "/admin/users";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.scholla}`,
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        console.log(data);
        setAccountCreated(true);
        setIsLoading(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setNewUserRole("");
        setNewUserSchool("");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    switch (name) {
      case "firstName":
        if (validateField("name", value)) {
          setFirstName(value);
        }
        break;
      case "lastName":
        if (validateField("name", value)) {
          setLastName(value);
        }
        break;
      case "email":
        if (validateField("email", value)) {
          setEmail(value);
        }
        break;
      case "password":
        if (validateField("password", value)) {
          setPassword(value);
        }
        break;
      case "confirmPassword":
        if (password === value) {
          setConfirmPassword(value);
        }
        break;
      case "newUserRole":
        setNewUserRole({ value: value, label: value });
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
    createAccount();
    console.log("submitted");
  }

  return (
    <div className="users">
      <Header title="Manage Users" section="newAssignment" />
      <div className="users-container">
        {!accountCreated ? (
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
                  className={
                    "users-container-add-form-inputs__confirm-password"
                  }
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
        ) : (
          <div className="users-container-add">
            <h3>Account Created</h3>
            <button onClick={() => setAccountCreated(false)}>OK</button>
          </div>
        )}
      </div>
    </div>
  );
}
