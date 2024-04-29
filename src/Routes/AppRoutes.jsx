import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/homePage";
import Register from "../Pages/RegisterPage";
import Login from "../Pages/LoginPage";
import AdminPage from "../Pages/AdminPage";
import PrivateRoutes from "./PrivateRoutes";
import POSPage from "../Pages/PosPage";
import ItemPage from "../Pages/itemList";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <HomePage />
            </PrivateRoutes>
          }
        ></Route>
        <Route
          path="/Register"
          element={
            <PrivateRoutes>
              <Register />
            </PrivateRoutes>
          }
        ></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route
          path="/AdminPage"
          element={
            <PrivateRoutes>
              <AdminPage />
            </PrivateRoutes>
          }
        ></Route>
        <Route
          path="/pos"
          element={
            <PrivateRoutes>
              <POSPage />
            </PrivateRoutes>
          }
        ></Route>
        <Route
          path="/itemList"
          element={
            <PrivateRoutes>
              <ItemPage />
            </PrivateRoutes>
          }
        ></Route>
      </Routes>
    </>
  );
};
export default AppRoutes;
