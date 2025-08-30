import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./slice/stock.slice"
import masterReducer from "./slice/master.slice"

// Configure store
const store = configureStore({
  reducer: {
    stock: stockReducer,
    master :  masterReducer
  },
  devTools: true,
});

export default store;

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
