import { Routes, Route } from "react-router-dom";
import "./App.scss";
import "antd/dist/antd.min.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SingUp";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./privateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
