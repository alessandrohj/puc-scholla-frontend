import React, { useState, useContext } from "react";
import Header from "../../components/global/header/Header";
import Dropdown from "../../components/global/input/Dropdown";
import Input from "../../components/global/input/Input";
import UserContext from "../../components/scripts/UserContext";
import "./users.scss";

export default function Users() {
  const { role } = useContext(UserContext);
  const [schools, setSchools] = useState([]);

  return (
    <div className="users">
      <Header title="Manage Users" section="newAssignment" />
      <div className="users-container">
        <div className="users-container-add">
          <h3>Add User</h3>
          <div className="users-container-add-form">
            <div className="users-container-add-form-inputs">
              <Input
                type="text"
                placeholder="First Name"
                className={"users-container-add-form-inputs__first-name"}
              />
              <Input
                type="text"
                placeholder="Last Name"
                className={"users-container-add-form-inputs__last-name"}
              />
              <Input
                type="email"
                placeholder="Email"
                className={"users-container-add-form-inputs__email"}
              />
              <Input
                type="password"
                placeholder="Password"
                className={"users-container-add-form-inputs__password"}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                className={"users-container-add-form-inputs__confirm-password"}
              />
              <div className="users-container-add-form-inputs__role">
                <Dropdown
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "dean", label: "Dean" },
                  ]}
                  label="Role"
                  name="role"
                />
              </div>
              <div className="users-container-add-form-inputs__school">
                <Dropdown
                  options={schools}
                  label="School"
                  name="school"
                  noOption={"No schools"}
                />
              </div>
            </div>
            <button>Add User</button>
          </div>
        </div>
        <div className="users-container-find">
          <h3>Find User</h3>
          <div className="users-container-header-inputs">
            <input type="text" placeholder="Enter name or email" />
            <button>Find User</button>
          </div>
        </div>
      </div>
    </div>
  );
}
