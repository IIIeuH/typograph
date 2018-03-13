$(function(){
    var socket = io();
    var btnSent = $('#production-sent');
    btnSent.click(function(){
        var id = $(this).data('id');
        sent(socket, id);
    });
});

function sent(socket, id){
    socket.emit('production-click', {status: 'ready', id: id});
    socket.on('production-status', function(data){
        if(data.status === 412){
            Snackbar.show({
                text: data.msg,
                pos: 'top-center',
                actionText: null
            });
        }else{
            Snackbar.show({
                text: data.msg,
                pos: 'top-center',
                actionText: null
            });
            status();
        }
    });
}