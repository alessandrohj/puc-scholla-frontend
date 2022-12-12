import React from "react";
import Header from "../../components/global/header/Header";
import Input from "../../components/global/input/Input";
import "./schools.scss";

export default function Schools() {
  function handleSearch() {
    console.log("searching");
  }

  function handleChange() {
    console.log("changing");
  }

  return (
    <div className="schools">
      <Header title="Manage Schools" section="newAssignment" />
      <div className="schools-container">
        <div className="schools-container-list">
          <div className="schools-container-list-header">
            <h3>Schools</h3>
            <div className="schools-container-list-header__search">
              <Input
                type="text"
                placeholder="Search"
                className="schools-container-list-header__search-input"
                onChange={handleSearch}
              />
              <div className="schools-container-list-header__search-content">
                <p>List of schools</p>
              </div>
            </div>
          </div>
          <div className="schools-add">
            <h3>Add New School</h3>
            <div className="schools-add-form">
              <div className="schools-add-form-inputs">
                <Input
                  type="text"
                  placeholder="School Name"
                  id={"schoolName"}
                  name={"schoolName"}
                  className={"schools-add-form-inputs__school-name"}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  id={"deanName"}
                  name={"deanName"}
                  placeholder="Dean"
                  className={"schools-add-form-inputs__dean"}
                  onChange={handleChange}
                />
              </div>
              <button className="schools-add-form__add-button">
                Add School
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
