import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Editar from "../pages/Editar";
import TelaInicial from "../pages/TelaInicial";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/editar"
            element={
              <PrivateRoute>
                <Editar />
              </PrivateRoute>
            }
          />
          <Route path="/telainicial" element={<TelaInicial />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
