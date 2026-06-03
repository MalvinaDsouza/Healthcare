import { useState, useEffect } from "react";
import API from "./api";
import PatientForm from "./components/PatientForm";
import PatientTable from "./components/PatientTable";
import "./App.css";

function App() {
  const [patients, setPatients] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const loadPatients = async () => {
    const res = await API.get("/patients");
    setPatients(res.data);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1> Health Prediction System</h1>
      </div>

      <PatientForm
        loadPatients={loadPatients}
        selectedPatient={selectedPatient}
        setSelectedPatient={setSelectedPatient}
      />

      <button
        className="read-btn"
        onClick={() => {
          loadPatients();
          setShowTable(!showTable);
        }}
      >
        {showTable ? "Hide Patients" : "Read Patients"}
      </button>

      {showTable && (
        <div className="table-card">
          <PatientTable
            patients={patients}
            loadPatients={loadPatients}
            setSelectedPatient={setSelectedPatient}
          />
        </div>
      )}
    </div>
  );
}

export default App;
