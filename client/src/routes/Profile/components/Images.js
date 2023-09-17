import React, { useState } from 'react';
import '../components/Images.css';
import cover from '../../../assests/images/cover-default.png';
import PersonalInfo from '../components/personalinfo';
import Sidenav from '../components/Sidenav';

const Images = () => {
    const [coverPhoto, setCoverPhoto] = useState('default_cover_photo.jpg');
    const [profileImage, setProfileImage] = useState('default_profile_image.jpg');

    const handleCoverPhotoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setCoverPhoto(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

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

    return (
        <>
            <div className="profile-container">
                <div className="cover-photo">
                    <img src={cover} alt="Cover Photo" />
                    <label htmlFor="cover-input" className="cover-edit-icon">
                        {/* Add your SVG pencil icon for cover photo edit here */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 35" fill="none">
                            <path d="M31.9315 11.8425L23.6058 3.78767L26.3484 1.10274C27.0993 0.36758 28.022 0 29.1164 0C30.2109 0 31.1329 0.36758 31.8825 1.10274L34.6251 3.78767C35.3761 4.52283 35.7679 5.41014 35.8005 6.44959C35.8332 7.48904 35.474 8.37571 34.7231 9.10959L31.9315 11.8425ZM29.091 14.6712L8.3257 35H0V26.8493L20.7653 6.52055L29.091 14.6712Z" fill="white" />
                        </svg>
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="cover-input"
                        onChange={handleCoverPhotoChange}
                        style={{ display: 'none' }}
                    />
                </div>
                <div className="profile-image-box">
                    {/* {profileImage ? (
                        <img src={profileImage} alt="Profile Image" />
                    ) : ( */}
                    <div className="default-profile-text">JS</div>
                    {/* )} */}
                    <label htmlFor="profile-input" className="profile-edit-icon">

                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                            <path d="M10.8189 3.8318L7.99805 1.22555L8.92728 0.356807C9.18172 0.118936 9.49434 0 9.86514 0C10.236 0 10.5484 0.118936 10.8023 0.356807L11.7316 1.22555C11.986 1.46343 12.1188 1.75053 12.1298 2.08686C12.1409 2.42318 12.0192 2.71008 11.7648 2.94754L10.8189 3.8318ZM9.85652 4.74708L2.82089 11.3247H0V8.68747L7.03563 2.10982L9.85652 4.74708Z" fill="#6D0E9D" />
                        </svg>
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="profile-input"
                        onChange={handleProfileImageChange}
                        style={{ display: 'none' }}
                    />
                </div>

            </div>
            <div className="profile-component-container1">
                <PersonalInfo />
            </div>
        </>
    );
};

export default Images;
