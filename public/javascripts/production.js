$(function(){
    var btnDel = $('.remove');
    var socket = io();

    btnDel.click(function(){
        var del = confirm("Вы действительно хотите удалить " + $(this).data('name') + "?");
        if(del){
            remove('/production/'+$(this).attr('id'), $(this));
        }else{
            return false;
        }
    });

    checkbox();
    clickCheckbox();
    changeStatus(socket);
});


//Отмечает текущий статус при загрузке страницы
function checkbox(){
    var el = $('.production-status');
    el.each(function(){
        // el.removeAttr('disabled', 'disabled');
        if($(this).data('productionstatus') === $(this).val()){
            $(this).prop('checked', true);
            $(this).attr('disabled', 'disabled');
        }
    });
}


//Один статус в строке
function clickCheckbox(){
    var el = $('.status-check');
    el.each(function(){
        var input = $(this).find('.production-status');
        input.click(function(){
            input.prop('checked', false);
            $(this).prop('checked', true);
        });
    });
}


//Сохранение статуса
function changeStatus(socket){
    var el = $('.production-status');
    var number = el.parents('tr').find('.passport-number').text();
    el.click(function(e){
        var c = confirm('Вы действительно хотите паспорту № ' + number + ' присвоить статус ' + $(this).data('name'));
        var that = $(this);
        if(c){
            $(this).parents('.status').find(el).removeAttr('disabled', 'disabled');
            $(this).attr('disabled', 'disabled');
            var id = $(this).parents('tr').data('id');
            socket.emit('valStatus', {status: $(this).val(), passportId: id, name: $(this).data('name')}, function (res) {
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
                    if(that.data('name') === 'Исполнен'){
                        that.parents('tr').hide('fast');
                    }
                }
            });
        }else{
            e.preventDefault();
            e.stopPropagation();
        }
    });
}

function remove(url, row){
    var id = row.attr('id');
    $.ajax({
        type: 'DELETE',
        url: url,
        data: {id: id},
        success: function(){
            row.parent().parent().hide();
        },
        error: function(data){
            Snackbar.show({
                text: data.responseText,
                pos: 'bottom-left',
                actionText: null
            });
        }
    })
}