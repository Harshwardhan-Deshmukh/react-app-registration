import React from "react";
import { NavLink } from "react-router-dom";
// import { useKeycloak } from "@react-keycloak/web";
import "../styles/navbar.css";

const Navbar = () => {
  // const { keycloak } = useKeycloak();

  return (
    <div className="navContainer">
      <span className="navTitle">PSTravel</span>
      <NavLink className="btn btn-primary securePage" to="/helloWorld">
        Hello World Page
      </NavLink>
      {/* {!keycloak.authenticated && (
        <button
          type="button"
          className="btn btn-primary loginBtn"
          onClick={() => keycloak.login()}
        >
          Login
        </button>
      )}

      {!!keycloak.authenticated && (
        <button
          type="button"
          className="btn btn-danger loginBtn"
          onClick={() => keycloak.logout()}
        >
          Logout ({keycloak.tokenParsed.preferred_username})
        </button>
      )} */}
    </div>
  );
};

export default Navbar;
