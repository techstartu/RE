import React, { useState } from "react";
import "../AllApplicants/AppTable.css";
import Modal from "react-modal";
import { toast } from "react-toastify";
import DataFilter from "./DataFilter";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const modelStyle = {
    overlay: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        zIndex: 10,
    },
    content: {
        width: "80%",
        maxWidth: "400px", // Adjust this as needed
        height: "200px",
        overflow: "auto",
        padding: "20px",
    },
};

const ListingsTable = () => {
    const navigate = useNavigate();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const token = localStorage.getItem("token");
    useEffect(() => {
        const apiUrl = "/job/getJobs";

        const headers = {
            Authorization: token,
        };

        axios
            .get(apiUrl, { headers })
            .then((response) => {
                console.log(response.data);
                setData(response.data.jobs);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [update]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const deleteJob = async (item) => {
        const deleteIt = window.confirm("Do you want to delete it?");
        if (!deleteIt) return;

        try {
            const res = await fetch(`/job/deleteJob/${item._id}`, {
                method: "get",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw Error("Backend Error Occured");
            }
        } catch (err) {
            console.log("error Toast");
            toast.error("Backend Error Occured");
            return;
        }

        console.log("succeess");
        setUpdate(!update);
        toast.success("Job Deleted Successfully");
    };

    return (
        <div className="table-container2">
            <div className="listings-heading"> Job Listing</div>
            <div className="allapplicants-heading"> Jobs List</div>
            {/* <div className="filter-data-listings"><DataFilter /></div> */}
            <div
                style={{
                    overflowX: "auto",
                    marginBottom: "20px",
                    padding: "0 20px",
                }}
            >
                <table className="custom-table-listings">
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Job Type</th>
                            <th>Applicant</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map through your data and create table rows */}
                        {/* Replace placeholders with actual data */}
                        {data &&
                            data
                                .slice(
                                    (currentPage - 1) * itemsPerPage,
                                    currentPage * itemsPerPage
                                )
                                .map((item, index) => {
                                    const currentDate = new Date();
                                    const applicationDeadlineDate = new Date(
                                        item.applicationDeadline
                                    );
                                    const isActive =
                                        currentDate <= applicationDeadlineDate;
                                    const status = isActive
                                        ? "Active"
                                        : "Inactive";
                                    const statusClassName = isActive
                                        ? "status-rectangle-listings"
                                        : "status-rectangle-listings-2";
                                    return (
                                        <tr key={index}>
                                            <td>{item.jobTitle}</td>
                                            <td>{item.jobType}</td>
                                            <td style={{ textAlign: "center" }}>
                                                08
                                            </td>
                                            <td>
                                                {new Date(
                                                    item.applicationDeadline
                                                ).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td>
                                                <div
                                                    className={statusClassName}
                                                >
                                                    {status}
                                                </div>
                                            </td>
                                            <td>
                                                <svg
                                                    onClick={() =>
                                                        navigate(
                                                            `/editjob/${item._id}`
                                                        )
                                                    }
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="36"
                                                    height="36"
                                                    viewBox="0 0 36 36"
                                                    fill="none"
                                                >
                                                    <circle
                                                        cx="18"
                                                        cy="18"
                                                        r="18"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M17.1566 11.6868H11.5904C11.1686 11.6868 10.7641 11.8544 10.4658 12.1526C10.1676 12.4509 10 12.8554 10 13.2772V24.4096C10 24.8314 10.1676 25.2359 10.4658 25.5342C10.7641 25.8324 11.1686 26 11.5904 26H22.7228C23.1446 26 23.5491 25.8324 23.8474 25.5342C24.1456 25.2359 24.3132 24.8314 24.3132 24.4096V18.8434M23.1204 10.4941C23.4368 10.1777 23.8658 10 24.3132 10C24.7605 10 25.1896 10.1777 25.5059 10.4941C25.8223 10.8104 26 11.2395 26 11.6868C26 12.1342 25.8223 12.5632 25.5059 12.8796L17.9518 20.4338L14.7711 21.2289L15.5662 18.0482L23.1204 10.4941Z"
                                                        stroke="#524E4E"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </td>
                                            <td>
                                                <svg
                                                    onClick={() =>
                                                        deleteJob(item)
                                                    }
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="36"
                                                    height="36"
                                                    viewBox="0 0 36 36"
                                                    fill="none"
                                                >
                                                    <circle
                                                        cx="18"
                                                        cy="18"
                                                        r="18"
                                                        fill="white"
                                                    />
                                                    <path
                                                        d="M11 13.2H12.6M12.6 13.2H25.4M12.6 13.2V24.4C12.6 24.8243 12.7686 25.2313 13.0686 25.5314C13.3687 25.8314 13.7757 26 14.2 26H22.2C22.6243 26 23.0313 25.8314 23.3314 25.5314C23.6314 25.2313 23.8 24.8243 23.8 24.4V13.2M15 13.2V11.6C15 11.1757 15.1686 10.7687 15.4686 10.4686C15.7687 10.1686 16.1757 10 16.6 10H19.8C20.2243 10 20.6313 10.1686 20.9314 10.4686C21.2314 10.7687 21.4 11.1757 21.4 11.6V13.2M16.6 17.2V22M19.8 17.2V22"
                                                        stroke="#524E4E"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </td>
                                            {/* <Modal
                        style={modelStyle}
                        isOpen={isModelOpen}
                        onRequestClose={() => setIsModelOpen(false)}
                        contentLabel="Delete Modal"
                      >
                        <h2>Confirm Delete</h2>
                        <p>Do you really want to delete it?</p>
                        <button onClick={() => deleteJob(item)}>Yes</button>
                        <button onClick={() => setIsModelOpen(false)}>
                          No
                        </button>
                      </Modal> */}
                                        </tr>
                                    );
                                })}
                    </tbody>
                </table>
            </div>
            <div className="pagination-apptable">
                <button
                    className="pagination-apptable-button"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <span className="pagination-apptable-page">
                    {currentPage}
                    {"/"}
                    {totalPages}
                </span>
                <button
                    className="pagination-apptable-button"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={
                        currentPage === Math.ceil(data.length / itemsPerPage)
                    }
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ListingsTable;
