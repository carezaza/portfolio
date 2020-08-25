import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/slice";
import portReducer from "./port/slice";

const store = configureStore({ reducer: { userReducer, portReducer } });

export default store;
