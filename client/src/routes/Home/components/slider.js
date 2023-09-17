import { Link, useNavigate } from "react-router-dom"; // Importing necessary modules
import { useState } from "react"; // Importing useState from React

import { useJobContext } from "../../../useContext/jobContext"; // Importing job context
import Style from "../home.module.css"; // Importing CSS styles
import { FaAngleRight } from "react-icons/fa"; // Importing an icon

// Slider component
function Slider() {
  const { setSearchLocation, setSearchSector } = useJobContext(); // Accessing context values
  const navigate = useNavigate(); // Accessing navigation function from React Router
  const [what, setWhat] = useState(""); // State variable for "What" input
  const [where, setWhere] = useState(""); // State variable for "Where" input

  function loginButton() {
    navigate("/LoginAsCompany"); // Function to navigate to the login page
  }

  const handleSearch = () => {
    setSearchLocation(where); // Set the search location in the context
    setSearchSector(what); // Set the search sector in the context
    navigate("/jobfeed"); // Navigate to the job feed page
  };

  return (
    <div className={`${Style.HomeSlider}`}>
      {/* Header */}
      
      <h1 className={`${Style.h1}`}>Discover Your Dream Career</h1>
      <h3 className={`${Style.h3}`}>find a job you’ll love</h3>
      
      <div>
        <div className="d-flex flex-column">
          {/* Input for "What" */}
          <label for="what">What</label>
          <input
            placeholder='e.g. "teacher"'
            value={what}
            onChange={(e) => setWhat(e.target.value)}
          />
        </div>

        <div className="d-flex flex-column">
          {/* Input for "Where" */}
          <label for="where">Where</label>
          <input
            placeholder="town or postcode"
            value={where}
            onChange={(e) => setWhere(e.target.value)}
          />
        </div>

        <div className="px-1">
          {/* Search button */}
          <button onClick={handleSearch}>Search Jobs</button>

          {/* Browse Jobs link */}
        {/*  <Link to="">
            Browse Jobs
            <FaAngleRight /> 
          </Link>
        */}
          
        </div>
      </div>
    </div>
  );
}

export default Slider; // Export the Slider component
