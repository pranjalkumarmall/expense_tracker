import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit2, Trash } from "lucide-react";
import UpdateExpense from "@/components/ui/UpdateExpense";
import axios from "axios";
import { toast } from "react-hot-toast"; // or your chosen toast library
//import { toast } from "@/components/ui/sonner";


const ExpenseTable = () => {
  const { expenses } = useSelector((store) => store.expense);
  const [localExpense, setLocalExpense] = useState([]);
   const [checkedItems, setCheckedItems] = useState({});

  
    useEffect(() => {
    setLocalExpense(expenses);
  }, [expenses]);
     const totalAmount=localExpense.reduce((acc,expense)=>{
            if(!checkedItems[expense._id]){
                return acc+expense.amount;
            }
          return acc;
     },0)
             const handleCheckboxChange = async (expenseId) => {
    const newStatus = !checkedItems[expenseId];

    try {
      const res = await axios.put(
        `https://expense-tracker-1qkr.onrender.com/api/v1/expense/${expenseId}/done`,
        { done: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setCheckedItems((prev) => ({
          ...prev,
          [expenseId]: newStatus,
        }));

        setLocalExpense((prevExpenses) =>
          prevExpenses.map((exp) =>
            exp._id === expenseId ? { ...exp, done: newStatus } : exp
          )
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };


    const removeExpenseHandler = async (expenseId) => {
    try {
      const res = await axios.delete(
       `https://expense-tracker-1qkr.onrender.com/api/v1/expense/remove/${expenseId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
          console.log("Delete success:", res.data.message);
        toast.success(res.data.message);
        const filteredExpenses = localExpense.filter(
          (expense) => expense._id !== expenseId
        );
        setLocalExpense(filteredExpenses);
      }
    } catch (error) {
      console.error(error);
     toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Table>
      <TableCaption>A list of your recent expenses.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Mark As Done</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
  {localExpense.length === 0 ? (
    <TableRow>
      <TableCell colSpan={6} className="text-center">
        Add your first expense
      </TableCell>
    </TableRow>
  ) : (
    localExpense.map((expense) => (
      <TableRow key={expense._id}>
        <TableCell className="font-medium">
          <Checkbox
            checked={expense.done}
            onCheckedChange={() => handleCheckboxChange(expense._id)}
          />
        </TableCell>
        <TableCell className={`${expense.done?'line-through':''}`}>{expense.description}</TableCell>
        <TableCell className={`${expense.done?'line-through':''}`}>{expense.amount}</TableCell>
        <TableCell className={`${expense.done?'line-through':''}`}>{expense.category}</TableCell>
        <TableCell className={`${expense.done?'line-through':''}`}>{expense.createdAt?.split("T")[0]}</TableCell>
        <TableCell className="text-right">
          <div className="flex items-center justify-end gap-2">
            <Button
              size="icon"
              className="rounded-full border text-red-600 border-red-600 hover:border-transparent"
              variant="outline"
              onClick={() => removeExpenseHandler(expense._id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
            <UpdateExpense expense={expense}/>
          </div>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>


      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">{totalAmount} ₹</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ExpenseTable;
