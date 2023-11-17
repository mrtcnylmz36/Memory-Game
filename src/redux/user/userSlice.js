import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: "",
    point: 100,
    level: "",
    visible: "login",
    modal: false,
  },
  reducers: {
    setUserName: (state, action) => {
      localStorage.setItem("userName", action.payload);
      state.userName = localStorage.getItem("userName");
    },
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    finishGames: (state, action) => {
      state.point = 100;
      state.visible = "level";
    },
    setVisible: (state, action) => {
      state.visible = action.payload;
    },
    setPoint: (state, action) => {
      state.point = action.payload;
    },
    setModal: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export default userSlice.reducer;
export const {
  setUserName,
  setLevel,
  finishGames,
  setVisible,
  setPoint,
  setModal,
} = userSlice.actions;
