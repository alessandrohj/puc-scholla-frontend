import React, { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../components/global/header/Header";
import Dropdown from "../../components/global/input/Dropdown";
import UserContext from "../../components/scripts/UserContext";
import Input from "../../components/global/input/Input";
import ConfirmationModal from "../../components/global/confirmation/Confirmation";
import "./details.scss";

export default function SchoolDetails() {
  const { cookies } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [schoolDetails, setSchoolDetails] = useState({});
  const [deanOptions, setDeanOptions] = useState([]);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [schoolName, setSchoolName] = useState(searchParams.get("name"));
  const [newDean, setNewDean] = useState("");
  const [currentDean, setCurrentDean] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:3000"; //TODO: change to production url

  function getSchoolDetails() {
    const url = `${BASE_URL}/schools/admin/${id}`;
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
        setSchoolDetails(data);
        setCurrentDean({
          value: data.dean._id,
          label: `${data.dean.firstName} ${data.dean.lastName}`,
        });
      })
      .catch((err) => console.log(err));
  }

  function getDeanOptions() {
    const url = `${BASE_URL}/admin/users/dean`;
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
        const options = data.map((dean) => {
          return {
            value: dean._id,
            label: `${dean.firstName} ${dean.lastName}`,
            email: dean.email,
          };
        });
        setDeanOptions(options);
      })
      .catch((err) => console.log(err));
  }

  function handleDelete() {
    const url = `${BASE_URL}/admin/school/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.scholla}`,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then(({ data }) => {
        setIsDeleted(true);
        setIsEditing(false);
        setShowConfirmation(false);
      })
      .catch((err) => console.log(err));
  }

  function handleChange(ev) {
    const { name, value } = ev.target;
    if (name === "schoolName") {
      setSchoolName(value);
    } else if (name === "dean") {
      setNewDean(value);
    }
  }
  function handleSave() {
    console.log("saving");
    const url = `${BASE_URL}/admin/school/${id}`;
    const body = {
      name: schoolName,
      dean: newDean,
    };
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.scholla}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) return res.json();
      })
      .then(({ data }) => {
        console.log(data);
        setIsUpdated(true);
        setIsEditing(false);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getSchoolDetails();
      getDeanOptions();
    }
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className="school-details">
      <Header title={"Manage School"} section="newAssignment" />

      <div
        className="school-details__container"
        hidden={isUpdated || isDeleted}
      >
        <div className="school-details__container-view">
          <div className="school-details__container-view-item">
            <h4>School Name:</h4>
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
          </div>
          <div className="school-details__container-view-item">
            <h4>Dean:</h4>
            {!isEditing ? (
              <p>{currentDean.label}</p>
            ) : (
              <Dropdown
                options={deanOptions}
                placeholder="Select Dean"
                label={"Dean"}
                defaultValue={currentDean.label}
                onChange={handleChange}
                name="dean"
                hideLabelText={true}
              />
            )}
          </div>
        </div>
        <div className="school-details-buttons">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          ) : (
            <div className="school-details-buttons-save-cancel">
              <button
                className="school-details-buttons-cancel"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="school-details-buttons-save"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          )}
          <button
            className="school-details-buttons-delete"
            onClick={() => setShowConfirmation(true)}
          >
            Delete
          </button>
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationModal
          name={schoolName}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
      {isDeleted && (
        <div className="action-confirmation">
          <h2>Deleted</h2>
          <p>{schoolName} has been deleted</p>
          <button onClick={() => navigate("/schools")}>Back to Schools</button>
        </div>
      )}
      {isUpdated && (
        <div className="action-confirmation">
          <h2>Updated</h2>
          <p>{schoolName} has been updated</p>
          <button onClick={() => navigate("/schools")}>Back to Schools</button>
        </div>
      )}
    </div>
  );
}
