$(function(){
    var socket = io();
    changeStatusKeeper(socket);
    checkboxKeeper();
    clickCheckboxKeeper();
});


//Сохранение статуса
function changeStatusKeeper(socket){
    var el = $('.production-podstatus');
    el.click(function(){
        var that = $(this);
        console.log( $(this).val());
        $(this).parents('.status').find(el).removeAttr('disabled', 'disabled');
        $(this).attr('disabled', 'disabled');
        var id = $(this).parents('.status').data('id');
        socket.emit('valPodStatus', {podstatus: $(this).val(), passportId: id});
        socket.on('changePodStatus', function(data){
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
                that.parents('.status').data('status',  that.val());
                status();
            }
        });
    });
}

//Отмечает текущий статус при загрузке страницы
function checkboxKeeper(){
    var el = $('.production-podstatus');
    el.each(function(){
        // el.removeAttr('disabled', 'disabled');
        if($(this).data('status') === $(this).val()){
            $(this).prop('checked', true);
            $(this).attr('disabled', 'disabled');
        }
    });
}


//Один статус в строке
function clickCheckboxKeeper(){
    var el = $('.status');
    el.each(function(){
        var input = $(this).find('.production-podstatus');
        input.click(function(){
            input.prop('checked', false);
            $(this).prop('checked', true);
        });
    });
}
