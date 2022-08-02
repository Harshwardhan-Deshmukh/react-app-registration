import React from "react";
import "./Registration.css";
import { keyCloakRegisterUser } from "../../UserService";
// const signUp = () => {
//   return <Registration />;
// };
const Registration = () => {
  //   return <button onClick={signUp}>Sign up</button>;
  return <button onClick={keyCloakRegisterUser}>Sign up</button>;
};

export default Registration;
