import React from "react";
import { useInput } from "../hooks/useInput";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logHandler } from "../store/reducers/userReducer";
import { message } from "antd";
import axios from "axios";

const Login = () => {
    // variables
    const email = useInput("email");
    const password = useInput("password");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // handles
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/api/user/login", {
                email: email.value,
                password: password.value,
            })
            .then(({ data }) => {
                dispatch(logHandler(data.user));
                message.success(`Welcome ${data.user.name}!`);
                navigate("/profile");
            })
            .catch(({ response }) => {
                const msg = Object.values(response.data.errors);
                msg.map((e) => e && message.error(e, 2));
            });
        //     logHandler({
        //         email: email.value,
        //         password: password.value,
        //     })
        // )
        //     .then(({ payload }) => {
        //         message.success(`Welcome back ${payload.name}!`, 2);
        //     })
        //     .then(() => navigate("/profile"))
        //     .catch((err) => {
        //         console.log("error en Login: ", err);
        //         // console.log("response: ", response);
        //         // const msg = Object.values(response.data.errors);
        //         // msg.map((e) => e && message.error(e, 2));
        //         // navigate("/");
        //     });
    };
    return (
        <div className="container">
            <div>
                <div>
                    <form className="" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email address:
                            </label>
                            <input
                                aria-label="Email"
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Email address"
                                {...email}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password:
                            </label>
                            <input
                                id="password"
                                className="form-control"
                                aria-label="Password"
                                type="password"
                                placeholder="Password"
                                {...password}
                            />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Log in!
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
