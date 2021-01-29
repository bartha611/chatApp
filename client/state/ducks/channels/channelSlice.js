import { createSlice } from "@reduxjs/toolkit";
import { readMessage } from "../messages/messageSlice";

const initialState = {
  loading: false,
  currentChannel: null,
  channels: [],
  error: false,
};

const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    loadChannel(state) {
      state.loading = true;
      state.error = false;
    },
    createChannel(state, action) {
      state.loading = false;
      state.currentChannel = action.payload;
      state.channels = [...state.channels, action.payload];
    },
    readChannel(state, action) {
      state.loading = false;
      state.currentChannel =
        action.payload.channels.length > 0 ? action.payload.channels[0] : null;
      state.channels = action.payload.channels;
    },
    updateChannel(state, action) {
      state.loading = false;
      state.channels = state.channels.map((channel) =>
        channel.id === action.payload.id ? action.payload : channel
      );
    },
    deleteChannel(state, action) {
      state.loading = false;
      state.channels = state.channels.filter(
        (channel) => channel.id !== action.payload.id
      );
    },
    errorChannel(state) {
      state.loading = false;
      state.error = true;
    },
  },
  extraReducers: {
    [readMessage]: (state, action) => {
      state.currentChannel = action.payload.channel;
    },
  },
});

export const {
  readChannel,
  createChannel,
  updateChannel,
  deleteChannel,
  loadChannel,
  errorChannel,
} = channelSlice.actions;

export default channelSlice.reducer;
