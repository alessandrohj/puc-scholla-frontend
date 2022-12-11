import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/global/header/Header";
import "./details.scss";

export default function Details(props) {
  const [isEditing, setIsEditing] = useState(false);
  const { email } = useParams();
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    console.log(email);
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="details">
      <Header title="Manage" section="newAssignment" />
      <div className="details__container">
        {isEditing ? (
          <div className="details__container__edit">
            <p>Editing</p>
          </div>
        ) : (
          <div className="details__container__view">
            <p>Viewing</p>
          </div>
        )}
      </div>
      <div className="details-buttons">
        {isEditing ? (
          <button className="details-buttons__edit" onClick={toggleEdit}>
            Edit
          </button>
        ) : (
          <button className="details-buttons__cancel" onClick={toggleEdit}>
            Cancel
          </button>
        )}
        <button className="details-buttons__delete">Delete</button>
      </div>
    </div>
  );
}
