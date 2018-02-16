$(function(){
    var addBtn = $('.add-btn');
    var cancelBtn = $('.cancel-btn');
    var saveBtn = $('.save-btn');
    var rowPapper    = $('.row-papper');
    var btlDelRow = $('.removeRow');

    $('.text').on("select2:select", function (evt) {
        var element = evt.params.data.element;
        var $element = $(element);

        $element.detach();
        $(this).append($element);
        $(this).trigger("change");
    });


    rowPapper.hide();

    addBtn.click(function(){
        btnHide(rowPapper, cancelBtn, saveBtn, $(this));
    });


    cancelBtn.click(function(){
        btnShow(rowPapper, addBtn, saveBtn, $(this));
    });

    saveBtn.click(function () {
        sandData($('#type-papper'));
    });

    btlDelRow.click(function(){
        var del = confirm("Вы действительно хотите удалить " + $(this).data('name') + "?");
        if(del){
            removeRow($(this));
        }
    });

    $(document).on('click','.close', function(){
        console.log($(this).parent('row'));
        if($('.permiss').length > 1){
            $(this).parents('.permiss').remove();
        }
    });
    $(document).on('click', '#addPermissions', function(){
        $(this).before('' +
            '<div class="row permiss">\n' +
            '  <div class="col-md-6">\n' +
            '    <button type="button" data-dismiss="alert" class="close">×</button>\n' +
            '    <div class="col-md-6">\n' +
            '      <div class="form-group label-floating">\n' +
            '        <label class="control-label">Url</label>\n' +
            '        <input type="text" required class="form-control name"/>\n' +
            '      </div>\n' +
            '    </div>\n' +
            '    <div class="col-md-6">\n' +
            '      <div class="form-group label-floating">\n' +
            '        <label class="control-label">Доступ</label>\n' +
            '        <select class="form-control access" required>\n' +
            '          <option value="1" selected="selected">Чтение</option>\n' +
            '          <option value="2">Чтение/Запись</option>\n' +
            '          <option value="3">Чтение/Запись/Удаление</option>\n' +
            '        </select>\n' +
            '      </div>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '</div>'
        );
        $('.access').select2();
    });
});

//1 аргументом идет элемент который нужно отображать остальные кнопки
function btnHide(rowPapper, cancelBtn, saveBtn, that){
    rowPapper.show();
    cancelBtn.removeClass('hidden');
    saveBtn.removeClass('hidden');
    that.addClass('hidden');
}

//1 аргументом идет элемент который нужно скрыть остальные кнопки
function btnShow(rowPapper, addBtn, saveBtn, that){
    rowPapper.hide();
    saveBtn.addClass('hidden');
    that.addClass('hidden');
    addBtn.removeClass('hidden');
}

function sandData(element){
    var val = element.val();
    var arr = [];
    if(val !== null){
        val.forEach(function(item){
            var obj = {};
            obj.name = item;
            arr.push(obj);
        });
        arr =  JSON.stringify(arr);
        $.ajax({
            type: 'PUT',
            data: {data: arr},
            success: function(data){
                Snackbar.show({
                    text: 'Данные успешно сохраненны!',
                    pos: 'bottom-left',
                    actionText: null
                });
                window.location.reload();
            },
            error: function(err){
                Snackbar.show({
                    text: 'Что-то пошло не так!',
                    pos: 'bottom-left',
                    actionText: null
                });
            }
        });
    }else{
        Snackbar.show({
            text: 'Заполните поле!',
            pos: 'top-center',
            actionText: 'OK',
            actionTextColor: '#ff0000'
        });
    }
}

function removeRow(row){
    var id = row.attr('id');
    $.ajax({
        type: 'DELETE',
        data: {id: id},
        success: function(){
            row.parent().parent().hide();
        },
        error: function(){
            Snackbar.show({
                text: 'Что-то пошло не так!',
                pos: 'bottom-left',
                actionText: null
            });
        }
    })
}