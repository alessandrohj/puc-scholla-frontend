import React, { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../../components/global/header/Header";
import Dropdown from "../../components/global/input/Dropdown";
import UserContext from "../../components/scripts/UserContext";
import "./details.scss";

export default function SchoolDetails() {
  const { cookies } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [deanOptions, setDeanOptions] = useState([]);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [schoolName, setSchoolName] = useState(searchParams.get("name"));
  const [dean, setDean] = useState(searchParams.get("dean"));

  const BASE_URL = "http://localhost:3000"; //TODO: change to production url

  function getSchoolDetails() {
    const url = `${BASE_URL}/schools/${id}`;
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
        setSchoolName(data.name);
      })
      .catch((err) => console.log(err));
  }

  function handleDelete() {
    console.log("delete");
  }

  function handleChange() {
    console.log("change");
  }
  function handleSave() {
    console.log("save");
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getSchoolDetails();
    }
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className="school-details">
      <Header title={"Manage School"} section="newAssignment" />

      <div className="school-details-container">
        <div className="school-details-container-view">
          <h4>School Name</h4>
          {!isEditing ? (
            <p>{schoolName}</p>
          ) : (
            <Input
              type="text"
              id="schoolName"
              placeholder="School Name"
              value={schoolName}
              onChange={handleChange}
              name="schoolName"
              required={true}
              className="input-field"
            />
          )}
          <h4>Dean</h4>
          {!isEditing ? (
            <p>{dean}</p>
          ) : (
            <Dropdown
              options={deanOptions}
              placeholder="Select Dean"
              onChange={handleChange}
              name="dean"
              value={dean}
            />
          )}
        </div>
        <div className="school-details-buttons">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          ) : (
            <div className="school-details-buttons-save-cancel">
              <button onClick={() => setIsEditing(false)}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </div>
          )}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
