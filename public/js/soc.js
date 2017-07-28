var socket = io.connect('http://192.168.43.128:7777');
socket.on('get_id', function () {
    var d = window.id || '';
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

$(function () {
    $('#chat').submit(function (e) {
        e.preventDefault();
        socket.emit('msg_rec',{
            message:$('#ms').val(),
            id: window.id
        })
        $('#ms').val('')
    })
})

socket.on('message', function (data) {
    console.log(data);
    var appende = template(data.aid, data.name, data.message, data.date);
    $('#messages').append(appende)
})


var avatars = [
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

function template(aid, name, message, date) {
    return `
        <div class="ui feed">
            <div class="event">
                <div class="label"><img src="${avatars[aid]}"></div>
                <div class="content">
                <div class="summary">
                    <u>${name}</u>: ${message}
                    <div class="date">${date}</div>
                </div>
            </div>
        </div>
    `;
}
