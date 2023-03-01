import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Modal from "react-modal";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/muggers-db")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);
Modal.setAppElement("#root");
ReactDOM.render(<App />, document.getElementById("root"));

