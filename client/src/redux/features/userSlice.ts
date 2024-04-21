import { IUser } from "../../api/types";
import { createSlice } from "@reduxjs/toolkit";

const initialUserState: IUser = {
  _id: "",
  username: "",
  password: "",
  passwordIv: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
