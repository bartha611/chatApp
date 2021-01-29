import { createSlice } from "@reduxjs/toolkit";
import { readChannel } from "../channels/channelSlice";

const initialState = {
  loading: false,
  members: [],
  error: false,
};

const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    loadMember(state) {
      state.loading = true;
      state.error = false;
    },
    createMember(state, action) {
      state.loading = false;
      state.members = [...state.members, action.payload];
    },
    readMember(state, action) {
      state.loading = false;
      state.members = action.payload;
    },
    updateMember(state, action) {
      state.loading = false;
      state.members = state.members.map((member) =>
        member.id === action.payload.id ? action.payload : member
      );
    },
    deleteMember(state, action) {
      state.loading = false;
      state.members = state.members.filter(
        (member) => member.id !== action.payload.id
      );
    },
    errorMember(state) {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: {
    [readChannel]: (state, action) => {
      state.members = action.payload.members;
    },
  },
});

export const {
  loadMember,
  createMember,
  readMember,
  updateMember,
  deleteMember,
  errorMember,
} = memberSlice.actions;
export default memberSlice.reducer;
