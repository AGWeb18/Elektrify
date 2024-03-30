// import React, { useEffect, useState } from "react";
// // Import calendar CSS for basic styling
// import { Calendar } from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const BookAppointment = () => {
//   const [selectedChargerId, setSelectedChargerId] = useState("");
//   const [numHours, setNumHours] = useState("");
//   const [bookingDate, setBookingDate] = useState(new Date());
//   const [formErrors, setFormErrors] = useState({});
//   const [transactionMessage, setTransactionMessage] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false); // Simulates isLoading/isMining

//   // Example chargers list
//   const chargersList = [
//     { id: 1, name: "Charger 1" },
//     { id: 2, name: "Charger 2" },
//     // Add more charger options here
//   ];

//   const validateForm = () => {
//     const errors = {};
//     let isValid = true;

//     if (!selectedChargerId) {
//       errors.chargerId = "Charger ID is required.";
//       isValid = false;
//     }

//     if (!numHours || numHours <= 0) {
//       errors.numHours = "Please enter a valid number of hours.";
//       isValid = false;
//     }

//     // Additional validation can be added here

//     setFormErrors(errors);
//     return isValid;
//   };

//   const handleBookCharger = async () => {
//     if (!validateForm()) return;

//     setIsProcessing(true);
//     setTransactionMessage("Processing your booking...");

//     // Simulate booking process
//     setTimeout(() => {
//       setIsProcessing(false);
//       setTransactionMessage("Charger booked successfully!");
//       // Reset form fields
//       setSelectedChargerId("");
//       setNumHours("");
//       setBookingDate(new Date());
//     }, 2000);
//   };

//   return (
//     <div className="bg-gradient-to-r from-[#D0E9FF] to-[#A1C4FD] py-10 min-h-screen">
//       <div className="container mx-auto">
//         <div className="card w-full max-w-md bg-base-100 shadow-xl mx-auto">
//           <div className="card-body">
//             <h2 className="card-title justify-center">Book a Charger</h2>

//             <Select
//               className="mb-4"
//               placeholder="Select a Charger"
//               value={selectedChargerId}
//               onChange={e => setSelectedChargerId(e.target.value)}
//             >
//               {chargersList.map(charger => (
//                 <option key={charger.id} value={charger.id}>
//                   {charger.name}
//                 </option>
//               ))}
//             </Select>
//             {formErrors.chargerId && <p className="text-error">{formErrors.chargerId}</p>}

//             <Input
//               className="mb-4"
//               type="number"
//               placeholder="Number of Hours"
//               value={numHours}
//               onChange={e => setNumHours(e.target.value)}
//               error={Boolean(formErrors.numHours)}
//               errorMessage={formErrors.numHours}
//             />

//             <div className="mb-4">
//               <Calendar onChange={setBookingDate} value={bookingDate} className="mx-auto" />
//             </div>

//             <Button onClick={handleBookCharger} disabled={isProcessing} className="w-full">
//               {isProcessing ? "Processing..." : "Book Charger Now"}
//             </Button>

//             {transactionMessage && (
//               <Notification className="mt-4" color={transactionMessage.includes("failed") ? "error" : "success"}>
//                 {transactionMessage}
//               </Notification>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookAppointment;

// // /* eslint-disable prettier/prettier */
// // /* eslint-disable react-hooks/exhaustive-deps */
// // "use client";

// // import React, { useCallback, useState } from "react";
// // import { InputBase } from "~~/components/scaffold-eth";
// // import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

// // const BookAppointment = () => {
// //   const [selectedChargerId, setSelectedChargerId] = useState(0);
// //   const [numHours, setNumHours] = useState(0);
// //   const [formErrors, setFormErrors] = useState({ chargerId: "", numHours: "" });
// //   const [transactionMessage, setTransactionMessage] = useState("");

// //   const validateForm = () => {
// //     let isValid = true;
// //     const errors = { chargerId: "", numHours: "" };

// //     if (!selectedChargerId) {
// //       errors.chargerId = "Charger ID is required";
// //       isValid = false;
// //     }

// //     if (!numHours || numHours <= 0) {
// //       errors.numHours = "Please enter a valid number of hours";
// //       isValid = false;
// //     }

// //     setFormErrors(errors);
// //     return isValid;
// //   };

// //   const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
// //     contractName: "YourContract",
// //     functionName: "bookCharger",
// //     args: [BigInt(selectedChargerId), BigInt(numHours)],
// //     blockConfirmations: 1,
// //     onSuccess: txnReceipt => {
// //       setTransactionMessage("Charger booked successfully!");
// //       console.log("Transaction blockHash", txnReceipt.hash);
// //     },
// //     onError: error => {
// //       setTransactionMessage(`Failed to book charger: ${error.message}`);
// //     },
// //   });

// //   const handleBookCharger = useCallback(() => {
// //     if (!validateForm()) return;

// //     setTransactionMessage("Processing your booking...");
// //     writeAsync().catch(error => {
// //       console.error("Transaction error:", error);
// //       setTransactionMessage(`Transaction failed: ${error.message}`);
// //     });
// //   }, [validateForm, writeAsync]);

// //   return (
// //     <>
// //       <div className="bg-gradient-to-r from-[#D0E9FF] to-[#A1C4FD]">
// //         <div className="flex justify-center items-center">
// //           <div className="w-1/2 p-5 card ">
// //             <div className="pb-5 justify-center items-center">
// //               <div className="flex flex-col justify-center items-center pb-5">
// //                 <h1 className="text-4xl font-bold pb-4">Book a Charger</h1>
// //               </div>
// //               <InputBase
// //                 name="chargerId"
// //                 placeholder="Charger ID"
// //                 aria-label="Charger ID"
// //                 value={selectedChargerId}
// //                 onChange={e => setSelectedChargerId(e)}
// //               />
// //               {formErrors.chargerId && <p className="text-red-500">{formErrors.chargerId}</p>}
// //             </div>
// //             <div className="pb-5">
// //               <InputBase
// //                 name="numHours"
// //                 placeholder="Number of Hours"
// //                 aria-label="Number of Hours"
// //                 value={numHours}
// //                 onChange={e => setNumHours(e)}
// //               />
// //               {formErrors.numHours && <p className="text-red-500">{formErrors.numHours}</p>}
// //             </div>
// //             <button
// //               className={`btn btn-primary mt-4 shadow-2xl ${
// //                 isLoading || isMining ? "opacity-50 cursor-not-allowed" : ""
// //               }`}
// //               onClick={handleBookCharger}
// //               disabled={isLoading || isMining}
// //               aria-disabled={isLoading || isMining}
// //             >
// //               {isLoading || isMining ? "Processing..." : "Book Charger Now"}
// //             </button>
// //             {transactionMessage && (
// //               <p className={`mt-4 ${transactionMessage.includes("failed") ? "text-red-500" : "text-green-500"}`}>
// //                 {transactionMessage}
// //               </p>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default React.memo(BookAppointment);
