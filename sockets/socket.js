let online = [];

module.exports = function(io){
 io.sockets.on('connection',function(socket){
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
 })   
}