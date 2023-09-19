import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";

// Components
import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="*" element={<h1>Not Found.</h1>} />
    </Routes>
  );
};

export default App;
