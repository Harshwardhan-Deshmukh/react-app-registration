import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Registration from "./components/Registration/Registration";
// import { ReactKeycloakProvider } from "@react-keycloak/web";
// import keycloak from "./Keycloak";
import Home from "./components/Home";
import HelloWorld from "./components/HelloWorld";
import Navigationbar from "./components/Navigationbar";
import { useState } from "react";
import { AppContext } from "./contexts/AppContext";
// import { logger } from "./Logger/Logger.ts";
// import PrivateRoute from "./utils/ProtectedRoute";
import "@material-ui/core";

function App() {
  const [contextValue, setContextValue] = useState({});

  return (
    <AppContext.Provider value={{ contextValue, setContextValue }}>
      {/* <ReactKeycloakProvider> */}
      <div className="App">
        <Navigationbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/helloWorld"
            element={
              // <PrivateRoute>
              <HelloWorld />
              // </PrivateRoute>
            }
          />
          <Route
            path="/registration"
            element={
              // <PrivateRoute>
              <Registration />
              // </PrivateRoute>
            }
          />
        </Routes>
      </div>
      {/* </ReactKeycloakProvider> */}
    </AppContext.Provider>
  );
}

export default App;
