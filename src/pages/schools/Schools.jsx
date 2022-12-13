import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/global/header/Header";
import Input from "../../components/global/input/Input";
import UserContext from "../../components/scripts/UserContext";
import "./schools.scss";

export default function Schools() {
  const { cookies } = useContext(UserContext);
  const [addedSchool, setAddedSchool] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [closeAutoComplete, setCloseAutoComplete] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [schoolQuery, setSchoolQuery] = useState("");
  const [schoolList, setSchoolList] = useState([]);
  const [filteredSchoolList, setFilteredSchoolList] = useState([]);
  const [deansList, setDeansList] = useState([]);
  const [newDean, setNewDean] = useState("");

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
        setFilteredSchoolList(schools);
      })
      .catch((err) => console.log(err));
  }

  function handleChange(ev) {
    const { name, value } = ev.target;
    if (name === "schoolName") {
      setSchoolName(value);
    } else if (name === "search") {
      setSchoolQuery(value);
      if (schoolQuery.trim() === "") {
        setFilteredSchoolList(schoolList);
        return;
      } else {
        const tempFilteredSchools = schoolList.filter((school) => {
          return school.label.toLowerCase().includes(schoolQuery.toLowerCase());
        });
        setFilteredSchoolList(tempFilteredSchools);
      }
    }
  }

  function addSchool() {
    const url = `${BASE_URL}/admin/school`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.scholla}`,
      },
      body: JSON.stringify({
        name: schoolName,
        dean: newDean.value,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        console.log(data);
        setAddedSchool(true);
      })
      .catch((err) => console.log(err));
  }

  function findUser(name) {
    const url = `${BASE_URL}/admin/users/role/dean/${name}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.scholla}`,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then(({ data }) => {
        console.log(data);
        const deans = data.map((dean) => {
          return {
            value: dean._id,
            firstName: dean.firstName,
            lastName: dean.lastName,
            label: `${dean.firstName} ${dean.lastName}`,
          };
        });
        setDeansList(deans);
      })
      .catch((err) => console.log(err));
  }

  function handleGetDeans(ev) {
    const name = ev.target.value;
    setSearchQuery(name);
    if (searchQuery.length < 2) {
      return;
    }
    setCloseAutoComplete(false);

    setTimeout(() => {
      findUser(searchQuery);
    }, 200);

    return () => {
      clearTimeout();
    };
  }

  function selectDean(ev) {
    const dean = deansList.find((dean) => dean.value === ev.target.id);
    setNewDean(dean);
    setSearchQuery(`${dean.firstName} ${dean.lastName}`);
    setCloseAutoComplete(true);
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
                name={"search"}
                value={schoolQuery}
                className="schools-container-list-header__search-input"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="schools-container-list__search-content">
            {filteredSchoolList.length > 0 ? (
              filteredSchoolList.map((school, index) => {
                return (
                  <h4 key={index} id={school.value}>
                    {school.label}
                  </h4>
                );
              })
            ) : (
              <h4>No results found</h4>
            )}
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
                    value={schoolName}
                    className={"schools-add-form-inputs__school-name"}
                    onChange={handleChange}
                  />
                  <div className="schools-add-form-inputs__dean">
                    <Input
                      type="text"
                      id={"deanName"}
                      name={"deanName"}
                      value={searchQuery}
                      placeholder="Dean"
                      onChange={handleGetDeans}
                    />
                    <div
                      className="schools-add-form-inputs__dean-autocomplete"
                      hidden={!deansList || !searchQuery || closeAutoComplete}
                    >
                      {deansList &&
                        searchQuery &&
                        deansList.map((dean, index) => {
                          return (
                            <p key={index} id={dean.value} onClick={selectDean}>
                              {dean.label}
                            </p>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <button
                  className={
                    "schools-add-form__add-button" +
                    (!schoolName || !newDean ? " disabled" : "active")
                  }
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
