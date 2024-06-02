import React from "react";
import { CSSProperties } from "react";

// Importing CSSProperties type

const BlueCreateWalletButton = () => {
  const buttonStyle: CSSProperties = {
    background: "#0070f3",
    border: "none",
    boxSizing: "border-box" as CSSProperties["boxSizing"], // Ensure the value is assignable to the correct type
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "#0070f3",
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 4,
  };

  return <button style={buttonStyle}>Create Wallet</button>;
};

export default BlueCreateWalletButton;
