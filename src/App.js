import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
// import { ReactKeycloakProvider } from "@react-keycloak/web";
// import keycloak from "./Keycloak";
import Home from "./components/Home";
import HelloWorld from "./components/HelloWorld";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { AppContext } from "./contexts/AppContext";
// import { logger } from "./Logger/Logger.ts";
// import PrivateRoute from "./utils/ProtectedRoute";
import "@material-ui/core";

function App() {
  const [contextValue, setContextValue] = useState({});

  return (
    <AppContext.Provider value={{ contextValue, setContextValue }}>
      {/* <!--<ReactKeycloakProvider authClient={keycloak}> */}
      <div className="App">
        <Navbar />
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
        </Routes>
      </div>
      {/* </ReactKeycloakProvider> */}
    </AppContext.Provider>
  );
}

export default App;
