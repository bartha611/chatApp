import { createSlice } from "@reduxjs/toolkit";
import { loginAuth } from "../auth/authSlice";
import { readChannel } from "../channels/channelSlice";

const initialState = {
  loading: false,
  currentTeam: null,
  teams: [],
  error: false,
};

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    loadTeam(state) {
      state.loading = true;
      state.error = false;
    },
    readTeam(state, action) {
      state.loading = false;
      state.teams = action.payload.teams;
    },
    createTeam(state, action) {
      state.loading = false;
      state.currentTeam = action.payload;
      state.teams = [...state.teams, action.payload.team];
    },
    updateTeam(state, action) {
      state.loading = false;
      state.teams = state.teams.map((team) =>
        team.id === action.payload.id ? action.payload : team
      );
    },
    deleteTeam(state, action) {
      state.loading = false;
      state.teams = state.teams.filter((team) => team.id !== action.payload.id);
    },
    errorTeam(state) {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: {
    [loginAuth]: (state, action) => {
      state.loading = false;
      state.teams = action.payload.teams;
    },
    [readChannel]: (state, action) => {
      state.loading = false;
      state.currentTeam = action.payload.team;
    },
  },
});

export const {
  loadTeam,
  createTeam,
  createMember,
  readTeam,
  updateTeam,
  deleteTeam,
  deleteMember,
  errorTeam,
} = teamSlice.actions;
export default teamSlice.reducer;
