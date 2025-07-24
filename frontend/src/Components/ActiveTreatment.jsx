import { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import AddPatientModal from "./AddPatientModal";
import EditPatientModal from "./EditPatientModal";

function ActiveTreatment() {
  const [patients, setPatients] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPatient, setEditPatient] = useState(null);

  // New state for search and sort
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("dateAdded");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = () => setIsEditOpen(true);
  const closeEditModal = () => {
    setIsEditOpen(false);
    setEditPatient(null);
  };

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

  // Filtered and sorted patients using useMemo for performance
  const filteredAndSortedPatients = useMemo(() => {
    let filtered = patients;

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = patients.filter((patient) => {
        const name = patient.name?.toString().toLowerCase() || "";
        const whatsapp = patient.whatsapp?.toString().toLowerCase() || "";
        const address = patient.addres?.toString().toLowerCase() || "";
        const lastTreatment =
          patient.last_treatment?.toString().toLowerCase() || "";

        return (
          name.includes(searchLower) ||
          whatsapp.includes(searchLower) ||
          address.includes(searchLower) ||
          lastTreatment.includes(searchLower)
        );
      });
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);

        case "lasttreatment":
          // Sort by last_treatment date (assuming it's a date string)
          if (!a.last_treatment && !b.last_treatment) return 0;
          if (!a.last_treatment) return 1;
          if (!b.last_treatment) return -1;
          return new Date(b.last_treatment) - new Date(a.last_treatment);

        case "dateAdded":
        default:
          // Sort by registered date or id (most recent first)
          if (a.registered && b.registered) {
            return new Date(b.registered) - new Date(a.registered);
          }
          // Fallback to id if registered dates aren't available
          return b.id - a.id;
      }
    });

    return sorted;
  }, [patients, searchTerm, sortBy]);

  const handleDelete = async (patientId) => {
    if (!window.confirm("Are you sure you want to delete this Patient?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/api/patients/${patientId}`);
      fetchPatients();
    } catch (err) {
      console.error(err.message);
      alert("Failed to delete patient.");
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPatients(
        filteredAndSortedPatients.map((patient) => patient.id)
      );
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

  const handleEditPatient = (patient) => {
    setEditPatient(patient);
    openEditModal();
  };

  // Search handler
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Sort handler
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const renderPatientImage = (patient) => {
    if (patient.image) {
      const imageSrc = patient.image.startsWith("data:image")
        ? patient.image
        : `data:image/jpeg;base64,${patient.image}`;

      return (
        <img
          src={imageSrc}
          alt={patient.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              patient.name
            )}&size=48&background=random`;
          }}
        />
      );
    } else {
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
            <span className="text-3xl ml-2">
              {filteredAndSortedPatients.length}
            </span>
            {searchTerm ? ` of ${patients.length}` : ""} total patients
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
              <input
                type="search"
                placeholder="Search for patient"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </label>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center">
            <span className="font-outfit text-sm items-center">Order by:</span>
            <select
              className="select select-bordered h-10 select-sm font-outfit"
              value={sortBy}
              onChange={handleSortChange}
            >
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
        {filteredAndSortedPatients.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm
              ? `No patients found matching "${searchTerm}"`
              : "No patients found"}
          </div>
        ) : (
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
                        selectedPatients.length ===
                          filteredAndSortedPatients.length &&
                        filteredAndSortedPatients.length > 0
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
              {filteredAndSortedPatients.map((patient) => (
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
                    <button
                      className="btn btn-primary text-xs"
                      onClick={() => handleEditPatient(patient)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-secondary text-xs"
                      onClick={() => handleDelete(patient.id)}
                    >
                      Del
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AddPatientModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onPatientAdded={handlePatientAdded}
      />

      <EditPatientModal
        isOpen={isEditOpen}
        onClose={closeEditModal}
        fetchPatients={fetchPatients}
        patient={editPatient}
      />
    </div>
  );
}

export default ActiveTreatment;
