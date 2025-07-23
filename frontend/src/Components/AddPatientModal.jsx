function AddPatientModal({ isOpen, onClose }) {
  return (
    <div className="">
      {/* Conditional rendering - Fixed syntax */}
      {isOpen && (
        <dialog id="my_modal_1" className="modal modal-open font-figtree">
          <div className="modal-box ">
            <h3 className="font-bold text-2xl mb-4">Add Patient</h3>
            <div className="grid grid-cols-4 grid-rows-5 w-full gap-1">
              <fieldset className="fieldset col-span-2">
                <legend className="fieldset-legend text-sm">
                  Patient Name
                </legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Type here"
                />
              </fieldset>

              <fieldset className="fieldset col-span-2">
                <legend className="fieldset-legend text-sm">
                  WhatsApp Number
                </legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Type here"
                />
              </fieldset>

              <fieldset className="fieldset col-span-4">
                <legend className="fieldset-legend text-sm">Address</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Type here"
                />
              </fieldset>

              <fieldset className="fieldset col-span-2">
                <legend className="fieldset-legend text-sm">Registered</legend>
                <input
                  type="date"
                  className="input w-full"
                  placeholder="Type here"
                />
              </fieldset>

              <fieldset className="fieldset col-span-2">
                <legend className="fieldset-legend text-sm">Last Visit</legend>
                <input
                  type="date"
                  className="input w-full"
                  placeholder="Select date"
                />
              </fieldset>

              <fieldset className="fieldset col-span-4">
                <legend className="fieldset-legend text-sm">
                  Last Treatment
                </legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Type here"
                />
              </fieldset>

              <fieldset className="fieldset col-span-4">
                <legend className="fieldset-legend text-sm">Image</legend>
                <input type="file" className="file-input w-full" />
                <label className="label">Max size 2MB</label>
              </fieldset>
            </div>
            <p className="py-4"></p>
            <div className="flex gap-2 justify-end">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
          {/* Updated backdrop to use onClose */}
          <div className="modal-backdrop" onClick={onClose}>
            <button type="button">close</button>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default AddPatientModal;
