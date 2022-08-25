import React from "react";
import { useInput } from "../hooks/useInput";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logHandler } from "../store/reducers/userReducer";
const Login = () => {
    // variables

    const email = useInput("email");
    const password = useInput("password");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // handles
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            logHandler({
                email: email.value,
                password: password.value,
            })
        )
            .then(({ payload }) => {
                alert(`Success login: welcome back ${payload.name}`);
            })
            .then(() => navigate("/profile"))
            .catch((err) => alert(`Failed login: ${err.message}`));
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
