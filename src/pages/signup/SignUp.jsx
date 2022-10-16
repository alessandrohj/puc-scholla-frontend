import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import IconExpand from "../../assets/icons/IconExpand";
import Button from "../../components/global/button/Button";
import "./signup.scss";
import colors from "../../components/global/styles/variables.module.scss";

export default function SignUp() {
  const [searchValue, setSearchValue] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [isSchoolDropdownOpen, setIsSchoolDropdownOpen] = useState(false);
  const [schoolList, setSchoolList] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRole, setSelectedRole] = useState("I am a...");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [isEverythingValid, setIsEverythingValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [schoolIdentifier, setSchoolIdentifier] = useState(null);
  const navigate = useNavigate();

  const roles = ["Student", "Teacher", "Parent"];

  const rotate = {
    transform: "rotate(180deg)",
    transition: "transform 0.5s ease-in-out",
  };
  const rotate2 = {
    transform: "rotate(0deg)",
    transition: "transform 0.5s ease-in-out",
  };

  const BASE_URL = "https://puc-scholla-backend-production.up.railway.app";

  const getSchoolList = () => {
    const url = BASE_URL + "/schools/" + searchValue;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSchoolList(data.data);
        setIsSchoolDropdownOpen(true);
      });
  };

  const chooseSchool = ({ name, _id }) => {
    setSchoolName(name);
    setSchoolIdentifier(_id);
    setIsSchoolDropdownOpen(false);
    setSearchValue(name);
    setHasSearched(true);
  };

  const validate = (item) => {
    const maxLength = 70;
    const minLength = 8;

    switch (item) {
      case "email":
        if (email.length >= minLength && email.length <= maxLength) {
          return true;
        } else {
          return false;
        }
      case "password":
        if (password.length >= minLength && password.length <= maxLength) {
          return true;
        } else {
          return false;
        }
      case "confirmPassword":
        if (password === confirmPassword) {
          return true;
        } else {
          return false;
        }
      case "schoolName":
        const schoolExists = schoolList.find(
          (school) => school.name === schoolName
        );
        if (schoolExists) {
          return true;
        } else {
          return false;
        }
    }
  };

  useEffect(() => {
    if (
      validate("email") &&
      validate("password") &&
      validate("confirmPassword") &&
      validate("schoolName") &&
      selectedRole !== "I am a..."
    ) {
      setIsEverythingValid(true);
    } else {
      setIsEverythingValid(false);
    }
  }, [email, password, confirmPassword, schoolName, selectedRole]);

  const createUser = () => {
    const url = BASE_URL + "/auth/users";
    const data = {
      email: email,
      password: password,
      school: schoolIdentifier,
      schoolId: id,
      role: selectedRole.toLowerCase(),
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "New user created") {
          return navigate("/");
        } else {
          setErrorMessage(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err);
      });
  };

  const handleSignUp = () => {
    if (isEverythingValid) {
      createUser();
      console.log("submitted");
    } else {
      setErrorMessage("Please fill out all fields correctly");
    }
  };

  useEffect(() => {
    searchValue !== schoolName ? setHasSearched(false) : setHasSearched(true);

    if (searchValue.length > 0 && !hasSearched) {
      const timer = setTimeout(() => {
        getSchoolList();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [searchValue]);

  return (
    <div className="signup" onClick={() => setIsSchoolDropdownOpen(false)}>
      <h1
        className={
          selectedRole !== "I am a..." && schoolName
            ? "signup-title-expanded"
            : "signup-title"
        }
      >
        Welcome to Scholla
      </h1>
      <div className="signup-input">
        <div className="signup-input-list">
          <input
            className="signup-school-input-field"
            placeholder="School Name"
            type="text"
            value={searchValue}
            onChange={(ev) => setSearchValue(ev.target.value)}
            onClick={() => setIsExpanded(false)}
          />
          <div className="signup-school-dropdown">
            {isSchoolDropdownOpen && (
              <hr className="signup-dropdown-divider"></hr>
            )}
            {schoolList.length > 0 &&
              searchValue.length > 0 &&
              isSchoolDropdownOpen &&
              schoolList.map((school, index) => {
                return (
                  <p
                    className="signup-school-dropdown-option"
                    key={index}
                    onClick={() => chooseSchool(school)}
                  >
                    {school.name}
                  </p>
                );
              })}
            {hasSearched && isSchoolDropdownOpen && schoolList.length === 0 && (
              <p>No results found</p>
            )}
          </div>
        </div>
        <div
          className="signup-input-container"
          onClick={() => (
            setIsExpanded(!isExpanded), setIsSchoolDropdownOpen(false)
          )}
        >
          <span
            className="signup-input-container-icon"
            style={isExpanded ? rotate : rotate2}
          >
            <IconExpand />
          </span>
          <div
            className={
              !isExpanded ? "signup-dropdown" : "signup-dropdown expanded"
            }
          >
            {!isExpanded ? (
              <p className="signup-dropdown-role-selected">{selectedRole}</p>
            ) : (
              <p className="signup-dropdown-role-expanded">I am a...</p>
            )}
            {isExpanded && (
              <div className="signup-dropdown-role-list">
                <hr className="signup-dropdown-divider"></hr>
                {roles.map((role, index) => (
                  <p
                    className="signup-dropdown-role-list-option"
                    key={index}
                    onClick={() => (
                      setSelectedRole(role), setIsExpanded(false)
                    )}
                  >
                    {role}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedRole !== "I am a..." && schoolName && (
        <div
          className="signup-additional-fields"
          onClick={() => setIsExpanded(false)}
        >
          <input
            className="signup-additional-fields-individual"
            placeholder="Student Number/ID"
            type="text"
            value={id}
            onChange={(ev) => setId(ev.target.value)}
            required
            onInvalid={(ev) =>
              ev.target.setCustomValidity(
                "Please enter your student number or your employee ID"
              )
            }
            onInput={(ev) => ev.target.setCustomValidity("")}
          />
          <input
            className="signup-additional-fields-individual"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
            onInvalid={(ev) => ev.target.setCustomValidity("Invalid email")}
          />
          <div className="signup-additional-fields-password">
            <input
              className="signup-additional-fields-individual"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              required
              onSubmit={(ev) => (ev.preventDefault(), console.log("submitted"))}
              onInvalid={(ev) =>
                ev.target.setCustomValidity(
                  "Password must be at least 8 characters long and contain at least one number and one letter."
                )
              }
              onInput={(ev) => ev.target.setCustomValidity("")}
            />
            <input
              className="signup-additional-fields-individual"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              required
              onInvalid={(ev) =>
                ev.target.setCustomValidity("Passwords must match.")
              }
              onInput={(ev) => ev.target.setCustomValidity("")}
            />
          </div>
        </div>
      )}
      {!isEverythingValid && errorMessage && <Error message={errorMessage} />}
      <div className="signup-buttons-container">
        <Link to={"/"} className="signup-button">
          <Button
            className="signup-buttons-individual"
            title={"Cancel"}
            font={"white"}
            background={colors.red}
          />
        </Link>
        {isEverythingValid === true ? (
          <div className="signup-button">
            <Button
              className="signup-buttons"
              title={"Sign Up"}
              background={colors.blue}
              handleCLick={handleSignUp}
            />
          </div>
        ) : (
          <div className="signup-button">
            <Button
              className="signup-buttons-individual-inactive"
              title={"Sign Up"}
              inactive
            />
          </div>
        )}
      </div>
    </div>
  );
}
