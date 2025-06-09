import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import expenseSlice from "./expenseSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        expense:expenseSlice
    },
     devTools: true, 
});
console.log("Initial Redux State:", store.getState());
export default store;
