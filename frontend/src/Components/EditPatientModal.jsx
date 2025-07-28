import { useState, useEffect } from "react";
import axios from "axios";

function EditPatientModal({ isOpen, onClose, fetchPatients, patient }) {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || "",
        whatsapp: patient.whatsapp || "",
        addres: patient.addres || "",
        registered: patient.registered || "",
        last_visit: patient.last_visit || "",
        last_treatment: patient.last_treatment || "",
        image: patient.image || "",
      });
      setImagePreview(patient.image || null);
    }
  }, [patient]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const isImageFile = (file) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/bmp",
      "image/tiff",
      "image/svg+xml",
    ];
    return allowedTypes.includes(file.type.toLowerCase());
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size must be less than 2MB");
        return;
      }

      if (!isImageFile(file)) {
        setError(
          "Please select a valid image file (JPG, PNG, WebP, GIF, BMP, TIFF, SVG)"
        );
        return;
      }

      try {
        const base64String = await convertToBase64(file);
        setFormData((prevData) => ({
          ...prevData,
          image: base64String,
        }));
        setImagePreview(base64String);
        setError("");
      } catch (error) {
        console.error("Error converting image to base64:", error);
        setError("Failed to process image");
      }
    } else {
      // When no file is selected, clear the image
      setFormData((prevData) => ({
        ...prevData,
        image: "",
      }));
      setImagePreview(null);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      image: "",
    }));
    setImagePreview(null);
    // Clear the file input
    const fileInput = document.querySelector('input[type="file"][name="image"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.put(
        `http://localhost:5000/api/patients/${patient.id}`,
        formData
      );

      if (response.status === 200) {
        fetchPatients();
        onClose();
      } else {
        setError("Failed to update patient. Please try again.");
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      setError(
        `An error occurred while updating the patient: ${error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="">
      {isOpen && (
        <dialog id="my_modal_1" className="modal modal-open font-figtree">
          <div className="modal-box">
            <h3 className="font-bold text-2xl mb-4">Edit Patient</h3>

            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-4 grid-rows-4 w-full gap-1">
                <fieldset className="fieldset col-span-2">
                  <legend className="fieldset-legend text-sm">
                    Patient Name *
                  </legend>
                  <input
                    value={formData.name || ""}
                    onChange={handleChange}
                    type="text"
                    name="name"
                    className="input w-full"
                    placeholder="Type here"
                    required
                  />
                </fieldset>

                <fieldset className="fieldset col-span-2">
                  <legend className="fieldset-legend text-sm">
                    WhatsApp Number *
                  </legend>
                  <input
                    value={formData.whatsapp || ""}
                    onChange={handleChange}
                    type="number"
                    name="whatsapp"
                    className="input w-full"
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset col-span-4">
                  <legend className="fieldset-legend text-sm">Address</legend>
                  <input
                    value={formData.addres || ""}
                    onChange={handleChange}
                    type="text"
                    name="addres"
                    className="input w-full"
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset col-span-2">
                  <legend className="fieldset-legend text-sm">
                    Registered
                  </legend>
                  <input
                    value={formData.registered || ""}
                    onChange={handleChange}
                    type="date"
                    name="registered"
                    className="input w-full"
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset col-span-2">
                  <legend className="fieldset-legend text-sm">
                    Last Visit
                  </legend>
                  <input
                    value={formData.last_visit || ""}
                    onChange={handleChange}
                    type="date"
                    name="last_visit"
                    className="input w-full"
                    placeholder="Select date"
                  />
                </fieldset>

                <fieldset className="fieldset col-span-4">
                  <legend className="fieldset-legend text-sm">
                    Last Treatment
                  </legend>
                  <input
                    value={formData.last_treatment || ""}
                    onChange={handleChange}
                    type="text"
                    name="last_treatment"
                    className="input w-full"
                    placeholder="Type here"
                  />
                </fieldset>

                <fieldset className="fieldset col-span-4">
                  <legend className="fieldset-legend text-sm">Image</legend>
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-32 relative">
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Image Preview"
                            className="w-32 h-32 object-cover rounded-full"
                          />
                    
                        </div>
                      ) : (
                        <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-400 text-xs text-center">
                            Avatar
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        onChange={handleFileChange}
                        type="file"
                        name="image"
                        className="file-input w-full"
                        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/bmp,image/tiff,image/svg+xml"
                      />
                      <p className="text-gray-400 mt-4">
                        An image of the person, it's best if it has the same
                        length and height
                      </p>
                    </div>
                  </div>
                </fieldset>
              </div>

              <p className="py-4"></p>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>

          <div className="modal-backdrop" onClick={handleClose}>
            <button type="button">close</button>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default EditPatientModal;