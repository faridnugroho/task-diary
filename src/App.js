import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Content from "./pages/Content";
import CreateDiary from "./pages/CreateDiary";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DetailDiary from "./pages/DetailDiary";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.token) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Content />} />
          <Route path="/create-diary" element={<CreateDiary />} />
          <Route path="/diary/:diary_id" element={<DetailDiary />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
