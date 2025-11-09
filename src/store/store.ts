// Redux store configuration
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { courseApi } from "./api/courseApi";
import { userAPI } from "./api/userApi";
import { authAPI } from "./api/authApi";
import auth from "./slices/auth";

export const store = configureStore({
  reducer: {
    auth,
    [courseApi.reducerPath]: courseApi.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(courseApi.middleware)
      .concat(userAPI.middleware)
      .concat(authAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
