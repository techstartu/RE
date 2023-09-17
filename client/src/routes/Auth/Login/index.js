// Import necessary dependencies and styles
import "./components/Login.css";
import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../../Home/components/header";

function Login() {
    // Initialize React Router's navigation hook
    const navigate = useNavigate();

    // Initialize state variables
    const [loader, setLoader] = useState("Continue");

    // Initialize form data
    const initialFormData = {
        email: "",
        password: "",
    };
    const [formData, setFormData] = useState(initialFormData);

    // Handle form input changes
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // Destructure email and password from the form data
    const { email, password } = formData;

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Update the button text to indicate loading
        setLoader("loading...");

        // Check if email and password are provided
        if (!email || !password) {
            toast.error("Please enter all fields");
        } else {
            // Send a POST request to the server for user login
            fetch("/user/login", {
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

                    // Store user data and token in local storage
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("progress", data.completionStatus);
                    localStorage.setItem("userType", "user");
                    localStorage.setItem("user", JSON.stringify(data.user));

                    // Reset the form and navigate to the homepage
                    setFormData(initialFormData);
                    setLoader("LOG IN");
                    navigate("/");
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

    // Navigate to the registration page
    function registerBtn() {
        navigate("/signUp");
    }

    // Navigate to the forgot password page
    function forgetPasswordPage() {
        navigate("/forgetPassword");
    }

    // Toggle password visibility
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    // Handle going back to the previous page
    const handleGoBack = () => {
        navigate(-1);
    };

    // Render the login component
    return (
        <>
            {/* Header component for authentication page */}
            <Header page="authPage" />

            {/* Main content */}
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div className="container Card col-lg-4 p-0">
                    <div className="company-signIn-button-register">
                        <button
                            className="signIn-navigate-company-SignIn"
                            onClick={() => navigate("/login")}
                        >
                            SignIn
                        </button>
                        <button
                            className="register-navigate-company-SignIn"
                            onClick={() => navigate("/signup")}
                        >
                            Register
                        </button>
                    </div>
                    <div className="company-signup-LogIn-heading">
                        <div>Login</div>
                    </div>

                    <div>
                        <div class="col-sm-10 p-2 mx-auto">
                            <div className="text-center mt-5 form-group">
                                {/* Login form */}
                                <Form onSubmit={handleSubmit}>
                                    <p>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formBasicEmail"
                                        >
                                            <label
                                                className="form-label d-flex justify-content-start mt-1"
                                                htmlFor="form3Example3"
                                                style={{
                                                    fontWeight: "600",
                                                    color: "#000",
                                                }}
                                            >
                                                Continue With Email
                                            </label>
                                            <Form.Control
                                                className="form-control loginInput "
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                                style={{ borderRadius: "10px" }}
                                            />
                                        </Form.Group>
                                    </p>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicPassword"
                                    >
                                        <InputGroup>
                                            <Form.Control
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                name="password"
                                                placeholder="Password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="form-control loginInput"
                                            />
                                            <div className="input-group-append">
                                                <span
                                                    className="input-group-text text-center"
                                                    style={{
                                                        cursor: "pointer",
                                                        border: "none",
                                                        backgroundColor:
                                                            "transparent",
                                                        position: "absolute",
                                                        top: "17px",
                                                        right: "0",
                                                        textAlign: "center",
                                                        borderRadius: "10px",
                                                    }}
                                                    onClick={
                                                        handleTogglePassword
                                                    }
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

                                    <div className="d-flex justify-content-start mt-1">
                                        <p className="rememberMe">
                                            {/* <input type="checkbox" /> Remember Me */}
                                        </p>
                                        <a
                                            href="#"
                                            style={{
                                                textDecoration: "none",
                                                color: "#1E1EF0",
                                                fontSize: "15px",
                                                fontFamily: "Poppins",
                                            }}
                                            onClick={forgetPasswordPage}
                                        >
                                            Forgot Password?
                                        </a>
                                    </div>

                                    <button
                                        type="submit"
                                        className="loginBtn mb-3 ml-2 mt-2"
                                    >
                                        {loader}
                                    </button>
                                </Form>

                                {/* Toast container for displaying notifications */}
                                <ToastContainer />

                                <div className="accountLink ">
                                    Don't have an account?{" "}
                                    <a
                                        href="#"
                                        style={{
                                            textDecoration: "none",
                                            color: "#1E1EF0",
                                            fontSize: "15px",
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

export default Login;
