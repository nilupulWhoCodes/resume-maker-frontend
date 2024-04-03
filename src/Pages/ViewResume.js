import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const StyledCVContainer = styled.div`
  font-family: 'Arial', sans-serif;
  background-color: #f0f0f0;
  padding: 25px;
  border: 1px solid black; /* Added semicolon here */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;


const SectionTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const CVItem = styled.div`
  margin-bottom: 20px;
`;

const CV = () => {

    const { id } = useParams();
    const [resumeData, setResumeData] = useState({
        firstName: "",
        lastName: "",
        age: null,
        address: "",
        phoneNo: "",
        dob: "",
        isActive: false,
        nationality: "",
        employeeStatus: "",
        isAgreedToTermsAndConditions: false,
        preferedLanguages: [],
        workExpirenece: [
            {
                workingPlaceName: "",
                workingPlaceAddress: "",
                numberOfExpirence: 0,
                typeOfPeriod: ""
            }
        ],
    });

    useEffect(() => {
        if (id) {
            const fetchResume = async () => {
                try {
                    const response = await axios.get(`http://localhost:8800/get-resume/${id}`);
                    setResumeData(response.data);
                } catch (error) {
                    console.error('Error fetching resume:', error);
                }
            };

            fetchResume();
        }
    }, [id]);
    return (
        <StyledCVContainer>
            <SectionTitle>Experience</SectionTitle>
            <CVItem>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff' }}>
                    {resumeData.firstName} {resumeData.lastName}
                </div>
                <div style={{ fontSize: '16px', color: '#666', marginTop: '10px' }}>
                    {resumeData.age ? <span style={{ fontWeight: 'bold' }}>Age:</span> : ''} {resumeData.age ? `${resumeData.age} years old` : ''}
                </div>
                <div style={{ fontSize: '16px', color: '#666' }}>
                    {resumeData.dob ? <span style={{ fontWeight: 'bold' }}>DOB:</span> : ''} {resumeData.dob ? `${new Date(resumeData.dob).toLocaleDateString()}` : ''}
                </div>
                <div style={{ fontSize: '16px', color: '#666' }}>
                    {resumeData.nationality ? <span style={{ fontWeight: 'bold' }}>Nationality:</span> : ''} {resumeData.nationality ? `${resumeData.nationality}` : ''}
                </div>
                <div style={{ fontSize: '16px', color: '#666' }}>
                    {resumeData.employeeStatus ? <span style={{ fontWeight: 'bold' }}>Employee Status:</span> : ''} {resumeData.employeeStatus ? `${resumeData.employeeStatus}` : ''}
                </div>
                <div style={{ fontSize: '16px', color: '#666', marginTop: '10px' }}>
                    {resumeData.address ? <span style={{ fontWeight: 'bold' }}>Address:</span> : ''} {resumeData.address ? `${resumeData.address}` : ''}
                </div>
                <div style={{ fontSize: '16px', color: '#666' }}>
                    {resumeData.phoneNo ? <span style={{ fontWeight: 'bold' }}>Phone Number:</span> : ''} {resumeData.phoneNo ? `${resumeData.phoneNo}` : ''}
                </div>

            </CVItem>

            <SectionTitle>Experience</SectionTitle>
            <CVItem>
                {resumeData.workExpirenece.map((experience, index) => (
                    <div key={index} style={{ marginBottom: '15px', borderBottom: '1px solid #ddd' }}>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>
                            {experience.workingPlaceName}
                        </div>
                        <div style={{ fontSize: '16px', color: '#666' }}>
                            {experience.numberOfExpirence === 0 ? '' : `${experience.numberOfExpirence} ${experience.typeOfPeriod}`}
                        </div>
                        <div style={{ fontSize: '16px', color: '#666' }}>{experience.workingPlaceAddress}</div>
                    </div>
                ))}
            </CVItem>

            <SectionTitle>Languages</SectionTitle>
            <CVItem>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                    {resumeData.preferedLanguages.map((lang, index) => (
                        <li key={index} style={{ fontSize: '16px', color: '#333' }}>
                            {lang}
                        </li>
                    ))}
                </ul>
            </CVItem>
        </StyledCVContainer>
    );
};

export default CV;
