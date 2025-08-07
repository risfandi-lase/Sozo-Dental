import React from "react";

const items = [
  { id: "bridges", label: "Bridges" },
  { id: "crowns", label: "Crowns" },
  { id: "fillings", label: "Fillings" },
  { id: "rootcanaltreatments", label: "Root Canal Treatments" },
];

export default function CheckboxTreatments({ selectedItems, onSelectionChange }) {
  const handleToggle = (itemId) => {
    onSelectionChange(itemId);
  };

  const selectedCount = Object.values(selectedItems).filter(Boolean).length;

  return (
    <div className="max-w-md bg-white p-2 rounded-lg font-figtree">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="ml-3">Treatment services</h3>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {selectedCount} selected
        </span>
      </div>

      <div className="">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex items-center cursor-pointer group border-t text-gray-100 hover:bg-gray-50 p-3"
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={selectedItems[item.id] || false}
                onChange={() => handleToggle(item.id)}
                className="sr-only"
              />
              <div
                className={`
                w-5 h-5 rounded border flex items-center justify-center transition-all duration-200
                ${
                  selectedItems[item.id]
                    ? "bg-indigo-500 border-indigo-500"
                    : "bg-white border-gray-300 group-hover:border-indigo-300"
                }
              `}
              >
                {selectedItems[item.id] && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span className="ml-3 text-sm text-gray-800">{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}