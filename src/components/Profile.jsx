import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((state) => state.user);
    return <div>Welcome {user.name}</div>;
};

export default Profile;
