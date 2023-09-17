import React from "react";
import Navbar from "../Navbar";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import guyWithMic from "../../../assests/images/guy-with-microphone.png";
import womenInRedDress from "../../../assests/images/women-in-red-dress.png";
import Header from "../../Home/components/header";
import Footer from "../../Home/components/footer";
import Bulb from "../../../assests/svg/Bulb";
import HandShake from "../../../assests/svg/handshakeSvg";
import Chart from "../../../assests/svg/chart";

const styleH2 = {
  color: "#3E055B",
  fontFamily: "Poppins",
  fontSize: "50px",
  fontStyle: "normal",
  fontWeight: 400,
  letterSpacing: "1.44px",
  maxWidth: "500px",
  textAlign: "left",
};

const Home = () => {
  const navigate = useNavigate();

  const handlePostJob = () => {
    if (
      localStorage.getItem("userType") === "company" &&
      localStorage.getItem("token")
    )
      navigate("/company/jobbasics");
    else navigate("/company/createaccount");
  };
  return (
    <>
      <Header active="company" />
      <div className="company-home-main-container">
        <div className="company-home-hero-container">
          <div className="company-home-welcome-container">
            <h1 className="company-home-welcome-heading">
              Discover Your
            </h1>
            {/* added h1 tag in a div for styling purposes */}
            <div className="company-home-h1">

            <h1 className="">Dream Career</h1>
            </div>
            <h3 className="company-home-welcome-para mb-4 ">Find Top Talent!</h3>
            <button
              className="company-home-action-button_1"
              onClick={handlePostJob}
            >
              Post Job
            </button>
          </div>
          <div className="company-home-welcome-image">
            <img src={guyWithMic} alt="" />
          </div>
        </div>
        {/* added bootstrap styles to adjust the margin */}
        {/* added an icon-sention */}
        
            
        <div id="whyus" className="py-5 p-3 no-mwidth mb-5">
          {/* added bootstrap styles to adjust the content in center */}
          <div className=" d-flex justify-content-center">
          <h1 className="text-center whyUsMainHeading ">Our Approach</h1>

          </div>
          <br></br>

          <div className="icons-section d-flex mt-5">
                  <div className="icon-handshake">
                        <div><HandShake/></div>
                        <h4>Wer'e trusted</h4>
                        
                  </div>

                  <div className="icon-handshake">
                        <div><Bulb/></div>
                        <h4>We're #1 choice!</h4>
                        
                  </div>

                  <div className="icon-handshake">
                        <div><Chart/></div>
                        <h4>We deliever results!</h4>
                        
                  </div>
                 
        </div>
          {/* <div className="whyUsSecondHeadingCont">
            <h2
              className="text-center whyUsSecondHeading"
              style={{ color: "#404145", maxWidth: "900px" }}
            >
              Experience the difference with our unparalleled recruitment
              solutions that connect talent with opportunity.
            </h2>
          </div> */}
          {/* <div className="pt-5 pb-5 no-mwidth">
            <div className="d-flex justify-content-between flex-wrap text-center p-3 gap-3">
              <div className="whyUsContentCont">
                <h1 className="whyUsContHeader pt-2">Understand who you are</h1>
                <p className="whyUsContText pt-2">
                  You tell us what your DNA is and we will match you with the
                  right candidate.
                </p>
              </div>
              <div className="whyUsContentCont">
                <h1 className="whyUsContHeader pt-2">Identify your needs</h1>
                <p className="whyUsContText pt-2">
                  What skills, but above all what qualities will make it
                  possible to establish a harmonious and positive working
                  environment between you and your future employee?
                </p>
              </div>
              <div className="whyUsContentCont">
                <h1 className="whyUsContHeader pt-2">
                  Select the right candidates
                </h1>
                <p className="whyUsContText pt-2">
                  Deside Recrutement favours quality over quantity. We will
                  present you with the best and the most relevant candidates to
                  match your requirement
                </p>
              </div>
            </div>
          </div> */}
          {/* commented bacause no static values */}
          {/* <div className="discover-candidates-section">
            <div>
              <h2>Discover how many canidatates are in your area</h2>
            </div>
            <div className="discover-candidates-select-container">
              <div style={{ width: "100%" }}>
                <label htmlFor="candidate-sector">Choose a sector</label>
                <select name="" id="candidate-sector">
                  <option value="">Sector</option>
                  <option value="Example Sector"> Example sector</option>
                </select>
              </div>
              <div style={{ width: "100%" }}>
                <label htmlFor="candidate-location">Choose a location</label>
                <select name="" id="candidate-location">
                  <option value="">Location</option>
                  <option value="London">London</option>
                </select>
              </div>
              <div className="divider-div" />
              <div className="candidates-label-div">
                <p className="candidates-para">15000</p>
                <p className="candidates-para-text">Registered Candidates</p>
              </div>
            </div>
          </div> */}
        </div>

        
        <div className="company-home-perfect-fit-container">
          <div className="company-home-perfect-fit-desc-container">
            {/* added margin-bottom bootstrap */}
            <h3 className="company-home-perfect-fit-heading mb-3 
            ">
              Find your perfect fit
            </h3>
            {/* added margin-top bootstrap and added a p tag in a div */}
            <div className="mt-5">
            <p className="company-home-perfect-fit-para">
              
               Post your job openings today and start building
              your dream team! 
              
            </p>
            </div>
            <button
            // added the margin-top
              className="company-home-action-button mt-5"
              onClick={() => {
                navigate("/company/createaccount");
              }}
            >
              Post Job
            </button>
          </div>
          <div className="company-home-perfect-fit-image">
            <img src={womenInRedDress} alt="" />
          </div>
        </div>
        <div className="company-home-consultant-container">
          <div className="company-home-consultant-heading-container">
            <h2 className="company-home-consultant-heading">
              Request a consultant
            </h2>
          </div>
          <div className="company-home-consultant-para-container ">
            
            <p className="company-home-consultant-para">
              Get in touch with our recruitment specialists to discuss your
              hiring needs
            </p>
          </div>
          <div className="company-home-consultant-form-container">
            <form action="" className="company-home-consultant-form">
              <div className="consultant-form-top-div">
                <div>
                  <label htmlFor="">Name</label>
                  <input type="text" name="" id="" placeholder="Name" />
                </div>
                <div>
                  <label htmlFor="">Company Name</label>
                  <input type="text" name="" id="" placeholder="Company name" />
                </div>
              </div>
              <div>
                <label htmlFor="">Email Address</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Email@gmail.com"
                />
              </div>{" "}
              <div>
                <label htmlFor="">Location</label>
                <input type="text" name="" id="" placeholder="Location" />
              </div>{" "}
              <div>
                <label htmlFor="">Industry</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Information Technology"
                />
              </div>{" "}
              <div>
                <label htmlFor="">Phone No</label>
                <input type="text" name="" id="" placeholder="Your phone" />
              </div>{" "}
              <div>
                <label htmlFor="">Date</label>
                <input type="date" name="" id="" placeholder="mm/dd/yyyy" />
              </div>{" "}
              <div>
                <label htmlFor="">Message</label>
                <textarea type="text" name="" id="" />
              </div>
              <button type="submit" className="consultant-form-submit-button">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
        {/* <div className="company-home-links-container">
          <div className="company-home-link-holder">
            <h6>Jobs</h6>
            <ul>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Job search</a>
              </li>
              <li>
                <a href="#">Recruiter directory</a>
              </li>
              <li>
                <a href="#">Work from home</a>
              </li>
              <li>
                <a href="#">Browse jobs</a>
              </li>
              <li>
                <a href="#">Browse locations</a>
              </li>
              <li>
                <a href="#">Popular searches</a>
              </li>
              <li>
                <a href="#">Career advice</a>
              </li>
              <li>
                <a href="#">Tax calculator</a>
              </li>
              <li>
                <a href="#">Average salary checker</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
              <li>
                <a href="#">Contact a Reed office</a>
              </li>
            </ul>
          </div>
          <div className="company-home-link-holder">
            <h5>Recruiter</h5>
            <ul>
              <li>
                <a href="">Recruiter site</a>
              </li>
              <li>
                <a href="">Post a job</a>
              </li>
              <li>
                <a href="">CV Search</a>
              </li>
              <li>
                <a href="">Recruitment agencies</a>
              </li>
              <li>
                <a href="">Recruiter Advice</a>
              </li>
            </ul>
          </div>
          <div className="company-home-link-holder">
            <h5>Courses</h5>
            <ul>
              <li>
                <a href="">Help</a>
              </li>
              <li>
                <a href="">Contact us</a>
              </li>
              <li>
                <a href="">Find a course</a>
              </li>
              <li>
                <a href="">View all subjects</a>
              </li>
              <li>
                <a href="">Discount courses</a>
              </li>
              <li>
                <a href="">Online courses</a>
              </li>
              <li>
                <a href="">Free courses</a>
              </li>
              <li>
                <a href="">Awarding body directory</a>
              </li>
              <li>
                <a href="">Career guides</a>
              </li>
              <li>
                <a href="">Advertise a course</a>
              </li>
            </ul>
          </div>
          <div className="company-home-link-holder">
            <h5>More from Reed.co.uk</h5>
            <ul>
              <a href="">
                <li>About us</li>
              </a>
              <a href="">
                <li>Careers at Reed.co.uk</li>
              </a>
              <a href="">
                <li>Press office</li>
              </a>
              <a href="">
                <li>Corporate governance</li>
              </a>
              <a href="">
                <li>Modern slavery statement</li>
              </a>
            </ul>
          </div>
          <div className="company-home-link-holder">
            <h5>Reed</h5>
            <ul>
              <li>
                <a href="">Tempzone: timesheets & holiday</a>
              </li>
              <li>
                <a href="">Authorise timesheets</a>
              </li>
              <li>
                <a href="">Reed Group Services</a>
              </li>
              <li>
                <a href="">Reed Global</a>
              </li>
              <li>
                <a href="">Reed in Partnership</a>
              </li>
              <li>
                <a href="">Careers with Reed</a>
              </li>
              <li>
                <a href="">James Reed - Official Site</a>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default Home;
