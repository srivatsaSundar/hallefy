import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles.css"; // Import updated styles

const LoginPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            let response;
            if (isRegister) {
                response = await axios.post("http://localhost:5000/api/register", data);
                alert(`User registered successfully!`);
                setIsRegister(false);
            } else {
                response = await axios.post("http://localhost:5000/api/login", data);
                alert(`Welcome back, ${response.data.email}!`);

                const userRole = response.data.role;
                const from = location.state?.from?.pathname || (userRole === "admin" ? "/admin-dashboard" : "/bookings");
                navigate(from, { replace: true });
            }
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <div className="card">
            <h2>{isRegister ? "Create Account" : "Login"}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {isRegister && (
                    <div>
                        <input
                            type="text"
                            {...register("username", { required: "Username is required" })}
                            placeholder="Username"
                            className="input-field"
                        />
                        {errors.username && <p className="error-message">{errors.username.message}</p>}
                    </div>
                )}

                <div>
                    <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        placeholder="Email"
                        className="input-field"
                    />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div>

                <div>
                    <input
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        placeholder="Password"
                        className="input-field"
                    />
                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                </div>

                <button type="submit" className="btn">
                    {isRegister ? "Register" : "Login"}
                </button>
            </form>

            <p className="switch-link" onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? "Already have an account? Login" : "Don't have an account? Sign up"}
            </p>
        </div>
    );
};

export default LoginPage;
