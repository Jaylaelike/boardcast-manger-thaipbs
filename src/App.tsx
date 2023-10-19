import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import NotFound from "./NotFound";
import CardAuth from "./components/CardAuth";


import Home from "./components/Home";

import MiniGraphTest from "./components/MiniGraphTest";



export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <>
              <NavBar />
              <DashBoard />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <CardAuth />
            </>
          }
        />
          <Route
          path="/minigraph"
          element={
            <>
              <NavBar />
              <MiniGraphTest/>
            </>
          }
        />
          <Route
          path="/home"
          element={
            <>
              <NavBar />
              <Home />
            
            </>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}
