import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Dashboard() {

    const [showAll, setShowAll] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const handleEditClick = (resume_id) => {
        navigate(`/edit-resume/${resume_id}`, { state: { resume_id: resume_id } });
    };

    const handleViewClick = (resume_id) => {
        navigate(`/view-resume/${resume_id}`, { state: { resume_id: resume_id } });
    };

    const filteredData = showAll ? data : data.slice(0, 2);

    const fadeIn = keyframes`
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    `;

    // Keyframes for sliding from top
    const slideInFromTop = keyframes`
        0% {
            transform: translateY(-100%);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    `;

    const AnimatedTextContainer = styled.div`
        position: relative;
        border-radius: 20px;
        ${({ animation }) => {
            switch (animation) {
                case 'fadeIn':
                    return css`animation: ${fadeIn} 1s ease-in-out forwards;`;
                case 'slideInFromTop':
                    return css`animation: ${slideInFromTop} 1s ease-in-out forwards;`;
                default:
                    return '';
            }
        }}
    `;

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await axios.get('http://localhost:8800/get-all-resumes');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching resumes:', error);
            }
        };

        fetchResumes();
    }, []);

    const getStatusColor = (isActive) => {
        return isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
    };

    return (
        <div>
            <div>
                <div className="py-5 mb-5">
                    <div className="container mx-auto px-4 py-5">
                        <div className="grid grid-cols-1 items-center">
                            <div className="animate-on-scroll">
                                <AnimatedTextContainer animation="slideInFromTop">
                                    <h1 className="text-4xl font-bold mb-3">Create Your Resume</h1>
                                    <p className="text-lg mb-6">
                                        Embark on a journey into our digital realm, a sanctuary where resumes thrive and careers flourish. Explore groundbreaking solutions, effortless experiences, and a haven where technology enhances every interaction, streamlining intricacies, and empowering professional journeys.
                                    </p>
                                    <Link
                                        to="/create-resume"
                                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded"
                                    >
                                        CREATE A NEW RESUME
                                    </Link>
                                </AnimatedTextContainer>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <div className="rounded overflow-hidden shadow-lg bg-white" style={{
                padding: '16px',
                marginLeft: '16px',
                marginRight: '16px',
                marginBottom: '32px',
                backgroundColor: '#fff',
                backdropFilter: 'saturate(200%) blur(30px)',
                boxShadow: '0px 24px 38px 3px rgba(0,0,0,0.3)',
            }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 m-2 ">
                    {filteredData.map((item, index) => (
                        <div key={index} className="rounded overflow-hidden shadow-sm bg-gray-100 h-50">
                            <div className="px-6 py-4 border-b">
                                <div className="flex items-center justify-between w-full">
                                    <header className="font-bold text-3xl mb-2">{item.firstName} {item.firstName} </header>

                                    <div className='flex flex-col'>
                                        <button className="flex items-center bg-transparent border-none transition duration-300 ease-in-out hover:bg-gray-800 hover:text-white" onClick={() => handleEditClick(item._id)}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleViewClick(item._id)}>
                                            < VisibilityIcon />
                                        </button>
                                    </div>

                                </div>
                                <div className="text-sm text-gray-500">{item.address}</div>
                                <p className="text-gray-700 text-base"></p>
                            </div>
                            <div className="px-6 py-4 flex justify-between container-fluid ">
                                <div className="grid-cols-1 gap-2 ">
                                    <div className='flex flex-row items-center'>
                                        <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 ${getStatusColor(item.isActive)}`}>
                                            {item.isActive ? 'Active' : 'Not Active'}
                                        </span>
                                        <span className="text-sm ml-4">Age : <span className='font-bold'> {item.age ? item.age : '-'}</span></span>
                                        <span className="text-sm ml-4"> M :  <span className='font-bold'> {item.phoneNo ? item.phoneNo : '-'}</span></span>
                                        <span className="text-sm ml-4">Nationality : <span className='font-bold'>  {item.nationality ? item.nationality : '-'}</span></span>
                                        <span className="text-sm ml-6"> <span className='font-bold'>  {item.employeeStatus ? item.employeeStatus : '-'}</span></span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {data.length > 2 && !showAll && (
                    <div className="w-full text-center mt-2">
                        <Link to={"/view-all-resumes"}>
                            <button
                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded"
                                onClick={() => setShowAll(false)}
                            >
                                View All
                            </button>
                        </Link>
                    </div>
                )}

            </div>

        </div >
    );
}
