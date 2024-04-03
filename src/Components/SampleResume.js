

export default function ViewResume({ resumeData }) {
    return (
        <>
            <div className="text-2xl font-bold text-center">Sample Resume</div>
            <div className="border border-gray-200 rounded">
                <div className="border-b border-gray-300 p-4 mb-4">
                    <div className="flex flex-col lg:flex-row justify-between items-center">
                        <div className="flex flex-col md:w-1/2 lg:w-2/3 text-start ">
                            <div className="text-5xl font-bold  text-blue-800">{resumeData.firstName} {resumeData.lastName}</div>
                        </div>
                        <div className="flex flex-col md:w-1/2 lg:w-1/3 justify-end text-right text-gray-400 text-sm font-bold">
                            <div className="lg:inline">{resumeData.age ? resumeData.age + " years old" : ""}</div>
                            <div className="lg:inline">{resumeData.dob ? new Date(resumeData.dob).toLocaleDateString() : "-"}</div>
                            <div className="lg:inline">{resumeData.nationality ? resumeData.nationality : ""}</div>
                            <div className="lg:inline">{resumeData.employeeStatus ? resumeData.employeeStatus : ""}</div>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-sm mt-2 lg:text-base lg:mt-2">{resumeData.address}</div>
                        <div className="font-bold text-sm mt-2 lg:text-base lg:mt-1">{resumeData.phoneNo}</div>
                    </div>
                </div>
                <div className="m-4">
                    <>
                        <div className="font-bold text-xl-start text-blue-700"> EXPERIENCE </div>
                        <div className="mt-2 border rounded p-4 mb-4 ">
                            {resumeData.workExpirenece.map((experience, index) => (
                                <div key={index} className="pb-3 mb-3 border-b border-gray-200">
                                    <div className="flex flex-row justify-between ">

                                        <div className="font-bold text-2xl text-start">{experience.workingPlaceName}</div>
                                        <div >{experience.numberOfExpirence === 0 ? "" : experience.numberOfExpirence} {experience.typeOfPeriod}</div>

                                    </div>
                                    <div className="text-sm">{experience.workingPlaceAddress}</div>
                                </div>
                            ))}
                        </div>
                    </>
                    <>
                        <div className="font-bold text-xl-start text-blue-700"> LANGUAGES </div>

                        <div className="pb-3 mb-3">
                            <div className="flex flex-row justify-between ">

                                <div className="pl-5">
                                    <ul className="list-disc">
                                        {resumeData.preferedLanguages.map((lang, index) => (
                                            <li key={index}>
                                                {lang}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </div>

                    </>
                </div>
            </div>

        </>
    );
}