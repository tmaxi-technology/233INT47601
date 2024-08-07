import React, { useState } from "react";
import FormRegister from "./FormRegister";
import FormLogin from "./FormLogin";
import Box from "@mui/material/Box";

const Form = (props) => {
  const handleShubmitForm = () => {
    setShowForm(!showForm);
  };
  const [showForm, setShowForm] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: "linear-gradient(to bottom, white, #208080)",
      }}
    >
      {showForm ? (
        <FormLogin
          handleShowForm={handleShubmitForm}
          handleCheckLogin={props.handleCheckLogin}
        />
      ) : (
        <FormRegister handleShowForm={handleShubmitForm} />
      )}
    </Box>
  );
};

export default Form;
