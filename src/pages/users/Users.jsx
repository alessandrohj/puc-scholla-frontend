import React, { useState, useContext } from "react";
import Header from "../../components/global/header/Header";
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
              <input
                type="text"
                placeholder="First Name"
                className="users-container-add-form-inputs__first-name"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="users-container-add-form-inputs__last-name"
              />
              <input
                type="text"
                placeholder="Email"
                className="users-container-add-form-inputs__email"
              />
              <input
                type="text"
                placeholder="Password"
                className="users-container-add-form-inputs__password"
              />
              <input
                type="text"
                placeholder="Confirm Password"
                className="users-container-add-form-inputs__confirm-pass"
              />
              <div className="users-container-add-form-inputs__role">
                <label htmlFor="role">Role</label>
                <select name="role" id="role">
                  <option value="admin">Admin</option>
                  <option value="teacher">Dean</option>
                  <option value="student">Super</option>
                </select>
              </div>
              <div className="users-container-add-form-inputs__school">
                <label htmlFor="school">School</label>
                <select name="school" id="school">
                  {schools ? (
                    schools.map((school) => {
                      return <option value={school.id}>{school.name}</option>;
                    })
                  ) : (
                    <option value="">No Schools</option>
                  )}
                </select>
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
