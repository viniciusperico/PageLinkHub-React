import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";


const AppRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route exact path="/"
                element={<Adm />} />

                <Route exact path="/adm"
                element={<Admin />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;