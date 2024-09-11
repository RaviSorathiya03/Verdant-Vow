import React, { useState } from "react";

const CreateActivationCodeModal = ({ closeModal }) => {
  const [quantity, setQuantity] = useState("");

  const handleSubmit = () => {
    // Logic to create activation codes
    console.log(`Creating ${quantity} activation codes`);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold text-dark-green mb-4">Create Activation Code</h2>
        <label className="block mb-2">
          <span className="text-gray-700">Quantity</span>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md" min="1" />
        </label>
        <div className="flex justify-end space-x-2">
          <button onClick={closeModal} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-dark-green text-white py-2 px-4 rounded-md">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateActivationCodeModal;
