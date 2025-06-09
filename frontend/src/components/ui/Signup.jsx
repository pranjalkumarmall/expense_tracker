
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from "axios";
//import { toast } from "sonner"; // ✅ Import toast from sonner
import {  useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";

const Signup= () =>{
    const [input,setInput]=useState({
           fullname:"",
           email:"",
           password:""
    });
        const navigate = useNavigate(); 
        const changeHandler=(e)=>{
            setInput({...input,[e.target.name]:e.target.value});
        }
        const submitHandler=async(e)=>{
           e.preventDefault(); // ✅ Correct spelling
          e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/v1/user/register", input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message); // ✅ Show success toast
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error("Login failed"); // Optional: show error toast
        }
            
        }
     
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            
        <form onSubmit={submitHandler} className="w-96 p-8  shadow-lg">
            <div className="w-ful flex justify-center mb-5"><Logo/></div>
            <div>
           <Label>Full Name</Label>
           <Input type="text" name="fullname"
             value={input.fullname}
            onChange={changeHandler}
           />
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
           <Input type="password" name="password"
             value={input.password}
            onChange={changeHandler}
           />
            </div>
            <Button className="w-full my-5">Sigup</Button>
            <p className="text-sm text-centre">Already have an account?<Link to="/login" className="text-blue-600">Login</Link></p>
        </form>
        </div>
    )
}
export default Signup