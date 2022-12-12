import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/global/header/Header";
import "./details.scss";
import UserContext from "../../components/scripts/UserContext";
import Input from "../../components/global/input/Input";

export default function Details() {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState([]);
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
        console.log(data);
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

  const toggleEdit = (value) => {
    setIsEditing(value);
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    // setDetails((prev) => ({
    //     ...prev,
    //     [name]: value,
    //     }));
    console.log(name, value);
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
                  <Input
                    type={"text"}
                    id={"role"}
                    placeholder={"Role"}
                    value={details.role}
                    onChange={handleChange}
                    name={"role"}
                    required={true}
                    className={"input-field"}
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
        <button className="details-buttons__delete" hidden={!isEditing}>
          Save
        </button>
      </div>
    </div>
  );
}
