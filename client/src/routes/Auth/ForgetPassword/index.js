// Import necessary dependencies and styles
import "../Login/components/Login.css";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../../Home/components/header";

function Login() {
  // Initialize React Router's navigation hook
  const navigate = useNavigate();

  // Initialize state variables
  const [loader, setLoader] = useState("FORGOT PASSWORD");
  const initialFormData = {
    email: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Destructure email from the form data
  const { email } = formData;

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the email field is empty
    if (!email) {
      toast.error("Please enter all fields");
    } else {
      setLoader("LOADING ...");

      // Send a POST request to the server for password recovery
      fetch("/user/forgetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            toast.error("Invalid email");
            setLoader("FORGOT PASSWORD");
          }
          return response.json(); // Parse the response JSON
        })
        .then((data) => {
          console.log("==data", data);
          // Check if the response contains the token and user data
          if (data) {
            setFormData(initialFormData);
            toast.success("Email is sent to your account. Please check your Gmail");
            setLoader("FORGOT PASSWORD");
          }
        })
        .catch((error) => {
          // Handle error here
          setLoader("FORGOT PASSWORD");
          console.log("Error sending data:", error);
        });
    }
  };

  // Handle Google login
  const google = () => {
    window.open("/auth/google", "_self");
  };

  // Navigate to the standard login page
  function registerBtn() {
    navigate("/login");
  }

  // Navigate to the job feed page
  function jobFeedPage() {
    navigate("/jobFeed");
  }

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
        <div className="backgroundIMAGE"></div>
        <div class="container Card col-lg-4 pt-2">
          <div class="note pb-3">
            <span className="loginHeading">Recover Password</span>
          </div>

          <div>
            <div class="col-sm-10 offset-1 p-2">
              <div className="text-center  form-group">
                {/* Login form */}
                <Form onSubmit={handleSubmit}>
                  <p>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        className="form-control loginInput"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                      />
                    </Form.Group>
                  </p>

                  <button type="submit" className="loginBtn mb-3 mt-2">
                    {loader}
                  </button>
                </Form>

                {/* Link to go back to standard login */}
                <div className="accountLink mt-3">
                  Back to{" "}
                  <a
                    onClick={registerBtn}
                    style={{
                      textDecoration: "none",
                      color: "#6D0E9D",
                      fontSize: "14px",
                    }}
                  >
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast container for displaying notifications */}
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
