import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import axios from "axios";
//import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setExpenses } from "../../redux/expenseSlice";
import { toast } from "react-hot-toast";
const CreateExpense = () => {
    const [formData,setFormData]=useState({
         description:"",
         amount:"",
         category:""
    });
      const[loading,setLoading]=useState(false);
      const[isOpen,setIsOpen]=useState(false);
      const dispatch=useDispatch();
      const { expenses } = useSelector((store) => store.expense);
    const changeEventHandler=(e)=>{
        const{name,value}=e.target;
        setFormData((prevData)=>(
            {
                ...prevData,
                [name]:value
            }
        ))
    }
    const changeCategoryHandler=(value)=>{
        setFormData((prevData)=>({
        ...prevData,
        category:value
        }))
    }
    const submitHandler=async(e)=>{
      e.preventDefault();
         console.log(formData)
        try{
             setLoading(true);
             const res=await axios.post("https://expense-tracker-1qkr.onrender.com/api/v1/expense/add",formData,{
                header:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
             });
             if(res.data.success){
               dispatch(setExpenses([...expenses,res.data.expense]))
                toast.success(res.data.message);
                setIsOpen(false);
             }
        } catch(error){
            console.log(error);
        } finally{
            setLoading(false);
        }
    }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={()=>setIsOpen(true)} variant="outline">Add New Expense</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
      <form onSubmit={submitHandler}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              placeholder="description"
              className="col-span-3"
              name="description"
              value={formData.description}
              onChange={changeEventHandler}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              placeholder="xxx in ₹"
              className="col-span-3"
              name="amount"
              value={formData.amount}
              onChange={changeEventHandler}
            />
          </div>
          <Select onValueChange={changeCategoryHandler}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectItem value="rent">Rent</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="salary">Salary</SelectItem>
              <SelectItem value="shopping">Shopping</SelectItem>
              <SelectItem value="others">Others</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
            {
                loading?<Button className="w-full my-4">
                    <Loader2 className="mr-2 h-4 animate-spin"/>
                    Please wait
                </Button>:
                <Button type="submit">Add</Button>
            }
         {/* <Button type="submit">Add</Button>*/}
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExpense;
