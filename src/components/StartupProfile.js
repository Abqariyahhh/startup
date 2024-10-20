import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import axios from 'axios'; // Import axios for API requests
import './StartupProfile.css'; // Scoped CSS

const StartupProfileForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        companyName: '',
        founders: '',
        industry: '',
        productServices: '',
        targetMarket: '',
        revenueGeneration: '',
        fundingStage: '',
        previousHistory: '',
        teamSize: '',
        companyHQ: '',
        companyWebsite: '',
        companyLogo: null,
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => setStep(step - 1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, companyLogo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });
    
        console.log('Submitting Form Data:', Array.from(formDataToSend.entries()));
    
        try {
            const response = await axios.post('http://localhost:5000/startups', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log('API Response:', response.data);
    
            if (response.data.message === "Signup successful") {
                alert("Sign Up Successful!");
                navigate('/startupdashboard');
            } else {
                console.error('Submission Error:', response.data);
                throw new Error("Submission failed."); // Customize this message based on your API response
            }
        } catch (error) {
            console.error("Error during submission:", error); // Log error details
            alert(`Error: ${error.message}`); // Display error message
        }
    };
    

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <div className="form-step slide-in">
                        <h2 className="step-title">Step 1: Company Details</h2>
                        <label>
                            Company Name:
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Founders:
                            <input
                                type="text"
                                name="founders"
                                value={formData.founders}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Industry:
                            <input
                                type="text"
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Product/Services:
                            <textarea
                                name="productServices"
                                value={formData.productServices}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <button className="btn next-btn" type="button" onClick={handleNextStep}>
                            Next
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="form-step slide-in">
                        <h2 className="step-title">Step 2: Market Details</h2>
                        <label>
                            Target Market:
                            <input
                                type="text"
                                name="targetMarket"
                                value={formData.targetMarket}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Revenue Generation:
                            <input
                                type="text"
                                name="revenueGeneration"
                                value={formData.revenueGeneration}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Funding Stage:
                            <input
                                type="text"
                                name="fundingStage"
                                value={formData.fundingStage}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Previous History:
                            <textarea
                                name="previousHistory"
                                value={formData.previousHistory}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <button className="btn prev-btn" type="button" onClick={handlePreviousStep}>
                            Back
                        </button>
                        <button className="btn next-btn" type="button" onClick={handleNextStep}>
                            Next
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="form-step slide-in">
                        <h2 className="step-title">Step 3: Team & HQ</h2>
                        <label>
                            Team Size:
                            <input
                                type="number"
                                name="teamSize"
                                value={formData.teamSize}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Company HQ:
                            <input
                                type="text"
                                name="companyHQ"
                                value={formData.companyHQ}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Company Website:
                            <input
                                type="url"
                                name="companyWebsite"
                                value={formData.companyWebsite}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Company Logo/Entrepreneur Photo:
                            <input
                                type="file"
                                name="companyLogo"
                                onChange={handleFileChange}
                                required
                            />
                        </label>
                        <button className="btn prev-btn" type="button" onClick={handlePreviousStep}>
                            Back
                        </button>
                        <button className="btn submit-btn" type="submit">
                            Submit
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default StartupProfileForm;

