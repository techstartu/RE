import React, { createContext, useContext, useState } from "react";

// Create a context for managing letter-related state
const LetterContext = createContext();

// Custom hook to access the letter context
export function useLetterContext() {
  return useContext(LetterContext);
}

// Provider component for the letter context
export function LetterProvider({ children }) {
  // State to manage the letter content
  const [letter, setLetter] = useState("");

  // Define the context value with letter and setter
  const contextValue = {
    letter,
    setLetter,
  };

  return (
    <LetterContext.Provider value={contextValue}>
      {children}
    </LetterContext.Provider>
  );
}

// The code below is commented out and not active in the current code

// // Create a context for managing user-related state
// export const UserContext = createContext();

// // Provider component for the user context
// export const UserContextProvider1 = ({ children }) => {
//     // State variables for user data
//     const [name, setName] = useState({});
//     const [jobTitle, setjobTitle] = useState({});
//     const [email, setEmail] = useState({});
//     const [address, setAddress] = useState({});
//     const [companyName, setCompanyName] = useState({});
//     const [hiringManagerName, setHiringManagerName] = useState({});
//     const [introduction, setIntroduction] = useState([]);

//     return (
//         <UserContext.Provider1
//             value={{
//                 name,
//                 setName,
//                 jobTitle,
//                 setjobTitle,
//                 email,
//                 setEmail,
//                 address,
//                 setAddress,
//                 companyName,
//                 setCompanyName,
//                 hiringManagerName,
//                 setHiringManagerName,
//                 introduction,
//                 setIntroduction,
//             }}
//         >
//             {children}
//         </UserContext.Provider1>
//     );
// };

// The code below is commented out and not active in the current code

// // Create a context for managing form data
// // const FormDataContext = createContext();

// // Provider component for the form data context
// // export const FormDataProvider = ({ children }) => {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     jobTitle: "",
// //     email: "",
// //     address: "",
// //     companyName: "",
// //     hiringManager: "",
// //     letterDetails: "",
// //   });

// //   // Function to update form data
// //   const updateFormData = (newData) => {
// //     setFormData(newData);
// //   };

// //   return (
// //     <FormDataContext.Provider value={{ formData, updateFormData }}>
// //       {children}
// //     </FormDataContext.Provider>
// //   );
// // };

// // Custom hook to access form data context
// // export const useFormData = () => {
// //   return useContext(FormDataContext);
// // };
