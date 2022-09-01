import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loadingHandler } from "../store/reducers/loadingReducer";
import { message } from "antd";
import Loading from "../commons/Loading";

const Profile = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch();

    // intento de protección de ruta. La idea es capturar la validación desde la api, sin tomar en cuenta el reducer.
    useEffect(() => {
        if (user.rejected) {
            message.error("Nothing to do here", 1);
            navigate("/");
        }
        if (user.id) dispatch(loadingHandler(false));
    });

    if (loading) {
        return <Loading />;
    } else {
        return (
            <div>
                <h1>Welcome {user.name}</h1>
            </div>
        );
    }
};

export default Profile;
