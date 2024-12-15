import { configureStore } from "@reduxjs/toolkit";

import todosReducer from "./features/todosSlicer"

const store = configureStore({
  reducer: {
    todos: todosReducer
  },
});


export default store
