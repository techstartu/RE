import React from "react";
import "../components/personalinfo.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidenav = () => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const handleLogout = () => {
    // Implement your logout logic here
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    navigate("/");
  };
  const currProgress = localStorage.getItem("progress");

  return (
    <div className={`sidenav ${isSidebarOpen ? "open" : ""}`}>
      <div
        className={`hamburger-sidenav ${isSidebarOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      >
        <AiOutlineMenu
          size={30}
          style={isSidebarOpen ? { color: "white" } : { color: "#6d0e9d" }}
        />
      </div>
      <div className="profile-heading">Profile</div>
      <div className="sidenav-buttons">
        <NavLink
          to="/personal-information"
          activeClassName="active"
          className="sidenav-button"
        >
          Personal Information
        </NavLink>
        <NavLink
          to="/experiences/submit-exp"
          activeClassName="active"
          className="sidenav-button"
        >
          Experiences
        </NavLink>
        <NavLink
          to="/education/submit-edu"
          activeClassName="active"
          className="sidenav-button"
        >
          Education
        </NavLink>
        <NavLink
          to="/courses/submit-cour"
          activeClassName="active"
          className="sidenav-button"
        >
          Courses
        </NavLink>
        <NavLink
          to="/certifications/submit-cert"
          activeClassName="active"
          className="sidenav-button"
        >
          Certifications
        </NavLink>
        <NavLink
          to="/awards/submit-awards"
          activeClassName="active"
          className="sidenav-button"
        >
          Awards
        </NavLink>
        <NavLink
          to="/publications/submit-pub"
          activeClassName="active"
          className="sidenav-button"
        >
          Publications
        </NavLink>
        <NavLink
          to="/languages/submit-lang"
          activeClassName="active"
          className="sidenav-button"
        >
          Languages
        </NavLink>
        <NavLink
          to="/skills/submit-skills"
          activeClassName="active"
          className="sidenav-button"
        >
          Skills
        </NavLink>
      </div>
      <div className="progress-circle">
        <div className="progress-container">
          <CircularProgressbar
            value={currProgress}
            text={`${currProgress}%`}
            styles={{
              path: {
                stroke: "#D4ACE9",
                strokeWidth: 5.5,
              },
              text: {
                fill: "#FFF",
                fontFamily: "Poppins",
              },
              trail: {
                stroke: "white",
                strokeWidth: 5.5,
                strokeLinecap: "round",
              },
            }}
          />
        </div>
      </div>

      <div className="user-dropdown-container">
        <div className="user-icon" onClick={toggleDropdown}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 45 45"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M30.6243 16.3337C30.6243 18.4996 29.7639 20.5768 28.2324 22.1084C26.7008 23.6399 24.6236 24.5003 22.4577 24.5003C20.2917 24.5003 18.2145 23.6399 16.683 22.1084C15.1514 20.5768 14.291 18.4996 14.291 16.3337C14.291 14.1677 15.1514 12.0905 16.683 10.559C18.2145 9.02741 20.2917 8.16699 22.4577 8.16699C24.6236 8.16699 26.7008 9.02741 28.2324 10.559C29.7639 12.0905 30.6243 14.1677 30.6243 16.3337ZM26.541 16.3337C26.541 17.4166 26.1108 18.4552 25.345 19.221C24.5793 19.9868 23.5406 20.417 22.4577 20.417C21.3747 20.417 20.3361 19.9868 19.5703 19.221C18.8046 18.4552 18.3743 17.4166 18.3743 16.3337C18.3743 15.2507 18.8046 14.2121 19.5703 13.4463C20.3361 12.6805 21.3747 12.2503 22.4577 12.2503C23.5406 12.2503 24.5793 12.6805 25.345 13.4463C26.1108 14.2121 26.541 15.2507 26.541 16.3337Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.4583 0C10.0552 0 0 10.0552 0 22.4583C0 34.8615 10.0552 44.9167 22.4583 44.9167C34.8615 44.9167 44.9167 34.8615 44.9167 22.4583C44.9167 10.0552 34.8615 0 22.4583 0ZM4.08333 22.4583C4.08333 26.7254 5.53904 30.6536 7.97884 33.7733C9.69227 31.5231 11.9027 29.6996 14.4375 28.4451C16.9723 27.1907 19.7628 26.5392 22.591 26.5417C25.3827 26.539 28.1381 27.1736 30.6473 28.3971C33.1566 29.6206 35.3534 31.4007 37.0706 33.6018C38.8396 31.2816 40.0306 28.5736 40.5453 25.7017C41.0599 22.8298 40.8832 19.8767 40.0299 17.0867C39.1767 14.2966 37.6712 11.7499 35.6383 9.65716C33.6053 7.56443 31.1033 5.98588 28.3391 5.05212C25.575 4.11837 22.6282 3.85624 19.7426 4.28745C16.8571 4.71865 14.1157 5.83078 11.7452 7.53182C9.37482 9.23286 7.44353 11.4739 6.11118 14.0695C4.77882 16.6652 4.0837 19.5407 4.08333 22.4583ZM22.4583 40.8333C18.2402 40.8397 14.1493 39.3885 10.878 36.7255C12.1947 34.8405 13.9473 33.3015 15.9866 32.2393C18.026 31.1772 20.2917 30.6234 22.591 30.625C24.8617 30.6232 27.1 31.1631 29.1202 32.2C31.1403 33.2369 32.8838 34.7407 34.2061 36.5867C30.9094 39.3362 26.7511 40.8394 22.4583 40.8333Z"
              fill="white"
            />
          </svg>
          {dropdownVisible && (
            <div
              className={`dropdown-profile-log ${
                dropdownVisible ? "drop-up" : ""
              }`}
            >
              <button className="logout-button-profile" onClick={handleLogout}>
                Logout
              </button>
              <button
                className="logout-button-profile"
                onClick={() => navigate("/jobfeed")}
              >
                Job Feed
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
