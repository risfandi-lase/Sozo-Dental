import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import AddPatientModal from "./AddPatientModal";

function ActiveTreatment() {
  const [patients, setPatients] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patients");
        setPatients(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };


useEffect(() => {
    fetchPatients();
  }, []);


    const handleDelete = async (patientId) => {
    if (!window.confirm("Are you sure you want to delete this Patient?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/api/patients/${patientId}`);
      fetchPatients();
    } catch (err) {
      console.error(err.message);
      alert("Failed to delete product.");
    }
  };


  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPatients(patients.map((patient) => patient.id));
    } else {
      setSelectedPatients([]);
    }
  };

  const handleSelectPatient = (id) => {
    if (selectedPatients.includes(id)) {
      setSelectedPatients(
        selectedPatients.filter((patientId) => patientId !== id)
      );
    } else {
      setSelectedPatients([...selectedPatients, id]);
    }
  };

  const handlePatientAdded = (newPatient) => {
    setPatients((prevPatients) => [...prevPatients, newPatient]);
  };

  const renderPatientImage = (patient) => {
    // If patient has an image
    if (patient.image) {
      // Check if the image already includes the data:image prefix
      const imageSrc = patient.image.startsWith("data:image")
        ? patient.image
        : `data:image/jpeg;base64,${patient.image}`;

      return (
        <img
          src={imageSrc}
          alt={patient.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              patient.name
            )}&size=48&background=random`;
          }}
        />
      );
    } else {
      // Default avatar if no image
      return (
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            patient.name
          )}&size=48&background=random`}
          alt={patient.name}
          className="w-full h-full object-cover"
        />
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="h-full flex flex-col font-figtree">
      {/* Controls section - Fixed at top */}
      <div className="flex items-center justify-between px-16 py-4 flex-shrink-0 bg-white">
        {/* Left side - Patient count */}
        <div className="flex items-center">
          <div>
            <Icon
              icon="uim:user-md"
              width="48"
              height="48"
              style={{ color: "#bbb" }}
            />
          </div>
          <p>
            <span className="text-3xl ml-2">{patients.length}</span> total
            patients
          </p>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center gap-8">
          {/* Search input */}
          <div>
            <label className="input">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" required placeholder="Search for patient" />
            </label>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center ">
            <span className="font-outfit text-sm items-center">Order by:</span>
            <select className="select select-bordered h-10 select-sm font-outfit">
              <option value="dateAdded">Recently Added</option>
              <option value="name">Name</option>
              <option value="lasttreatment">Last Treatment</option>
            </select>
          </div>

          {/* Add button */}
          <button className="btn btn-primary" onClick={openModal}>
            <Icon
              icon="mingcute:add-fill"
              width="18"
              style={{ color: "#fff" }}
            />
            Add Patients
          </button>
        </div>
      </div>

      {/* Table container - Scrollable */}
      <div className="flex-1 overflow-auto px-16">
        <table className="table">
          {/* head */}
          <thead className="bg-base-300 sticky top-0 z-10">
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      selectedPatients.length === patients.length &&
                      patients.length > 0
                    }
                  />
                </label>
              </th>
              <th>Patient Name</th>
              <th>WhatsApp</th>
              <th>Address</th>
              <th>Registered</th>
              <th>Last Visit</th>
              <th>Last Treatment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedPatients.includes(patient.id)}
                      onChange={() => handleSelectPatient(patient.id)}
                    />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-circle w-12 h-12">
                        {renderPatientImage(patient)}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{patient.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {patient.whatsapp}
                  <br />
                </td>
                <td>{patient.addres}</td>
                <td>{patient.registered}</td>
                <td>{patient.last_visit}</td>
                <td>{patient.last_treatment}</td>
                <td className="flex gap-2">
                  <button className="btn btn-primary text-xs">Edit</button>
                  <button className="btn btn-secondary text-xs" onClick={() => handleDelete(patient.id)}>Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddPatientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onPatientAdded={handlePatientAdded}
      />
    </div>
  );
}

export default ActiveTreatment;
