import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import './SignupPage.css';

function SignupPage() {
    const [fullName, setFullName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [gmailId, setGmailId] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [profile, setProfile] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [hasAssets, setHasAssets] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate(); 

    const handlePersonalDetailsSubmit = (event) => {
        event.preventDefault();

        if (!profile) {
            alert("Please select a profile.");
            return;
        }

        setIsFlipped(true); // Flip to password setup form
    };

    const handlePasswordSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const userData = { fullName, firstName, gmailId, mobileNumber, profile, gender, dob, hasAssets, password };

        try {
            const response = await axios.post('http://localhost:5000/signup', userData, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 201) {
                alert('Signup successful!');
                navigate('/');
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred during signup. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <div className={`form-inner ${isFlipped ? 'flipped' : ''}`}>
                {/* Personal Details Form */}
                <div className="form form-front">
                    <form className="sign-in-form" onSubmit={handlePersonalDetailsSubmit}>
                        <h2>Personal Details</h2>
                        <p>Helps others on the platform know you better</p>

                        <div className="form-row">
                            <div className="form-group left">
                                <label htmlFor="fullName">Full Name *</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group right">
                                <label htmlFor="gmailId">Gmail ID *</label>
                                <input
                                    type="email"
                                    id="gmailId"
                                    value={gmailId}
                                    onChange={(e) => setGmailId(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group left">
                                <label htmlFor="firstName">First Name *</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group right">
                                <label htmlFor="mobileNumber">Mobile Number *</label>
                                <input
                                    type="tel"
                                    id="mobileNumber"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group left">
                                <label>Gender *</label>
                                <div className="radio-group">
                                    <label>
                                        <input
                                            type="radio"
                                            value="male"
                                            checked={gender === 'male'}
                                            onChange={() => setGender('male')}
                                            required
                                        />
                                        Male
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="female"
                                            checked={gender === 'female'}
                                            onChange={() => setGender('female')}
                                            required
                                        />
                                        Female
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="other"
                                            checked={gender === 'other'}
                                            onChange={() => setGender('other')}
                                            required
                                        />
                                        Other
                                    </label>
                                </div>
                            </div>

                            <div className="form-group right">
                                <label htmlFor="dob">Date of Birth *</label>
                                <input
                                    type="date"
                                    id="dob"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="profile">Which of these best describes you? *</label>
                            <select
                                id="profile"
                                value={profile}
                                onChange={(e) => setProfile(e.target.value)}
                                required
                            >
                                <option value="">Select Your Profile</option>
                                <option value="investor">Investor</option>
                               
                                <option value="job_seeker">Job Seeker</option> 
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Do you have assets worth over INR 2 cr apart from your primary residence? *</label>
                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        value="yes"
                                        checked={hasAssets === 'yes'}
                                        onChange={() => setHasAssets('yes')}
                                        required
                                    />
                                    Yes
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="no"
                                        checked={hasAssets === 'no'}
                                        onChange={() => setHasAssets('no')}
                                        required
                                    />
                                    No
                                </label>
                            </div>
                        </div>

                        <button type="submit">Save & Continue</button>
                    </form>
                </div>

                {/* Password Setup Form */}
                <div className="form form-back">
                    <h2>Set Password</h2>
                    <form className="password-form" onSubmit={handlePasswordSubmit}>
                        <div className="form-group">
                            <label htmlFor="password">Password *</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password *</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit">Submit</button>
                        <button type="button" className="form-button" onClick={() => navigate('/')}>Back to Homepage</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;