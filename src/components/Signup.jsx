import React from "react";
import axios from "axios";
import { useInput } from "../hooks/useInput";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const email = useInput("email");
    const password = useInput("password");
    const name = useInput("name");
    const lastname = useInput("lastname");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/api/signup", {
                email: email.value,
                password: password.value,
                name: name.value,
                lastname: lastname.value,
            })
            .then((res) => {
                console.log("user created: ", res);
                navigate("/login");
            })
            .catch(({ response }) => {
                const msg = Object.values(response.data.errors);
                alert(msg[0]);
            });
    };
    return (
        <div className="container">
            <div>
                <div>
                    <form className="" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label for="email" className="form-label">
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
                            <label for="password" className="form-label">
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
                        <div className="mb-3">
                            <label for="name" className="form-label">
                                Name:
                            </label>
                            <input
                                id="name"
                                className="form-control"
                                aria-label="First Name"
                                type="text"
                                placeholder="First Name"
                                {...name}
                            />
                        </div>
                        <div className="mb-3">
                            <label for="lastName" className="form-label">
                                Last Name:
                            </label>
                            <input
                                id="lastName"
                                className="form-control"
                                aria-label="Last Name"
                                type="text"
                                placeholder="Last Name"
                                {...lastname}
                            />
                        </div>
                        <div>
                            <button type="submit" class="btn btn-primary">
                                Sign up!
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
