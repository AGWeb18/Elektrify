import { useState } from "react";

const OnboardButton = () => {
  const [loading, setLoading] = useState(false);

  const handleOnboard = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "user@example.com", // Replace with actual email input value
          password: "password", // Replace with actual password input value
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
        alert(data.error || "Failed to create account");
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <button onClick={handleOnboard} disabled={loading} className="btn btn-primary">
      {loading ? "Loading..." : "Onboard with Supabase"}
    </button>
  );
};

export default OnboardButton;

// import { useState } from "react";

// const OnboardButton = () => {
//   const [loading, setLoading] = useState(false);

//   const handleOnboard = async () => {
//     setLoading(true);
//     const response = await fetch("/api/create-account", {
//       method: "POST",
//     });
//     const data = await response.json();
//     if (data.url) {
//       window.location.href = data.url;
//     } else {
//       setLoading(false);
//       alert("Failed to create account");
//     }
//   };

//   return (
//     <button onClick={handleOnboard} disabled={loading} className="btn btn-primary">
//       {loading ? "Loading..." : "Onboard with Stripe"}
//     </button>
//   );
// };

// export default OnboardButton;
