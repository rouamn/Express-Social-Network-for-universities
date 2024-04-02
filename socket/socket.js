function initializeSocket(server) {
  const io = socketIO(server, {
    cors: {
      origin: "*", // Change "*" to the actual origin of your React application
      methods: ["GET", "POST"],
      credentials: true // Allow credentials (e.g., cookies, authorization headers)
    }
  });
  let activeUsers = [];

  io.on("connection", (socket) => {
    // add new User
    socket.on("new-user-add", (newUserId) => {
      // if user is not added previously
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New User Connected", activeUsers);
      }
      // send all active users to new user
      io.emit("get-users", activeUsers);
    });
  
    socket.on("disconnect", () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      // send all active users to all users
      io.emit("get-users", activeUsers);
    });
  
    // send message to a specific user
    socket.on("send-message", (data) => {
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      console.log("Sending from socket to :", receiverId)
      console.log("Data: ", data)
      if (user) {
        io.to(user.socketId).emit("recieve-message", data);
        // Emit a notification to the receiver
  io.to(user.socketId).emit("notification", "You have a new message!");

      }
    });
  });
}

module.exports = initializeSocket;