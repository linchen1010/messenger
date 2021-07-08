import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";

const socket = io(window.location.origin);

let isAuthenticated = false;

socket.on("connect", () => {
  console.log("connected to server");

  socket.emit("authentication", {
    username: store.getState().user.username,
  });

  socket.on("authenticated", () => {
    isAuthenticated = true;
    socket.emit("go-online", store.getState().user.id);
  });

  socket.on("add-online-user", (id) => {
    if (isAuthenticated) {
      store.dispatch(addOnlineUser(id));
    } else {
      console.log("Not authenticated!");
    }
  });

  socket.on("remove-offline-user", (id) => {
    if (isAuthenticated) {
      store.dispatch(removeOfflineUser(id));
    } else {
      console.log("Not authenticated!");
    }
  });
  socket.on("new-message", (data) => {
    if (isAuthenticated) {
      store.dispatch(setNewMessage(data.message, data.sender));
    } else {
      console.log("Not authenticated!");
    }
  });
});

export default socket;
