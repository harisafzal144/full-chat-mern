// const io = require('socket.io')(8900, {
//   cors: {
//     origin: 'http://localhost:3000',
//   },
// });
const io = require('socket.io')(8900, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  //when ceonnect
  console.log('a user connected.');

  //take userId and socketId from user
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  //send and get message
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit('getMessage', {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});

/**********Chect Sheet of socket.io   Emit cheatsheet***************/
// basic emit
//   socket.emit(/* ... */);

//   to all clients in the current namespace except the sender
//   socket.broadcast.emit(/* ... */);

//    to all clients in room1 except the sender
//   socket.to("room1").emit(/* ... */);

//   to all clients in room1 and/or room2 except the sender
//   socket.to("room1").to("room2").emit(/* ... */);

//   to all clients in room1
//   io.in("room1").emit(/* ... */);

//   to all clients in namespace "myNamespace"
//   io.of("myNamespace").emit(/* ... */);

//   to all clients in room1 in namespace "myNamespace"
//   io.of("myNamespace").to("room1").emit(/* ... */);

//   to individual socketid (private message)
//   io.to(socketId).emit(/* ... */);

//   to all clients on this node (when using multiple nodes)
//   io.local.emit(/* ... */);

//   to all connected clients
//   io.emit(/* ... */);

//   WARNING: `socket.to(socket.id).emit()` will NOT work, as it will send to everyone in the room
//   // named `socket.id` but the sender. Please use the classic `socket.emit()` instead.

//   with acknowledgement
//   socket.emit("question", (answer) => {
//     // ...
//   });

//   without compression
//   socket.compress(false).emit(/* ... */);

//   a message that might be dropped if the low-level transport is not writable
//   socket.volatile.emit(/* ... */);

// });
