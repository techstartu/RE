import React, { createContext, useContext, useState } from "react";

// Create a context for job-related data
const JobContext = createContext();

// Custom hook to access the job context in components
export function useJobContext() {
  return useContext(JobContext);
}

// JobProvider component that provides the job-related data to its children
export function JobProvider({ children }) {
  // State to store job information
  const [jobs, setJobs] = useState([]);

  // State to store the location search
  const [searchLocation, setSearchLocation] = useState("");

  // State to store the sector search
  const [searchSector, setSearchSector] = useState("");

  // Create an object with the context values to be provided
  const contextValue = {
    jobs, // Array of job information
    setJobs, // Function to update the job information
    searchLocation, // Location search query
    setSearchLocation, // Function to update the location search query
    searchSector, // Sector search query
    setSearchSector, // Function to update the sector search query
  };

  // Provide the context values to the children components
  return (
    <JobContext.Provider value={contextValue}>{children}</JobContext.Provider>
  );
}
