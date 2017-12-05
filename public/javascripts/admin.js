$(function(){
    var addBtn = $('.add-btn');
    var cancelBtn = $('.cancel-btn');
    var saveBtn = $('.save-btn');
    var rowPapper    = $('.row-papper');

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
    })
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
    var obj = {};
    var arr = [];
    val.forEach(function(item){
        obj.name = item;
        arr.push(obj);
    });
    arr =  JSON.stringify(arr);
    $.ajax({
        type: 'PUT',
        data: {data: arr},
        success: function(data){
            console.log(data);
        },
        error: function(err){
            console.log(err);
        }
    });
}