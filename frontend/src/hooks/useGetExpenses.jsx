import { useEffect } from "react";
import  {useDispatch,useSelector} from "react-redux";
import axios from "axios";
import { setExpenses } from "../redux/expenseSlice";


const useGetExpenses=()=>{
    const dispatch=useDispatch();
    const {category,markAsDone}=useSelector(store=>store.expense);

    useEffect(()=>{
        const fetchExpense=async()=>{
            try{
                axios.defaults.withCredentials=true;
            const res=  await  axios.get(`https://expense-tracker-1qkr.onrender.com/api/v1/expense/getall?category=${category}&done=${markAsDone}`
);
              if(res.data.success){
                dispatch(setExpenses(res.data.expense));
              }
            } catch(error){
                console.log(error);
            }
        }
        fetchExpense();
    },[dispatch,category,markAsDone]);
}
export default useGetExpenses;
