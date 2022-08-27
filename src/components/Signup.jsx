import React from "react";
import axios from "axios";
import { useInput } from "../hooks/useInput";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const email = useInput("email");
    const password = useInput("password");
    const name = useInput("name");
    const lastName = useInput("lastName");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("/api/user/signup", {
                email: email.value,
                password: password.value,
                name: name.value,
                lastName: lastName.value,
            })
            .then((res) => {
                alert("user created :D");
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
                                {...lastName}
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
