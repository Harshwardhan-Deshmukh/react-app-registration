import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Card, CardContent } from "@mui/material";
import "./Registration.css";
import { keyCloakRegisterUser } from "../../UserService";

import CardHeader from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const Registration = () => {
  console.log(localStorage.getItem("bearer-token"));
  const classes = useStyles();
  // create state variables for each input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [error, setError] = useState(false);
  const [userExists, setUserExists] = useState(false);
  // const [bgColor, setbgColor] = useState("#FFFFFF");

  const handleSubmit = (e) => {
    e.preventDefault();

    // password checker
    const validatePass =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=[^ ]{8,15}$)/;

    if (!validatePass.test(password)) {
      setError(true);
      // error msg toastify
      return;
    } else {
      setError(false);
    }

    const raw = JSON.stringify({
      enabled: true,
      email,
      firstName,
      lastName,
      credentials: [
        {
          type: "password",
          value: password,
          temporary: false,
        },
      ],
      attributes: {
        telephone,
      },
    });

    keyCloakRegisterUser(raw)
      .then((response) => response.text())
      .then((result) => {
        if (result === "") {
          setUserExists(false);
        } else {
          setUserExists(true);
        }
      });
  };

  return (
    <>
      <div className="cardContainer">
        <Card
          className="mdc-card mdc-card--outlined my-card"
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "25px",
            paddingTop: 30,
          }}
        >
          <h4>Sign Up</h4>

          <CardHeader title="Subscribe" className={classes.heading} />
          <CardContent>
            <form className={classes.root} onSubmit={handleSubmit}>
              <TextField
                id="filled-basic"
                label="First Name"
                variant="filled"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                id="filled-basic"
                label="Last Name"
                variant="filled"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{ borderRadius: "25px", backgroundColor: "#FFFFFF" }}
              />
              <TextField
                id="filled-basic"
                label="Email"
                variant="filled"
                type="email"
                required
                error={userExists}
                helperText={userExists ? "Username Already Exists" : ""}
                value={email}
                onChange={(e) => {
                  setUserExists(false);
                  setEmail(e.target.value);
                }}
              />

              <TextField
                id="filled-basic"
                label="Password"
                variant="filled"
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setError(false);
                  setPassword(e.target.value);
                }}
                error={error}
                helperText={error ? "Invalid Password" : ""}
                // style={{
                //   borderRadius: "25px",
                //   backgroundColor: "FFFFFF",
                // }}
              />
              <TextField
                id="filled-basic"
                label="Telephone Number"
                variant="filled"
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                // style={{ borderRadius: "25px", backgroundColor: "#FFFFFF" }}
              />
              <div>
                <Button
                  variant="contained"
                  // onClick={handleClose}
                  style={{ color: "#FFFFFF", backgroundColor: "#dc3545" }}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onSubmit={handleSubmit}
                  type="submit"
                  variant="contained"
                  style={{ color: "#FFFFFF", backgroundColor: "#dc3545" }}
                >
                  Sign up
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Registration;
