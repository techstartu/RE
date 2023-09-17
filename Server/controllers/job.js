import Job from "../models/Job.js";
import Education from "../models/userModels/Education.js";

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({}, "-applications");

        return res.status(201).json({
            jobs,
        });
    } catch (error) {
        console.error("Error getting Jobs:", error);
        return res.status(400).json({
            error: "An error occurred while getting Jobs",
        });
    }
};

export const applyForJob = async (req, res) => {
    try {
        const userID = req.user;
        const resume = req.body.resume;
        const jobID = req.params.jobID;

        const job = await Job.findById(jobID, "applications");

        for (let i = 0; i < job.applications.length; i++) {
            var id = job.applications[i].user;
            if (id == userID) {
                res.status(400).json({
                    error: "Already Applied for this Job",
                });
                return;
            }
        }

        job.applications.push({
            user: userID,
            resume: resume,
        });

        await job.save();

        return res.status(201).json({
            message: "Applied for Job Successfully",
        });
    } catch (err) {
        console.error("Error Applying Job:", err);
        return res.status(400).json({
            error: "An error occurred while Applying for Job",
        });
    }
};

export const postJob = async (req, res) => {
    try {
        const data = req.body;
        const companyID = req.company; // it is set from middleware

        // if (
        //   !data.industry ||
        //   !data.jobTitle ||
        //   !data.jobType ||
        //   !data.location ||
        //   !data.jobDescription ||
        //   !data.jobSchedule ||
        //   !data.openings ||
        //   !data.applicationDeadline ||
        //   !data.salaryRange ||
        //   !data.maximumSalary ||
        //   !data.minimumSalary
        //   // !data.Benefits ||
        //   // !data.skills
        // ) {
        //   return res.status(400).json({ error: "Missing required fields" });
        // }

        // if (
        //   typeof data.industry !== "string" ||
        //   typeof data.jobTitle !== "string" ||
        //   typeof data.jobType !== "string" ||
        //   typeof data.location !== "string" ||
        //   typeof data.jobDescription !== "string" ||
        //   typeof data.technologyDetails !== "string" ||
        //   typeof data.openings !== "number" ||
        //   typeof data.applicationDeadline !== "string" ||
        //   typeof data.maxSR !== "number" ||
        //   typeof data.minSR !== "number" ||
        //   !Array.isArray(data.Benefits) ||
        //   !Array.isArray(data.skills)
        // ) {
        //   return res.status(400).json({ error: "Invalid data types" });
        // }
        // if (data.skills.length === 0) {
        //   return res.status(400).json({ error: "Skills array cannot be empty" });
        // }
        // for (const skill of data.skills) {
        //   if (
        //     !skill.skill ||
        //     typeof skill.skill !== "string" ||
        //     typeof skill.isMustHave !== "boolean" ||
        //     typeof skill.isNiceToHave !== "boolean"
        //   ) {
        //     return res.status(400).json({ error: "Invalid skill data" });
        //   }
        // }

        data.company = companyID;
        const jobObj = new Job(data);

        const job = await jobObj.save();

        return res.status(201).json({
            message: "Job Added Successfully",
        });
    } catch (error) {
        console.error("Error creating Job:", error);
        return res.status(400).json({
            error: "An error occurred while creating Job",
        });
    }
};

// get a single job from id in params
export const getJob = async (req, res) => {
    try {
        const jobID = req.params.jobID;
        const job = await Job.findById(jobID, "-applications");

        return res.status(201).json({
            job,
        });
    } catch (error) {
        console.error("Error getting Jobs:", error);
        return res.status(400).json({
            error: "An error occurred while getting Jobs",
        });
    }
};

// edit a job from id in params
export const editJob = async (req, res) => {
    try {
        const data = req.body;
        const companyID = req.company; // it is set from middleware
        const jobID = req.params.jobID;

        if (
            !data.jobTitle ||
            !data.jobType ||
            !data.jobLevel ||
            !data.maxSR ||
            !data.minSR ||
            !data.location ||
            !data.Experience ||
            !data.qualification ||
            !data.applicationDeadline ||
            !data.jobDescription
        ) {
            res.status(400).json({ error: "data in body is not complete" });
            return;
        }
        const job = await Job.findById(jobID, "-applications");
        job.jobTitle = data.jobTitle;
        job.jobType = data.jobType;
        job.jobLevel = data.jobLevel;
        job.maxSR = data.maxSR;
        job.minSR = data.minSR;
        job.location = data.location;
        job.Experience = data.Experience;
        job.qualification = data.qualification;
        job.applicationDeadline = data.applicationDeadline;
        job.jobDescription = data.jobDescription;
        await job.save();

        return res.status(201).json({
            message: "Job Edited Successfully",
        });
    } catch (error) {
        console.error("Error editing Job:", error);
        return res.status(400).json({
            error: "An error occurred while editing Job",
        });
    }
};

