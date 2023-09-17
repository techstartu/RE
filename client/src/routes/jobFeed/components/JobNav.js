import React, { useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import "./jobNav.css";
import { Link } from "react-router-dom";

import { useJobContext } from "../../../useContext/jobContext";

const JobNav = ({ Search }) => {
    // State variables for the "What" and "Where" search inputs
    const [what, setWhat] = useState("");
    const [where, setWhere] = useState("");

    // Destructuring values from the job context
    const { setSearchLocation, setSearchSector, searchLocation, searchSector } =
        useJobContext();

    // Function to handle the search button click
    const handleSearch = () => {
        // Update the search location and sector in the job context
        setSearchLocation(where);
        setSearchSector(what);
    };

    return (
        <div className="jobFeedFilter">
            {/* "What" filter input */}
            <div className="parent-jobNav-filter">
                <div className="filter ">
                    <label for="what" className="what-heading-jobNav">
                        What
                    </label>
                    <input
                        className="jobNavFilter-2"
                        placeholder='e.g. "teacher"'
                        value={what}
                        defaultValue={searchSector}
                        onChange={(e) => setWhat(e.target.value)}
                    />
                </div>

                {/* "Where" filter input */}
                <div className="filter ">
                    <label for="where" className="what-heading-jobNav">
                        Where
                    </label>
                    <input
                        className="jobNavFilter-2"
                        placeholder="town or postcode"
                        value={where}
                        defaultValue={searchLocation}
                        onChange={(e) => setWhere(e.target.value)}
                    />
                </div>
            </div>

            {/* Search button and Browse Jobs link */}
            <div className="filter">
                <button onClick={handleSearch}>Search Jobs</button>
                {/* <Link to="">
          Browse Jobs
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="5"
            height="8"
            viewBox="0 0 5 8"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.126247 0.109456C-0.0420828 0.255398 -0.0420828 0.492016 0.126247 0.637958L3.95939 3.9613L0.126247 7.28463C-0.0420828 7.43057 -0.0420828 7.66719 0.126247 7.81313C0.294576 7.95908 0.567492 7.95908 0.735822 7.81313L4.87375 4.22555C4.95459 4.15546 5 4.06041 5 3.9613C5 3.86218 4.95459 3.76713 4.87375 3.69704L0.735822 0.109456C0.567492 -0.0364854 0.294576 -0.0364854 0.126247 0.109456Z"
              fill="#1E1EF0"
            />
          </svg>
        </Link> */}
            </div>
        </div>
    );
};

export default JobNav;
