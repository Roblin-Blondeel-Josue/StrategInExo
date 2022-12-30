import React from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import "@fontsource/merriweather";

export default function RegisterCard() {
  const [firstname, setFirstname] = React.useState("");
  const [errorName, setErrorName] = React.useState(false);
  function handleFirstname(event) {
    if (
      /^[a-zA-Z]+$/.test(event.target.value) &&
      event.target.value.length <= 20
    ) {
      setFirstname(event.target.value);
      setErrorName(false);
    } else {
      setErrorName(true);
      setErrorName("");
    }
  }
  const [lastname, setLastname] = React.useState("");
  const [errorLastName, setErrorLastName] = React.useState(false);
  function handleLastname(event) {
    if (
      /^[a-zA-Z]+$/.test(event.target.value) &&
      event.target.value.length <= 20
    ) {
      setLastname(event.target.value);
      setErrorLastName(false);
    } else {
      setErrorLastName(true);
      setErrorName("");
    }
  }
  const [email, setEmail] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState(false);
  function handleEmail(event) {
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(event.target.value)) {
      setEmail(event.target.value);
      setErrorEmail(false);
    } else {
      setErrorEmail(true);
      setEmail("");
    }
  }
  const [password, setPassword] = React.useState("");
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  const userInfo = [firstname, lastname, email, password];
  const [message, setMessage] = React.useState("");
  function register(info) {
    const data = JSON.stringify({
      firstname: `${info[0]}`,
      lastname: `${info[1]}`,
      email: `${info[2]}`,
      password: `${info[3]}`,
    });
    const config = {
      method: "post",
      url: "http://localhost:5000/register",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        "Content-Type": "application/json",
      },
      data,
    };
    if (
      errorName === false &&
      errorLastName === false &&
      errorEmail === false
    ) {
      axios(config)
        .then((response) => setMessage(response.data.msg))
        .catch((error) => {
          setMessage(error.message);
        });
    } else {
      setMessage("Form Invalid");
    }
  }
  return (
    <Card
      sx={{
        minHeight: "60vh",
        width: "30vw",
        margin: "10vh 10vw",
        bgcolor: "#F6EBFF",
        boxShadow: 3,
      }}
    >
      <CardHeader
        sx={{ bgcolor: "#151A78" }}
        title={
          <Typography variant="h4" align="center" color="white">
            Inscription
          </Typography>
        }
      />
      <CardContent style={{ display: "flex", flexDirection: "column" }}>
        <form onSubmit={(event) => event.preventDefault()}>
          <TextField
            required
            helperText={
              errorName ? "Firstname Invalid" : "Please enter your firstname"
            }
            id="firstname"
            label="First Name"
            sx={{ m: "2rem" }}
            onChange={(e) => handleFirstname(e)}
          />
          <TextField
            helperText={
              errorLastName ? "Lastname Invalid" : "Please enter your Lastname"
            }
            id="lastname"
            label="Last Name"
            sx={{ m: "2rem" }}
            onChange={(e) => handleLastname(e)}
          />
          <br />
          <TextField
            required
            helperText={
              errorEmail ? "Email invalid" : "Please enter your E-mail"
            }
            id="mail"
            label="E-mail"
            type="email"
            sx={{ m: "2rem" }}
            onChange={(e) => handleEmail(e)}
          />
          <TextField
            required
            helperText="Please enter your password"
            id="password"
            label="Password"
            type="password"
            sx={{ m: "2rem" }}
            onChange={(e) => handlePassword(e)}
          />
        </form>
        <Button variant="text" onClick={() => register(userInfo)}>
          Sign-Up
        </Button>
        <Typography variant="body1">{message}</Typography>
      </CardContent>
    </Card>
  );
}
