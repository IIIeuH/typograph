$(function(){
    var addBtn = $('.add-btn');
    var cancelBtn = $('.cancel-btn');
    var saveBtn = $('.save-btn');

    var rowPapper    = $('.row-papper');


    addBtn.click(function(){
        btnHide(rowPapper, cancelBtn, saveBtn, $(this));
    });


    cancelBtn.click(function(){
        btnShow(rowPapper, addBtn, saveBtn, $(this));
    });

});

//1 аргументом идет элемент который нужно отображать остальные кнопки
function btnHide(rowPapper, cancelBtn, saveBtn, that){
    rowPapper.removeClass('hidden');
    cancelBtn.removeClass('hidden');
    saveBtn.removeClass('hidden');
    that.addClass('hidden');
}

//1 аргументом идет элемент который нужно скрыть остальные кнопки
function btnShow(rowPapper, addBtn, saveBtn, that){
    rowPapper.addClass('hidden');
    saveBtn.addClass('hidden');
    that.addClass('hidden');
    addBtn.removeClass('hidden');

}