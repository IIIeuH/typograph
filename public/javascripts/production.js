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
        if($(this).data('status') === $(this).val()){
            $(this).prop('checked', true);
            $(this).attr('disabled', 'disabled');
        }
    });
}


//Один статус в строке
function clickCheckbox(){
    var el = $('.status');
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
    el.click(function(){
        var that = $(this);
        $(this).parents('.status').find(el).removeAttr('disabled', 'disabled');
        $(this).attr('disabled', 'disabled');
        var id = $(this).parents('.status').data('id');
        socket.emit('valStatus', {status: $(this).val(), passportId: id});
        socket.on('changeStatus', function(data){
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

//Цвета для статусов
function status(){
    var el = $('.status');
    el.each(function(){
        if($(this).data('status') === 'new'){
            $(this).attr('class', 'status');
        }
        if($(this).data('status') === 'ready'){
            $(this).attr('class', 'status');
            $(this).addClass('danger');
        }
        if($(this).data('status') === 'notready'){
            $(this).attr('class', 'status');
            $(this).addClass('danger');
        }
        if($(this).data('status') === 'job'){
            $(this).attr('class', 'status');
            $(this).addClass('warning');
        }
        if($(this).data('status') === 'success'){
            $(this).attr('class', 'status');
            $(this).addClass('success');
        }
        if($(this).data('status') === 'sent'){
            $(this).attr('class', 'status');
            $(this).addClass('info');
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