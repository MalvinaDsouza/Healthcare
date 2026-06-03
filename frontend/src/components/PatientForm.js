import React, { useState, useEffect } from "react";
import API from "../api";

function PatientForm({ loadPatients, selectedPatient, setSelectedPatient }) {
  const [patient, setPatient] = useState({
    full_name: "",
    dob: "",
    email: "",
    glucose: "",
    haemoglobin: "",
    cholesterol: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [aiRemark, setAiRemark] = useState("");
  useEffect(() => {
    if (selectedPatient) {
      setPatient({
        full_name: selectedPatient.full_name || "",
        dob: selectedPatient.dob || "",
        email: selectedPatient.email || "",
        glucose: selectedPatient.glucose || "",
        haemoglobin: selectedPatient.haemoglobin || "",
        cholesterol: selectedPatient.cholesterol || "",
      });
    }
  }, [selectedPatient]);

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(patient.email)) {
      alert("Invalid Email");
      return false;
    }

    if (new Date(patient.dob) > new Date()) {
      alert("DOB cannot be future date");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (selectedPatient) {
        await API.put(`/patients/${selectedPatient._id}`, patient);

        alert("Patient Updated");
      } else {
        const response = await API.post("/patients", patient);
        console.log(response.data);
        setAiRemark(response.data.remarks);
        setShowModal(true);
      }

      await loadPatients();

      setPatient({
        full_name: "",
        dob: "",
        email: "",
        glucose: "",
        haemoglobin: "",
        cholesterol: "",
      });

      setSelectedPatient(null);
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  return (
    <>
      <form className="patient-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={patient.full_name}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="dob"
          value={patient.dob}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={patient.email}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="glucose"
          placeholder="Glucose"
          value={patient.glucose}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="haemoglobin"
          placeholder="Haemoglobin"
          value={patient.haemoglobin}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="cholesterol"
          placeholder="Cholesterol"
          value={patient.cholesterol}
          onChange={handleChange}
          required
        />

        <button className="save-btn" type="submit">
          {selectedPatient ? "Update Patient" : "Save Patient"}
        </button>
      </form>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>AI Health Check</h2>

            <p>{aiRemark}</p>

            <button className="close-btn" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PatientForm;
