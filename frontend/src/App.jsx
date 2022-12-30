import React from "react";
import { Typography } from "@mui/material";
import "./App.css";
import "@fontsource/merriweather";
import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";

function App() {
  return (
    <div className="App" style={{ fontFamily: '"Merriweather", serif' }}>
      <Typography variant="h2" align="center">
        Exercice Technique pour Strateg-IN
      </Typography>
      <div style={{ display: "flex" }}>
        <RegisterCard style={{ width: "100%" }} />
        <LoginCard style={{ width: "100%" }} />
      </div>
    </div>
  );
}

export default App;
