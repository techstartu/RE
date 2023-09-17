import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./routes/Home/index";
import Login from "./routes/Auth/Login/index";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./routes/Auth/signUp/index";
import ForgetPassword from "./routes/Auth/ForgetPassword/index";
import SetPassword from "./routes/Auth/setPassword/index";
import JobFeed from "./routes/jobFeed/JobFeed";
import DetailPage from "./routes/jobFeed/job/DetailPage";
import PersonalInformation from "./routes/Profile/components/Information";
import Experiences from "./routes/Profile/components/Experiences/Experiences";
import Education from "./routes/Profile/components/Education/Education";
import Courses from "./routes/Profile/components/Courses/Courses";
import Certifications from "./routes/Profile/components/Certifications/Certifications";
import Awards from "./routes/Profile/components/Awards/Awards";
import Publications from "./routes/Profile/components/Publications/Publications";
import Languages from "./routes/Profile/components/Languages/Languages";
import SubmitExp from "./routes/Profile/components/Experiences/SubmitExp";
import Skills from "./routes/Profile/components/Skills/Skills";
import SubmitEdu from "./routes/Profile/components/Education/SubmitEdu";
import SubmitCour from "./routes/Profile/components/Courses/SubmitCour";
import SubmitCert from "./routes/Profile/components/Certifications/SubmitCert";
import SubmitAwards from "./routes/Profile/components/Awards/SubmitAwards";
import SubmitPub from "./routes/Profile/components/Publications/SubmitPub";
import SubmitLang from "./routes/Profile/components/Languages/SubmitLang";
import SubmitSkills from "./routes/Profile/components/Skills/SubmitSkills";
// COMPANY ROUTES
import CompanySignUp from "./routes/Auth/signUp/CompanySignUp";
import LoginAsCompany from "./routes/Auth/Login/LoginAsCompany";
import CForgetPassword from "./routes/Auth/ForgetPassword/companyIndex";
import CSetPassword from "./routes/Auth/setPassword/companyIndex";

import CompanyHome from "./routes/company/home/Home";
import Jobs from "./routes/company/Dashboard/PostJobs/Jobs";
import Profile from "./routes/company/Dashboard/CompProfile/Profile";
import Applicants from "./routes/company/Dashboard/AllApplicants/Applicants";
import Listings from "./routes/company/Dashboard/JobListings/Listings";
import ManageHiring from "./routes/company/Dashboard/ManageHiring/ManageHiring";
import UpdateProfilePage from "./routes/Profile/userprofile/UpdateProfilePage";

import CompanyDashboard from "./routes/company/Dashboard/Dashboard/CompanyDashboard";
import EditJob from "./routes/company/Dashboard/PostJobs/EditJob";

import { CreateAcount } from "./routes/company/CreateAccount/CreateAcount";
import { JobBasics } from "./routes/company/JobBasics/JobBasics";
import { TechnologyDetail } from "./routes/company/TechnologyDetail/TechnologyDetail";
import { PayBenefits } from "./routes/company/PayBenefits/PayBenefits";
import { SetPreferences } from "./routes/company/SetPreferences/SetPreferences";
import { JobProvider } from "./useContext/jobContext";
import SetProfile from "./routes/Profile/SetProfile";
import ReviewJob from "./routes/company/Dashboard/PostJobs/PostJobReview/PostJobReview";
import KeyQualities from "./routes/company/Dashboard/PostJobs/keyQualification/KeyQuality";
import FinishPost from "./routes/company/Dashboard/PostJobs/finishPost/finishPost";
import { UserContextProvider } from "./routes/company/companyContext";

// AI ROUTES
import SalaryForm from "./routes/AI Models/SalaryModules/SalaryForm";
import DisplaySalary from "./routes/AI Models/SalaryModules/DisplaySalary";
import CareerForm from "./routes/AI Models/CareerCouching/CareerForm";
import CareerPath from "./routes/AI Models/CareerPath/CareerPath";
import { CoverLetterForm } from "./routes/AI Models/CoverLetter/CoverLetterForm";
import { CoverLetterView } from "./routes/AI Models/CoverLetter/CoverLetterView";
import { LetterProvider } from "./routes/AI Models/CoverLetterContext";

