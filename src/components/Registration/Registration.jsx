import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Card, CardContent } from "@mui/material";
import "../../styles/Registration.css";
import { keyCloakRegisterUser, getToken } from "../../UserService";
import CircularProgress from "@mui/material/CircularProgress";
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
  useEffect(() => {
    getToken();
  }, []);

  const navigate = useNavigate();

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [bgColor, setbgColor] = useState("#FFFFFF");

  // const handleSpin = (e) => {
  //   setIsSubmitting(true);
  //   setTimeout((e) => {
  //     handleSubmit(e);
  //   }, 3000);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // password checker
    const validatePass =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=[^ ]{8,15}$)/;

    if (!validatePass.test(password)) {
      setError(true);
      // error msg toastify
      setIsSubmitting(false);
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
          // saving the username password to local storage for email verification
          localStorage.setItem("email", email);
          localStorage.setItem("firstName", firstName);

          // settimeout(1000, () => return navigation <CircularProgress />)
          setTimeout(() => {
            navigate("./email-verification-page");
          }, 2000);
        } else {
          setIsSubmitting(false);
          setUserExists(true);
        }
      });
  };

  return (
    <>
      <div className="registration-bg-image">
        <div className="registration-cardContainer">
          <Card
            variant="outlined"
            raised="true"
            className="mdc-card mdc-card--outlined registration-my-card"
            style={{
              minWidth: "sm",
              backgroundColor: "#FFFFFF",
              borderRadius: "25px",
              paddingTop: 30,
            }}
          >
            <h4>Sign Up</h4>
            <CardContent>
              <form className={classes.root} onSubmit={handleSubmit}>
                <TextField
                  id="filled-basic"
                  inputProps={{ "data-testid": "fname" }}
                  label="First Name"
                  variant="filled"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  id="filled-basic"
                  inputProps={{ "data-testid": "lname" }}
                  label="Last Name"
                  variant="filled"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{ borderRadius: "25px", backgroundColor: "#FFFFFF" }}
                />
                <TextField
                  id="filled-basic"
                  inputProps={{ "data-testid": "email" }}
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
                  inputProps={{ "data-testid": "password" }}
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
                  inputProps={{ "data-testid": "telephone" }}
                  label="Telephone Number"
                  variant="filled"
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  // style={{ borderRadius: "25px", backgroundColor: "#FFFFFF" }}
                />
                <div>
                  <Button
                    inputProps={{ "data-testid": "cancel" }}
                    variant="contained"
                    // onClick={handleClose}
                    style={{ color: "#FFFFFF", backgroundColor: "#24a0ed" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    inputProps={{ "data-testid": "signup" }}
                    color="primary"
                    onSubmit={handleSubmit}
                    type="submit"
                    variant="contained"
                    style={{ color: "#FFFFFF", backgroundColor: "#24a0ed" }}
                  >
                    Sign up
                    {isSubmitting && (
                      <CircularProgress
                        size="1rem"
                        color="inherit"
                        sx={{ ml: 0.5, mr: -1 }}
                      />
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Registration;
