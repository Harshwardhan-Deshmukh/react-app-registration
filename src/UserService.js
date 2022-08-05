// type : Promise
// Gets the bearer token from keycloak
import jwtDecode from "jwt-decode";

const baseUrl = "https://ec2-44-206-45-82.compute-1.amazonaws.com:8443";
const getToken = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Access-Control-Allow-Origin", `${baseUrl}`);
  const urlencoded = new URLSearchParams();
  urlencoded.append("client_id", "admin-cli");
  urlencoded.append(
    "client_secret",
    process.env.REACT_APP_CLIENT_SECRECT_ADMIN_CLI
  );
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  fetch(
    `${baseUrl}/auth/realms/master/protocol/openid-connect/token`,
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

  return fetch(`${baseUrl}/auth/admin/realms/PSTravel/users`, requestOptions);
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
  urlencoded.append(
    "client_secret",
    process.env.REACT_APP_CLIENT_SECRECT_PS_TRAVEL_LOGIN
  );

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return fetch(
    `${baseUrl}/auth/realms/PSTravel/protocol/openid-connect/token`,
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
  console.log(id);
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(
    `${baseUrl}/auth/admin/realms/PSTravel/users/${id}/send-verify-email`,
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
    `${baseUrl}/auth/admin/realms/PSTravel/users?email=${email}`,
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
