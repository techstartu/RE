import "../components/home.css";

// import {
//   FaBeer,
//   FaFacebook,
//   FaTwitter,
//   FaGoogle,
//   FaInstagram,
//   FaLinkedin,
//   FaGithub,
// } from "react-icons/fa";
import { Container, Nav, Navbar, Row } from "react-bootstrap";

function Footer() {
  return (
    <>
      <hr />
      <div className="footer  pb-3">
        {/* <div className="footerUpperSection">
          <div className="footerColumn">
            <h3 className="footerLinksHeader">Info</h3>
            <ul className="footerLinks">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Download Apps</a>
              </li>
              <li>
                <a href="#">The Stack App</a>
              </li>
              <li>
                <a href="#">Partnerships</a>
              </li>
              <li>
                <a href="#">Affiliated Programs</a>
              </li>
            </ul>
          </div>
          <div className="footerColumn">
            <h3 className="footerLinksHeader">Features</h3>
            <ul className="footerLinks">
              <li>
                <a href="#">Invoicing</a>
              </li>
              <li>
                <a href="#">Task Management</a>
              </li>
              <li>
                <a href="#">Contracts</a>
              </li>
              <li>
                <a href="#">Payments</a>
              </li>
              <li>
                <a href="#">Recurring Payments</a>
              </li>
              <li>
                <a href="#">Expense Tracking</a>
              </li>
              <li>
                <a href="#">Reports</a>
              </li>
              <li>
                <a href="#">Proposals</a>
              </li>
              <li>
                <a href="#">Time Tracking</a>
              </li>
            </ul>
          </div>
          <div className="footerColumn">
            <h3 className="footerLinksHeader">Tools</h3>
            <ul className="footerLinks">
              <li>
                <a href="#">Free Invoice Templates</a>
              </li>
              <li>
                <a href="#">Free Invoice Generator</a>
              </li>
              <li>
                <a href="#">Free Invoicing Guide</a>
              </li>
              <li>
                <a href="#">Self Employment Tax Collector</a>
              </li>
              <li>
                <a href="#">Quarterly Tax Collector</a>
              </li>
              <li>
                <a href="#">Business Name Generator</a>
              </li>
            </ul>
          </div>
          <div className="footerColumn">
            <h3 className="footerLinksHeader">Helpful Links</h3>
            <ul className="footerLinks">
              <li>
                <a href="#">Williams and Harricks</a>
              </li>
              <li>
                <a href="#">Anywhere Workes</a>
              </li>
              <li>
                <a href="#">Freshbooks Alternative</a>
              </li>
              <li>
                <a href="#">Quickbooks Alternative</a>
              </li>
              <li>
                <a href="#">Harvest Alternative</a>
              </li>
              <li>
                <a href="#">Wave App Alternative</a>
              </li>
              <li>
                <a href="#">Design DB</a>
              </li>
            </ul>
          </div>
          <div className="footerColumn">
            <h3 className="footerLinksHeader">Policies</h3>
            <ul className="footerLinks">
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Download Apps</a>
              </li>
              <li>
                <a href="#">The Stack App</a>
              </li>
              <li>
                <a href="#">Partnerships</a>
              </li>
              <li>
                <a href="#">Affiliated Programs</a>
              </li>
            </ul>
          </div>
        </div> */}

        <br></br>

        <div className="footerBottomSection">
          <Navbar>
            <Container>
              <Nav className="footerLogoText">
                <Navbar.Text>
                  <p className="my-auto" style={{ color: "white" }}>
                    CopyRights&copy;Step200 2023{" "}
                  </p>
                </Navbar.Text>
              </Nav>
              {/* <Navbar.Collapse className="justify-content-end footerSocialLinks">
                <Navbar.Text>
                  <a href="#" className="me-4 fs-4 text-reset">
                    <FaFacebook />
                  </a>
                  <a href="#" className="me-4 fs-4 text-reset">
                    <FaTwitter />
                  </a>
                  <a href="#" className="me-4 fs-4 text-reset">
                    <FaGoogle />
                  </a>
                  <a href="#" className="me-4 fs-4 text-reset">
                    <FaInstagram />
                  </a>
                  <a href="#" className="me-4 fs-4 text-reset">
                    <FaLinkedin />
                  </a>
                  <a href="#" className="me-3 fs-4 text-reset">
                    <FaGithub />
                  </a>
                </Navbar.Text>
              </Navbar.Collapse> */}
            </Container>
          </Navbar>
        </div>
      </div>
    </>
  );
}

export default Footer;
