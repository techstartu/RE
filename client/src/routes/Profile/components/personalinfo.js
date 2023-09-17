import React, { useState } from 'react';
import "../components/personalinfo.css";
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const PersonalInfo = () => {

  
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    address: '',
    country: '',
    city: '',
    zipCode: '',
    linkedInLink: '',
    twitterLink: '',
  });

  const handleData = () =>{
    const userToken = localStorage.getItem('token');
    const headers = {
      Authorization: userToken,
    };
    const newUrl = '/user/personalInfo/getData';
        axios.get(newUrl, { headers })
        .then((getResponse) => {
          
          if(!getResponse.data)
          {
            setFormData({
              firstName: '',
              lastName: '',
              emailAddress: '',
              phoneNumber: '',
              address: '',
              country: '',
              city: '',
              zipCode: '',
              linkedInLink: '',
              twitterLink: '',
          });
          }
          else
          {
              setFormData({
                firstName: getResponse.data.firstName,
                lastName: getResponse.data.lastName,
                emailAddress: getResponse.data.email,
                phoneNumber: getResponse.data.phNo,
                address: getResponse.data.address,
                country: getResponse.data.country,
                city: getResponse.data.city,
                zipCode: getResponse.data.zipCode,
                linkedInLink: getResponse.data.linkednLink,
                twitterLink: getResponse.data.twitterLink,
          });
          }
        })
        .catch((getError) => {
          console.error(getError);
          // Handle error from the GET request
        });
  }
  useEffect(() => {
    handleData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const formattedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phNo: formData.phoneNumber,
      address: formData.address,
      country: formData.country,
      city: formData.city,
      zipCode: formData.zipCode,
      linkednLink: formData.linkedInLink,
      twitterLink: formData.twitterLink,
    };

    const token = localStorage.getItem('token');
    const apiUrl = '/user/personalInfo/postData';

    const headers = {
      Authorization: token,
    };
    axios.post(apiUrl, formattedData, { headers })
      .then((response) => {
        localStorage.setItem('progress', '15');
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error sending data to the backend.");
      });
  };

  return (
    <div className="form-container">
      <div className="shadow">
        <form onSubmit={handleSubmit}>
          <div className="name-container">
            <div className="input-group-profile">
              <label className="label" htmlFor="firstName">
                First Name
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                className="input-field"
                placeholder="Enter your first name"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="input-group-profile">
              <label className="label" htmlFor="lastName">
                Last Name
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                className="input-field"
                placeholder="Enter your last name"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="email-container">
            <label className="label" htmlFor="emailAddress">
              Email Address
              <span className="required">*</span>
            </label>
            <input
              type="email"
              id="emailAddress"
              className="input-field"
              placeholder="dummyemail@gmail.com"
              required
              value={formData.emailAddress}
              onChange={handleChange}
            />
          </div>

          <div className="phone-container">
            <label className="label" htmlFor="phoneNumber">
              Phone Number
              <span className="required">*</span>
            </label>
            <input
              type="phone"
              id="phoneNumber"
              className="input-field"
              placeholder="0000 0000000"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="address-container">
            <label className="label" htmlFor="address">
              Address
              <span className="required">*</span>
            </label>
            <input
              type="text"
              id="address"
              className="input-field"
              placeholder="house # 00 street # 00 Phase 0 Dummy Town"
              required
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="new-name-container">
            <div className="input-group-profile">
              <label className="label" htmlFor="country">
                Country
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id="country"
                className="input-field"
                placeholder="Country"
                required
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div className="input-group-profile">
              <label className="label" htmlFor="city">
                City
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id="city"
                className="input-field"
                placeholder="City"
                required
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="input-group-profile">
              <label className="label" htmlFor="zipCode">
                Zip Code
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id="zipCode"
                className="input-field"
                placeholder="Zip Code"
                required
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="linkedin-container">
            <label className="label" htmlFor="linkedInLink">
              LinkedIn Link
              <span className="required">*</span>
            </label>
            <input
              type="link"
              id="linkedInLink"
              className="input-field"
              placeholder="URL Link"
              required
              value={formData.linkedInLink}
              onChange={handleChange}
            />
          </div>

          <div className="linkedin-container">
            <label className="label" htmlFor="twitterLink">
              Twitter Link
            </label>
            <input
              type="link"
              id="twitterLink"
              className="input-field"
              placeholder="URL Link"
              value={formData.twitterLink}
              onChange={handleChange}
            />
          </div>

          <div className="button-container">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PersonalInfo;