// get jobs of a company
export const getJobs = async (req, res) => {
    try {
        const companyID = req.company; // it is set from middleware
        const jobs = await Job.find({ company: companyID }, "-applications");

        return res.status(201).json({
            jobs,
        });
    } catch (error) {
        console.error("Error getting Jobs:", error);
        return res.status(400).json({
            error: "An error occurred while getting Jobs",
        });
    }
};

export const deleteJob = async (req, res) => {
    try {
        const companyID = req.company; // it is set from middleware
        const jobID = req.params.jobID;
        const job = await Job.findById(jobID);

        if (!job) {
            throw new Error("Job not found");
        }

        await job.deleteOne();

        return res.status(200);
    } catch (error) {
        console.error("Error getting Jobs:", error);
        return res.status(400).json({
            error: "An error occurred while getting Jobs",
        });
    }
};

// get all applicants of a job
export const getApplicantssOfAJob = async (req, res) => {
    try {
        const jobId = req.params.jobID;
        const company = req.company;
        var applicants = await Job.findOne(
            { _id: jobId, company: company },
            "applications"
        ).populate({
            path: "applications.user",
            model: "User",
            select: "firstName lastName",
        }); // Select specific user fields

        applicants = applicants.applications;

        const applicantsWithEducation = await Promise.all(
            applicants.map(async (application) => {
                // Assuming 'Education' model has a field named 'user' that references the User model
                // console.log(application.user._id);
                const education = await Education.findOne({
                    user: application.user._id,
                }).select("degree");

                return {
                    ...application.toObject(),
                    education: education, // Add education information to the application object
                };
            })
        );

        res.json(applicantsWithEducation);
    } catch (error) {
        console.error("Error getting Applicants:", error);
        return res.status(400).json({
            error: "An error occurred while getting Applicants",
        });
    }
};

//  get all applicant of a company
export const getAllApplicants = async (req, res) => {
    try {
        const company = req.company;
        const applicants = await Job.find(
            { company: company },
            "applications jobTitle"
        ).populate({
            path: "applications.user",
            model: "User",
            select: "-jobs",
        }); // Select specific user fields

        if (!applicants) {
            console.log("Applicants not found");
            res.status(400).json({ error: "Applicants not found" });
            return;
        }

        var array = [];
        for (let i = 0; i < applicants.length; i++) {
            for (let j = 0; j < applicants[i].applications.length; j++) {
                array.push({
                    userID: applicants[i].applications[j].user._id,
                    firstName: applicants[i].applications[j].user.firstName,
                    appliedDate: applicants[i].applications[j].appliedDate,
                    hiringStage: applicants[i].applications[j].hiringStage,
                    status: applicants[i].applications[j].status,
                    jobID: applicants[i]._id,
                    _id: applicants[i].applications[j]._id,
                    jobRole: applicants[i].jobTitle,
                });
            }
        }

        res.json({ applicants: array });
    } catch (error) {
        console.error("Error getting Applicants:", error);
        return res.status(400).json({
            error: "An error occurred while getting Applicants",
        });
    }
};

export const changeStage = async (req, res) => {
    try {
        const stage = req.body.stage;
        const company = req.company;
        const jobID = req.params.jobID;
        const applicationID = req.params.appID;

        const jobApplications = await Job.findOne(
            { _id: jobID, company: company },
            "applications"
        );
        for (let i = 0; i < jobApplications.applications.length; i++) {
            if (jobApplications.applications[i]._id == applicationID) {
                jobApplications.applications[i].hiringStage = stage;
            }
        }

        await jobApplications.save();

        res.json({ message: "Change Stage Successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: "something wrong happened with changing stage",
        });
    }
};

export const deleteApplication = async (req, res) => {
    try {
        const stage = req.body.stage;
        const company = req.company;
        const jobID = req.params.jobID;
        const applicationID = req.params.appID;

        const jobApplications = await Job.findOne(
            { _id: jobID, company: company },
            "applications"
        );
        for (let i = 0; i < jobApplications.applications.length; i++) {
            if (jobApplications.applications[i]._id == applicationID) {
                jobApplications.applications.splice(i, 1);
                // console.log(jobApplications.applications[i]);
            }
        }

        jobApplications.save();

        res.json({ message: "Application Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: "something wrong happened with changing stage",
        });
    }
};
