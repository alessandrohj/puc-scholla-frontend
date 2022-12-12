import React from "react";
import "./confirmation.scss";

export default function ConfirmationModal({ name, onConfirm, onCancel }) {
  return (
    <div className="confirmation">
      <div className="confirmation__overlay">
        <h3>Are you sure you want to delete {name} ?</h3>
        <div className="confirmation-buttons">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}
