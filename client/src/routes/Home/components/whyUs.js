import "../components/home.css";
import { Container } from "react-bootstrap";
import img1 from "../../../assests/images/Why us img 1.PNG";
import img2 from "../../../assests/images/Why us img 2.PNG";
import img3 from "../../../assests/images/Why us img 3.PNG";

function WhyUs() {
  return (
    <>
      {/* Main container for the "Why Us" section */}
      <Container id="whyus" className="py-5 p-3">
        {/* Main heading */}
        <h1 className="text-center whyUsMainHeading">
          Discover Your Perfect Career Path with Us
        </h1>
        <br></br>
        
        {/* Container for the second heading */}
        <Container className="whyUsSecondHeadingCont">
          {/* Second heading */}
          <h2 className="text-center whyUsSecondHeading">
            Experience the difference with our unparalleled recruitment
            solutions that connect talent with opportunity.
          </h2>
        </Container>
        
        {/* Container for the content */}
        <Container className="pt-5 pb-5">
          <div className="d-flex justify-content-between flex-wrap text-center p-3 gap-3">
            {/* First content block */}
            <div className="whyUsContentCont">
              <img className="whyUsImg" src={img1} />
              <h1 className="whyUsContHeader pt-2">Cutting-Edge Technology</h1>
              <p className="whyUsContText pt-2">
                Our state-of-the-art platform combines intelligent matching
                capabilities, user-friendly interfaces to ensure seamless and
                efficient job searches.
              </p>
            </div>
            
            {/* Second content block */}
            <div className="whyUsContentCont">
              <img className="whyUsImg" src={img2} />
              <h1 className="whyUsContHeader pt-2">Personalized Approach </h1>
              <p className="whyUsContText pt-2">
                Our personalized approach enables us to provide tailored job
                recommendations, targeted support, and valuable career guidance.
              </p>
            </div>
            
            {/* Third content block */}
            <div className="whyUsContentCont">
              <img className="whyUsImg" src={img3} />
              <h1 className="whyUsContHeader pt-2">Unparalleled Support </h1>
              <p className="whyUsContText pt-2">
                We are committed to providing exceptional support and guidance.
                Our dedicated team of experts is readily available to assist
                you.
              </p>
            </div>
          </div>
        </Container>
      </Container>
      
      {/* Commented out code */}
      {/* 
      <div
        class="jumbotron jumbotron-fluid w-100 pt-5 pb-5 mb-5"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div
          class="ms-4 me-4 col-lg-6 p-4 text-white"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
          <h1 class="">2 Million+ developers</h1>
          <h1>from 150 countries</h1>
          <h1>have already joined Equipment</h1>
          <p class="lead">
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p>
        </div>
      </div>
      */}
    </>
  );
}

export default WhyUs;
