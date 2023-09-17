import React, { useEffect, useState } from "react";
import { Container, Row, Pagination, Button } from "react-bootstrap";
import Header from "../Home/components/header";
import Footer from "../Home/components/footer";
import "./UserSide.css";
// import { jobList, JobDetail } from "./components/Data";
import JobCard from "./components/jobCard";
import seach from "../../assests/images/search.png";
import loc from "../../assests/images/location.png";
import JobNav from "./components/JobNav";
import { useNavigate } from "react-router-dom";
import { FaClock, FaFileContract, FaMapMarkerAlt } from "react-icons/fa";
import SideFilter from "./components/SideFilter";
import { useJobContext } from "../../useContext/jobContext";
import "./jobsfeed.css";
const bacgroundSelect = {
    background: "rgba(109, 14, 157, 0.19)",
};

function JobFeed() {
    const { searchLocation, searchSector } = useJobContext();
    const navigate = useNavigate();

    const [location, setLocation] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [jobList, setJobList] = useState([]);
    const [selectedJob, setSelectedJob] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [selected, setSelected] = useState(0);
    const [jobType, setJobType] = useState([]);
    const [jobLevel, setJobLevel] = useState([]);

    const [sideFilters, setSideFilters] = useState({
        location: "",
        salaryFrom: "",
        salaryTo: "",
        selectedJobtype: [],
        selectedSpecialism: [],
    });

    useEffect(() => {
        getAllJobs();

        setSelected(0);
    }, [currentPage]);

    const jobsPerPage = 6;

    const handleSearch = (event) => {
        setCurrentPage(1);
        setSearchKeyword(event.target.value);
    };

    const handleLocationChange = (event) => {
        setCurrentPage(1);
        setLocation(event.target.value);
    };

    // THIS FUNCTION IS FOR THE PURPOSE OF FILTERS ON SOME VALUES WHICH IS COMING FROM SIDEFILTER.JS COMPONENT WHICH IS IN jobFeed/components/SideFilter.js
    const filteredJobs = jobList.filter((job) => {
        // console.log(
        //   Math.floor((Date.now() - job.postedOn) / (1000 * 60 * 60 * 24))
        // );
        // console.log(sideFilters);
        var titleMatch = true,
            locationMatch = true,
            minSalary = true,
            maxSalary = true,
            jobType = true,
            specialism = true,
            datePosted = true;
        if (searchSector) {
            console.log(job.industry);
            titleMatch = job.industry
                .toLowerCase()
                .includes(searchSector.toLowerCase());
        }
        if (searchLocation)
            locationMatch = job.location
                .toLowerCase()
                .includes(searchLocation.toLowerCase());
        if (sideFilters.datePosted) {
            if (
                Math.floor(
                    (Date.now() - job.postedOn) / (1000 * 60 * 60 * 24)
                ) >= parseInt(sideFilters.datePosted)
            ) {
                datePosted = false;
            }
        }
        if (sideFilters.salaryFrom !== NaN)
            if (job.minSR < sideFilters.salaryFrom) minSalary = false;
        if (sideFilters.salaryTo !== NaN)
            if (job.maxSR > sideFilters.salaryTo) maxSalary = false;
        if (sideFilters.selectedJobtype.length)
            jobType = sideFilters.selectedJobtype.some((type) =>
                job.jobType.includes(type)
            );
        if (sideFilters.selectedSpecialism.length)
            specialism = sideFilters.selectedSpecialism.some((type) => {
                console.log(job.industry, sideFilters.selectedSpecialism);
                return job.industry.includes(type);
            });

        return (
            titleMatch &&
            locationMatch &&
            maxSalary &&
            minSalary &&
            jobType &&
            datePosted &&
            specialism
        );
        // return titleMatch && locationMatch ;
        // return true;
        // console.log(!jobType.length, !jobLevel.length);
        // if (!jobType.length && !jobLevel.length) return true;

        // for (const word of jobType) {
        //   if (job.jobType === word) return true;
        // }
        // for (const word of jobLevel) {
        //   if (job.jobLevel === word) return true;
        // }
        // // if(jobType.lenght)
        // return false;
    });

    // const sortedCurrentJobs = [...filteredJobs].sort((a, b) => {
    //   const titleA = a.jobTitle.toLowerCase();
    //   const titleB = b.jobTitle.toLowerCase();
    //   if (titleA < titleB) {
    //     return -1;
    //   }
    //   if (titleA > titleB) {
    //     return 1;
    //   }
    //   return 0;
    // });
    const sortedCurrentJobs = filteredJobs;

    // const totalJobs = filteredJobs.length;
    const totalJobs = sortedCurrentJobs.length;
    const totalPages = Math.ceil(totalJobs / jobsPerPage);

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    // const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
    const currentJobs = sortedCurrentJobs.slice(
        indexOfFirstJob,
        indexOfLastJob
    );

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const setJobIndex = (id) => {
        const selectedItem = jobList.find((item) => item._id === id);
        if (selectedItem) {
            setSelectedJob(selectedItem);
        } else {
            setSelectedJob(jobList[selected]);
        }
    };

    const getAllJobs = async () => {
        const newJobs = await fetch("/job/getalljobs");
        const resJobs = await newJobs.json();
        console.log(resJobs.jobs);
        setJobList(resJobs.jobs);
        setSelectedJob(resJobs.jobs[0]);
    };

    // THIS FUNCITON IS CALLED WHENEVER A FILTER IS APPLIED FROM SIDEFILTER.JS (passed as props to SideFilter.js) COMPONENT WHICH IS IN jobFeed/components/SideFilter.js
    const Search = (
        location,
        salaryFrom,
        salaryTo,
        selectedJobtype,
        selectedSpecialism,
        datePosted
    ) => {
        setSideFilters((prev) => {
            const newObject = {
                location,
                salaryFrom: parseInt(salaryFrom.slice(1)),
                salaryTo: parseInt(salaryTo.slice(1)),
                selectedJobtype: selectedJobtype,
                selectedSpecialism: selectedSpecialism,
                datePosted: datePosted,
            };
            return newObject;
        });
        // console.log(
        //   location,
        //   parseInt(salaryFrom.slice(1)),
        //   parseInt(salaryTo.slice(1)),
        //   selectedJobtype,
        //   selectedSpecialism
        // );
        // setJobType(jt);
        // setJobLevel(jl);
    };
    const [showFilter, setShowFilter] = useState(true);

    const toggleFilter = () => {
        const newShowFilter = !showFilter;
        setShowFilter(newShowFilter);
        localStorage.setItem("showFilter", newShowFilter);
    };
    const handleEasyApply = (item) => {
        if (localStorage.getItem("userType") === "user") {
            console.log(item);
            navigate(`/jobdetail/${item._id}`);
            return;
        }
        navigate("/login");
    };

    return (
        <>
            <Header active="job" />
            <div className="jobFeedPage">
                <JobNav Search={Search} />
                <Container fluid className="jobFeedContainer">
                    <Button
                        className="btn1 mt-2"
                        onClick={toggleFilter}
                        style={{
                            color: "#081351",
                            backgroundColor: "#fff",
                            borderColor: "#081351",
                        }}
                    >
                        Filters
                    </Button>
                    <Container className="custom-style">
                        {Search && showFilter && <SideFilter Search={Search} />}
                        <Row className="pt-4 pb-5 jobFeedDisplay">
                            {/* <div className="jobCardInJobFeed">
                <p>1,053 Account Administrator Jobs in 47080</p>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M4.29864 9.57714C4.23741 10.7405 4.3078 11.9788 3.26844 12.7583C2.7847 13.1211 2.5 13.6905 2.5 14.2952C2.5 15.127 3.1515 15.8346 4 15.8346H16C16.8485 15.8346 17.5 15.127 17.5 14.2952C17.5 13.6905 17.2153 13.1211 16.7316 12.7583C15.6922 11.9788 15.7626 10.7405 15.7013 9.57714C15.5418 6.54483 13.0365 4.16797 10 4.16797C6.96347 4.16797 4.45823 6.54482 4.29864 9.57714Z"
                      stroke="#141B34"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.75 2.60547C8.75 3.29583 9.30967 4.16797 10 4.16797C10.6903 4.16797 11.25 3.29583 11.25 2.60547C11.25 1.91511 10.6903 1.66797 10 1.66797C9.30967 1.66797 8.75 1.91511 8.75 2.60547Z"
                      stroke="#141B34"
                      stroke-width="1.5"
                    />
                    <path
                      d="M12.5 15.832C12.5 17.2128 11.3807 18.332 10 18.332C8.61925 18.332 7.5 17.2128 7.5 15.832"
                      stroke="#141B34"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>{" "}
                  Get Job Alert
                </button>
              </div> */}
                            <div className="col-lg-5 jobFeedList px-0">
                                {currentJobs.map((item, index) => (
                                    <div
                                        key={index}
                                        className="displayJobs"
                                        onClick={() => {
                                            setSelected(index);
                                            setJobIndex(item._id);
                                            // window.scrollTo({ top: 0, behavior: "smooth" });
                                            // onClick(()=>)
                                        }}
                                        // style={forBackgroundSelection(index) ? bacgroundSelect : {}}
                                    >
                                        <div className="EasyApplyPortion mb-3">
                                            <button
                                                onClick={() =>
                                                    handleEasyApply(item)
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="8"
                                                    height="8"
                                                    viewBox="0 0 8 8"
                                                    fill="none"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M1.21531 1.21531C0.600134 1.83049 1.34818 3.57593 2.88612 5.11386C4.42406 6.65183 6.16949 7.39986 6.78469 6.78469C7.39986 6.16949 6.65183 4.42406 5.11386 2.88612C3.57593 1.34818 1.83049 0.600134 1.21531 1.21531Z"
                                                        fill="white"
                                                        stroke="white"
                                                        stroke-width="0.6"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                                Easy Apply
                                            </button>
                                            <div className="iconsForJobCard">
                                                <div
                                                    style={{
                                                        background: "#CF1350",
                                                        border: "1px solid #CF1350",
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="9"
                                                        height="9"
                                                        viewBox="0 0 9 9"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M8 1L1 8M1 1L8 8"
                                                            stroke="white"
                                                            stroke-width="1.5"
                                                            stroke-linejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                                {/* <div
                          style={{
                            background: "white",
                            border: "1px solid #CF1350",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_1706_13979)">
                              <path
                                d="M0.666504 3.5V6.83333H2.33317V3.5H0.666504Z"
                                stroke="#CF1350"
                                stroke-width="0.6"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M4.66683 1.16797L4.8436 0.991192C4.79663 0.944202 4.73286 0.917856 4.6664 0.917969C4.59993 0.918086 4.53626 0.944652 4.48943 0.991806L4.66683 1.16797ZM2.3335 3.51754L2.15611 3.34137C2.1096 3.3882 2.0835 3.45154 2.0835 3.51754H2.3335ZM6.3335 6.83464V7.08464H6.51923L6.57286 6.9068L6.3335 6.83464ZM2.3335 6.83464H2.0835C2.0835 6.9727 2.19543 7.08464 2.3335 7.08464V6.83464ZM7.3335 3.51754L7.57286 3.5897C7.5957 3.51397 7.58133 3.43194 7.53416 3.36844C7.487 3.30497 7.4126 3.26754 7.3335 3.26754V3.51754ZM4.8335 3.51754L4.59386 3.44634L4.49843 3.76754H4.8335V3.51754ZM5.3335 1.83464L5.57313 1.90584C5.59926 1.8179 5.57513 1.72272 5.51026 1.65786L5.3335 1.83464ZM4.48943 0.991806L2.15611 3.34137L2.51089 3.6937L4.84423 1.34413L4.48943 0.991806ZM6.3335 6.58464H2.3335V7.08464H6.3335V6.58464ZM6.57286 6.9068L7.57286 3.5897L7.09413 3.44537L6.09413 6.76247L6.57286 6.9068ZM7.3335 3.26754H4.8335V3.76754H7.3335V3.26754ZM5.07313 3.58874L5.57313 1.90584L5.09386 1.76344L4.59386 3.44634L5.07313 3.58874ZM5.51026 1.65786L4.8436 0.991192L4.49006 1.34475L5.15673 2.01141L5.51026 1.65786ZM2.5835 6.83464V3.51754H2.0835V6.83464H2.5835Z"
                                fill="#CF1350"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1706_13979">
                                <rect width="8" height="8" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div> */}
                                            </div>
                                        </div>
                                        <div className="JobCardTitle mb-2">
                                            <div className="JobCardTitle-carbon">
                                                <h3
                                                    style={{
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    {item.jobTitle}
                                                </h3>
                                                <h5>
                                                    {Date(item.postedOn)
                                                        .toString()
                                                        .slice(0, 11)}
                                                </h5>
                                                <div
                                                    className="d-flex gap-1 align-items-center mb-1"
                                                    style={{
                                                        width: "30%",
                                                        minWidth: "250px",
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <div className="d-flex gap-1 justify-content-center align-items-center">
                                                        <FaClock />
                                                        <p>
                                                            ${item.minSR} per
                                                            month
                                                        </p>
                                                    </div>
                                                    <div className="d-flex gap-1 justify-content-center align-items-center ml-6">
                                                        <FaFileContract />
                                                        <p>{item.jobType}</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex gap-1 align-items-center">
                                                    <FaMapMarkerAlt />
                                                    <p>{item.location}</p>
                                                </div>
                                            </div>
                                            <div className="image">
                                                CN
                                                {/* <img src="/rightToJobCard.png" alt="image" /> */}
                                            </div>
                                        </div>
                                        <div
                                            className="SeeMore"
                                            onClick={() =>
                                                handleEasyApply(item)
                                            }
                                        >
                                            <p>See More</p>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="8"
                                                height="5"
                                                viewBox="0 0 8 5"
                                                fill="none"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M7.37231 0.126247C7.2346 -0.0420828 7.01133 -0.0420828 6.87363 0.126247L3.73783 3.95939L0.60203 0.126247C0.464324 -0.0420828 0.241058 -0.0420828 0.103353 0.126247C-0.0343542 0.294576 -0.0343542 0.567492 0.103353 0.735822L3.48849 4.87375C3.55462 4.95459 3.64431 5 3.73783 5C3.83135 5 3.92104 4.95459 3.98717 4.87375L7.37231 0.735822C7.51001 0.567492 7.51001 0.294576 7.37231 0.126247Z"
                                                    fill="#1E1EF0"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                ))}

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="text-center mt-4 custom-pagination">
                                        <Pagination>
                                            {Array.from(
                                                { length: totalPages },
                                                (_, index) => (
                                                    <Pagination.Item
                                                        key={index + 1}
                                                        active={
                                                            index + 1 ===
                                                            currentPage
                                                        }
                                                        onClick={() =>
                                                            paginate(index + 1)
                                                        }
                                                    >
                                                        {index + 1}
                                                    </Pagination.Item>
                                                )
                                            )}
                                        </Pagination>
                                    </div>
                                )}
                            </div>

                            {/* Yhan pe jobCard ayega */}
                        </Row>
                    </Container>
                </Container>
            </div>
            <Footer />
        </>
    );
}
export default JobFeed;

{
    /* <Row>
                      <div className="col-lg-10 d-flex gap-1">
                        <div className="capitalLetter">
                          <p className="p-0 m-0">
                            {item.jobTitle[0].toUpperCase()}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{ lineHeight: "1.5" }}
                            className="displayJobTitle p-0 m-0"
                          >
                            {item.jobTitle}
                          </p>
                          <p className="p-0 m-0 displayJobLocation">
                            {item.location}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <p className="displayJobPay">
                          {item.minSR ? item.minSR : "Unpaid"}
                        </p>
                      </div>
                    </Row>
                    <div style={{ display: "flex", marginTop: 0 }}>
                      <p className="displayJobDescription">
                        <strong>Job Description : </strong>
                      </p>
                      <p
                        className="displayJobDescription2"
                        style={{ maxWidth: "45%", marginTop: "10px" }}
                      >
                        {item.jobDescription}
                      </p>
                    </div> */
}

{
    /* <div className="col-lg-7 p-0">
                {selectedJob && <JobCard selectedJob={selectedJob} />}
              </div> */
}

{
    /*<Container>
          <Row className="pt-5 pb-5 searchCont">
            <div className="searchJobCont mx-3">
              <p className="searchJobFieldText">What</p>
              <input
                type="text"
                className="form-control searchJobField"
                placeholder="Job title, Description etc."
                value={searchKeyword}
                onChange={handleSearch}
              />
              <img className="searchJobIcon" alt="searchIcon" src={seach} />
            </div>
            <div className="searchLocCont mx-3">
              <p className="searchLocFieldText">Where</p>
              <input
                type="text"
                className="form-control searchLocField"
                placeholder="Location"
                value={location}
                onChange={handleLocationChange}
              />
              <img className="searchLocIcon" alt="locationIcon" src={loc} />
            </div>
          </Row>
        </Container>*/
}
