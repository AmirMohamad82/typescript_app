import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginType {
  User: {
    email: string;
    password: string;
  };
  success: () => void;
  fail: (error: string) => void;
}

export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async (state: LoginType) => {
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email: state.User.email,
        password: state.User.password,
      });
      localStorage.setItem("token", `Bearer ${response.data?.accessToken}`);
      localStorage.setItem("id", response.data.user?.id);
      localStorage.setItem("email", response.data.user?.email);
      state.success();
      return;
    } catch (error: any) {
      state.fail(error.response.data);
      return error;
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState: null as null,

  reducers: {},
});

export default loginSlice.reducer;
