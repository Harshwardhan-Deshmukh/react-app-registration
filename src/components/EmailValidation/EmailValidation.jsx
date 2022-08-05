import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import {
  getUserFromEmail,
  getToken,
  sendEmailVerification,
} from "../../UserService";
import Alert from "@mui/material/Alert";

const EmailValidation = () => {
  const [emailVerified, setEmailVerified] = useState(0);
  const navigate = useNavigate();
  getToken();
  // get current user email
  const email = localStorage.getItem("email");
  if (localStorage.getItem("email") === undefined) {
    console.log("email not saved in registration");
    return;
  }

  // calling once to save
  useEffect(() => {
    getUserFromEmail(email).then((response) =>
      response.json().then(async (data) => {
        // console.log(data[0].id);
        // get id of user
        await sendEmailVerification(data[0].id)
          .then((response) => {
            if (response.status === 204) {
              // email verification sent
              console.log("Verification Email Sent");
            } else {
              // error sending email verification
              console.log("Verification Email Not sent");
            }
          })
          .catch((error) => console.log(error));
      }, [])
    );
  }, []);

  const handleProceed = () => {
    //! onProceed
    // get user and check if email verified or not
    getToken();
    getUserFromEmail(email).then((response) =>
      response.json().then((data) => {
        if (data[0].emailVerified === false) {
          console.log("email not verified");
          setEmailVerified(-1);
          // toast("email not verified")
        } else {
          setEmailVerified(1);
          setTimeout(() => {
            navigate("/");
          }, 2000);
          console.log("email verified");
        }
      })
    );
  };
  return (
    <>
      <div
        styles={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30",
          backgroundColor: "#fdfdfd",
        }}
      >
        {/* height: 280,
            paddingTop: 30,
            paddingLeft: 50,
            paddingRight: 50,
            marginTop: 100,
            backgroundColor: "white", */}
        {emailVerified === -1 && (
          <Alert variant="filled" severity="error">
            This is an error alert — check it out!
          </Alert>
        )}
        {emailVerified === 1 && (
          <Alert severity="success" variant="filled">
            This is a success alert — check it out!
          </Alert>
        )}

        <Card
          variant="outlined"
          style={{
            width: "30%",
            height: "50%",
            padding: "1% 4%",
            margin: "auto",
            marginTop: "5%",
            backgroundColor: "white",
          }}
        >
          <CardContent style={{ padding: 20 }}>
            <Typography gutterBottom variant="h5" component="h2" align="center">
              Hi {localStorage.getItem("firstName")},
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="center"
              paddingTop="30"
            >
              An email with confirmation link has been sent to{" "}
              <a href="">{localStorage.getItem("email")}</a>. Please verify by
              your identity by clicking on the link and come back here.
            </Typography>
          </CardContent>

          <CardActions>
            <Button
              variant="contained"
              onClick={handleProceed}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#FFFFFF",
                backgroundColor: "#24a0ed",
                paddingLeft: "30%",
                paddingRight: "30%",
              }}
            >
              Verify Email
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default EmailValidation;
