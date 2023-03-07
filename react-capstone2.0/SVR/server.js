
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
const eTable = [
    'Beryllium', 'Boron', 'Carbon', 'Nitrogen', 'Oxygen', 'Fluorine', 'Neon', 'Sodium', 'Magnesium', 'Aluminum', 'Silicon', 'Phosphorus',
    'Sulfur', 'Chlorine', 'Argon', 'Potassium', 'Calcium', 'Scandium', 'Titanium', 'Vanadium', 'Chromium', 'Maganese', 'Iron', 'Cobalt',
    'Nickel', 'Copper', 'Zinc', 'Gallium', 'Germanium', 'Arsenic', 'Selenium', 'Bromine', 'Krypton', 'Rubidium', 'Strontium', 'Yttrium',
    'Zirconium', 'Niobium', 'Molybdenum', 'Technetium', 'Ruthenium', 'Rhodium', 'Palladium', 'Silver', 'Cadmium', 'Indium', 'Tin',
    'Antimony', 'Tellurium', 'Iodine', 'Xenon', 'Cesium', 'Barium', 'Lanthanum', 'Cerium', 'Praseodymium', 'Neodymium', 'Promethium',
    'Samarium', 'Europium', 'Gadolinium', 'Terbium', 'Dysprosium', 'Holmium', 'Erbium', 'Thulium', 'Ytterbium', 'Lutetium', 'Hafnium',
    'Tantalum', 'Tungsten', 'Rhenium', 'Osmium', 'Iridium', 'Platinum', 'Gold', 'Mercury', 'Thallium', 'Lead', 'Bismuth',
    'Polonium', 'Astatine', 'Radon', 'Francium', 'Radium', 'Actinium', 'Thorium', 'Protactinium', 'Uranium', 'Neptunium', 'Plutonium',
    'Americium', 'Curium', 'Berkelium', 'Californium', 'Ensteinium', 'Fermium', 'Mendelevium', 'Nobelium', 'Lawrencium', 'Rutherfordium',
    'Dubnium', 'Seaborgium', 'Bohrium', 'Hassium', 'Meitnerium', 'Darmstadtium', 'Roentgenium', 'Copernicium', 'Nohonium', 'Flerovium',
    'Moscovium', 'Livermorium', 'Tennessine', 'Ununoctium'
];
const dealer = [
    'Beryllium', 'Boron', 'Carbon', 'Nitrogen', 'Oxygen', 'Fluorine', 'Neon', 'Sodium', 'Magnesium', 'Aluminum', 'Silicon', 'Phosphorus',
    'Sulfur', 'Chlorine', 'Argon', 'Potassium', 'Calcium', 'Scandium', 'Titanium', 'Vanadium', 'Chromium', 'Maganese', 'Iron', 'Cobalt',
    'Nickel', 'Copper', 'Zinc', 'Gallium', 'Germanium', 'Arsenic', 'Selenium', 'Bromine', 'Krypton', 'Rubidium', 'Strontium', 'Yttrium',
    'Zirconium', 'Niobium', 'Molybdenum', 'Technetium', 'Ruthenium', 'Rhodium', 'Palladium', 'Silver', 'Cadmium', 'Indium', 'Tin',
    'Antimony', 'Tellurium', 'Iodine', 'Xenon', 'Cesium', 'Barium', 'Lanthanum', 'Cerium', 'Praseodymium', 'Neodymium', 'Promethium',
    'Samarium', 'Europium', 'Gadolinium', 'Terbium', 'Dysprosium', 'Holmium', 'Erbium', 'Thulium', 'Ytterbium', 'Lutetium', 'Hafnium',
    'Tantalum', 'Tungsten', 'Rhenium', 'Osmium', 'Iridium', 'Platinum', 'Gold', 'Mercury', 'Thallium', 'Lead', 'Bismuth',
    'Polonium', 'Astatine', 'Radon', 'Francium', 'Radium', 'Actinium', 'Thorium', 'Protactinium', 'Uranium', 'Neptunium', 'Plutonium',
    'Americium', 'Curium', 'Berkelium', 'Californium', 'Ensteinium', 'Fermium', 'Mendelevium', 'Nobelium', 'Lawrencium', 'Rutherfordium',
    'Dubnium', 'Seaborgium', 'Bohrium', 'Hassium', 'Meitnerium', 'Darmstadtium', 'Roentgenium', 'Copernicium', 'Nohonium', 'Flerovium',
    'Moscovium', 'Livermorium', 'Tennessine', 'Ununoctium'
];
const dealer1 = [
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
    36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
    69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101,
    102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115];
let dealer2 = [];
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
let x = 1;
//console.log(dealer2);
console.log("Starting Server...");

io.on("connection", (socket) => {
    // ...
    console.log("Joined");//-
    console.log(socket.id);//-


    socket.on("HOST", function () {
        const count2 = io.of("/").sockets.size;
        const ID = socket.id.slice(socket.id.length / 2, socket.id.length);
        const d3 = io.of(ID).sockets.size;
        socket.join(ID);

        console.log("Players on server: " + count2);//-
        console.log("host id: " + ID);


        console.log("rz:" + d3);
        socket.emit("data", (ID));
        console.log(socket.rooms);//shows room ID

    });

    socket.on("JC", function (d1) {
        socket.join(d1[4]);
        const d2 = [];
        const d3 = io.sockets.adapter.rooms.get(d1[4]).size;
        console.log("d1:" + d1);
        console.log("rc:" + d1[4]);
        console.log("n:" + d1[1]);
        d2[0] = d1[1];
        d2[1] = d3 - 1;
        d2[2] = d1[4];
        console.log(socket.rooms);//shows room ID
        socket.emit('n', (d2));
        io.in(d1[4]).emit('n', (d2));
        io.in(d1[4]).emit('XX', (d2));
        console.log("rz:" + d3);
        
    });

    socket.on('BEGIN', function (data) {
        dealer2 = dealer1;
        socket.to(data).emit("start");

    });

    socket.on("element", function () {

        var e = dealer2.shift();
        console.log(e);
        socket.emit("rElement", (e));
    });

    socket.on('cs',function(f){
    socket.to(f[2]).emit('l', (f));
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

