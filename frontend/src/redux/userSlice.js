import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstname: "",
  lastname: "",
  _id: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      console.log(action.payload.data);
      //   state.user = action.payload.data;
      state._id = action.payload.data._id;
      state.firstname = action.payload.data.firstname;
      state.lastname = action.payload.data.lastname;
      state.email = action.payload.data.email;
      state.isLoggedIn = true;
    },

    logoutRedux: (state, action) => {
      state._id = "";
      state.firstname = "";
      state.lastname = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;
