const
    express = require("express"),
    app = express(),
    server = require("http").createServer(app),
    socketio = require("socket.io"),
    io = new socketio.Server().listen(server);

const port = process.env.PORT || 3000;

io.on("connection", socket=> {
    console.log(`User conntected ✔`);

    socket.on("move", data=>
        io.emit("move", { id: socket.id, ...data })
    );
    
    socket.on("disconnect", ()=> {
        console.log("User disconntected ✖");
    });

});
    
app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/client/index.html");
    console.log(`Server has been started on port ${ port } ❤`);
});
app.get("/js/main.js", (req, res)=> {
    res.sendFile(__dirname + "/client/js/main.js");
});

server.listen(port);