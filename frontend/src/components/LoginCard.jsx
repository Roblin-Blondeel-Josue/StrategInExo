import React from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function LoginCard() {
  const [email, setEmail] = React.useState("");
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  const [password, setPassword] = React.useState("");
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  const handleSubmit = (event) => event.preventDefault();
  const userLogin = [email, password];
  const [token, setToken] = React.useState();
  const [problem, setProblem] = React.useState();
  async function login(logInfo) {
    const data = JSON.stringify({
      email: `${logInfo[0]}`,
      password: `${logInfo[1]}`,
    });
    const config = {
      method: "post",
      url: "http://localhost:5000/login",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        "Content-Type": "application/json",
      },
      data,
    };
    await axios(config)
      .then((response) => response)
      .then((response) => setToken(response.data.token))
      .catch((error) => {
        setProblem(error.message);
      });
  }
  const [usersList, setUsersList] = React.useState();
  function getUser(tok) {
    const config = {
      method: "get",
      url: "http://localhost:5000/users",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tok}`,
      },
    };
    axios(config)
      .then((response) => setUsersList(response.data.result))
      .catch((error) => {
        setProblem(error.message);
      });
  }
  return (
    <div>
      <Card
        sx={{
          height: "40vh",
          width: "20vw",
          margin: "10vh 0vw",
          bgcolor: "#F6EBFF",
          boxShadow: 3,
        }}
      >
        <CardHeader
          sx={{ bgcolor: "#151A78" }}
          title={
            <Typography variant="h4" align="center" color="white">
              Connexion
            </Typography>
          }
        />
        <CardContent style={{ display: "flex", flexDirection: "column" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              size="small"
              id="mailLogin"
              label="E-mail"
              sx={{ m: "2rem" }}
              onInput={(e) => handleEmail(e)}
            />
            <TextField
              size="small"
              id="passwordLogin"
              label="Password"
              type="password"
              sx={{ m: "2rem" }}
              onInput={(e) => handlePassword(e)}
            />
          </form>
          <Button variant="text" onClick={() => login(userLogin)}>
            Sign In
          </Button>
          {problem ? (
            <Typography variant="body1" color="red">
              {problem}
            </Typography>
          ) : (
            ""
          )}
        </CardContent>
      </Card>
      {token ? (
        <Card
          sx={{
            height: "60vh",
            width: "30vw",
            bgcolor: "#F6EBFF",
            boxShadow: 3,
          }}
        >
          <CardHeader
            sx={{ bgcolor: "#151A78" }}
            title={
              <Typography variant="h4" align="center" color="white">
                Liste des Utilisateurs
                <Button
                  sx={{ paddingLeft: "5rem", color: "white" }}
                  onClick={() => getUser(token)}
                >
                  Afficher
                </Button>
              </Typography>
            }
          />
          <CardContent>
            <List>
              {usersList &&
                usersList.map((element) => {
                  return (
                    <ListItem key={usersList.indexOf(element)}>
                      <ListItemText
                        primary={`Utilisateur n° ${usersList.indexOf(element)}`}
                        secondary={
                          <Typography>
                            {element.lastname} - {element.firstname}
                            <br />
                            {element.email}
                          </Typography>
                        }
                      />
                    </ListItem>
                  );
                })}
            </List>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
}
