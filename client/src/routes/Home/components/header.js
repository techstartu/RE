import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Dropdown } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import "./home.css";

// Header component with props active and page
function Header({ active, page }) {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");

  // Function to navigate to the Login page
  function loginButton() {
    navigate("/Login");
  }

  // Function to navigate to the Register as Company page
  function signUpButton() {
    navigate("/registerAsCompany");
  }

  // Function to handle the search input
  const handleSearch = (event) => {
    setCurrentPage(1);
    setSearchKeyword(event.target.value);
  };

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Get user information from local storage
  const user = localStorage.getItem("user");
  const isUser = localStorage.getItem("userType") === "user";
  let data = JSON.parse(user);

  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState(null); // Define the userInfo state variable

  useEffect(() => {
    // Load user info from local storage when the component mounts
    const storedUserInfo = localStorage.getItem("user-info");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo); // Set the userInfo state variable
      if (parsedUserInfo.company) {
        setEmail(parsedUserInfo.company.comp_Email);
      } else if (parsedUserInfo.user) {
        setEmail(parsedUserInfo.user.user_Email);
      } else if (parsedUserInfo.admin) {
        setEmail(parsedUserInfo.admin.admin_Email);
      }
    }
  }, []);

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      userSelect: "none",
    },
    image: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
    },
    name: {
      marginRight: "0px",
    },
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Conditional rendering based on the page prop
  if (page === "authPage") {
    return (
      <Navbar collapseOnSelect expand="lg" className="NavbarTop">
        <Container fluid className="px-5">
          <Navbar.Brand
            className="logoH"
            href="#home"
            onClick={() => navigate("/")}
          >
            Step200
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="NavbarTop">
        <Container fluid className="px-5">
          <Navbar.Brand
            className="logoH"
            href="#home"
            onClick={() => navigate("/")}
          >
            Step200
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            style={{ background: "white" }}
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            style={{ justifyContent: "space-between" }}
          >
            <Nav className="navBarLinks px-5 gap-4 ">
              <Link
                className={`${active === "job" ? "active" : ""}`}
                style={{ color: "white", fontSize: 16 }}
                to="/jobfeed"
              >
                Jobs
              </Link>
              <Link
                className={`${active === "career" ? "active" : ""}`}
                style={{ color: "white", fontSize: 16 }}
                to="/career-form"
              >
                Career Advice
              </Link>
              <Link
                className={`${active === "salary" ? "active" : ""}`}
                style={{ color: "white", fontSize: 16 }}
                to="/salary-module"
              >
                Salary Module
              </Link>
              <Link
                className={`${active === "cover" ? "active" : ""}`}
                style={{ color: "white", fontSize: 16 }}
                to="/coverletter"
              >
                Cover Letter
              </Link>
              <Link
                className={`${active === "path" ? "active" : ""}`}
                style={{ color: "white", fontSize: 16 }}
                to="/career-path"
              >
                Career Path
              </Link>
              <Link
                className={`${active === "company" ? "active" : ""}`}
                style={{ color: "white", fontSize: 16 }}
                to="/company"
              >
                Recruiting? Post A Job
              </Link>
            </Nav>
            {!user ? (
              <Nav>
                <button
                  className="getSignUpBtn"
                  style={{ background: "transparent", fontSize: 16 }}
                  onClick={signUpButton}
                >
                  Register CV
                </button>
                <button
                  className="getLogInBtn"
                  style={{
                    background: "transparent",
                    fontSize: 16,
                    border: "none",
                  }}
                  onClick={loginButton}
                >
                  Sign In
                </button>
              </Nav>
            ) : (
              <Nav className="navBarLinks me-3">
                <div>
                  <Dropdown
                    drop="left"
                    align="end"
                    show={isDropdownOpen}
                    onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
                  >
                    <div className="account_icon">
                      <FaUser
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          color: "white",
                        }}
                        // className="ri-account-circle-line"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      />
                    </div>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        style={{
                          textAlign: "center",
                          borderBottom: "1px solid black",
                        }}
                        onClick={() => {
                          if (isUser) navigate("/personal-information");
                          else navigate("/companydashboard");
                        }}
                      >
                        {/* <i
                          className="ri-account-box-fill"
                          style={{ marginRight: "2%" }}
                        ></i> */}
                        Dashboard
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={handleLogout}
                        style={{ textAlign: "center" }}
                      >
                        {/* <i
                          className="ri-logout-box-r-line"
                          style={{ marginRight: "2%" }}
                        ></i> */}
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
