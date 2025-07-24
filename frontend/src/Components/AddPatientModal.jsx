import { useState } from "react";
import axios from "axios";

function AddPatientModal({ isOpen, onClose, onPatientAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    addres: "",
    registered: "",
    last_visit: "",
    last_treatment: "",
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

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
      setFormData((prevData) => ({
        ...prevData,
        image: null,
      }));
      setImagePreview(null);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      whatsapp: "",
      addres: "",
      registered: "",
      last_visit: "",
      last_treatment: "",
      image: null,
    });
    setError("");
    setImagePreview(null);
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
      resetForm();
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

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="">
      {isOpen && (
        <dialog id="my_modal_1" className="modal modal-open font-figtree">
          <div className="modal-box">
            <h3 className="font-bold text-2xl">Add Patient</h3>
      <div className="w-full h-px bg-gray-300 flex-shrink-0 mb-4"></div>


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
                    type="text"
                    name="name"
                    className="input w-full"
                    placeholder="Type here"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </fieldset>

                <fieldset className="fieldset col-span-2">
                  <legend className="fieldset-legend text-sm">
                    WhatsApp Number
                  </legend>
                  <input
                    type="number"
                    name="whatsapp"
                    className="input w-full"
                    placeholder="Type here"
                    value={formData.whatsapp}
                    onChange={handleChange}
                  />
                </fieldset>

                <fieldset className="fieldset col-span-4">
                  <legend className="fieldset-legend text-sm">Address</legend>
                  <input
                    type="text"
                    name="addres"
                    className="input w-full"
                    placeholder="Type here"
                    value={formData.addres}
                    onChange={handleChange}
                  />
                </fieldset>

                <fieldset className="fieldset col-span-2">
                  <legend className="fieldset-legend text-sm">
                    Registered
                  </legend>
                  <input
                    type="date"
                    name="registered"
                    className="input w-full"
                    placeholder="Type here"
                    value={formData.registered}
                    onChange={handleChange}
                  />
                </fieldset>

                <fieldset className="fieldset col-span-2">
                  <legend className="fieldset-legend text-sm">
                    Last Visit
                  </legend>
                  <input
                    type="date"
                    name="last_visit"
                    className="input w-full"
                    placeholder="Select date"
                    value={formData.last_visit}
                    onChange={handleChange}
                  />
                </fieldset>

                <fieldset className="fieldset col-span-4">
                  <legend className="fieldset-legend text-sm">
                    Last Treatment
                  </legend>
                  <input
                    type="text"
                    name="last_treatment"
                    className="input w-full"
                    placeholder="Type here"
                    value={formData.last_treatment}
                    onChange={handleChange}
                  />
                </fieldset>

                <fieldset className="fieldset col-span-4">
                  <legend className="fieldset-legend text-sm">Image</legend>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    name="image"
                    className="file-input w-full"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/bmp,image/tiff,image/svg+xml"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Image Preview"
                        className="w-32 h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                </fieldset>
              </div>

              <p className="py-4"></p>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
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

export default AddPatientModal;
