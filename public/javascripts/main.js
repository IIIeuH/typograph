$(function(){
    var btnAddCustomer    = $('#add-customer');
    var btnRemoveCustomer = $('#remove-customer');
    var btnAddName        = $('#add-name');
    var btnRemoveName     = $('#remove-name');
    var carAdd            = $('#car-add');
    var carRemove         = $('#car-remove');
    var data              = $('.passport-date');
    var id                = $('.passport-id');
    var strData           = $('#searchDate');
    var strId             = $('#searchId');
    var select            = $('select:not(".car-select")');
    var selectPaper       = $('select:not(".size-paper")');


    var url = window.location;
    $('ul.nav a[href="'+ url +'"]').parent().addClass('active');

    $('ul.nav a').filter(function() {
        return this.href == url;
    }).parent().addClass('active');
    $.material.init();
    $('input[type="tel"]').mask("+7(999) 999-9999");

    select.select2();

    $('.text').select2({
        tags: true,
        tokenSeparators: [',', ' '],
        dropdownCssClass: 'select2-hidden'
    });
    $('.size-paper').select2({
        tags: true,
        tokenSeparators: [',', ' ']
    });

    // selectPaper.on('select2:opening select2:closing', function( event ) {
    //     var $searchfield = $(this).parent().find('.select2-search__field');
    //     $searchfield.prop('disabled', true);
    // });

    select.on("select2:select", function (evt) {
        var element = evt.params.data.element;
        var $element = $(element);

        $element.detach();
        $(this).append($element);
        $(this).trigger("change");
    });

    //ajax select2
    $('#typepapper').select2({
        ajax: {
            url: '/getCollection',
            dataType: 'json',
            data: function (params) {

                var queryParameters = {
                    term: params.term,
                    collection: 'typepappers'
                };
                return queryParameters;
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            text: item.name,
                            id: item._id
                        }
                    })
                };
            }
        }
    });

    $('#grammpapper').select2({
        ajax: {
            url: '/getCollection',
            dataType: 'json',
            data: function (params) {

                var queryParameters = {
                    term: params.term,
                    collection: 'grammpappers'
                };
                return queryParameters;
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            text: item.name,
                            id: item._id
                        }
                    })
                };
            }
        }
    });
    //Добавление Заказчиков
    btnAddCustomer.click(function(){
        addCustomer();
    });
    btnRemoveCustomer.click(function(){
        removeCustomer();
    });

    //Добавление наименование
    btnAddName.click(function(){
        addName();
    });
    btnRemoveName.click(function(){
        removeName();
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

    //ДОбавление машин;
    carAdd.click(function(){
        addCar();
    });

    carRemove.click(function(){
        removeCar();
    });

    //Полный путь к файлу
    $('#file').change(function () {
        var fullPath = $(this).val();
        var fullPathNotFile = fullPath.split('\\');
        fullPath = fullPath.replace(fullPathNotFile[fullPathNotFile.length - 1], "");
        $('#fullPath').html(fullPath);
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
            deliveryAddress.hide();
            bus.hide();
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

function addCustomer() {
    var clone = '' +
        '<div class="col-md-2 customer-container">' +
        '<select multiple="multiple" class="form-control customerNumber">' +
        '<option>Заказчик 1</option>' +
        '<option>Заказчик 2</option>' +
        '<option>Заказчик 3</option>' +
        '<option>Заказчик 4</option>' +
        '</select>' +
        '</div>';
    var customerContainer = $('.customer-container');
    if(customerContainer.length < 5){
        customerContainer.last().after(clone);
        $('.customerNumber').select2();
    }
}

function removeCustomer(){
    var customerContainer = $('.customer-container');
    if(customerContainer.length > 1) customerContainer.last().remove();
}

function addName(){
    var cloneName = '' +
        '<div class="col-md-2 name-container">' +
        '<select multiple="multiple" class="form-control name">' +
        '<option>Наименование 1</option>' +
        '<option>Наименование 2</option>' +
        '<option>Наименование 3</option>' +
        '<option>Наименование 4</option>' +
        '</select>' +
        '</div>';
    var nameContainer = $('.name-container');
    if(nameContainer.length < 5){
        nameContainer.last().after(cloneName);
        $('.name').select2();
    }
}

function removeName(){
    var nameContainer = $('.name-container');
    if(nameContainer.length > 1) nameContainer.last().remove();
}

function addCar(){
    var carContainer = $('.car-container');
    var carContainerClone = carContainer.last().clone();
    if(carContainer.length < 8) carContainer.last().after(carContainerClone);
}

function removeCar(){
    var carContainer = $('.car-container');
    if(carContainer.length > 1) carContainer.last().remove();
}