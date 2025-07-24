import React from "react";

function AddDoctorModal({ isOpen, onClose }) {
  return (
    <div>
      {isOpen && (
        <dialog id="my_modal_2" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click outside to close</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={onClose}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}

export default AddDoctorModal;
