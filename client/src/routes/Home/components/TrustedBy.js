// Importing CSS styles
import "../components/home.css";

// Importing images
import walmart from "../../../assests/images/walmart.png";
import google from "../../../assests/images/google.png";
import fedx from "../../../assests/images/fedX.png";
import fedex from "../../../assests/images/fedEx.png";
import microsoft from "../../../assests/images/microsoft.png";
import amazon from "../../../assests/images/amazon.png";
import ola from "../../../assests/images/ola.png";

// TrustedBy component
function TrustedBy() {
  return (
    <>
      {/* Container for trusted images */}
      <div className="pt-5 pb-5">
        {/* First row of trusted images */}
        <div className="container trustedByImgContainer pt-5 pb-2">
          <div className="trustedByImg text-center mx-3">
            <img src={fedex} alt="FedEx Logo" />
          </div>
          <div className="trustedByImg text-center mx-3">
            <img src={google} alt="Google Logo" />
          </div>
          <div className="trustedByImg text-center mx-3">
            <img src={ola} alt="Ola Logo" />
          </div>
          <div className="trustedByImg text-center mx-3">
            <img src={microsoft} alt="Microsoft Logo" />
          </div>
        </div>

        {/* Second row of trusted images */}
        <div className="container trustedByImgContainer pb-5 pt-2">
          <div className="trustedByImg text-center mx-3">
            <img src={amazon} alt="Amazon Logo" />
          </div>
          <div className="trustedByImg text-center mx-3">
            <img src={fedx} alt="FedEx Logo" />
          </div>
          <div className="trustedByImg text-center mx-3">
            <img src={walmart} alt="Walmart Logo" />
          </div>
        </div>
      </div>
    </>
  );
}

export default TrustedBy; // Export the TrustedBy component
