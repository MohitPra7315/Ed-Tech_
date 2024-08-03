import React, { useState, useEffect } from "react";
import { fetchAllInstructor } from "../services/operations/AllIntructor";
import InstructorCard from "./InstructorCard";
export const AllInstructors = () => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAllInstructors = async () => {
            try {
                const result = await fetchAllInstructor();
                setInstructors(result.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getAllInstructors();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="text-black relative mx-auto w-11/12 max-w-7xl flex flex-col items-center justify-between">
            <div className="App w-full">
                <h1 className="text-2xl font-bold text-center my-4">Instructor List</h1>
                <div className="card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {instructors.map((instructor) => (
                        <InstructorCard 
                            key={instructor._id}
                            image={instructor.image}
                            firstName={instructor.firstName}
                            lastName={instructor.lastName}
                            email={instructor.email}
                            accountType={instructor.accountType}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
