let online = [];

module.exports = function(io){
 io.sockets.on('connection',function(socket){
    io.emit('online',online)
    socket.emit('get_id', null);
    socket.on('set_id',(data)=>{
        let pos = online.map(function(e) { return e.id; }).indexOf(data.id);
        console.log(pos);
        if(pos == -1){
           online.push({data,soc:socket.id});            
        }
        console.log(online);
        socket.emit('online',online)
    })
 })   
}