import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import NotFound from "./NotFound";
import CardAuth from "./components/CardAuth";

import Loading from "./components/Loading";


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
              <Loading WidghtLoadingProps="250"/>
            </>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}
