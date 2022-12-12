import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/global/header/Header";
import "./details.scss";
import UserContext from "../../components/scripts/UserContext";
import Input from "../../components/global/input/Input";
import Dropdown from "../../components/global/input/Dropdown";

export default function Details() {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const { email } = useParams();
  const { cookies } = useContext(UserContext);

  const BASE_URL = "http://localhost:3000"; //TODO: change to production url

  const getUserDetails = () => {
    const url = `${BASE_URL}/admin/users/details/${email}`;
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
        setDetails(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let isMounted = true;
    console.log(isEditing);
    if (isMounted) {
      getUserDetails();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    setUpdatedDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSave = () => {
    const url = `${BASE_URL}/admin/users/${email}`;
    if (details === updatedDetails) {
      setIsEditing(false);
      return;
    }
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.scholla}`,
      },
      body: JSON.stringify(updatedDetails),
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then(({ data }) => {
        setDetails(data);
        setIsEditing(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="details">
      <Header title="Manage" section="newAssignment" />
      <div className="details__container">
        <div className="details__container__view">
          {details && (
            <div className="details__container__view__info">
              <div className="details__container__view__info__details">
                <h4>Name</h4>
                {!isEditing ? (
                  <p>
                    {details.firstName} {details.lastName}
                  </p>
                ) : (
                  <div
                    className="details__container__view__info__details-edit"
                    key={"name"}
                  >
                    <Input
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      value={details.firstName}
                      onChange={handleChange}
                      name="firstName"
                      required={true}
                      className="input-field"
                    />
                    <Input
                      type="text"
                      id="lastName"
                      placeholder="Last Name"
                      value={details.lastName}
                      onChange={handleChange}
                      name="lastName"
                      required={true}
                      className="input-field"
                    />
                  </div>
                )}
              </div>
              <div className="details__container__view__info__details">
                <h4>Email</h4>
                {!isEditing ? (
                  <p>{details.email}</p>
                ) : (
                  <Input
                    type={"email"}
                    id={"email"}
                    placeholder={"Email"}
                    value={details.email}
                    onChange={handleChange}
                    name={"email"}
                    required={true}
                    className={"input-field"}
                  />
                )}
              </div>
              <div className="details__container__view__info__details">
                <h4>Role</h4>
                {!isEditing ? (
                  <p>{details.role}</p>
                ) : (
                  <Dropdown
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "dean", label: "Dean" },
                    ]}
                    name="role"
                    defaultValue={details.role}
                    onChange={handleChange}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="details-buttons">
        {!isEditing ? (
          <button
            className="details-buttons__edit"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        ) : (
          <button
            className="details-buttons__cancel"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        )}
        <button className="details-buttons__delete">Delete</button>
        <button
          className="details-buttons__delete"
          hidden={!isEditing}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
