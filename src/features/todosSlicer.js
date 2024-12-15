import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get("http://localhost:3001/todos");
  const filteredData = response.data.filter((todo) => todo.arhive === false);
  return filteredData;
});

export const fetchArhive = createAsyncThunk("/todos/fetchArhive", async () => {
  const response = await axios.get("http://localhost:3001/todos");
  const filteredData = response.data.filter((todo) => todo.arhive === true);
  return filteredData;
});

export const postTodos = createAsyncThunk("todos/postTodos", async (data) => {
  const response = await axios.post("http://localhost:3001/todos", data);
  return response.data;
});

export const editTodos = createAsyncThunk("todos/putTodos", async (row) => {
  const response = await axios.put(`http://localhost:3001/todos/${row.id}`, {
    ...row,
  });
  return response.data;
});

export const deleteTodos = createAsyncThunk("todos/deleteTodos", async (id) => {
  const response = await axios.delete(`http://localhost:3001/todos/${id}`);
  return response.data;
});

const todosSlicer = createSlice({
  name: "todos",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetchData (GET)
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //fetchArhive (GET)
      .addCase(fetchArhive.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArhive.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchArhive.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //postData (POST)
      .addCase(postTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postTodos.fulfilled, (state, action) => {
        state.status = "success";
        state.data.push(action.payload);
      })
      .addCase(postTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //editData (PUT)
      .addCase(editTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editTodos.fulfilled, (state, action) => {
        state.status = "success";

        const indexToUpdate = state.data.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (indexToUpdate !== -1) {
          state.data[indexToUpdate] = action.payload;

          if (action.payload.arhive === true) {
            state.data = state.data.filter((todo) => todo.arhive !== true);
          }
        }
      })
      .addCase(editTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //deleteData (DELETE)
      .addCase(deleteTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodos.fulfilled, (state, action) => {
        state.status = "success";
        state.data = state.data.filter((todo) => todo.id !== action.meta.arg);
      })
      .addCase(deleteTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default todosSlicer.reducer;
