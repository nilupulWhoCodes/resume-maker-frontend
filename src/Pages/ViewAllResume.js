import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function ViewAllResume() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const handleEditClick = (resume_id) => {
        navigate(`/edit-resume/${resume_id}`, { state: { resume_id: resume_id } });
    };
    const handleViewClick = (resume_id) => {
        navigate(`/view-resume/${resume_id}`, { state: { resume_id: resume_id } });
    };

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

    return (
        <>
            <div className="container mx-auto m-2">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Is Active</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{user.firstName} {user.lastName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{user.age}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleViewClick(user._id)}>View</button>
                                    <button className="ml-2 text-blue-600 hover:text-blue-900" onClick={() => handleEditClick(user._id)}>Edit</button>
                                    {/* Pass a function reference to onClick */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
