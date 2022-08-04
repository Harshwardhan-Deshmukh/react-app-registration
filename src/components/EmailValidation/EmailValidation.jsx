import React from "react";
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";

function EmailValidation() {
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
            email: <a href="">harsh123@gmail.com</a>. Check your email and come
            back to proceed.
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
            // onClick={handleClose}
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
}
export default EmailValidation;
