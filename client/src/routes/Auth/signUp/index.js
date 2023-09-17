// Import necessary dependencies and styles
import "../Login/components/Login.css";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaFacebook } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

// Import the Header component
import Header from "../../Home/components/header";

function Register() {
    // Initialize the React Router's navigation hook
    const navigate = useNavigate();

    // Function to navigate back to the login page
    function loginButton() {
        navigate("/Login");
    }

    // State variables for password and confirm password fields
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [loader, setLoader] = useState("Next");

    // Console log the password validity (for debugging purposes)
    console.log("===password", isValidPassword);

    // Function to toggle the password visibility
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    // Function to toggle the confirm password visibility
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // User Registration

    // State variable for displaying messages
    const [message, setMessage] = useState("");

    // Function to define the route for user registration
    const UserRegister = () => {
        return "/login"; // Placeholder return value, should be updated as needed
    };

    // Initial form data state
    const initialFormData = {
        email: "",
        password: "",
        confirmPassword: "",
    };

    // State to manage form data
    const [formData, setFormData] = useState(initialFormData);

    // Function to handle form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "password") {
            // Regex pattern for password validation
            const regexPattern =
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            const isValid = regexPattern.test(value);
            console.log("===", isValid);

            // Update the state with the new value
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));

            // Update the validity of the password
            setIsValidPassword(isValid);
        } else {
            // For other fields, update the state without validation
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    // Destructure form data from state
    const { email, password, confirmPassword } = formData;

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email || !password || !confirmPassword) {
            toast.error("Please enter all fields");
        } else {
            setLoader("SIGNING UP...");

            // Send a POST request to register the user
            fetch("/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                },
                body: JSON.stringify(formData),
            })
                .then((data) => data.json())
                .then((response) => {
                    console.log(response);
                    if (!response.success) {
                        toast.error(response.msg);
                        setLoader("SIGN UP");
                        return;
                    }

                    // Store user data and token in local storage
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("progress", response.completionStatus);
                    localStorage.setItem("userType", "user");
                    localStorage.setItem("user", JSON.stringify(response.user));

                    // Reset the form and show success message
                    setFormData(initialFormData);
                    setIsValidPassword(false);
                    toast.success("User is registered successfully");
                    navigate("/set-profile");
                    setLoader("SIGN UP");
                })
                .catch((error) => {
                    // Handle error here

                    setLoader("SIGN UP");
                    console.log("Error sending data:", error);
                });
        }
    };

    // Return the JSX for the component
    return (
        <>
            {/* Render the Header component with a specific page prop */}
            <Header page="authPage" />
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div className="container text-center loginBox Card col-md-4">
                    <div className="company-sign-button-register">
                        <button
                            className="signIn-navigate-company"
                            onClick={() => navigate("/login")}
                        >
                            SignIn
                        </button>
                        <button
                            className="register-navigate-company"
                            onClick={() => navigate("/signup")}
                        >
                            Register
                        </button>
                    </div>
                    <div className="company-signup-register-heading">
                        <div>Register</div>
                    </div>

                    <div>
                        <div class="col-sm-10 p-2 mx-auto">
                            <div class="text-center">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicEmail"
                                    >
                                        <label
                                            className="form-label d-flex justify-content-start  mt-1"
                                            htmlFor="form3Example3"
                                            style={{
                                                fontWeight: "600",
                                                color: "#000",
                                            }}
                                        >
                                            Register With Email
                                        </label>
                                        <Form.Control
                                            className="form-control loginInput"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="email"
                                        />
                                    </Form.Group>
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
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicConfirmPassword"
                                    >
                                        <InputGroup>
                                            <Form.Control
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                name="confirmPassword"
                                                placeholder="Confirm Password"
                                                value={formData.confirmPassword}
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
                                                        backgroundColor:
                                                            "transparent",
                                                        position: "absolute",
                                                        top: "17px",
                                                        right: "0",
                                                        textAlign: "center",
                                                        borderRadius: "10px",
                                                    }}
                                                    onClick={
                                                        handleToggleConfirmPassword
                                                    }
                                                >
                                                    {showConfirmPassword ? (
                                                        <BsFillEyeFill />
                                                    ) : (
                                                        <BsFillEyeSlashFill />
                                                    )}
                                                </span>
                                            </div>
                                        </InputGroup>
                                    </Form.Group>
                                    {formData.confirmPassword !==
                                        formData.password && (
                                        <Form.Text className="text-danger">
                                            Passwords do not match.
                                        </Form.Text>
                                    )}
                                    <button
                                        type="submit"
                                        className="loginBtn mb-3"
                                        onClick={UserRegister}
                                    >
                                        {loader}
                                    </button>
                                </Form>

                                {/* Uncomment the following section to enable social login options */}
                                {/* <div className="text-with-lines py-3">
                  <div className="line"></div>
                  <span className="text">Or continue with</span>
                  <div className="line"></div>
                </div>
                <div className=" d-flex justify-content-center gap-3 ">
                  <div>
                    <button className="inputIcons">
                      <p className="icons">
                        {" "}
                        <FcGoogle fill="#3B5998" size={20} />
                        <span>Google</span>
                      </p>
                    </button>
                  </div>
                  <button className=" inputIcons  ">
                    <p className="icons ">
                      {" "}
                      <FaFacebook fill="#3B5998" size={20} />
                      <span>Facebook</span>{" "}
                    </p>
                  </button>
                </div> */}

                                {/* Render a link to the login page */}
                                <div className="accountLink pt-3">
                                    Already have an account?{" "}
                                    <a
                                        href="#"
                                        onClick={loginButton}
                                        style={{
                                            textDecoration: "none",
                                            color: "#1E1EF0",
                                            fontSize: "14px",
                                        }}
                                    >
                                        Login
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
}

// Export the Register component
export default Register;
