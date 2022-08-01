import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
  url: "http://localhost:8080/auth",
  realm: "PSTravel",
  clientId: "PSTravel",
});

export default keycloak;
