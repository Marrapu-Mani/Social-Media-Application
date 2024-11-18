import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

import User from "./User";
import { getAllUsers } from "../../redux/api/user";

function FollowersCard() {
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useSelector(state => state.authReducer.authData);

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const data = await getAllUsers();
                setPersons(data);
            } catch (error) {
                setError("Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };
        fetchPersons();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (persons.length === 1 && persons[0]._id === user._id) {
        return <div>No other users available to follow.</div>;
    }
    return (
        <div>
            <h3 className="font-bold text-lg">Suggestions to follow</h3>
            <ul>
                {persons.map(person => {
                    if(user._id !== person._id){
                        return (
                            <User key={person._id} person={person} />
                        )
                    }
                    return null; // Ensure there is a return value in case condition is not met
                })}
            </ul>
        </div>
    );
}

export default FollowersCard;
