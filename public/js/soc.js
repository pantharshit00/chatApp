
var socket = io.connect('http://localhost:7777');
socket.on('get_id',function(){
    const d = sessionStorage.getItem('id');
    socket.emit('set_id',{id:d});
})

socket.on('online',function(data){
    const links = $('.ui.vertical.menu .item');
    links.each((i,item)=> {
         let pos = data.map(function(e) { return e.id; }).indexOf(item.dataset.id);
         if(pos > -1 && item.innerHTML.indexOf('•') < 0){
             item.innerHTML += ' <span style="color:green">&bull;</span>';
         }
    });
});