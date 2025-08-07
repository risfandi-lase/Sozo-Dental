import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import CheckboxCosmeticService from "./CheckboxCosmeticService";
import CheckboxTreatments from "./CheckboxTreatments";
import axios from "axios";

const cosmeticTreatmentsList = [
  { id: "teethWhitening", label: "General Dentist Service" },
  { id: "dentalVeneers", label: "Oral Disease Service" },
  { id: "dentalBonding", label: "TMJ Disorder Service" },
  { id: "dentalCrown", label: "Smile Enchanchement Service" },
  { id: "inlaysOnlays", label: "Root Canal Service" },
  { id: "dentalImplants", label: "Oral Pathology Service" },
];

const treatmentServicesList = [
  { id: "bridges", label: "Bridges" },
  { id: "crowns", label: "Crowns" },
  { id: "fillings", label: "Fillings" },
  { id: "rootcanaltreatments", label: "Root Canal Treatments" },
];

function AddDoctorModal({ isOpen, onClose, onStaffAdded }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    assigned_treatment: "",
    type: "Full-Time",
    specialist: "",
    email: "",
    working_days: [true, true, true, true, true, true, true],
    image: null,
  });

  const [cosmeticServices, setCosmeticServices] = useState({
    teethWhitening: false,
    dentalVeneers: false,
    dentalBonding: false,
    dentalCrown: false,
    inlaysOnlays: false,
    dentalImplants: false,
  });

  const [treatmentServices, setTreatmentServices] = useState({
    bridges: false,
    crowns: false,
    fillings: false,
    rootcanaltreatments: false,
  });

  const [workingDays, setWorkingDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData({
        name: "",
        number: "",
        assigned_treatment: "",
        type: "Full-Time",
        specialist: "",
        email: "",
        working_days: [true, true, true, true, true, true, true],
        image: null,
      });
      setImagePreview(null);
      setError("");
      setWorkingDays({
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      });
      setCosmeticServices({
        teethWhitening: false,
        dentalVeneers: false,
        dentalBonding: false,
        dentalCrown: false,
        inlaysOnlays: false,
        dentalImplants: false,
      });
      setTreatmentServices({
        bridges: false,
        crowns: false,
        fillings: false,
        rootcanaltreatments: false,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const selectedCosmetic = cosmeticTreatmentsList
      .filter((item) => cosmeticServices[item.id])
      .map((item) => item.label);

    const selectedTreatments = treatmentServicesList
      .filter((item) => treatmentServices[item.id])
      .map((item) => item.label);

    const allSelections = [...selectedCosmetic, ...selectedTreatments];
    setFormData((prev) => ({
      ...prev,
      assigned_treatment: allSelections.join(", "),
    }));
  }, [cosmeticServices, treatmentServices]);

  const handleCosmeticChange = (itemId) => {
    setCosmeticServices((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleTreatmentChange = (itemId) => {
    setTreatmentServices((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleChange = (e) => {
  const { name, value, type } = e.target;

  if (type === "file") {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        // Store the base64 string instead of the file object
        setFormData((prevData) => ({ ...prevData, [name]: base64String }));
      };
      reader.readAsDataURL(file);
    }
  } else {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }
};
  const handleTypeChange = (e) => {
    setFormData((prevData) => ({ ...prevData, type: e.target.value }));
  };

  const convertWorkingDaysToArray = () => {
    return [
      workingDays.sunday,
      workingDays.monday,
      workingDays.tuesday,
      workingDays.wednesday,
      workingDays.thursday,
      workingDays.friday,
      workingDays.saturday,
    ];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const submitData = {
        ...formData,
        working_days: convertWorkingDaysToArray(),
      };

      console.log("Form submitted with data:", submitData);

      const response = await axios.post(
        "http://localhost:5000/api/staff",
        submitData
      );

      console.log("Success:", response.data);

      if (onStaffAdded) {
        onStaffAdded();
      }
      onClose();
    } catch (error) {
      console.error(
        "Error adding staff:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.error ||
          "Failed to add staff member. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => currentStep < 3 && setCurrentStep(currentStep + 1);
  const previousStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);
  const handleClose = () => {
    setCurrentStep(1);
    setError("");
    onClose();
  };

  const handleDayToggle = (day) => {
    setWorkingDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const steps = [
    { id: 1, title: "Staff Info", icon: "mingcute:user-info-line" },
    { id: 2, title: "Assigned Service", icon: "vaadin:doctor" },
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

  const renderDayRow = (day, displayName) => (
    <div key={day} className="flex mt-2 gap-2 items-center min-h-[3rem]">
      <input
        type="checkbox"
        checked={workingDays[day]}
        onChange={() => handleDayToggle(day)}
        className="toggle toggle-info"
      />
      <p className="w-20">{displayName}</p>
      <div className="flex items-center ml-auto gap-5 text-gray-500 w-80">
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
          <div className="space-y-2">
            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}
            <fieldset className="fieldset col-span-4">
              <legend className="fieldset-legend text-sm">Image</legend>
              <div className="flex gap-4 items-start">
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
                    onChange={handleChange}
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
                    name="type"
                    value="Full-Time"
                    checked={formData.type === "Full-Time"}
                    onChange={handleTypeChange}
                    className="radio radio-info mr-3"
                  />
                  <span>Full-Time</span>
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 flex-1">
                  <input
                    type="radio"
                    name="type"
                    value="Part-Time"
                    checked={formData.type === "Part-Time"}
                    onChange={handleTypeChange}
                    className="radio radio-info mr-3"
                  />
                  <span>Part-Time</span>
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 flex-1">
                  <input
                    type="radio"
                    name="type"
                    value="Intern"
                    checked={formData.type === "Intern"}
                    onChange={handleTypeChange}
                    className="radio radio-info mr-3"
                  />
                  <span>Internship</span>
                </label>
              </div>
            </div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Name</legend>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                className="input w-full"
                placeholder="Enter doctor's name"
                required
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Specialist</legend>
              <select
                name="specialist"
                value={formData.specialist}
                onChange={handleChange}
                className="select w-full"
              >
                <option value="" disabled>
                  Choose the specialization
                </option>
                <option value="Oral Surgeon" className="text-black">
                  Oral Surgeon
                </option>
                <option value="Pediatric Dentistry" className="text-black">
                  Pediatric Dentistry
                </option>
                <option value="Gear Conversion" className="text-black">
                  Gear Conversion
                </option>
              </select>
            </fieldset>
          <fieldset className="fieldset">
  <legend className="fieldset-legend">Number</legend>
  <input
    name="number"
    value={formData.number}
    onChange={handleChange}
    onBlur={(e) => {
      // Format the number when user finishes typing
      const formatted = formatPhoneNumber(e.target.value);
      setFormData(prev => ({ ...prev, number: formatted }));
    }}
    type="text"
    className="input w-full"
    placeholder="Enter phone number (e.g., +6285760207747)"
    required
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
                  name="email"
                  value={formData.email}
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
            <div className="space-y-4 flex justify-between">
              <CheckboxCosmeticService
                selectedItems={cosmeticServices}
                onSelectionChange={handleCosmeticChange}
              />
              <CheckboxTreatments
                selectedItems={treatmentServices}
                onSelectionChange={handleTreatmentChange}
              />
            </div>
            <div>
              <fieldset className="fieldset mt-10">
                <legend className="fieldset-legend">Assigned Treatment</legend>
                <textarea
                  name="assigned_treatment"
                  value={formData.assigned_treatment}
                  readOnly
                  className="textarea w-full"
                  placeholder="Selected treatments will appear here..."
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
        disabled={isLoading}
      >
        {currentStep === 1 ? "Cancel" : "Previous"}
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={currentStep === 3 ? handleSubmit : nextStep}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Saving...
          </>
        ) : currentStep === 3 ? (
          "Save"
        ) : (
          "Next"
        )}
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
              <div className="flex-1 overflow-y-auto mb-6">
                {renderStepContent()}
              </div>
              <div className="flex-shrink-0">{renderButtons()}</div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default AddDoctorModal;
("");
