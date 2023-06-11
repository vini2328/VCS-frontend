import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import Login from "./component/Login";
import SignUp from "./component/Signup";
import DashBoard from "./component/DashBoard";
import CreateRepo from "./component/CreateRepo";
import SaveRepo from "./component/SaveRepo";
import SendResetEmail from "./component/SendResetEmail";
import Confrimpass from "./component/ConfirmPass";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<SignUp/>} />
      <Route path="/DashBoard" element={<DashBoard/>} />
      <Route path="/repopage" element={<CreateRepo/>} />
      <Route path="/saverepo" element={<SaveRepo/>} />
      <Route path="/sendresetlink" element={<SendResetEmail/>} />
      <Route path="/confirmpassword/:id/:token" element={<Confrimpass/>} />




    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
