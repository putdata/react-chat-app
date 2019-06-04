var express = require('express');
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express();
var port = process.env.PORT || 8080

var db = require('./db');
db.connect();
db.query("CREATE DATABASE IF NOT EXISTS chat");

app.use(bodyParser.json());
app.use(cors());
app.get('/', function (req, res) {
  res.send('HI');
});

var user = require('./routes/User');
app.use('/user', user);

var msg = require('./routes/Msg');
app.use('/msg', msg);

var resetDB = require('./routes/ResetDB');
app.use('/resetdb', resetDB);

server = app.listen(port, function(){
  console.log('server is running on port ' + port);
});

var socket = require('socket.io');
io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.handshake.query.user_id);
    io.emit('NEW_USER', socket.handshake.query.user_id);

    socket.on('SEND_MESSAGE', (data) => {
      if(data.user_id.length < 50 && data.content.length < 255) {
        db.query("INSERT INTO log(user_id, content) VALUES (?,?)", [data.user_id, data.content])
        io.emit('RECEIVE_MESSAGE', {"alert": false, "user_id": data.user_id, "content": data.content});
      }
    });

    socket.on('disconnect', () => {
      io.emit('OUT_USER', socket.handshake.query.user_id);
    });
});