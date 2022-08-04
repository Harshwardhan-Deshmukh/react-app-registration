// type : Promise
// Gets the bearer token from keycloak
import jwtDecode from "jwt-decode";
const getToken = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Access-Control-Allow-Origin",
    "https://ec2-44-202-30-0.compute-1.amazonaws.com:8443"
  );
  const urlencoded = new URLSearchParams();
  urlencoded.append("client_id", "admin-cli");
  urlencoded.append("client_secret", "mNiYtrFleh4uPrW0pbCUUYdpOdaArbix");
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch(
    "https://ec2-44-202-30-0.compute-1.amazonaws.com:8443/auth/realms/master/protocol/openid-connect/token",
    requestOptions
  ).then((response) =>
    response
      .json()
      .then((result) =>
        localStorage.setItem("bearer-token", result.access_token)
      )
  );
};

// type : Promise
// Creates a new user in keycloak.users
// returns : Promise
const keyCloakRegisterUser = (raw) => {
  getToken(); // bearer-token
  console.log(localStorage.getItem("bearer-token"));

  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer " + localStorage.getItem("bearer-token")
  );
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(
    "https://ec2-44-202-30-0.compute-1.amazonaws.com:8443/auth/admin/realms/PSTravel/users",
    requestOptions
  );
};

// type : Promise
// takes username and password and login him, gets the JWT token

const getJwtToken = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("client_id", "admin-cli");
  urlencoded.append("grant_type", "password");

  urlencoded.append("username", localStorage.getItem("username"));
  urlencoded.append("password", localStorage.getItem("password"));
  urlencoded.append("scope", "openid");
  urlencoded.append("client_secret", "CPh3WWnD8Dfxc1kOow0wzx9hEcJYdQib");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return fetch(
    "https://ec2-44-202-30-0.compute-1.amazonaws.com:8443/auth/realms/PSTravel/protocol/openid-connect/token",
    requestOptions
  );
  // .then((response) => response.text())
  // .then((result) => console.log(result))
  // .catch((error) => console.log("error", error));
};

const sendEmailVerification = (id) => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer " + localStorage.getItem("bearer-token")
  );

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `https://ec2-44-202-30-0.compute-1.amazonaws.com:8443/auth/admin/realms/PSTravel/users/${id}/send-verify-email`,
    requestOptions
  );
};

// return user object given email passed
const getUserFromEmail = (email) => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer " + localStorage.getItem("bearer-token")
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `https://ec2-44-202-30-0.compute-1.amazonaws.com:8443/auth/admin/realms/PSTravel/users?email=${email}`,
    requestOptions
  );
};

const decodeJwt = (token) => jwtDecode(token);

export {
  keyCloakRegisterUser,
  getToken,
  getJwtToken,
  getUserFromEmail,
  sendEmailVerification,
  decodeJwt,
};

// import jwt_decode from "jwt-decode";

// var token = "eyJ0eXAiO.../// jwt token";
// var decoded = jwt_decode(token);

// console.log(decoded);

// /* prints:
//  * { foo: "bar",
//  *   exp: 1393286893,
//  *   iat: 1393268893  }
//  */

// var decodedHeader = jwt_decode(token, { header: true });
// console.log(decodedHeader);

// /* prints:
//  * { typ: "JWT",
//  *   alg: "HS256" }
//  */
