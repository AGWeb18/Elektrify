import React, { useState } from "react";
import { createCharge } from "../services/chargeGenerators";
import { useAccount } from "wagmi";

// Adjust the import path as necessary

const CheckoutComponent = () => {
  const [amount, setAmount] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const { address: connectedAddress } = useAccount(); // Destructure to get the address string

  const handleCreateCharge = async () => {
    const chargeDetails = {
      amount,
      currency: "CAD",
      name: "Elektris Booking Charger",
      description: "Booking charge for electric vehicle charging station",
      redirect_url: "https://example.com/thank-you",
      customerId: connectedAddress, // Now this is just a string
      email: customerEmail,
      address: "123 Electric Ave, Electropolis, EA",
    };

    try {
      const chargeResponse = await createCharge(chargeDetails);
      if (chargeResponse && chargeResponse.data && chargeResponse.data.hosted_url) {
        window.location.href = chargeResponse.data.hosted_url;
      } else {
        console.error("Failed to create charge");
      }
    } catch (error) {
      console.error("Charge creation failed with error:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center pb-8">
        <button onClick={handleCreateCharge} className="btn btn-primary mt-4 shadow-2xl ">
          Pay with Crypto
        </button>
      </div>
    </div>
  );
};

export default CheckoutComponent;
