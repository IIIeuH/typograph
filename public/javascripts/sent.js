var socket = io.connect('http://localhost:3000');
$(function(){
    var btnSent = $('#prepress-sent');
    var btnSentCiTiPi = $('#citipi-sent');
    var btnSentstoreKeeper = $('#storekeeper-sent');

    //сообщения всем
    socket.on('prepress-status', function (res) {
        Snackbar.show({
            text: res,
            pos: 'top-center',
            actionText: null
        });
    });

    socket.on('citipi-status', function (res) {
        Snackbar.show({
            text: res,
            pos: 'top-center',
            actionText: null
        });
    });

    socket.on('storekeeper-status', function (res) {
        Snackbar.show({
            text: res,
            pos: 'top-center',
            actionText: null
        });
    });

    socket.on('success-status', function (res) {
        Snackbar.show({
            text: res,
            pos: 'top-center',
            actionText: null
        });
    });

    socket.on('production-status', function (res) {
        Snackbar.show({
            text: res,
            pos: 'top-center',
            actionText: null
        });
    });


    btnSent.click(function(){
        var p = confirm("Вы уверены что хотите отправить этот паспорт допечатнику?");
        if(p){
            socket.emit('prepress', $(this).data('id'), function (res) {
                if(res.status === 200){
                    Snackbar.show({
                        text: res.msg,
                        pos: 'top-center',
                        actionText: null
                    });
                    document.location.href = '/manager/allpassport';
                }else{
                    Snackbar.show({
                        text: res.msg,
                        pos: 'top-center',
                        actionText: null
                    });
                }
            });
        }
    });


    btnSentCiTiPi.click(function(){
        var p = confirm("Вы уверены что хотите отправить этот паспорт СиТиПи?");
        if(p) {
            socket.emit('citipi', $(this).data('id'), function (res) {
                if (res.status === 200) {
                    Snackbar.show({
                        text: res.msg,
                        pos: 'top-center',
                        actionText: null
                    });
                    document.location.href = '/prepress';
                } else {
                    Snackbar.show({
                        text: res.msg,
                        pos: 'top-center',
                        actionText: null
                    });
                }
            });
        }
    });

    btnSentstoreKeeper.click(function(){
        var p = confirm("Вы уверены что хотите отправить этот паспорт на склад?");
        if(p) {
            socket.emit('storekeeper', $(this).data('id'), function (res) {
                if (res.status === 200) {
                    Snackbar.show({
                        text: res.msg,
                        pos: 'top-center',
                        actionText: null
                    });
                    document.location.href = '/citipi';
                } else {
                    Snackbar.show({
                        text: res.msg,
                        pos: 'top-center',
                        actionText: null
                    });
                }
            });
        }
    });


});
