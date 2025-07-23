import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { Icon } from "@iconify/react";
import user from "../assets/user.jpg";

function Patients() {
  return (
    <div className="font-figtree w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-16 py-2 flex-shrink-0">  
        <p className="text-3xl font-[600]">Patient</p>

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

      {/* Navigation tabs */}
      <div className="w-full h-px bg-gray-300 flex-shrink-0"></div>
      <div className="px-16 flex-shrink-0">
        <ul className="flex py-2 text-xl font-semibold gap-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-600 underline underline-offset-14" : ""
              }
            >
              Active Treatment
            </NavLink>
          </li>
          <li>
            <NavLink
              to="inactive-treatment"
              className={({ isActive }) =>
                isActive ? "text-blue-600 underline underline-offset-14" : ""
              }
            >
              Inactive Treatment
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="w-full h-px bg-gray-300 flex-shrink-0"></div>
      
      {/* Content area - This will be scrollable */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default Patients;