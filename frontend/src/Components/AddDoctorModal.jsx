import React, { useState } from "react";
import { Icon } from "@iconify/react";
import CheckboxCosmeticService from "./CheckboxCosmeticService";
import CheckboxTreatments from "./CheckboxTreatments";
import axios from "axios";

function AddDoctorModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState("");


  const [formData, setFormData] = useState({
    name: "",
    number: "",
    assigned_treatment: "",
    type: "",
    specialist: "",
    email: "",
    working_days:[],
    image: null,
  });

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    console.log("Form submitted with data:", formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/patients",
        formData
      );

      console.log("Success:", response.data);
      onPatientAdded(response.data);
      onClose();
    } catch (error) {
      console.error(
        "Error adding patient:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.error ||
          "Failed to add patient. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };


  // State to track which days are enabled
  const [workingDays, setWorkingDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });

  React.useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
    }
  }, [isOpen]);

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    onClose();
  };

  // Handle day toggle changes
  const handleDayToggle = (day) => {
    setWorkingDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  

  const steps = [
    {
      id: 1,
      title: "Staff Info",
      icon: "mingcute:user-info-line",
    },
    {
      id: 2,
      title: "Assigned Service",
      icon: "vaadin:doctor",
    },
    {
      id: 3,
      title: "Working Hours",
      icon: "streamline-ultimate:co-working-space-laptop",
    },
  ];

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-6">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= step.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              <Icon icon={step.icon} width="36" />
            </div>
            <span
              className={`text-sm ${
                currentStep >= step.id
                  ? "text-blue-500 font-medium"
                  : "text-gray-600"
              }`}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-px mx-2 ${
                currentStep > step.id ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // Helper function to render a day row
  const renderDayRow = (day, displayName) => (
    <div key={day} className="flex mt-2gap-2 items-center min-h-[3rem]">
      <input
        type="checkbox"
        checked={workingDays[day]}
        onChange={() => handleDayToggle(day)}
        className="toggle toggle-info"
      />
      <p className="w-20">{displayName}</p>

      <div className="flex items-center ml-auto gap-5 text-gray-500 w-80  ">
        {workingDays[day] ? (
          <>
            <fieldset className="fieldset">
              <input type="time" className="input w-30" defaultValue="08:00" />
            </fieldset>
            <p>to</p>
            <fieldset className="fieldset">
              <input type="time" className="input w-30" defaultValue="17:00" />
            </fieldset>
          </>
        ) : (
          <p className="text-gray-400 italic mr-auto">Not working this day</p>
        )}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <fieldset className="fieldset col-span-4">
              <legend className="fieldset-legend text-sm">Image</legend>
              <div className="flex gap-4 items-start ">
                <div className="flex-shrink-0 w-32">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="w-25 h-25 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-25 h-25 bg-gray-100 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-400 text-xs text-center">
                        Avatar
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    name="image"
                    className="file-input w-full"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/bmp,image/tiff,image/svg+xml"
                  />
                  <p className="text-gray-400 mt-4">
                    An image of the person, it's best if it has the same length
                    and height
                  </p>
                </div>
              </div>
            </fieldset>

            <div className="flex flex-col">
              <p className="mb-3">Type</p>
              <div className="flex w-full gap-2">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 flex-1">
                  <input
                    type="radio"
                    name="employment-type"
                    className="radio radio-info mr-3"
                    defaultChecked
                  />
                  <span>Full-Time</span>
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 flex-1">
                  <input
                    type="radio"
                    name="employment-type"
                    className="radio radio-info mr-3"
                  />
                  <span>Part-Time</span>
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 flex-1">
                  <input
                    type="radio"
                    name="employment-type"
                    className="radio radio-info mr-3"
                  />
                  <span>Internship</span>
                </label>
              </div>
            </div>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Name</legend>
              <input
              onChange={handleChange}
                type="text"
                className="input w-full"
                placeholder="Enter doctor's name"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Number</legend>
              <input
                            onChange={handleChange}

                type="text"
                className="input w-full"
                placeholder="Enter phone number"
              />
            </fieldset>

            <div>
              <p className="mb-2">Email</p>
              <label className="input validator flex items-center w-full">
                <svg
                  className="h-[1em] opacity-50 flex-shrink-0"
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
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                              onChange={handleChange}

                  type="email"
                  placeholder="mail@site.com"
                  required
                  className="flex-1 min-w-0"
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <>
            {" "}
            <div className="space-y-4 flex justify-between">
              <CheckboxCosmeticService />
              <CheckboxTreatments />
            </div>
            <div>
              <fieldset className="fieldset mt-10">
                <legend className="fieldset-legend">Additional Notes</legend>
                <textarea
                  className="textarea w-full"
                  placeholder="Any additional information about services and treatments..."
                  rows="3"
                ></textarea>
              </fieldset>
            </div>
          </>
        );

      case 3:
        return (
          <div className="space-y-4 mt-12">
            {renderDayRow("monday", "Monday")}
            {renderDayRow("tuesday", "Tuesday")}
            {renderDayRow("wednesday", "Wednesday")}
            {renderDayRow("thursday", "Thursday")}
            {renderDayRow("friday", "Friday")}
            {renderDayRow("saturday", "Saturday")}
            {renderDayRow("sunday", "Sunday")}
          </div>
        );

      default:
        return null;
    }
  };

  const renderButtons = () => (
    <div className="flex justify-between">
      <button
        type="button"
        className={`btn ${currentStep === 1 ? "btn-ghost" : "btn-secondary"}`}
        onClick={currentStep === 1 ? handleClose : previousStep}
      >
        {currentStep === 1 ? "Cancel" : "Previous"}
      </button>

      <button
        type="button"
        className="btn btn-primary"
        onClick={currentStep === 3 ? handleSubmit : nextStep}
      >
        {currentStep === 3 ? "Save" : "Next"}
      </button>
    </div>
  );

  return (
    <div>
      {isOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-2xl w-400 h-220 flex flex-col">
            <h3 className="font-bold text-lg mb-4">Add New Doctor Staff</h3>
            <div className="w-full h-px bg-gray-300 flex-shrink-0 mb-6"></div>

            {renderStepIndicator()}

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col flex-1"
            >
              {/* Content area that grows to fill available space */}
              <div className="flex-1 overflow-y-auto mb-6">
                {renderStepContent()}
              </div>

              {/* Buttons fixed at bottom */}
              <div className="flex-shrink-0">{renderButtons()}</div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default AddDoctorModal;
