import React, { useEffect } from "react";
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

const EmailValidation = () => {
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
          // toast("email not verified")
        } else {
          console.log("email verified");
          navigate("/");
        }
      })
    );
  };
  return (
    <>
      <Card
        style={{
          width: 500,
          height: 280,
          paddingTop: 30,
          paddingLeft: 40,
          paddingRight: 40,
          marginTop: 100,
          marginLeft: 530,
          backgroundColor: "white",
        }}
      >
        <CardContent style={{ padding: 20 }}>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            Email Verification
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            align="center"
            paddingTop="30"
          >
            A email with you account confirmation link has been sent to your
            email: <a href="">{localStorage.getItem("email")}</a>. Check your
            email and come back to proceed.
          </Typography>
        </CardContent>

        <CardActions
          style={{
            paddingTop: 30,
            paddingLeft: 165,
          }}
        >
          <Button
            variant="contained"
            onClick={handleProceed}
            style={{
              color: "#FFFFFF",
              backgroundColor: "#dc3545",
            }}
          >
            Proceed
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default EmailValidation;
