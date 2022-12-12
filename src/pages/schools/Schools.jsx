import React, { useState, useEffect } from "react";
import Header from "../../components/global/header/Header";
import Input from "../../components/global/input/Input";
import "./schools.scss";

export default function Schools() {
  const [addedSchool, setAddedSchool] = useState(false);
  const [schoolList, setSchoolList] = useState([]);

  const BASE_URL = "http://localhost:3000"; //TODO: change to production url

  function getSchoolList() {
    const url = `${BASE_URL}/schools/list`;
    fetch(url)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then(({ data }) => {
        console.log(data);
        const schools = data.map((school) => {
          return { value: school._id, label: school.name };
        });
        setSchoolList(schools);
      })
      .catch((err) => console.log(err));
  }

  function handleSearch() {
    console.log("searching");
  }

  function handleChange() {
    console.log("changing");
  }

  function addSchool() {
    setAddedSchool(true);
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getSchoolList();
    }
    return () => {
      isMounted = false;
    };
  }, []);

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
            </div>
          </div>
          <div className="schools-container-list__search-content">
            {schoolList &&
              schoolList.map((school, index) => {
                return (
                  <h4 key={index} id={school.value}>
                    {school.label}
                  </h4>
                );
              })}
          </div>
          {!addedSchool ? (
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
                <button
                  className="schools-add-form__add-button"
                  onClick={addSchool}
                >
                  Add School
                </button>
              </div>
            </div>
          ) : (
            <div className="schools-added">
              <h3>School Added</h3>
              <div className="schools-added__content">
                <p>School has been added successfully.</p>
                <div className="schools-added__content-buttons">
                  <button
                    className="schools-added__content-buttons__confirmation"
                    onClick={() => setAddedSchool(false)}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
