import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import FileBase64 from "react-file-base64";
import PhoneInput from "react-phone-number-input";
import { ToastContainer, toast } from "react-toastify";
import "../UserSide.css";

const ApplyJob = ({ job }) => {
  // State variables
  const [showModal, setShowModal] = useState(false);
  const [fileData, setFileData] = useState();
  const [fileDataforDB, setFileDataforDB] = useState();
  const [value, setValue] = useState("");
  const data = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const [sent, setSent] = useState(false); // for loader purpose

  // User data from local storage
  const user = JSON.parse(data);

  // Function to handle modal visibility
  const handleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      jobTitle: job.jobTitle || "",
    }));
  }, [job]);

  // Initial form data
  const initialFormData = {
    fullName: "",
    email: user.email,
    jobTitle: job.jobTitle || "",
  };

  const [formData, setFormData] = useState(initialFormData);

  // Function to handle form input changes
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if fileDataforDB is not empty
    if (!fileDataforDB) {
      toast.error("Please enter all fields");
      return;
    } else {
      const data = {
        resume: fileDataforDB,
      };

      setSent(true);

      fetch(`/job/apply/${job}`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
            setFileDataforDB();
            setSent(false);
            return;
          }
          setFormData((prevFormData) => ({
            ...prevFormData,
            job: "",
            fullName: "",
          }));
          setValue("");
          setFileDataforDB();
          toast.success(data.message);
          setSent(false);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
          setSent(false);
        });
    }
  };

  // Function to handle file upload
  const handleFileUpload = (file) => {
    if (
      file.type !== "application/pdf" &&
      file.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      toast.error("Invalid file format. Only PDF and DOCX files are allowed.");
      setFileData();
      return;
    } else {
      const attachment = {
        content: file.base64,
        filename: file.name,
        type: file.type,
        disposition: "attachment",
      };
      setFileDataforDB(file.base64);
    }
  };

  return (
    <div>
      <button
        className="dabtn appbt d-flex text-center justify-content-center"
        onClick={handleModal}
      >
        Apply Now
      </button>

      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: 150, color: "#cf1350" }}>
            Apply Job
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="applyjobform">
            <Form.Group className="my-2" controlId="formBasicEmail">
              {/* You can uncomment and modify the following lines if needed */}
              {/* <p>Enter Your Name</p>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Name"
              /> */}
            </Form.Group>
            {/* <Form.Group controlId="email">
              <p>Enter Your Email</p>
              <Form.Control
                required
                type="email"
                name="email"
                value={formData.email}
                disabled
                onChange={handleChange}
                placeholder="Enter your email address"
              />
            </Form.Group> */}
            <Form.Group className=" my-2" controlId="formBasicEmail">
              {/* <p>Job Application</p>
              <Form.Control
                type="text"
                name="job"
                value={formData.jobTitle}
                disabled
                onChange={handleChange}
                placeholder="Job title"
              /> */}
            </Form.Group>
            {/* <Form.Group className="my-3" controlId="phone">
              <p>Enter Mobile Number</p>
              <PhoneInput
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
              />
            </Form.Group> */}
            <div className="d-flex align-items-center justify-content-between">
              <div>
                {" "}
                <p>Submit Your CV / Resume</p>
                <FileBase64
                  type="file"
                  onDone={handleFileUpload}
                  value={fileDataforDB}
                />
              </div>

              <div>
                <span className="mt-3"></span>
              </div>
            </div>

            <Button
              className="mt-4"
              style={{
                width: "100%",
                height: "60px",
                background: "#cf1350",
                color: "#FFFFFF",
                border: "none",
                fontSize: "30px",
                borderRadius: "5px",
                margin: 0,
              }}
              disabled={sent}
              type="submit"
            >
              {sent ? "Loading..." : "Send"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ApplyJob;
