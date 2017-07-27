var socket = io.connect('http://192.168.43.180:7777');
socket.on('get_id', function () {
    var d = sessionStorage.getItem('id');
    socket.emit('set_id', { id: d });
});

socket.on('online', function (data) {
    console.log(data);
    var links = $('.ui.vertical.menu .item');
    links.each(function (i, item) {
        var pos = data.map(function (e) {
            return e.data.id;
        }).indexOf(item.dataset.id);
        if (pos > -1 && item.innerHTML.indexOf('•') < 0) {
            item.innerHTML += ' <span style="color:green">&bull;</span>';
        } else if (pos > -1 && item.innerHTML.indexOf('•') > 0) {
            console.log('Already maked');
        } else {
            item.innerHTML = item.innerHTML.replace('•', '');
        }
    });
});