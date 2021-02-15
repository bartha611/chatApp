import { createSlice } from "@reduxjs/toolkit";
import { readChannel } from "../channels/channelSlice";
import { readTeam } from "../teams/teamSlice";
import { updateAuth } from "../auth/authSlice";

const initialState = {
  loading: false,
  members: [],
  profile: false,
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
      state.profile = action.payload.profile;
    },
    [readTeam]: (state, action) => {
      state.profile = action.payload.profile;
    },
    [updateAuth]: (state, action) => {
      state.profile = action.payload.profile;
      state.members = state.members.map((member) => {
        return member.id === action.payload.profile.id
          ? action.payload.profile
          : member;
      });
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
