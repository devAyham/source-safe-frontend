import { Route } from "react-router-dom";
import FormLoginPage from "../pages/FormLoginPage/FormLoginPage";

export default [
  <Route key={"auth"} path="auth">
    <Route key={"auth"} path="formLogin" element={<FormLoginPage />} />
  </Route>,
];
