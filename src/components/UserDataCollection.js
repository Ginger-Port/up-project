import { Button, Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { addUser } from "../utils/getUsers";
import InputTextField from "./InputTextField";
import SendIcon from "@mui/icons-material/Send";
import { v4 as uuidv4 } from "uuid";

const UserDataCollection = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    email: "",
    number: "",
  });

  useEffect(() => {
    const handleBeforeClose = (e) => {
      if (formData.name !== "" || formData.number !== "") {
        e.preventDefault();
        e.returnValue = "unsaved changes";
      }
    };

    window.addEventListener("beforeunload", handleBeforeClose);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeClose);
    };
  }, [formData]);

  const handleChange = (name, value) => {
    setIsSubmit(false);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (formData.name.trim() !== "" || formData.number.trim() !== "") {
      const user = { ...formData, id: uuidv4() };
      addUser(user);
      setFormData({
        id: "",
        name: "",
        address: "",
        email: "",
        number: "",
      });
      setIsSubmit(true);
    }
  };

  return (
    <>
      <Container className="mt-4">
        <Typography variant="h3">Add User</Typography>
        <Paper elevation={1} className="mt-4 pt-2">
          <InputTextField
            label="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required="true"
          />
          <InputTextField
            label="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <InputTextField
            label="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputTextField
            label="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required="true"
          />
          <br></br>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSubmit}
            disabled={
              formData.name === "" || formData.number === "" ? true : false
            }
          >
            {isSubmit ? "Saved" : "Submit"}
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default UserDataCollection;
