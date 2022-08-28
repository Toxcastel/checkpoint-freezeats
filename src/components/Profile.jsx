import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Profile = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.length === 0) navigate("/");
    }, [user]);
    // if (user.length === 0) return navigate("/");
    return (
        <div>
            <h1>Welcome {user.name}</h1>
        </div>
    );
};

export default Profile;
