'use strict';

var typers = [];

var socket = io.connect('http://localhost:7777')
socket.on('get_id', function () {
    var d = window.id || '';
    socket.emit('set_id', { id: d });
});

socket.on('get_typers_count', function (data) {
    typers = data.typers;
    showTypers(typers);
})

socket.on('online', function (data) {
    console.log(data);
    var links = $('.list-group .list-group-item');
    links.each(function (i, item) {
        var pos = data.map(function (e) {
            return e.data.id;
        }).indexOf(item.dataset.id);
        if (pos > -1 && item.innerHTML.indexOf('•') < 0) {
            item.innerHTML += ' <span style="color:green;font-size:20px;">&bull;</span>';
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
        if (!$('#ms').val()) {
            return;
        }
        else {
            socket.emit('msg_rec', {
                message: $('#ms').val(),
                id: window.id
            });
            $('#ms').val('');
        }
    });



    $('#ms').on('keyup', function (e) {
        console.log("TRIG");
        if(!this.value){
            socket.emit('rm_typer',{
                name:window.name
            });
        }
        if (typers.indexOf(window.name) == -1) {
            console.log(typers.indexOf(window.name))
            typers.push(window.name);
            socket.emit('type', {
                name: window.name
            })
        }
    })

    $('#ms').on('blur', function (e) {
        console.log(e);
    })
});

socket.on('typing', function (data) {
    console.log(data);
    typers = data.typers;
    showTypers(typers);
})

function showTypers(typers) {
    $('#typers').html('');
    if(typers.length == 0){
        return;
    }
    if (typers.length == 1) {
        $('#typers').append(`${typers[0]} `)
    }
    else {
        for (var i = 0; i < typers.length; i++) {
            if (i == 0) {
                $('#typers').append(typers[0]);
            }
            else {
                $('#typers').append(`,${typers[i]}`);
            }
        }
    }
    $('#typers').append(' is typing')
}

socket.on('message', function (data) {
    console.log(data);
    var appende = template(data.aid, data.name, data.message, data.date);
    $('#messages').append(appende);
});

var avatars = ["https://semantic-ui.com/images/avatar/small/matt.jpg", "https://semantic-ui.com/images/avatar/small/elliot.jpg", "https://semantic-ui.com/images/avatar/small/jenny.jpg", "https://semantic-ui.com/images/avatar/small/joe.jpg", "https://semantic-ui.com/images/avatar2/small/elyse.png", "https://semantic-ui.com/images/avatar2/small/matthew.png", "https://semantic-ui.com/images/avatar2/small/kristy.png", "https://semantic-ui.com/images/avatar2/small/eve.png", "https://semantic-ui.com/images/avatar/small/helen.jpg", "https://semantic-ui.com/images/avatar/small/justen.jpg"];

function template(aid, name, message, date) {
    return '\n        <div class="ui feed">\n            <div class="event">\n                <div class="label"><img src="' + avatars[aid] + '"></div>\n                <div class="content">\n                <div class="summary">\n                    <u>' + name + '</u>: ' + escapeHTML(message) + '\n                    <div class="date">' + date + '</div>\n                </div>\n            </div>\n        </div>\n    ';
}


function escapeHTML(text) {
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}