import React from 'react';
import { Link } from 'react-router-dom';

const InstructorCard = ({ id, image, firstName, lastName, email, accountType }) => {
    return (
        <Link to={`/instructor/${id}`} className="block w-full">
            <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center">
                <img src={image} alt={`${firstName} ${lastName}`} className="w-full h-48 object-cover" />
                <div className="p-4 w-full">
                    <h2 className="text-xl font-bold">{firstName} {lastName}</h2>
                    <p className="text-gray-600">{email}</p>
                    <p className="text-gray-600">{accountType}</p>
                </div>
            </div>
        </Link>
    );
};

export default InstructorCard;
