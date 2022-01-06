import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ChatRoom from "./pages/ChatRoom";
import SelectRoom from "./pages/SelectRoom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectRoom/>}/>
      </Routes>
      <Routes>
        <Route path="/chatroom/:id" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
