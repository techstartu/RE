import React, { useState, useContext, useEffect } from "react";
import "./PayBenefits.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../companyContext";
import Header from "../../Home/components/header";

export const PayBenefits = () => {
    const { payBenefits, setPayBenefits } = useContext(UserContext);

    const handleInputChange = (e) => {
        setPayBenefits({
            ...payBenefits,
            [e.target.id]: e.target.value,
        });
        console.log(payBenefits);
    };

    function PrevPage(e) {
        e.preventDefault();
        console.log("Running");
        navigate("/company/techdetail");
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token === null && !token) {
            console.log("token not found");
            navigate("/company/createaccount");
        } else {
            console.log("Token found!");
        }
    }, []);
    const bonuses = [
        "Yearly Bonus",
        "Monthly Bonus",
        "Vacation",
        "Heath Benefits",
        "Gym Facility",
        "Overtime",
    ];
    const [checkedCheckboxes, setCheckedCheckboxes] = useState({});
    const [checkboxStates, setCheckboxStates] = useState(bonuses);
    const [checkedArray, setCheckedArray] = useState([]);
    const handleCheckboxChange = (index) => {
        setCheckedCheckboxes((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
        const value = checkboxStates[index];
        console.log(value, index);
        const updatedCheckedArray = [...checkedArray];
        const indexOfValue = updatedCheckedArray.indexOf(value);
        if (indexOfValue === -1) {
            updatedCheckedArray.push(value);
        } else {
            updatedCheckedArray.splice(indexOfValue, 1);
        }

        setCheckedArray(updatedCheckedArray);

        console.log(updatedCheckedArray);
        console.log("Checked array", checkedArray);
    };

    const handleSelectAll = () => {
        const allChecked = checkboxStates.every((isChecked) => isChecked);
        const newCheckboxStates = checkboxStates.map(() => !allChecked);
        setCheckboxStates(newCheckboxStates);
        const updatedCheckedArray = allChecked ? [] : [...bonuses];
        setCheckedArray(updatedCheckedArray);
    };

    const handleSubmit = (e) => {
        //Function to store which checkboxes were ticked yes
        e.preventDefault();
        const selectedBenefits = checkboxStates
            .map((isChecked, index) => (isChecked ? `Checkbox ${index}` : null))
            .filter(Boolean);
        console.log("Selected Benefits:", selectedBenefits);

        NextPage(e);
    };
    const navigate = useNavigate();
    function NextPage(e) {
        e.preventDefault();
        setPayBenefits({
            ...payBenefits,
            Benefits: checkedArray,
        });
        console.log("Running");
        console.log("paybenefits:: ", payBenefits);
        navigate("/company/setpreferences");
    }

    return (
        <>
            <Header active="company" />
            <div>
                {/* <div className="horizontal-timeline">
    return (
        <div>
            {/* <div className="horizontal-timeline">
        <ul className="horizontal-timeline-list">
          <li className="li1">1</li>
          <li className="li2">2</li>
          <li className="li3">3</li>
          <li className="li4">4</li>
          <li className="li5">5</li>
        </ul>
      </div> */}
                {/* <div className="Header">Add Header here</div> */}
                <div className="Horizontal-Line-below-header-parent">
                    <div className="round-horizontal-1">1</div>
                    <div className="line-horizontal"></div>
                    <div className="round-horizontal-1">2</div>
                    <div className="line-horizontal"></div>
                    <div className="round-horizontal-1">3</div>
                    <div className="line-horizontal"></div>
                    <div className="round-horizontal-2">4</div>
                    <div className="line-horizontal-2"></div>
                    <div className="round-horizontal-1">5</div>
                </div>
                <div className="PayBenefits-Title">Add Pay and Benefits</div>
                <div className="create-account-form-container">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="pay-benefits-input-container">
                            <div className="input-container-top-div">
                                <label htmlFor="">Salary Range</label>
                            </div>
                            <div className="input-container-bottom-div">
                                {/* <div className="input-container-top-div">
                                   <span>Range</span>
                                </div> */}
                                <div className="small-div">
                                    <input
                                        type="text"
                                        name=""
                                        id="minSR"
                                        placeholder="Min"
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="payBenefits-to-text">
                                        to
                                    </div>
                                    <input
                                        type="text"
                                        name=""
                                        id="maxSR"
                                        placeholder="Max"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="input-container-bottom-div">
                                <div className="long-div">
                                    <div className="payBenefits-Benefits-Text">
                                        Benefits
                                    </div>
                                    <div className="tags-holder">
                                        {/* <div className="custom-checkbox d-flex justify-content-center">
                                            <input
                                                type="checkbox"
                                                id="select-all"
                                            />
                                            <label
                                                htmlFor="select-all"
                                                className="payBenefits-SelectAll"
                                            >
                                                <h4>Add bonuses</h4>
                                            </label>
                                        </div> */}

                                        {checkboxStates.map((bonus, index) => (
                                            <div
                                                className={`custom-checkbox d-flex justify-content-center ${
                                                    checkedCheckboxes[index]
                                                        ? "checked"
                                                        : ""
                                                }`}
                                                key={index}
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={`checkbox-${index}`}
                                                    checked={
                                                        checkedCheckboxes[
                                                            index
                                                        ] || false
                                                    }
                                                    onChange={() =>
                                                        handleCheckboxChange(
                                                            index
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor={`checkbox-${index}`}
                                                >
                                                    <div className="payBenefits-bonus-heading">
                                                        +{bonus}
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-button-div">
                            <button
                                className="form-back-button"
                                onClick={PrevPage}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="tech-detail-submit-button"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
