import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  const roles = ["Student", "Teacher", "Parent"];

  const rotate = {
    transform: "rotate(180deg)",
    transition: "transform 0.5s ease-in-out",
  };
  const rotate2 = {
    transform: "rotate(0deg)",
    transition: "transform 0.5s ease-in-out",
  };

  const getSchoolList = () => {
    const url = "http://localhost:3000/schools/" + searchValue;
    // TODO: replace to deployment URL
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSchoolList(data.data);
        setIsSchoolDropdownOpen(true);
      });
  };

  const chooseSchool = (name) => {
    setSchoolName(name);
    setIsSchoolDropdownOpen(false);
    setSearchValue(name);
    setHasSearched(true);
  };

  useEffect(() => {
    searchValue !== schoolName ? setHasSearched(false) : setHasSearched(true);

    if (searchValue.length > 0 && !hasSearched) {
      // setHasSearched(false)
      const timer = setTimeout(() => {
        getSchoolList();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [searchValue]);

  return (
    <div className="signup" onClick={() => setIsSchoolDropdownOpen(false)}>
      <h1 className="signup-title">Welcome to Scholla</h1>
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
                    onClick={() => chooseSchool(school.name)}
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
        <div className="signup-additional-fields">
        <input
            className="signup-additional-fields-details"
            placeholder="Student Number/ID"
            type="text"
          />
          <input
            className="signup-additional-fields-details"
            placeholder="Email"
            type="email"
          />
          <div className="signup-additional-fields-password">
          <input
            className="signup-additional-fields-password"
            placeholder="Password"
            type="text"
          />
            <input
            className="signup-additional-fields-password"
            placeholder="Confirm Password"
            type="text"
          />
          </div>
          </div>
      <div className="signup-buttons-container">
        <Link to={"/"} className="signup-button">
          <Button
            className="signup-buttons-individual"
            title={"Cancel"}
            font={"white"}
            background={colors.red}
          />
        </Link>
        <Link to={"/"} className="signup-button">
          <Button
            className="signup-buttons-individual"
            title={"Sign Up"}
            font={"white"}
            background={colors.blue}
          />
        </Link>
      </div>
    </div>
  );
}
