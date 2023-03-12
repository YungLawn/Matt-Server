
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const fs = require('fs');
const { info } = require("console");
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },

});
//----------ELEMENTS-------------
const TeachE = ['Hydrogen', 'Helium', 'Lithium',];

const ROOMS = [];

//-------------------------------

//--------------------------------------------------
/*
fs.readFile('data.txt', 'utf-8', (err, data) => {
    if (err) throw err;
let dataArray = data.split('\n');
  console.log(dataArray);
  console.log(dataArray[0]);
  for(let i =0; i<=dataArray.length; i++){}
    
});
*/
//----------------------------------------------------
// let x = 1;
// for (let i = 0; i < eTable.length; i++) {


//     console.log(x + ':' + eTable[i]);
//     x++;

// }
console.log("Starting Server...");

io.on("connection", (socket) => {
    // ...
    console.log("Joined");//-
    console.log(socket.id);//-


    socket.on("HOST", function () {
        console.log(socket.id);
        const SVRcount = io.of("/").sockets.size;
        const ID = socket.id.slice(socket.id.length / 2, socket.id.length);
        const rmsize = io.of(ID).sockets.size;
        socket.join(ID);
        if (ROOMS.includes(ID) != true) {
            ROOMS.push(ID);
        }
        console.log(ID);
        console.log("Players on server: " + SVRcount);//-
        console.log("host id: " + ID);
        console.log(socket.id);
        console.log("Room Size:" + rmsize);


        socket.emit("roomcode", (ID));
        console.log(socket.rooms);//shows room ID
        console.log(ROOMS);
    });

    socket.on("JoinRoom", function (Client) {
        if (ROOMS.includes(Client[4]) != false) {
            socket.join(Client[4]);
            let rmIndx = ROOMS.indexOf(Client[4])+1;
            if (ROOMS.includes(socket.id) != true) {
                ROOMS.splice(rmIndx, 0, socket.id);
            }
            const DynInfo = [];
            const RoomSize = io.sockets.adapter.rooms.get(Client[4]).size;
            console.log("ClientInfo:" + Client);
            console.log("room code:" + Client[4]);
            console.log("name:" + Client[1]);

            DynInfo[0] = Client[1];
            DynInfo[1] = RoomSize - 1;

            socket.to(Client[4]).emit('ClientData', (DynInfo));
            console.log("Room Size:" + RoomSize);
            console.log(ROOMS);
        }

        else {
            //emit ERROR
        }
        
    });

    socket.on('SendName', function (names) {
        console.log("sendname: " + names);
        let last = names.length;
        let room = names.slice(last - 1, last);
        let players = names.slice(0, last - 1);

        socket.to(room).emit("LobbyInfo", (players));
    });


    socket.on('BEGIN', function (data) {
        let rm = ROOMS.indexOf(data[0])+1;

        for(let i =0;i<=data[1];i++){
            io.to(ROOMS[rm+i]).emit("rElement", (i+3));
        }
        
    });

    
    /*
    socket.on("InfoData", function (INFO) {
       console.log(INFO);
       fs.appendFile('data.txt', (INFO), (err) => {
        if (err) throw err;
        console.log('Data appended to file');
      });
    });
    */



});


httpServer.listen(3001);

