import React from "react";
import ReactDOMClient from "react-dom/client";
import Home from "./components/Home";
import "./styles/globals.css";

const root = ReactDOMClient.createRoot(document.getElementById("app"));

root.render(<Home />);
