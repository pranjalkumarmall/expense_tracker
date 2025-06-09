import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from "axios";
//import { toast } from "sonner"; // ✅ Import toast from sonner
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/authSlice";
const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const dispatch=useDispatch(); // last part
    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/v1/user/login", input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log(res);
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));  //last part
                toast.success(res.data.message); // ✅ Show success toast
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error("Login failed"); // Optional: show error toast
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <form onSubmit={submitHandler} className="w-96 p-8 shadow-lg">
                <div className="w-full flex justify-center mb-5">
                    <Logo />
                </div>
                <div>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeHandler}
                    />
                </div>
                <Button className="w-full my-5">Login</Button>
                <p className="text-sm text-center">
                    Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
