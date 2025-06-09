import React from "react";
import Logo from "@/components/shared/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {Popover,PopoverContent,PopoverTrigger} from "@/components/ui/popover"
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner"; 
import { useSelector } from "react-redux";
const Navbar = () => {
   // const user=true;
   const {user}=useSelector(store=>store.auth);
     const navigate = useNavigate();
    const logoutHandler=async()=>{
        try{
            const res=await axios.get("http://localhost:5000/api/v1/user/logout");
            if(res.data.success){
                navigate("./login");
                toast.success(res.data.message);
                
            }
//network call
        } catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
  return (
    <div className="border-b border-gray-300">
        <div className="flex items-center  justify-between max-w-7xl mx-auto h-16">
      <Logo />
      {user ? (
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <Button variant="link" onClick={logoutHandler}>Logout</Button>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="flex items-center gap-2">
            <Link to="/login"><Button variant="outline">Login</Button></Link>
             <Link to="/signup"><Button>Signup</Button></Link>
        </div>
      )}
      </div>
    </div>
  );
};

export default Navbar; 