import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

function StaffList() {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const menuRef = useRef(null);

  // Staff data
  const staffData = [
    {
      id: 0,
      name: "Hart Hagerty",
      specialist: "Oral Surgeon",
      number: "0867 7040 3043",
      email: "harthagerty@gmail.com",
      avatar: "https://img.daisyui.com/images/profile/demo/2@94.webp",
      working_days: [false, false, true, false, true, true, true],
      type: "Full-Time",
      typeColor: "badge-warning",
    },
    {
      id: 1,
      name: "Brice Swyre",
      specialist: "Gear Conversion",
      number: "0875 5433 8766",
      email: "brice123@gmail.com",
      avatar: "https://img.daisyui.com/images/profile/demo/3@94.webp",
      working_days: [true, true, false, false, true, true, true],
      type: "Full-Time",
      typeColor: "badge-warning",
    },
    {
      id: 2,
      name: "Marjy Ferencz",
      specialist: "Pediatric Dentistry",
      number: "0922 4355 46211",
      email: "marferen@yahoo.com",
      avatar: "https://img.daisyui.com/images/profile/demo/4@94.webp",
      working_days: [true, true, false, true, false, true, true],
      type: "Full-Time",
      typeColor: "badge-warning",
    },
    {
      id: 3,
      name: "Yancy Tear",
      specialist: "Oral Surgeon",
      number: "1900 431 2424 21",
      email: "redot.ter333@acetrous.com",
      avatar: "https://img.daisyui.com/images/profile/demo/5@94.webp",
      working_days: [true, false, true, true, true, true, false],
      type: "Part-Time",
      typeColor: "badge-success",
    },
  ];

  const dayIcons = [
    "mdi:alphabet-s-circle",
    "mdi:alphabet-m-circle",
    "mdi:alphabet-t-circle",
    "mdi:alphabet-w-circle",
    "mdi:alphabet-t-circle",
    "mdi:alphabet-f-circle",
    "mdi:alphabet-s-circle",
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
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

  const handleDelete = (staffName) => {
    console.log(`Delete ${staffName}`);
    setOpenMenuIndex(null);
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

  const renderStaffRow = (staff) => (
    <tr key={staff.id}>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={staff.avatar} alt="Avatar" />
            </div>
          </div>
          <div>
            <div className="font-bold">{staff.name}</div>
            <div className="text-sm opacity-50">{staff.specialist}</div>
          </div>
        </div>
      </td>
      <td>
        {staff.number}
        <br />
        <span className="link text-info">{staff.email}</span>
      </td>
      {renderWorkingDays(staff.working_days)}
      <th>
        <p className="font-normal">Dental Service</p>
      </th>
      <th>
        <div className="flex items-center justify-between">
          <p className={`badge opacity-60 font-normal ${staff.typeColor}`}>
            {staff.type}
          </p>
          <div ref={menuRef} className="relative ml-2">
            <button
              onClick={() => toggleMenu(staff.id)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Icon
                icon="mdi:dots-vertical"
                width="16"
                style={{ color: "#666" }}
              />
            </button>
            {openMenuIndex === staff.id && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button
                  onClick={() => handleDelete(staff.name)}
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
              src="https://img.daisyui.com/images/profile/demo/2@94.webp"
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
      <div className="flex items-center justify-between px-16  py-8 flex-shrink-0 bg-white">
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
            <span className="text-4xl font-semibold mx-3">
              {staffData.length}
            </span>
            Doctor
          </p>
        </div>

        <div className="flex items-center gap-8">
          <button className="btn btn-primary">
            <Icon
              icon="mingcute:add-fill"
              width="18"
              style={{ color: "#fff" }}
            />
            Add Doctor
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto px-16">
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
          <tbody>{staffData.map(renderStaffRow)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffList;
