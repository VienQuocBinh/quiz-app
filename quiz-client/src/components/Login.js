import { Box, Button, Card, CardContent, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAPIEndPoint, ENDPOINTS } from "../api";
import useForm from "../hooks/useForm";
import useStateContext from "../hooks/useStateContext";
import Center from "./Center";

const getFreshModelObject = () => ({
  name: "",
  email: "",
});

export default function Login() {
  const navigate = useNavigate();
  const { context, setContext, resetContext } = useStateContext(); // receive the context from parent
  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModelObject);

  // Reset the context when redirect to Login page
  useEffect(() => {
    resetContext();
  }, []);

  const login = (e) => {
    e.preventDefault();
    if (validate()) {
      createAPIEndPoint(ENDPOINTS.participant)
        .post(values)
        .then((res) => {
          setContext({ participantId: res.data.id });
          navigate("/quiz");
        })
        .catch((err) => console.log(err));
    }
  };
  const validate = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S+/.test(values.email) ? "" : "Email is not valid";
    temp.name = values.name !== "" ? "" : "Name is required";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  return (
    <Center>
      <Card
        sx={{
          width: 400,
          boxShadow: 5,
          borderRadius: 5,
        }}
      >
        <CardContent style={{ textAlign: "center" }}>
          <h1>Quiz App Login</h1>
          <Box
            sx={{
              "& .MuiTextField-root": {
                margin: 1,
                width: "90%",
              },
            }}
          >
            <form noValidate autoComplete="off" onSubmit={login}>
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                variant="outlined"
                // if email field is not empty then show helperText
                {...(errors.email && { error: true, helperText: errors.email })}
              ></TextField>
              <TextField
                label="Name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                variant="outlined"
                // if name field is not empty then show helperText
                {...(errors.name && { error: true, helperText: errors.name })}
              ></TextField>
              <Button
                sx={{ margin: 1, width: "90%" }}
                type="submit"
                variant="contained"
                size="large"
              >
                Start
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
}
