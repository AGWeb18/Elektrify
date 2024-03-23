"use client";

import React, { useState, useCallback } from 'react';
import { useAccount } from "wagmi";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const BookAppointment = () => {
  const { address: connectedAddress } = useAccount();
  const [selectedChargerId, setSelectedChargerId] = useState(0);
  const [numHours, setNumHours] = useState(0);
  const [formErrors, setFormErrors] = useState({ chargerId: '', numHours: '' });
  const [transactionMessage, setTransactionMessage] = useState('');

  const validateForm = () => {
    let isValid = true;
    let errors = { chargerId: '', numHours: '' };

    if (!selectedChargerId) {
      errors.chargerId = "Charger ID is required";
      isValid = false;
    }

    if (!numHours || numHours <= 0) {
      errors.numHours = "Please enter a valid number of hours";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "bookCharger",
    args: [BigInt(selectedChargerId), BigInt(numHours)],
    blockConfirmations: 1,
    onSuccess: (txnReceipt) => {
      setTransactionMessage("Charger booked successfully!");
      console.log("Transaction blockHash", txnReceipt.hash);
    },
    onError: (error) => {
      setTransactionMessage(`Failed to book charger: ${error.message}`);
    },
  });

  const handleBookCharger = useCallback(() => {
    if (!validateForm()) return;

    setTransactionMessage('Processing your booking...');
    writeAsync().catch((error) => {
      console.error("Transaction error:", error);
      setTransactionMessage(`Transaction failed: ${error.message}`);
    });
  }, [selectedChargerId, numHours]);

  return (
    <>
      <div className="bg-gradient-to-r from-[#D0E9FF] to-[#A1C4FD]">
        <div className="flex justify-center items-center">
          <div className='w-1/2 p-5 card '>
            <div className='pb-5 justify-center items-center'>
              <div className='flex flex-col justify-center items-center pb-5'>
                <h1 className='text-4xl font-bold pb-4'>Book a Charger</h1>
              </div>
              <InputBase
                name="chargerId"
                placeholder="Charger ID"
                aria-label="Charger ID"
                value={selectedChargerId}
                onChange={e => setSelectedChargerId(e)}
                />
              {formErrors.chargerId && <p className="text-red-500">{formErrors.chargerId}</p>}
            </div>
            <div className='pb-5'>
              <InputBase
                name="numHours"
                placeholder="Number of Hours"
                aria-label="Number of Hours"
                value={numHours}
                onChange={e => setNumHours(e)}
                />
              {formErrors.numHours && <p className="text-red-500">{formErrors.numHours}</p>}
            </div>
            <button
              className={`btn btn-primary mt-4 shadow-2xl ${isLoading || isMining ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleBookCharger}
              disabled={isLoading || isMining}
              aria-disabled={isLoading || isMining}
            >
              {isLoading || isMining ? 'Processing...' : 'Book Charger Now'}
            </button>
            {transactionMessage && <p className={`mt-4 ${transactionMessage.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>{transactionMessage}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(BookAppointment);
