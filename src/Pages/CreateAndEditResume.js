import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ViewResume from '../Components/SampleResume';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';
import { Close } from "@mui/icons-material"

const EditResume = () => {

    const { id } = useParams();
    console.log(id);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    const [dob, setdob] = useState(formattedDate);
    const [NoOfWorkExperience, setNoOfWorkExperience] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [toastError, setToastError] = useState(false);



    const initialValues = {
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
    };

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
    }, [id]); // Only runs when id changes, or once if id remains constant

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [addresError, setAddresError] = useState('');
    const [phoneNoError, setPhoneNoError] = useState('');
    const [languageError, setLanguageError] = useState('');
    const [termsAndConditionsError, setTermsAndConditionsError] = useState('');
    const [companyExperienceError, setCompanyExperienceError] = useState([]);
    const [companyExperienceTypeError, setCompanyExperienceTypeError] = useState([]);

    const isValidMobileNumber = (number) => {

        const mobileNumberPattern = /^[0-9]{10}$/;
        return mobileNumberPattern.test(number);
    };

    const validateForm = () => {
        let valid = true;

        if (resumeData.firstName === "") {
            setFirstNameError("Please fill out this field");
            valid = false;
        }
        if (resumeData.lastName === "") {
            setLastNameError("Please fill out this field");
            valid = false;
        }
        if (resumeData.age === null || resumeData.age === 0) {
            setAgeError("Please fill out this field");
            valid = false;
        }
        if (resumeData.address === "") {
            setAddresError("Please fill out this field");
            valid = false;
        }
        if (resumeData.phoneNo === "") {
            setPhoneNoError("Please fill out this field");
            valid = false;
        }
        if (!isValidMobileNumber(resumeData.phoneNo)) {
            setPhoneNoError("Please enter a valid mobile number");
            valid = false;
        }
        if (!resumeData.preferedLanguages.length) {
            setLanguageError("Please select at least one value");
            valid = false;
        }
        if (!resumeData.isAgreedToTermsAndConditions) {
            setTermsAndConditionsError("Please fill out this field");
            valid = false;
        }

        for (let index = 0; index < NoOfWorkExperience; index++) {
            if (
                (resumeData.workExpirenece[index].numberOfExpirence === 0 ||
                    resumeData.workExpirenece[index].numberOfExpirence === null) &&
                resumeData.workExpirenece[index].workingPlaceName !== ""
            ) {
                setCompanyExperienceError(prevErrors => ({
                    ...prevErrors,
                    [index]: "Please fill this field",
                }));
                valid = false;
            }
            if (
                (resumeData.workExpirenece[index].typeOfPeriod === "" ||
                    resumeData.workExpirenece[index].typeOfPeriod === null) &&
                resumeData.workExpirenece[index].workingPlaceName !== ""
            ) {
                setCompanyExperienceTypeError(prevErrors => ({
                    ...prevErrors,
                    [index]: "Please select a value",
                }));
                valid = false;
            }
        }
        return valid;
    };

    const handleSaveClick = async () => {
        if (validateForm()) {
            try {
                if (!id) {
                    const response = await axios.post("http://localhost:8800/save-resume", resumeData).then(() => { setResumeData(initialValues); setShowToast(true); setToastError(false); });
                } else {
                    const response = await axios.put(`http://localhost:8800/update-resume/${id}`, resumeData).then(() => { setResumeData(initialValues); setShowToast(true); setToastError(false); });;
                }

            } catch (error) {
                console.error('Error sending POST request:', error.message).then(() => { setShowToast(true); setToastError(true); });
                // Handle the error, such as showing an error message to the user
            }
        }
    };

    return (
        <>
            <div className="container mx-auto p-4">
                <ToastContainer className="p-3 position-fixed w-25" position={"top-end"} style={{ zIndex: 1 }}>
                    <Toast className=' flex align-center justify-center ' show={showToast} style={{ backgroundColor: toastError ? 'red' : 'green', width: "25%", position: "fixed" }}>
                        <div className="m-2">

                            <Toast.Body className="font-bold flex-row justify-content-around ">
                                {toastError ? 'Error saving your resume!' : 'Successfully saved your resume'}


                                <Close className="cursor-pointer" onClick={() => setShowToast(false)} />

                            </Toast.Body>
                        </div>
                    </Toast>
                </ToastContainer>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-4 ">
                        <div className="text-2xl font-bold">Personal Details</div>
                        <div className=" border border-gray-200 rounded p-4 ">
                            <form className="w-full max-w-lg">
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/1 px-3 mb-6 md:mb-2">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer"
                                                checked={resumeData.isActive}
                                                onChange={(event) => {
                                                    const { checked } = event.target;
                                                    setResumeData((prevData) => ({ ...prevData, isActive: checked }));
                                                }} />
                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"> {resumeData.isActive ? "Active State" : "Deactive State"} </span>
                                        </label>
                                    </div>
                                    <div className="w-full md:w-1/1 px-3 mb-6 md:mb-2">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" htmlFor="grid-first-name">
                                            First Name
                                        </label>
                                        <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"
                                            value={resumeData.firstName}
                                            onChange={
                                                (event) => {
                                                    const { value } = event.target;
                                                    setResumeData((prevData) => ({
                                                        ...prevData,
                                                        firstName: value,
                                                    }));
                                                    setFirstNameError('');
                                                }
                                            } />
                                        <p className="text-red-500 text-xs italic"> {firstNameError} </p>
                                    </div>
                                    <div className="w-full md:w-1/1 px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                            Last Name
                                        </label>
                                        <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="grid-last-name" type="text" placeholder="Doe"
                                            value={resumeData.lastName}
                                            onChange={
                                                (event) => {
                                                    const { value } = event.target;
                                                    setResumeData((prevData) => ({
                                                        ...prevData,
                                                        lastName: value,
                                                    }));
                                                    setLastNameError('');
                                                }
                                            }
                                        />
                                        <p className="text-red-500 text-xs italic"> {lastNameError}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-2">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="age">
                                            Age
                                        </label>
                                        <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="age" type="number" placeholder="21"
                                            value={resumeData.age}
                                            onChange={
                                                (event) => {
                                                    const { value } = event.target;
                                                    setResumeData((prevData) => ({
                                                        ...prevData,
                                                        age: parseInt(value),
                                                    }));
                                                    setAgeError('');
                                                }
                                            }
                                        />
                                        <p className="text-red-500 text-xs italic"> {ageError}</p>
                                    </div>

                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                                            DOB
                                        </label>
                                        {/* react datepicker */}
                                        <DatePicker
                                            value={dob}
                                            placeholderText={"01/01/1990"}
                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-200"
                                            onChange={(date) => {
                                                setdob(date.toLocaleDateString("en-US"));
                                                setResumeData((prevData) => ({
                                                    ...prevData,
                                                    dob: date.toLocaleDateString("en-US")
                                                }));
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/1 px-3 mb-6 md:mb-2">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="address">
                                            Address
                                        </label>
                                        <textarea
                                            value={resumeData.address}
                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                            id="address"
                                            rows="5"
                                            placeholder="41, Peter's Road, Colombo"
                                            onChange={
                                                (event) => {
                                                    const { value } = event.target;
                                                    setResumeData((prevData) => ({
                                                        ...prevData,
                                                        address: value,
                                                    }));
                                                    setAddresError('');
                                                }
                                            }
                                        ></textarea>
                                        <p className="text-red-500 text-xs italic"> {addresError} </p>
                                    </div>
                                    <div className="w-full md:w-1/1 px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                                            Phone No
                                        </label>
                                        <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="phone" type="text" placeholder="0711101011"
                                            value={resumeData.phoneNo}
                                            onChange={
                                                (event) => {
                                                    const { value } = event.target;
                                                    setResumeData((prevData) => ({
                                                        ...prevData,
                                                        phoneNo: value,
                                                    }));
                                                    setPhoneNoError('');
                                                }
                                            } />
                                        <p className="text-red-500 text-xs italic"> {phoneNoError} </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-3">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nationality">
                                            Nationality
                                        </label>
                                        <select
                                            className="block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-200"
                                            id="nationality"
                                            value={resumeData.nationality}
                                            onChange={(event) => {
                                                const { value } = event.target;
                                                setResumeData((prevData) => ({
                                                    ...prevData,
                                                    nationality: value,
                                                }));
                                            }}
                                        >
                                            <option value="" disabled>Choose One</option>
                                            <option value="Sinhalese">Sinhalese</option>
                                            <option value="Tamil">Tamil</option>
                                            <option value="Muslim">Muslim</option>
                                            <option value="Burghers">Burghers</option>
                                        </select>

                                    </div>

                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="employee">
                                            Employment Status
                                        </label>
                                        <select className="block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="employee"
                                            value={resumeData.employeeStatus}
                                            onChange={
                                                (event) => {
                                                    const { value } = event.target;
                                                    setResumeData((prevData) => ({
                                                        ...prevData,
                                                        employeeStatus: value,
                                                    }));
                                                }
                                            }
                                        >
                                            <option value={''} disabled >Choose One</option>
                                            <option value={'Employeed'}>Employeed</option>
                                            <option value={"Unemployeed"}>Unemloyeed</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="flex flex-wrap -mx-3 mb-3">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="languages">
                                            Preffered Languages
                                        </label>
                                        <select defaultValue="Choose One" className="block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="languages"
                                            onChange={
                                                (event) => {
                                                    const { value } = event.target;
                                                    if (!resumeData.preferedLanguages.includes(value)) {
                                                        setResumeData((prevData) => ({
                                                            ...prevData,
                                                            preferedLanguages: [...prevData.preferedLanguages, value]
                                                        }));
                                                    }
                                                    setLanguageError('');
                                                }
                                            }
                                        >
                                            <option value={''} disabled >Choose One</option>
                                            <option value={'Sinhala'}>Sinhala</option>
                                            <option value={'English'}>  English </option>
                                            <option value={'Tamil'}>Tamil </option>
                                        </select>
                                        <p className="text-red-500 text-xs italic"> {languageError} </p>
                                    </div>
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="languages">
                                            Languages
                                        </label>
                                        <ul className="list-disc text-gray-500 px-4">
                                            {resumeData.preferedLanguages.map((language, index) => (
                                                <li key={index}>{language}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-3 mb-2">
                                    <div className="w-full md:w-2/2 px-3 mb-6 md:mb-0">
                                        <label className="md:w-2/2 block text-gray-500 font-bold">
                                            <input
                                                className="mr-2 leading-tight"
                                                type="checkbox"
                                                checked={resumeData.isAgreedToTermsAndConditions}
                                                onChange={(event) => {
                                                    const { checked } = event.target;
                                                    setResumeData((prevData) => ({
                                                        ...prevData,
                                                        isAgreedToTermsAndConditions: checked,
                                                    }));
                                                    setTermsAndConditionsError('');
                                                }}
                                            />
                                            <span className="text-sm">
                                                By ticking, you are confirming that, you agree to our terms and conditions
                                            </span>
                                            <p className="text-red-500 text-xs italic"> {termsAndConditionsError}</p>
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="flex justify-between ">
                            <div className="text-2xl font-bold">Experience</div>
                            <button className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded text-sm"
                                onClick={() => {
                                    setNoOfWorkExperience(prevAmount => prevAmount + 1);
                                    setResumeData(prevData => ({
                                        ...prevData,
                                        workExpirenece: [
                                            ...prevData.workExpirenece,
                                            {
                                                workingPlaceName: "",
                                                workingPlaceAddress: "",
                                                numberOfExpirence: 0,
                                                typeOfPeriod: ""
                                            }
                                        ]
                                    }));
                                }}>
                                Add another
                            </button>
                        </div>
                        <div className="border border-gray-200 rounded">
                            {resumeData.workExpirenece.map((workExpDetails, index) => (
                                <div key={index}>
                                    <div className="bg-gray-100 px-4 py-2 mb-4 rounded-t flex items-center justify-between">
                                        <h2 className="text-body font-bold text-gray-800">Experience Details #{index + 1}</h2>
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            style={{ fontSize: '1.5rem' }}
                                            onClick={() => {
                                                setResumeData(prevState => ({
                                                    ...prevState,
                                                    workExpirenece: prevState.workExpirenece.filter((item, idx) => idx !== index),
                                                }));
                                            }}
                                        >
                                            X
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full md:w-1/1 px-3 mb-6 md:mb-2">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`company-name-${index}`}>
                                                    Company Name
                                                </label>
                                                <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id={`company-name-${index}`} type="text" placeholder="Apple"
                                                    value={workExpDetails.workingPlaceName}
                                                    onChange={(e) => {
                                                        const companyName = e.target.value;
                                                        setResumeData((prevState) => ({
                                                            ...prevState,
                                                            workExpirenece: prevState.workExpirenece.map((item, idx) =>
                                                                idx === index ? { ...item, workingPlaceName: companyName } : item
                                                            ),
                                                        }));
                                                    }}
                                                />
                                            </div>
                                            <div className="w-full md:w-1/1 px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`company-address-${index}`}>
                                                    Company Address
                                                </label>
                                                <textarea rows={3} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id={`company-address-${index}`} type="text" placeholder="33,Street Rd, Colombo"
                                                    value={workExpDetails.workingPlaceAddress}
                                                    onChange={(e) => {
                                                        const companyAddress = e.target.value;
                                                        setResumeData((prevState) => ({
                                                            ...prevState,
                                                            workExpirenece: prevState.workExpirenece.map((item, idx) =>
                                                                idx === index ? { ...item, workingPlaceAddress: companyAddress } : item
                                                            ),
                                                        }));
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-2">
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={`experience-${index}`}>
                                                    Experience
                                                </label>
                                                <div className="w-full flex flex-row gap-2 w-full">
                                                    <div className="flex flex-col ">
                                                        <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id={`age-${index}`} type="number" placeholder="Year"
                                                            value={parseInt(workExpDetails.numberOfExpirence)}
                                                            onChange={
                                                                (e) => {
                                                                    const experience = parseInt(e.target.value);
                                                                    setResumeData((prevState) => ({
                                                                        ...prevState,
                                                                        workExpirenece: prevState.workExpirenece.map((item, idx) =>
                                                                            idx === index ? { ...item, numberOfExpirence: experience } : item
                                                                        ),
                                                                    }));
                                                                    setCompanyExperienceError(prevErrors => ({
                                                                        ...prevErrors,
                                                                        [index]: "",
                                                                    }));
                                                                }

                                                            }
                                                        />
                                                        <p className="text-red-500 text-xs italic"> {companyExperienceError[index]} </p>
                                                    </div>
                                                    <div className="flex flex-col w-full  ">
                                                        <select defaultValue="Choose One" className="block w-25 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="languages"
                                                            value={workExpDetails.typeOfPeriod}
                                                            onChange={
                                                                (e) => {
                                                                    const experienceType = e.target.value;
                                                                    setResumeData((prevState) => ({
                                                                        ...prevState,
                                                                        workExpirenece: prevState.workExpirenece.map((item, idx) =>
                                                                            idx === index ? { ...item, typeOfPeriod: experienceType } : item
                                                                        ),
                                                                    }));
                                                                    setCompanyExperienceTypeError(prevErrors => ({
                                                                        ...prevErrors,
                                                                        [index]: "",
                                                                    }));
                                                                }
                                                            }
                                                        >

                                                            <option value="" disabled >Choose One</option>
                                                            <option value="Years">Years</option>
                                                            <option value="Months">Months </option>

                                                        </select>
                                                        <p className="text-red-500 text-xs italic"> {companyExperienceTypeError[index]}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-end" }}>

                                <button disabled={!resumeData.isAgreedToTermsAndConditions} className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded text-sm" onClick={handleSaveClick}>
                                    Save
                                </button>
                            </div>
                        </>
                    </div>
                    <div className="space-y-4 hidden xl:block" style={{
                        position: "fixed",
                        top: '75px',
                        right: '40px',
                        height: '80vh',
                        overflowY: 'auto',
                        width: '45%',
                        zIndex: 5,
                        scrollbarWidth: 'none', // Remove scrollbar for Firefox
                        msOverflowStyle: '', // Remove scrollbar for Internet Explorer
                    }}>
                        <ViewResume resumeData={resumeData} />
                    </div>
                </div >
            </div >

        </>
    );
}

export default EditResume;
