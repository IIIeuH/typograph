$(function(){
    $.material.init();
    $('input[type="tel"]').mask("+7(999) 999-9999");
    $('#select1').select2();
    $('#select2').select2();
    $('#select3').select2();
    $('#select4').select2();
    //поиск в pasports
    var data = $('.passport-date');
    var id   = $('.passport-id');
    var strData = $('#searchDate');
    var strId = $('#searchId');
    strData.keyup(function(){
        searchPassports($(this).val(), data);
    });
    strId.keyup(function(){
        searchPassports($(this).val(), id);
    });
});

function searchPassports(str, field){
    $.each(field, function () {
        var tr = $(this).parent();
        if(!!~$(this).text().indexOf(str) || str === ''){
            tr.show();
        }else{
            tr.hide();
        }
    })
}