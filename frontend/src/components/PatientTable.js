import React from "react";
import API from "../api";

function PatientTable({ patients, loadPatients, setSelectedPatient }) {
  const handleEdit = (patient) => {
    console.log(patient);
    setSelectedPatient(patient);
  };

  const deletePatient = async (id) => {
    if (window.confirm("Delete Patient?")) {
      await API.delete(`/patients/${id}`);

      loadPatients();
    }
  };

  return (
    <table className="patient-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>DOB</th>
          <th>Email</th>
          <th>Glucose</th>
          <th>Haemoglobin</th>
          <th>Cholesterol</th>
          <th>Remarks</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {patients.map((patient) => (
          <tr key={patient._id}>
            <td>{patient.full_name}</td>
            <td>{patient.dob}</td>
            <td>{patient.email}</td>
            <td>{patient.glucose}</td>
            <td>{patient.haemoglobin}</td>
            <td>{patient.cholesterol}</td>
            <td>{patient.remarks}</td>

            <td>
              <button
                className="update-btn"
                onClick={() => handleEdit(patient)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => deletePatient(patient._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PatientTable;
