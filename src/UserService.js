// type : Promise
// Gets the bearer token from keycloak
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

// type : Promise
// sends a verify-email

export { keyCloakRegisterUser, getToken };
