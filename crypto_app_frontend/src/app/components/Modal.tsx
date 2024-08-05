'use client';
import React, { useState } from 'react';
import { useAppDispatch } from '../store/store';
import { setSymbol } from '../store/slices/cryptoSlice';

const Modal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState('bitcoin');
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(setSymbol(selectedSymbol));
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="bg-teal-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-teal-700"
        onClick={() => setIsOpen(true)}
      >
        Change Symbol
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-teal-600">Select Crypto Symbol</h2>
            <select
              className="mb-6 p-3 border border-gray-300 rounded-lg w-full bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-600"
              value={selectedSymbol}
              onChange={(e) => setSelectedSymbol(e.target.value)}
            >
              <option value="bitcoin">Bitcoin</option>
              <option value="solana">Solana</option>
              <option value="polkadot">Polkadot</option>
              <option value="ethereum">Ethereum</option>
              <option value="cardano">Cardano</option>
            </select>
            <div className="flex justify-end">
              <button
                className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 mr-2"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
