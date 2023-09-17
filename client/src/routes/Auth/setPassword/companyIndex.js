// Import necessary dependencies and styles
import "../Login/components/Login.css";
import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Register() {
  // Initialize the React Router's navigation hook
  const navigate = useNavigate();

  // Extract token from the URL params
  const paramData = useParams();
  const token = paramData && paramData.id;

  // Console log the token (for debugging purposes)
  console.log("====", token);

  // Function to navigate back to the login page
  function loginButton() {
    navigate("/loginAsCompany");
  }

  // State variables for password and confirm password fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [loader, setLoader] = useState("SET PASSWORD");

  // Function to toggle the password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to toggle the confirm password visibility
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // User Registration
  const UserRegister = () => {
    return "/login"; // Placeholder return value, should be updated as needed
  };

  // Initial form data state
  const initialFormData = {
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
  const { password, confirmPassword } = formData;

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please enter all fields");
    } else {
      setLoader("LOADING ...");

      // Send a POST request to set the new password
      let passwords = formData.password;
      fetch("/company/setPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
        body: JSON.stringify({ token, passwords }),
      })
        .then((response) => {
          if (!response.ok) {
            setLoader("SET PASSWORD");
            toast.error("Error sending data to the backend.");
            throw new Error("Error sending data to the backend.");
          }

          // Reset the form and show success message
          setFormData(initialFormData);
          toast.success("New Password is set Successfully");
          setLoader("SET PASSWORD");
        })
        .catch((error) => {
          // Handle error here
          setLoader("SET PASSWORD");
          toast.error("Some error occurred");

          console.log("Error sending data:", error);
        });
    }
  };

  // Return the JSX for the component
  return (
    <>
      <div>
        <div className="backgroundIMAGE"></div>
        <div className="container loginBox Card col-md-4   ">
          <div className="note pt-3 pb-3">
            <span className="loginHeading "> set New Password</span>
          </div>

          <div>
            <div class="col-sm-10 offset-1 p-2">
              <div class="text-center">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
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
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicConfirmPassword"
                  >
                    <InputGroup>
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
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
                            backgroundColor: "transparent",
                            backgroundColor: "transparent",
                            position: "absolute",
                            top: "17px",
                            right: "0",
                            textAlign: "center",
                          }}
                          onClick={handleToggleConfirmPassword}
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
                  {formData.confirmPassword !== formData.password && (
                    <Form.Text className="text-danger">
                      Passwords do not match.
                    </Form.Text>
                  )}
                  <button className="loginBtn mb-3" onClick={UserRegister}>
                    {loader}
                  </button>
                </Form>

                <div className="accountLink pt-3">
                  Back{" "}
                  <a
                    href="#"
                    style={{
                      textDecoration: "none",
                      color: "#6D0E9D",
                      fontSize: "14px",
                    }}
                    onClick={loginButton}
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

export default Register;
