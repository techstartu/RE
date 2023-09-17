// Import necessary Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Import components for the homepage
import Header from "./components/header";
import Slider from "./components/slider";
import Services from "./components/services";
import BestPart from "./components/bestPart";
import WhyUs from "./components/whyUs";
import Footer from "./components/footer";
import TrustedBy from "./components/TrustedBy";
import Newsletter from "./components/Newsletter";

// Define the Homepage component
function Homepage() {
  return (
    <>
      {/* Render the Header component */}
      <Header />
      
      {/* Render the Slider component */}
      <Slider />
      
      {/* Render the Services component */}
      <Services />
      
      {/* Render the BestPart component */}
      <BestPart />

      {/* 
        Uncomment the following lines to render additional components:
        - TrustedBy component
        - WhyUs component
        - Newsletter component
      */}
      {/* <TrustedBy /> */}
      {/* <WhyUs /> */}
      {/* <Newsletter /> */}

      {/* Render the Footer component */}
      <Footer />
    </>
  );
}

// Export the Homepage component
export default Homepage;
