import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import NotFound from "./NotFound";
import CardAuth from "./components/CardAuth";
import {DataTableDemo }from "./components/payments/page";


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
          path="/table"
          element={
            <>
              <NavBar />
            <DataTableDemo  />
            </>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}
