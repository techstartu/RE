import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const CompProfile = () => {
  // State for the company's profile image, initially set to a default image.
  const [profileImage, setProfileImage] = useState("default_profile_image.jpg");

  // Function to handle the change of the profile image when a file is selected.
  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // State for form data containing various company profile information.
  const [formData, setFormData] = useState({
    name: "",
    teamSize: "",
    phNo: "",
    website: "",
    country: "",
    city: "",
    address: "",
    about: "",
    email: "",
  });

  // Function to fetch and update company profile data.
  const handleData = () => {
    const comptoken = localStorage.getItem("token");
    const headers = {
      Authorization: comptoken,
    };
    const newUrl = "/company/getProfile";

    axios
      .get(newUrl, { headers })
      .then((getResponse) => {
        if (!getResponse.data) {
          // If no data is received, reset the form data.
          setFormData({
            name: "",
            teamSize: "",
            phNo: "",
            website: "",
            country: "",
            city: "",
            address: "",
            about: "",
            email: "",
          });
        } else {
          // Populate the form data with the received company information.
          setFormData({
            name: getResponse.data.company.name,
            teamSize: getResponse.data.company.teamSize,
            phNo: getResponse.data.company.phNo,
            website: getResponse.data.company.website,
            country: getResponse.data.company.country,
            city: getResponse.data.company.city,
            address: getResponse.data.company.address,
            about: getResponse.data.company.about,
            email: getResponse.data.company.email,
          });
        }
      })
      .catch((getError) => {
        console.error(getError);
        // Handle error from the GET request here.
      });
  };

  // Use the useEffect hook to call handleData when the component mounts.
  useEffect(() => {
    handleData();
  }, []);

  // Function to handle changes in the form input fields.
  const handleChange = (e) => {
    const { id, value } = e.target;
    // Update the form data based on the changed input field.
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  // Function to handle the form submission.
  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the form data for submission.
    const formattedData = {
      name: formData.name,
      teamSize: formData.teamSize,
      phNo: formData.phNo,
      website: formData.website,
      country: formData.country,
      city: formData.city,
      address: formData.address,
      about: formData.about,
    };

    console.log(formattedData);

    // Retrieve the token from local storage.
    const token = localStorage.getItem("token");
    console.log(token);
    const apiUrl = "/company/setProfile";

    const headers = {
      Authorization: token,
    };

    // Make a POST request to update the company profile.
    axios
      .post(apiUrl, formattedData, { headers })
      .then((response) => {
        console.log(response.data);
        // Show a success toast message.
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        // Show an error toast message if the request fails.
        toast.error("Error sending data to the backend.");
      });
  };

  return (
    <div className="form-container-compprofile">
      <div className="shadow2">
        <form onSubmit={handleSubmit}>
          {/* Commented out section for profile image upload */}
          {/* ... */}
          
          {/* Form for editing company profile information */}
          <div className="postjobs-heading">Company Profile</div>
          <div className="name-container">
            {/* Input field for company name */}
            <div className="input-group-profile">
              <label className="label" htmlFor="name">
                Company Name
                {/* Add a required indicator if needed */}
                {/* <span className="required">*</span> */}
              </label>
              <input
                type="text"
                id="name"
                className="input-field"
                placeholder="Xyz"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {/* Select field for team size */}
            <div className="input-group-profile">
              <label className="label" htmlFor="teamSize">
                Team Size
              </label>
              <select
                id="teamSize"
                className="input-field-exp"
                required
                value={formData.teamSize}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="10-50">10-50</option>
                <option value="50-100">50-100</option>
                <option value="100-150">100-150</option>
              </select>
            </div>
          </div>

          {/* Input field for email */}
          <div className="email-container">
            <label className="label" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder="@gmail.com"
              readOnly={true}
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Input field for phone number */}
          <div className="phone-container">
            <label className="label" htmlFor="phNo">
              Phone Number
            </label>
            <input
              type="phone"
              id="phNo"
              className="input-field"
              placeholder="0000 0000000"
              required
              value={formData.phNo}
              onChange={handleChange}
            />
          </div>

          {/* Input field for website */}
          <div className="email-container">
            <label className="label" htmlFor="website">
              Website
            </label>
            <input
              type="url"
              id="website"
              className="input-field"
              placeholder="www.xyz.com"
              required
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          {/* Select field for country */}
          <div className="email-container">
            <label className="label" htmlFor="country">
              Country
            </label>
            <select
              id="country"
              className="input-field-exp"
              required
              value={formData.country}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="Pakistan">Pakistan</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
          </div>

          {/* Select field for city */}
          <div className="email-container">
            <label className="label" htmlFor="city">
              City
            </label>
            <select
              id="city"
              className="input-field-exp"
              required
              value={formData.city}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="Islamabad">Islamabad</option>
              <option value="New York">New York</option>
              <option value="London">London</option>
            </select>
          </div>

          {/* Input field for address */}
          <div className="address-container">
            <label className="label" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="input-field"
              placeholder="address"
              required
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* Textarea field for company description */}
          <div className="description-container-exp">
            <label className="label-exp" htmlFor="about">
              About Company
            </label>
            <textarea
              type="description"
              id="about"
              className="input-field-exp-1"
              placeholder=""
              rows="4"
              required
              value={formData.about}
              onChange={handleChange}
            />
          </div>

          {/* Button to submit the form */}
          <div className="button-container">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
      {/* ToastContainer for displaying success/error messages */}
      <ToastContainer />
    </div>
  );
};

export default CompProfile;
