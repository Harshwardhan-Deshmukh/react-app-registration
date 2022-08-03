// import Keycloak from "keycloak-js";
// const initOptions = {
//   url: "https://ec2-44-201-156-101.compute-1.amazonaws.com:8443/auth",
//   realm: "PSTravel",
//   clientId: "PSTravel",
//   credentials: {
//     secret: "mNiYtrFleh4uPrW0pbCUUYdpOdaArbix",
//   },
//   "confidential-port": 0,
// };

// const keycloak = Keycloak(initOptions);
// keycloak
//   .init({ onLoad: initOptions.onLoad })
//   .success((auth) => {
//     if (!auth) {
//       window.location.reload();
//     } else {
//       console.info("Authenticated");
//     }

//     localStorage.setItem("bearer-token", keycloak.token);
//     localStorage.setItem("refresh-token", keycloak.refreshToken);
//     console.log(localStorage.getItem("bearer-token"));
//     console.log(localStorage.getItem("refresh-token"));

//     setTimeout(() => {
//       keycloak
//         .updateToken(70)
//         .success((refreshed) => {
//           if (refreshed) {
//             console.debug("Token refreshed" + refreshed);
//           } else {
//             console.warn(
//               "Token not refreshed, valid for " +
//                 Math.round(
//                   keycloak.tokenParsed.exp +
//                     keycloak.timeSkew -
//                     new Date().getTime() / 1000
//                 ) +
//                 " seconds"
//             );
//           }
//         })
//         .error(() => {
//           console.error("Failed to refresh token");
//         });
//     }, 60000);
//   })
//   .error(() => {
//     console.error("Authenticated Failed");
//   });
// const keyCloakBearerToken = async () => {
//   const url =
//     "https://ec2-44-201-156-101.compute-1.amazonaws.com:8443/auth/realms/master/protocol/openid-connect/token";
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "Access-Control-Allow-Origin": url,
//     },
//     // body: new URLSearchParams({
//     //  " client_id": "admin-cli",
//     //   "client_secret": "mNiYtrFleh4uPrW0pbCUUYdpOdaArbix",
//     //   "grant_type": "client_credentials",
//     // }),
//     body: {
//       client_id: "admin-cli",
//       client_secret: "mNiYtrFleh4uPrW0pbCUUYdpOdaArbix",
//       grant_type: "client_credentials",
//     },
//     mode: "no-cors",
//   });
//   return response.json(); // response is coming here in json
// };

// {
//   "access_token": "sample token",
//   "expires_in": 60,
//   "refresh_expires_in": 0,
//   "token_type": "Bearer",
//   "not-before-policy": 0,
//   "scope": "profile email"
// }

// // ? make a post request to KC for response(JWT token)
// // ? and create a new user
// async function keyCloakRegisterUser() {
//   localStorage.setItem("bearer-token", keyCloakBearerToken().access_token);
//   console.log(localStorage.getItem("bearer-token"));
//   const url =
//     "https://ec2-44-201-156-101.compute-1.amazonaws.com:8443/auth/admin/realms/PSTravel/users";
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       Authorization: "Bearer " + localStorage.getItem("bearer-token"),
//       "Content-Type": "application/json", // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: JSON.stringify({
//       enabled: true,
//       username: "JoshinRexy",
//       email: "JoshinKaEmail@gmail.com",
//       firstName: "Joshin",
//       lastName: "Rexy",

//       credentials: [
//         {
//           type: "password",
//           value: "123",
//           temporary: false,
//         },
//       ],
//       attributes: {
//         DOB: "1984-07-01",
//       },
//     }),
//     mode: "no-cors",
//   });
//   return response.json();
// }

// const getToken = async () => {
//   const realm = "master";
//   //   process.env.NEXT_PUBLIC_KEYCLOAK_REALM
//   const keycloakClientSecret = "mNiYtrFleh4uPrW0pbCUUYdpOdaArbix";
//   // process.env.NEXT_PUBLIC_KEYCLOAK_BEARER_CLIENT_SECRET;
//   const kcTokenEndpoint = `https://ec2-44-201-156-101.compute-1.amazonaws.com:8443/auth/realms/${realm}/protocol/openid-connect/token`;

//   const { response } = await axios({
//     method: "post",
//     url: kcTokenEndpoint,
//     data: {
//       client_id: "admin-cli", // create client in keycloak with same name
//       client_secret: keycloakClientSecret,
//       grant_type: "client_credentials",
//     },
//     headers: {
//       "Content-type": "application/x-www-form-urlencoded",
//     },
//     withCredentials: true,
//     mode: "no-cors",
//   });

//   return response.access_token;
// };

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
// if user got registered returns true
// else false
const keyCloakRegisterUser = (raw) => {
  getToken();
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
export { keyCloakRegisterUser, getToken };
