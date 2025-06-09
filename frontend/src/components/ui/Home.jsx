import React from "react";
import Navbar from "./Navbar";
import CreateExpense from "./CreateExpense";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { setCategory, setMarkAsDone } from "../../redux/expenseSlice";
import ExpenseTable from "./ExpenseTable";
import useGetExpenses from "../../hooks/useGetExpenses";

const Home = () => {
  useGetExpenses();
  const dispatch = useDispatch();

  const changeCategoryHandler = (value) => {
    dispatch(setCategory(value));
  };

  const changeDoneHandler = (value) => {
    dispatch(setMarkAsDone(value));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Heading and Create Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 drop-shadow-sm">Expense Tracker</h1>
          <CreateExpense />
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap items-center gap-4 bg-white/80 p-5 rounded-2xl shadow-md border border-gray-200 mb-6 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-gray-700">Filter By:</h2>

          {/* Category Select */}
          <Select onValueChange={changeCategoryHandler}>
            <SelectTrigger className="w-[180px] bg-white border-gray-300 shadow-sm rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Done Status Select */}
          <Select onValueChange={changeDoneHandler}>
            <SelectTrigger className="w-[180px] bg-white border-gray-300 shadow-sm rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none">
              <SelectValue placeholder="Mark As" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="done">Done</SelectItem>
                <SelectItem value="undone">Undone</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Table Section */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <ExpenseTable />
          <footer className="text-center mt-10 text-sm text-gray-600 italic">
  <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white rounded-full shadow-md font-semibold tracking-wide">
    Created by Pranjal Mall
  </span>
</footer>

        </div>
      </div>
    </div>
  );
};

export default Home;
