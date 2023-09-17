import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Import custom CSS styles
import "antd/dist/reset.css"; // Import CSS reset for Ant Design
import "remixicon/fonts/remixicon.css"; // Import Remixicon icon fonts
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications
import "react-phone-number-input/style.css"; // Import CSS for phone number input
import "@fontsource/poppins"; // Import the Poppins font family
import "@fontsource/poppins/400.css"; // Specify the Poppins font weight
import "@fontsource/poppins/400-italic.css"; // Specify the Poppins font weight and style
import App from "./App"; // Import the main application component

import reportWebVitals from "./reportWebVitals"; // Import the function for measuring performance
import { Provider } from "react-redux"; // Import the Redux Provider
import { ToastContainer } from "react-toastify"; // Import the toast container component

// Create a React root for rendering
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the main application within a React.StrictMode for improved development warnings
root.render(
  <React.StrictMode>
    <App /> {/* Render the main application component */}
    <ToastContainer /> {/* Render the toast container for notifications */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
