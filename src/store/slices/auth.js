import { createSlice } from "@reduxjs/toolkit";
import { authAPI } from "@/store/api/authApi";
import { userAPI } from "@/store/api/userApi";

const user =
  typeof window !== "undefined"
    ? localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
    : null;

const token =
  typeof window !== "undefined"
    ? localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
    : null;


    
const initialState = {
  user,
  token,

  isAdmin: user?.role == 1 ? true : false,
  isStudent: user?.role == 2 ? true : false,
  isInstructor: user?.role == 3 ? true : false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // localStorage.removeItem("userName");
    },
    setLoading: (state, action) => {
      state.isLoadingUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authAPI.endpoints.loginUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.isAdmin = payload.user.role == 1;
          state.isStudent = payload.user.role == 2;
          state.isInstructor = payload.user.role == 3;
          state.token = payload.token;
          localStorage.setItem("user", JSON.stringify(payload.user));
          localStorage.setItem("token", JSON.stringify(payload.token));
          console.log(payload.token, "payload.token") // Corrected from 'tokens'
        }
      )

      .addMatcher(
        userAPI.endpoints.updateProfile.matchFulfilled,
        (state, { payload }) => {
          state.user = { ...state.user, ...payload };
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      )
      .addMatcher(authAPI.endpoints.loginUser.matchRejected, (state) => {
        state.auth = null;
      });

   
  },
});

export const { logout, setLoading } = slice.actions;

export default slice.reducer;
