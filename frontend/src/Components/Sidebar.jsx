import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Icon } from "@iconify/react";

function Sidebar() {
  const location = useLocation();
  // Common NavLink styling function
  const getLinkClassName = ({ isActive }) =>
    `${
      isActive
        ? "text-blue-700 bg-blue-500/20 opacity-100"
        : "text-gray-900 hover:text-blue-700 grayscale opacity-100 hover:grayscale-0 hover:opacity-100"
    } transition-all duration-300 block`;

  const getPatientLinkClassName = () => {
    const isActive =
      location.pathname === "/" ||
      location.pathname.startsWith("/inactive-treatment");
    return `${
      isActive
        ? "text-blue-700 bg-blue-500/20 opacity-100"
        : "text-gray-900 hover:text-blue-700 grayscale opacity-100 hover:grayscale-0 hover:opacity-100"
    } transition-all duration-300 block`;
  };

  // Navigation items data
  const navSections = [
    {
      title: "CLINIC",
      items: [
        { to: "/", icon: "uim:user-md", label: "Patients" },
        { to: "reservations", icon: "uim:schedule", label: "Reservations" },
        { to: "treatments", icon: "uim:stethoscope", label: "Treatments" },
        {
          to: "staff-list",
          icon: "solar:users-group-rounded-bold-duotone",
          label: "Staff List",
        },
      ],
    },
    {
      title: "FINANCE",
      items: [
        {
          to: "accounts",
          icon: "streamline-plump:user-multiple-accounts-solid",
          label: "Accounts",
        },
        { to: "sales", icon: "solar:chart-bold-duotone", label: "Sales" },
        {
          to: "purchases",
          icon: "material-symbols:inventory",
          label: "Purchases",
        },
        {
          to: "payment-method",
          icon: "ic:twotone-credit-card",
          label: "Payment Method",
        },
      ],
    },
    {
      title: "PHYSICAL ASSET",
      items: [
        {
          to: "stocks",
          icon: "ant-design:medicine-box-twotone",
          label: "Stocks",
        },
        {
          to: "peripherals",
          icon: "vaadin:dental-chair",
          label: "Peripherals",
        },
      ],
    },
  ];

  const additionalItems = [
    {
      to: "report",
      icon: "solar:folder-with-files-bold-duotone",
      label: "Report",
    },
    {
      to: "customer-support",
      icon: "material-symbols:support-agent",
      label: "Customer Support",
    },
  ];

  return (
    <div className="bg-base-300 w-60 h-screen flex flex-col overflow-hidden">
      
      <div className="px-4 py-4 font-figtree font-[500]">
        {/* Header */}
        <div className="flex items-center gap-1">
          <img src={Logo} alt="" className="w-12" />
          <p className="text-2xl text-gray-700 font-bold font-figtree">SozoDental</p>
        </div>

        {/* Clinic Info */}
        <div className="border border-gray-300 p-3 rounded-md flex mt-6 mb-4 items-center gap-2">
          <Icon
            icon="duo-icons:building"
            width="25"
            style={{ color: "#040404" }}
          />
          <div>
            <p className="">Acidental Clinic</p>
            <p className="text-xs text-gray-500">855 Botanic Avenue, AG</p>
          </div>
        </div>
      </div>

      {/* Navigation - Scrollable if needed */}
      <div className="flex-1 overflow-y-auto px-4">
        <ul className="menu">
          {/* Dashboard */}
          <li>
            <NavLink to="dashboard" className={getLinkClassName}>
              <div className="flex items-center gap-2">
                <Icon
                  icon="ic:twotone-dashboard"
                  width="25"
                  style={{ color: "#73a3ff" }}
                />
                <p>Dashboard</p>
              </div>
            </NavLink>
          </li>

          {/* Navigation Sections */}
          {navSections.map((section) => (
            <React.Fragment key={section.title}>
              <li>
                <p className="mt-4 opacity-50 text-xs pointer-events-none cursor-not-allowed">
                  {section.title}
                </p>
              </li>
              {section.items.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={getLinkClassName}>
                    <div className="flex items-center gap-2">
                      <Icon
                        icon={item.icon}
                        width="25"
                        style={{ color: "#73a3ff" }}
                      />
                      <p>{item.label}</p>
                    </div>
                  </NavLink>
                </li>
              ))}
            </React.Fragment>
          ))}

          {/* Divider */}
          <div className="h-px my-4 bg-gray-300"></div>

          {/* Additional Items */}
          {additionalItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={getLinkClassName}>
                <div className="flex items-center gap-2">
                  <Icon
                    icon={item.icon}
                    width="25"
                    style={{ color: "#73a3ff" }}
                  />
                  <p>{item.label}</p>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;