const App = () => {
  return (
    <Router>
      <JobProvider>
        <Routes>
          //ROUTES OF USER
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/setNewPassword/:id" element={<SetPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/set-profile" element={<SetProfile />} />
          <Route path="/experiences/form" element={<Experiences />} />
          <Route path="/jobFeed" element={<JobFeed />} />
          <Route path="/jobdetail/:jobID" element={<DetailPage />} />
          <Route path="/experiences/submit-exp" element={<SubmitExp />} />
          <Route path="/education/form" element={<Education />} />
          <Route path="/education/submit-edu" element={<SubmitEdu />} />
          <Route path="/courses/form" element={<Courses />} />
          <Route path="/courses/submit-cour" element={<SubmitCour />} />
          <Route path="/certifications/form" element={<Certifications />} />
          <Route path="/certifications/submit-cert" element={<SubmitCert />} />
          <Route path="/awards/form" element={<Awards />} />
          <Route path="/awards/submit-awards" element={<SubmitAwards />} />
          <Route path="/publications/form" element={<Publications />} />
          <Route path="/publications/submit-pub" element={<SubmitPub />} />
          <Route path="/languages/form" element={<Languages />} />
          <Route path="/languages/submit-lang" element={<SubmitLang />} />
          <Route path="/skills/skillsinput" element={<Skills />} />
          <Route path="/skills/submit-skills" element={<SubmitSkills />} />
          <Route path="/personal-information" element={<UpdateProfilePage />} />
          //ROUTES OF COMPANY
          <Route path="/registerAsCompany" element={<CompanySignUp />} />
          <Route path="/loginAsCompany" element={<LoginAsCompany />} />
          <Route path="/CforgetPassword" element={<CForgetPassword />} />
          <Route path="/CsetNewPassword/:id" element={<CSetPassword />} />
          <Route path="/company" element={<CompanyHome />} />
          <Route path="/postjobs" element={<Jobs />} />
          <Route path="/editjob/:jobID" element={<EditJob />} />
          <Route path="/compprofile" element={<Profile />} />
          <Route path="/allapplicants" element={<Applicants />} />
          <Route path="/joblistings" element={<Listings />} />
          <Route path="/companydashboard" element={<CompanyDashboard />} />
          <Route path="/managehiring" element={<ManageHiring />} />
          <Route
            path="/company/createaccount"
            element={
              <UserContextProvider>
                <CreateAcount />
              </UserContextProvider>
            }
          />
          <Route
            path="/company/jobbasics"
            element={
              <UserContextProvider>
                <JobBasics />
              </UserContextProvider>
            }
          />
          <Route
            path="/company/techdetail"
            element={
              <UserContextProvider>
                <TechnologyDetail />
              </UserContextProvider>
            }
          />
          <Route
            path="/company/paybenefits"
            element={
              <UserContextProvider>
                <PayBenefits />
              </UserContextProvider>
            }
          />
          <Route
            path="/company/setpreferences"
            element={
              <UserContextProvider>
                <SetPreferences />
              </UserContextProvider>
            }
          />
          <Route
            path="/company/postJobReview"
            element={
              <UserContextProvider>
                <ReviewJob />
              </UserContextProvider>
            }
          />
          <Route
            path="/company/keyQualities"
            element={
              <UserContextProvider>
                <KeyQualities />
              </UserContextProvider>
            }
          />
          <Route
            path="/company/finishPostfinal"
            element={
              <UserContextProvider>
                <FinishPost />
              </UserContextProvider>
            }
          />
          //ROUTES OF AI MODELS
          <Route path="salary-module" element={<SalaryForm />} />
          <Route path="salarydisplay/:salary" element={<DisplaySalary />} />
          <Route path="career-form" element={<CareerForm />} />
          <Route path="career-path" element={<CareerPath />} />
       
          <Route
            path="coverletter"
            element={
              <LetterProvider>
                {" "}
                <CoverLetterForm />
              </LetterProvider>
            }
          />
          <Route
            path="coverletterview"
            element={
              <LetterProvider>
                <CoverLetterView />
              </LetterProvider>
            }
          />
        </Routes>
      </JobProvider>
    </Router>
  );
};

export default App;
