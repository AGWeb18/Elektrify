"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CheckoutComponent from "~~/components/CheckoutComponent";

// // Updated interface to reflect UUID type for charger_id
// interface Charger {
//   id: string; // Changed to string for UUID
//   name: string;
//   precise_lat: number;
//   precise_long: number;
// }

const Book = () => {
  const [selectedChargerId, setSelectedChargerId] = useState<string>(""); // Correctly typed for UUID
  const [numHours, setNumHours] = useState<string>(""); // Keep as string for input handling
  const [bookingDate, setBookingDate] = useState<Date>(new Date());
  const [formErrors, setFormErrors] = useState<any>({});
  const [transactionMessage, setTransactionMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  // const [chargersList, setChargers] = useState<Charger[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("dim_charger_locations").select("*").eq("is_available", true);

      if (error) {
        console.error("Fetch error:", error);
      } else {
        // Assume fetched data matches the Charger interface, including UUID as string
        // setChargers(data);
      }
    }

    fetchData();
  }, []);

  const validateForm = () => {
    const errors: any = {};
    let isValid = true;
    if (!selectedChargerId) {
      errors.chargerId = "Charger ID is required.";
      isValid = false;
    }
    if (!numHours || parseInt(numHours, 10) <= 0) {
      errors.numHours = "Please enter a valid number of hours.";
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };
  const [pricePerHour, setPricePerHour] = useState<string>("40");

  const handleHourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumHours(event.target.value);
  };

  const handleBookCharger = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setTransactionMessage("Processing your booking...");

    const user_id = 1; // Placeholder for actual logic to obtain user ID

    const numHoursInt = parseInt(numHours, 10); // Convert numHours to integer
    const bookingDateIso = bookingDate.toISOString();

    const { error } = await supabase.from("fct_bookings").insert([
      {
        charger_id: selectedChargerId, // Directly use UUID string
        user_id,
        num_hours: numHoursInt,
        booking_date: bookingDateIso,
        status: "pending",
      },
    ]);

    if (error) {
      setTransactionMessage(`Failed to book charger: ${error.message}`);
    } else {
      setTransactionMessage("Charger booked successfully!");
      setSelectedChargerId("");
      setNumHours("");
      setBookingDate(new Date());
    }

    setIsProcessing(false);
  };

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen bg-gradient-to-r from-[#D0E9FF] to-[#A1C4FD]">
      <div className="w-full max-w-md mx-auto bg-base-100 shadow-xl card">
        <div className="card-body">
          <p className="text-center">${`${numHours} Hours`}</p>
          <input
            type="range"
            min={"1"}
            max="5"
            onChange={handleHourChange}
            value={numHours}
            className="range range-primary"
            step="1"
          />
          <div className="w-full flex justify-between text-xs px-2">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>

          <div className="mb-4">
            <Calendar
              onChange={(value, event) => {
                // Ensure that the value is not null and is a Date object before updating the state
                if (value instanceof Date) {
                  setBookingDate(value);
                } else {
                  console.warn("Selected value is not a valid date:", value);
                  // Handle the case where the value is not a valid date, if necessary
                }
              }}
              value={bookingDate}
              className="mx-auto"
            />{" "}
          </div>

          <CheckoutComponent />

          {transactionMessage && (
            <div className={`alert ${transactionMessage.includes("failed") ? "alert-error" : "alert-success"} mt-4`}>
              {transactionMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Book;
