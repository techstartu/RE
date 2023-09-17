// Import necessary libraries and CSS
import "./components/Login.css";
import React, { useState, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import {
  FaArrowLeft,
  FaFacebook,
  BsFillEyeFill,
  BsFillEyeSlashFill,
} from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../../company/Navbar";
import "./LoginAsCompany.css";

// Define the LoginAsCompany component
function LoginAsCompany() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState("LOG IN");

  // Check if the user is already logged in as a company
  useEffect(() => {
    if (localStorage.getItem("userType") === "company") {
      navigate("/company");
    }
  }, []);

  const initialFormData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const { email, password } = formData;

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    setLoader("loading...");

    if (!email || !password) {
      toast.error("Please enter all fields");
    } else {
      fetch("/company/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          return response.json(); // Parse the response JSON
        })
        .then((data) => {
          if (!data.success) {
            toast.error(data.msg);
            setLoader("LOG IN");
            return;
          }

          // Store the token in local storage
          localStorage.setItem("token", data.token);
          localStorage.setItem("userType", "company");

          // Store the user data in local storage
          localStorage.setItem("user", JSON.stringify(data.user));

          setFormData(initialFormData);
          setLoader("LOG IN");
          navigate("/companydashboard");
        })
        .catch((error) => {
          // Handle error here
          toast.error("Some error occurred");
          console.log("Error sending data:", error);
          setLoader("LOG IN");
        });
    }
  };

  // Handle Google login
  const google = () => {
    window.open("/auth/google", "_self");
  };

  // Function to navigate to the registration page
  function registerBtn() {
    navigate("/registerAsCompany");
  }

  // Function to navigate to the forgot password page
  function forgetPasswordPage() {
    navigate("/CforgetPassword");
  }

  // State variables for password visibility and error handling
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Navigate back to the previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      {/* Render the Navbar */}
      <Navbar page="authPage" />

      {/* Render the company login form */}
      <div>
        <div className="container Card col-lg-4 mt-5 company-SignIn-parent-container">
          <div className="company-signIn-button-register">
            <button
              className="signIn-navigate-company-SignIn"
              onClick={() => navigate("/loginAsCompany")}
            >
              SignIn
            </button>
            <button
              className="register-navigate-company-SignIn"
              onClick={() => navigate("/registerAsCompany")}
            >
              Register
            </button>
          </div>
          <div className="company-signup-LogIn-heading">
            <div>Login</div>
          </div>

          <div>
            <div class="col-sm-10 p-2 mx-auto">
              <div className="register-with-email-heading-signIn">
                <div>Continue with email</div>
              </div>
              <div className="text-center  form-group">
                <Form onSubmit={handleSubmit}>
                  <p>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicEmail"
                    >
                      <Form.Control
                        className="email-Input-Company-SignIn"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                    </Form.Group>
                  </p>

                  <Form.Group
                    className="mb-3"
                    controlId="formBasicPassword"
                  >
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="pass-Input-Company-SignIn"
                      />
                      <div className="input-group-append">
                        <span
                          className="input-group-text text-center"
                          style={{
                            cursor: "pointer",
                            border: "none",
                            backgroundColor: "transparent",
                            position: "absolute",
                            top: "17px",
                            right: "0",
                            textAlign: "center",
                          }}
                          onClick={handleTogglePassword}
                        >
                          {showPassword ? (
                            <BsFillEyeFill />
                          ) : (
                            <BsFillEyeSlashFill />
                          )}
                        </span>
                      </div>
                    </InputGroup>
                  </Form.Group>

                  <div className="forgot-pass-SignIn-company">
                    <a
                      href="#"
                      style={{
                        textDecoration: "none",
                        color: "#FF4848",
                        fontSize: "14px",
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                      }}
                      onClick={forgetPasswordPage}
                    >
                      Forgot Password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="signIn-button-register-company"
                  >
                    {loader}
                  </button>
                </Form>
                <ToastContainer />
                <div className="accountLink mt-3">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    style={{
                      textDecoration: "",
                      color: "#b90739",
                      fontSize: "14px",
                    }}
                    onClick={registerBtn}
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginAsCompany;
