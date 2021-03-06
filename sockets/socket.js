let online = [];
let typers = [];
const mongoose = require('mongoose');
const User = mongoose.model('User');
var m = require('moment-timezone');

let avatars = [
    "https://semantic-ui.com/images/avatar/small/matt.jpg",
    "https://semantic-ui.com/images/avatar/small/elliot.jpg",
    "https://semantic-ui.com/images/avatar/small/jenny.jpg",
    "https://semantic-ui.com/images/avatar/small/joe.jpg",
    "https://semantic-ui.com/images/avatar2/small/elyse.png",
    "https://semantic-ui.com/images/avatar2/small/matthew.png",
    "https://semantic-ui.com/images/avatar2/small/kristy.png",
    "https://semantic-ui.com/images/avatar2/small/eve.png",
    "https://semantic-ui.com/images/avatar/small/helen.jpg",
    "https://semantic-ui.com/images/avatar/small/justen.jpg"
]

module.exports = function(io){
 io.sockets.on('connection',function(socket){
    socket.emit('get_typers_count',{typers})
    socket.emit('get_id', null);
    socket.on('set_id',(data)=>{
        let pos = online.map(function(e) { return e.data.id; }).indexOf(data.id);
        if(pos == -1){
           online.push({data,soc:socket.id});            
        }
        console.log(online);
        io.emit('online',online);
    })
    socket.on('disconnect',function(){
        let pos = online.map(function(e) { return e.soc; }).indexOf(socket.id);
        online.splice(pos,1);
        io.emit('online',online);
    })
    socket.on('msg_rec',async (data)=>{
        const sender = await User.findOne({_id: data.id});
        io.emit('message',{
            aid: sender.acount,
            name: sender.name,
            message: data.message,
            date: m(Date.now()).tz('Asia/Kolkata').format('hh:mma')
        })
    })
    socket.on('type',(data)=>{
        console.log(data);
        typers.push(data.name)
        io.emit('typing',{
            typers
        })
    })
    socket.on('rm_typer',function(data){
        var index = typers.indexOf(data.name);
        if(index > -1){
            typers.splice(index,1);
        }
        console.log(typers);
        io.emit('typing',{
            typers
        })
    })
 })   
}