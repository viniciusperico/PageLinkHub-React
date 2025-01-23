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
          <Route 
          path="/" 
          element={<TelaInicial />} 
          />
          <Route
            path="/editar"
            element={
              <PrivateRoute>
                <Editar />
              </PrivateRoute>
            }
          />
          <Route 
          path="/login" 
          element={<Login />} 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
