$(function(){
    var socket = io();
    changeStatusKeeper(socket);
    checkboxKeeper();
    clickCheckboxKeeper();
});


//Сохранение статуса
function changeStatusKeeper(socket){
    var el = $('.production-podstatus');
    var number = el.parents('tr').find('.passport-number').text();
    el.click(function(e){
        var c = confirm('Вы действительно хотите паспорту № ' + number + ' присвоить статус ' + $(this).data('name'));
        var that = $(this);
        if(c){
            $(this).parents('.status').find(el).removeAttr('disabled', 'disabled');
            $(this).attr('disabled', 'disabled');
            var id = $(this).parents('tr').data('id');
            socket.emit('valPodStatus', {podstatus: $(this).val(), passportId: id}, function (res) {
                if(res.status === 412){
                    Snackbar.show({
                        text: res.msg,
                        pos: 'top-center',
                        actionText: null
                    });
                }else{
                    Snackbar.show({
                        text: res.msg,
                        pos: 'top-center',
                        actionText: null
                    });
                    that.parents('.status').data('status',  that.val());
                    that.parents('.hider').hide('fast');
                }
            });
        }else{
            e.preventDefault();
            e.stopPropagation();
        }
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
    var el = $('.status-check');
    el.each(function(){
        var input = $(this).find('.production-podstatus');
        input.click(function(){
            input.prop('checked', false);
            $(this).prop('checked', true);
        });
    });
}
