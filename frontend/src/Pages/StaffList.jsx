import React, { useState, useEffect, useRef } from "react";
import user from "../assets/user.jpg";
import { Icon } from "@iconify/react/dist/iconify.js";
import AddDoctorModal from "../Components/AddDoctorModal";
import axios from "axios";

function StaffList() {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatPhoneNumber = (phone) => {
  // Handle null, undefined, or empty values
  if (!phone) return '';
  
  // Convert to string if it's a number
  const phoneStr = String(phone);
  
  // Remove all non-digits except the + sign
  const cleaned = phoneStr.replace(/[^\d+]/g, '');
  
  // Format Indonesian phone numbers (+62-XXX-XXXX-XXXX)
  if (cleaned.startsWith('+62') && cleaned.length >= 10) {
    return cleaned.replace(/(\+62)(\d{3})(\d{4})(\d{4}).*/, '$1-$2-$3-$4');
  }
  
  // Format if it starts with 62 (without +)
  if (cleaned.startsWith('62') && cleaned.length >= 9) {
    return `+${cleaned.replace(/^(62)(\d{3})(\d{4})(\d{4}).*/, '$1-$2-$3-$4')}`;
  }
  
  // Format if it starts with 0 (local format like 0857...)
  if (cleaned.startsWith('0') && cleaned.length >= 10) {
    // Convert 0857... to +62-857-...
    const withoutZero = cleaned.substring(1);
    return `+62-${withoutZero.replace(/(\d{3})(\d{4})(\d{4}).*/, '$1-$2-$3-$4')}`;
  }
  
  // Return original string if no pattern matches
  return phoneStr;
};

  const TYPE_COLOR_MAPPING = {
    "Full-Time": "badge-warning",
    "Part-Time": "badge-success",
    "Intern": "badge-secondary",
  };

  // Helper function to get color (fallback for safety)
  const getTypeColor = (type) => {
    return TYPE_COLOR_MAPPING[type] || "badge-neutral";
  };

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/staff");
      const staffData = response.data.map((member) => ({
        ...member,
        type_color: member.type_color || getTypeColor(member.type),
      }));
      setStaff(staffData);
      setError(null);
    } catch (error) {
      console.error("Error fetching staff:", error);
      setError(error.message || "Failed to fetch staff");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const dayIcons = [
    "mdi:alphabet-s-circle",
    "mdi:alphabet-m-circle", 
    "mdi:alphabet-t-circle",
    "mdi:alphabet-w-circle",
    "mdi:alphabet-t-circle",
    "mdi:alphabet-f-circle",
    "mdi:alphabet-s-circle",
  ];

  // Close menu when clicking outside - FIXED VERSION
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside any dropdown menu
      if (!event.target.closest('.dropdown-menu') && !event.target.closest('.menu-trigger')) {
        setOpenMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const renderWorkingDays = (activeDays) => (
    <td className="flex">
      {dayIcons.map((icon, index) => (
        <Icon
          key={index}
          icon={icon}
          width="30"
          style={{ color: activeDays[index] ? "#5383ff" : "#bbba" }}
        />
      ))}
    </td>
  );

  const handleDelete = async (staffId, staffName) => {
    console.log("Delete button clicked!");
    console.log("Staff ID:", staffId);
    console.log("Staff Name:", staffName);
    
    if (!window.confirm(`Are you sure you want to delete ${staffName}?`)) {
      console.log("Delete cancelled by user");
      return;
    }
    
    try {
      console.log("Making DELETE request...");
      const response = await axios.delete(`http://localhost:5000/api/staff/${staffId}`);
      console.log("Delete response:", response);
      
      setStaff((prevStaff) => {
        const newStaff = prevStaff.filter((member) => member.id !== staffId);
        console.log("Updated staff list:", newStaff);
        return newStaff;
      });
      
      console.log(`Successfully deleted ${staffName}`);
    } catch (error) {
      console.error("Error deleting staff:", error);
      console.error("Error response:", error.response?.data);
      alert(`Failed to delete ${staffName}: ${error.message}`);
    }
    setOpenMenuIndex(null);
  };

  const renderStaffRow = (staffMember) => {
  const treatments = staffMember.assigned_treatment
    ? staffMember.assigned_treatment.split(", ")
    : [];
  const displayTreatments = treatments.slice(0, 2).join(", ");
  const remainingCount = treatments.length > 2 ? treatments.length - 2 : 0;

  return (
    <tr key={staffMember.id}>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-circle h-12 w-12">
              <img src={staffMember.image} alt="Avatar" />
            </div>
          </div>
          <div>
            <div className="font-bold">{staffMember.name}</div>
            <div className="text-sm opacity-50">{staffMember.specialist}</div>
          </div>
        </div>
      </td>
      <td>
        {formatPhoneNumber(staffMember.number)}
        <br />
        <span className="link text-info">{staffMember.email}</span>
      </td>
      {renderWorkingDays(staffMember.working_days)}
      <th>
        <p className="font-normal">
          {displayTreatments}
          {remainingCount > 0 && (
            <span className="text-info"> +{remainingCount}</span>
          )}
        </p>
      </th>
      <th>
        <div className="flex items-center justify-between">
          <p
            className={`badge opacity-60 font-normal w-25 text ${staffMember.type_color}`}
          >
            {staffMember.type}
          </p>
          <div className="relative ml-2">
            <button
              onClick={() => toggleMenu(staffMember.id)}
              className="menu-trigger p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Icon
                icon="mdi:dots-vertical"
                width="16"
                style={{ color: "#666" }}
              />
            </button>
            {openMenuIndex === staffMember.id && (
              <div className="dropdown-menu absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(staffMember.id, staffMember.name);
                  }}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600 transition-colors"
                >
                  <Icon
                    icon="mdi:delete"
                    width="16"
                    style={{ color: "#dc2626" }}
                  />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </th>
    </tr>
  );
};

  if (loading) {
    return (
      <div className="font-figtree w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4">Loading staff...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-figtree w-full h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button className="btn btn-primary" onClick={fetchStaff}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-figtree w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-16 py-2 flex-shrink-0">
        <p className="text-3xl font-[600]">Staff List</p>

        <div className="flex items-center gap-4">
          <div>
            <label className="input w-90 font-figtree">
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
                required
                placeholder="Search for anything here..."
              />
            </label>
          </div>

          <div className="flex items-center gap-1">
            <span title="Language" className="cursor-pointer">
              <Icon
                icon="material-symbols:language"
                width="25"
                style={{ color: "#ccc" }}
              />
            </span>
            <span className="text-gray-400">EN</span>
          </div>

          <div className="flex items-center gap-4 cursor-pointer">
            <span title="Help">
              <Icon
                icon="material-symbols:help-outline"
                width="25"
                style={{ color: "#ccc" }}
              />
            </span>
            <span title="Performance">
              <Icon
                icon="mingcute:performance-line"
                width="25"
                style={{ color: "#ccc" }}
              />
            </span>
            <span title="Settings">
              <Icon
                icon="simple-line-icons:settings"
                width="22"
                style={{ color: "#ccc" }}
              />
            </span>
          </div>

          <div className="w-px h-6 bg-gray-300"></div>

          <div className="flex items-center gap-2">
            <Icon
              icon="guidance:calendar"
              width="24"
              style={{ color: "#ccc" }}
            />
            <p className="text-gray-500 text-sm">
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>

          <div className="w-px h-6 bg-gray-300"></div>

          <div className="flex items-center gap-2">
            <img
              src={user}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p>Stephanie Darrel</p>
              <p className="text-xs text-gray-400 ">Orthopedic</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-300 flex-shrink-0"></div>

      {/* Stats section */}
      <div className="flex items-center justify-between px-16 py-8 flex-shrink-0 bg-white">
        <div className="flex items-center">
          <div>
            <Icon
              icon="fa6-solid:user-doctor"
              width="48"
              height="48"
              style={{ color: "#5383ff" }}
            />
          </div>
          <p>
            <span className="text-4xl font-semibold mx-3">{staff.length}</span>
            Doctor
          </p>
        </div>

        <div className="flex items-center gap-8">
          <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
            <Icon
              icon="mingcute:add-fill"
              width="18"
              style={{ color: "#fff" }}
            />
            Add Doctor
          </button>
        </div>
      </div>

      <AddDoctorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onStaffAdded={fetchStaff}
      />

      {/* Table */}
      <div className="overflow-x-auto px-16">
        {staff.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No staff members found.</p>
          </div>
        ) : (
          <table className="table">
            <thead className="bg-base-300">
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Name</th>
                <th>Contact</th>
                <th>Working Days</th>
                <th>Assigned Treatment</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>{staff.map(renderStaffRow)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StaffList;