$(function(){
    $.material.init();
    $('input[type="tel"]').mask("+7(999) 999-9999");
    $('select').select2();

    //Добавление Заказчиков
    var html = '' +
        '<div class="customerGroup addSelect">' +
            '<select multiple="multiple" class="form-control customer">' +
                '<option>Заказчик 1</option>' +
                '<option>Заказчик 2</option>' +
                '<option>Заказчик 3</option>' +
                '<option>Заказчик 4</option>' +
            '</select>' +
        '</div>';
    var customerGroup = $('.customerGroup');
    $('#customerNumber').click(function(){
        customerGroup.empty();
        for(var i = 0; i < $(this).val(); i ++){
            customerGroup.append(html);
        }
        $('.customer').select2();
    });

    //input time disabled
    var timeCheck = $('#timeCheck');
    var timeInput = $('#timeInput');
    timeCheck.click(function(){
        if($(this).prop( "checked" )){
            timeInput.removeAttr('disabled');
        }else{
            timeInput.attr('disabled', 'disabled');
        }
    });

    //ДОбавление машин
    var carAdd       = $('#car-add');
    var carRemove    = $('#car-remove');
    var carWrap      = $('.car-wrap');

    carAdd.click(function(){
        var carContainer = $('.car-container');
        var carContainerClone = carContainer.last().clone();
        if(carContainer.length < 8) carContainer.last().after(carContainerClone);
    });

    carRemove.click(function(){
        var carContainer = $('.car-container');
        if(carContainer.length > 1) carContainer.last().remove();
    });

    //Добавление доставки
    var radio    = $('input[name="delivery"]');
    var typeDelever = $('.type-delever');
    var radioBus = $('input[name="type-delivery"]');
    var bus = $('.bus');
    var deliveryAddress = $('.delivery-address');

    bus.hide();
    deliveryAddress.hide();
    typeDelever.hide();

    radio.change(function(){
        var radioVal = $('input[name="delivery"]:checked').val();
        if(radioVal === "Доставка"){
            typeDelever.show();
        }else{
            typeDelever.hide();
        }
    });

    radioBus.change(function(){
        var radioVal = $('input[name="type-delivery"]:checked').val();
        if(radioVal === "Автобус"){
            bus.show();
            deliveryAddress.hide();
        }else{
            deliveryAddress.show();
            bus.hide();
        }
    });


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