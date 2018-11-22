$(function(){
    var btnAddCustomer    = $('#add-customer');
    var btnRemoveCustomer = $('#remove-customer');
    var btnAddName        = $('#add-name');
    var btnRemoveName     = $('#remove-name');
    var carAdd            = $('#car-add');
    var carRemove         = $('#car-remove');
    var data              = $('.passport-date');
    var dataCreated       = $('.passport-date-created');
    var id                = $('.passport-id');
    var customer          = $('.passport-customer');
    var number            = $('.passport-number');
    var manager           = $('.passport-manager');
    var paper             = $('.passport-paper');
    var density           = $('.passport-density');
    var circulation       = $('.passport-circulation');
    var color             = $('.passport-color');
    var sheet             = $('.passport-sheet');
    var strData           = $('#searchDate');
    var strDataCreated    = $('#searchDateCreated');
    var strId             = $('#searchId');
    var strCustomer       = $('#searchCustomer');
    var strManager        = $('#searchManager');
    var strPaper          = $('#paper');
    var strNumber         = $('#number');
    var strDensity        = $('#density');
    var strCirculation    = $('#circulation');
    var strColor          = $('#color');
    var strSheet          = $('#sheet');
    var select            = $('select:not(".not-select"):not("#history")');

    $('.collapse').collapse();
    var url = window.location;
    $('ul.nav a[href="'+ url +'"]').parent().addClass('active');

    $('ul.nav a').filter(function() {
        return this.href == url;
    }).parent().addClass('active');
    $.material.init();
    $('input[type="tel"]').mask("+7(999) 999-9999");


    statusManager();
    select.select2();


    $('.text').select2({
        tags: true,
        tokenSeparators: [',', ' ']
    });
    $('.size-paper').select2({
        tags: true,
        tokenSeparators: [',', ' ']
    });

    //Значения checkbox в textarea
    var mas = [];
    $('.box').click(function(){
        mas.push($(this).text() + '; ');
        $('.resultBox').last().append(
            '<div class="childrenBox" contenteditable="true">' +
            '<button type="button" class="close closeBox">×</button>' +
            '<div class="textBox">' +
            $(this).text() +
            '</div>' +
            '</div>'
        );
    });

    //AJAX SELECT
    ajaxSelect($('.typePaper'), 'Тип', 'typepappers');
    ajaxSelect($('.typePaperGramm'), 'Граммаж', 'grammpappers');
    ajaxSelect($('.typePaperSize'), 'Размер', 'sizepappers');
    ajaxSelect($('#manager'), 'Менеджер', 'users');



    $(document).on('click', '.addBox', function(e){
        $('.set-modal-body').append(
            '<div class="carBox">' +
            '<button type="button" class="close closeCarBox">×</button>' +
            '<h4 class="modal-title">Значения для машины' +
            '</h4>' +
            '<div class="resultBox"></div>' +
            '</div>');
    });

    $(document).on('click', '.childrenBox', function(){
        $(this).parents('.childrenBox').text()
    });

    $(document).on('click', '.closeBox', function(){
        $(this).parents('.childrenBox').remove();
    });

    $(document).on('click', '.closeCarBox', function(){
        $(this).parent().remove();
    });

    //Комплектующие
    $('.resultButton').click(function(){
        var text = '';
        if($('.resultBox').length >1){
            text = '';
            $('.resultBox').each(function(){
                $(this).find('.textBox').each(function(){
                    text += $(this).text() +'; ';
                });
                text += "//";
            });
            text = text.substring(0, text.length - 2)
        }else{
            $('.resultBox').each(function(){
                text = '';
                $(this).find('.textBox').each(function(){
                    text += $(this).text() +'; ';
                });
            });
        }
        $('#myModal').modal('toggle');
        $('.set').val(text);
    });


    $('.addSet').click(function(){
        var carBox = $('.carBox');
        carBox.remove();
        var text = $('.set').val().split('//');
        var subText = '';
        var mas = [];
        for(var i =0; i < text.length; i++){
            $('.set-modal-body').append(
                '<div class="carBox">' +
                '<button type="button" class="close closeCarBox">×</button>' +
                '<h4 class="modal-title">Значения для машины</h4>' +
                '<div class="resultBox"></div>' +
                '</div>'
            );
        }
        $('.carBox').each(function(i, item){
            subText = text[i].split('; ');
            subText = _.compact(subText);
            var that = $(this);
            subText.forEach(function(item){
                that.find('.resultBox').append(
                    '<div class="childrenBox" contenteditable="true">' +
                    '<button type="button" class="close closeBox">×</button>' +
                    '<div class="textBox">' +
                    item +
                    '</div>' +
                    '</div>'
                );
            });

        });
    });


    //Значения checkbox в textarea в Отделке
    var masD = [];
    $('.boxD').click(function(){
        mas.push($(this).text() + '; ');
        $('.resultBoxD').last().append(
            '<div class="childrenBoxD" contenteditable="true">' +
            '<button type="buttonD" class="close closeBoxD">×</button>' +
            '<div class="textBoxD">' +
            $(this).text() +
            '</div>' +
            '</div>'
        );
    });


    $(document).on('click', '.addBoxD', function(e){
        $('.decoration-modal').append(
            '<div class="carBoxD">' +
            '<button type="button" class="close closeCarBox">×</button>' +
            '<h4 class="modal-title">Значения для машины' +
            '</h4>' +
            '<div class="resultBoxD"></div>' +
            '</div>');
    });

    $(document).on('click', '.childrenBoxD', function(){
        $(this).parents('.childrenBoxD').text()
    });

    $(document).on('click', '.closeBoxD', function(){
        $(this).parents('.childrenBoxD').remove();
    });

    $(document).on('click', '.closeCarBoxD', function(){
        $(this).parent().remove();
    });

    $('.resultButtonDecoration').click(function(){
        var text = '';
        if($('.resultBoxD').length >1){
            text = '';
            $('.resultBoxD').each(function(){
                $(this).find('.textBoxD').each(function(){
                    text += $(this).text() +'; ';
                });
                text += "//";
            });
            text = text.substring(0, text.length - 2)
        }else{
            $('.resultBoxD').each(function(){
                text = '';
                $(this).find('.textBoxD').each(function(){
                    text += $(this).text() +'; ';
                });
            });
        }
        $('#modalDecoration').modal('toggle');
        $('.decoration').val(text);
    });


    $('.addSetD').click(function(){
        var carBox = $('.carBoxD');
        carBox.remove();
        var text = $('.decoration').val().split('//');
        var subText = '';
        var mas = [];
        for(var i =0; i < text.length; i++){
            $('.decoration-modal').append(
                '<div class="carBoxD">' +
                '<button type="button" class="close closeCarBoxD">×</button>' +
                '<h4 class="modal-title">Значения для машины</h4>' +
                '<div class="resultBoxD"></div>' +
                '</div>'
            );
        }
        $('.carBoxD').each(function(i, item){
            subText = text[i].split('; ');
            subText = _.compact(subText);
            var that = $(this);
            subText.forEach(function(item){
                that.find('.resultBoxD').append(
                    '<div class="childrenBoxD" contenteditable="true">' +
                    '<button type="button" class="close closeBoxD">×</button>' +
                    '<div class="textBoxD">' +
                    item +
                    '</div>' +
                    '</div>'
                );
            });

        });
    });

    select.on("select2:select", function (evt) {
        var element = evt.params.data.element;
        var $element = $(element);

        $element.detach();
        $(this).append($element);
        $(this).trigger("change");
    });

    $('#noFile').click(function(){
        if($(this).prop( "checked" )){
            $('#file').removeAttr('disabled');
        }else{
            $('#file').attr('disabled', 'disabled');
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
        ajaxSelect($('.typePaper'), 'Тип', 'typepappers');
        ajaxSelect($('.typePaperGramm'), 'Граммаж', 'grammpappers');
        ajaxSelect($('.typePaperSize'), 'Размер', 'sizepappers');
        ajaxSelect($('#manager'), 'Менеджер', 'users');
    });

    carRemove.click(function(){
        removeCar();
    });

    //формула исходных листов
    $(document).on('change', '.on, .printSheet', function(){
        sourceSheets($(this));
    });
    //формула исходных листов

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
    var address = $('.address');

    bus.hide();
    deliveryAddress.hide();
    typeDelever.hide();


    var radioVal1 = $('input[name="delivery"]:checked').val();
    if(radioVal1 === "Доставка"){
        typeDelever.show();
    }else{
        typeDelever.hide();
        radioBus.prop('checked', false);
        address.val("");
        deliveryAddress.hide();
        bus.hide();
    }
    var radioVal3 = $('input[name="type-delivery"]:checked').val();
    if(radioVal3 === "Автобус" || radioVal3 == undefined){
        bus.show();
        deliveryAddress.hide();
        address.val("");
    }else{
        deliveryAddress.show();
        bus.hide();
    }
    radio.on('change',function(){
        var radioVal = $('input[name="delivery"]:checked').val();
        if(radioVal === "Доставка"){
            typeDelever.show();
        }else{
            typeDelever.hide();
            radioBus.prop('checked', false);
            address.val("");
            deliveryAddress.hide();
            bus.hide();
        }
    });

    radioBus.on('change', function(){
        var radioVal = $('input[name="type-delivery"]:checked').val();
        if(radioVal === "Автобус"){
            bus.show();
            deliveryAddress.hide();
            address.val("");
        }else{
            deliveryAddress.show();
            bus.hide();
        }
    });


    //поиск в pasports
    strData.keyup(function(){
        //searchPassports($(this).val(), data);
        searchPassportsBd($(this).val(), 'passOn', data);
    });
    strDataCreated.keyup(function(){
        //searchPassports($(this).val(), dataCreated);
        searchPassportsBd($(this).val(), 'date', dataCreated);
    });
    strNumber.keyup(function(){
        //searchPassports($(this).val(), number);
        searchPassportsBd($(this).val(), 'incString');
    });
    strId.keyup(function(){
        //searchPassports($(this).val(), id);
        searchPassportsBd($(this).val(), 'passportId', id);
    });
    strCustomer.keyup(function(){
        //searchPassports($(this).val(), customer);
        searchPassportsBd($(this).val(), 'customer', customer);
    });
    strManager.keyup(function(){
        //searchPassports($(this).val(), manager);
        searchPassportsBd($(this).val(), 'manager', manager);
    });
    // strPaper.keyup(function(){
    //     //searchPassports($(this).val(), paper);
    //     searchPassportsBd($(this).val(), 'date');
    // });
    strDensity.keyup(function(){
        searchPassports($(this).val(), density);
        //searchPassportsBd($(this).val(), 'price');
    });
    strCirculation.keyup(function(){
        //searchPassports($(this).val(), circulation);
        searchPassportsBd($(this).val(), 'circulationFiled', circulation);
    });
    // strColor.keyup(function(){
    //     //searchPassports($(this).val(), color);
    //     searchPassportsBd($(this).val(), '');
    // });
    // strSheet.keyup(function(){
    //     searchPassports($(this).val(), sheet);
    // });

    //Убираем чат
    if(window.location.pathname === '/'){
        $('.chat').show();
    }else{
        $('.chat').hide();
    }



    //validateFiled
    var field =  $('.patter');

    field.each(function(){
        $(this).keyup(function(){
            var text =  $(this).val();
            var newtext = /[!@#$%^&*()_\\;,."']/i.test(text);
            if(newtext){
                newtext = text.replace(/[!@#$%^&*()_\\;,."']/i, "");
                if(newtext){
                    Snackbar.show({
                        text: 'Записи разделаются только пробелом!',
                        pos: 'top-center',
                        actionText: null
                    });
                }
                $(this).val(newtext);
            }
        });
    });
    //Печать
    $('#print').click(function(){
        window.print() ;
    });

});

function searchPassports(str, field){
    var tr = null;
    $.each(field, function () {
        tr = $(this).parent();
        if(!!~$(this).text().toLowerCase().indexOf(str.toLowerCase()) || str.toLowerCase() === ''){
            tr.show();
        }else{
            tr.hide();
        }
    })
}


function searchPassportsBd(str, field, data){
    if(window.location.href.split('/')[3] === 'production' || window.location.href.split('/')[3] === 'storekeeper'){
        searchPassports(str, data)
    }else{
        socket.emit('searchPassports', str, field, window.location.href.split('/')[3], window.location.href.split('/')[4], function(res) {
            $('.passports-data').find('tbody').empty();
            console.log(res.passports);
            if(res.passports.length){
                if(window.location.href.split('/')[3] === 'manager'){
                    res.passports.forEach( function(item) {
                        $('.passports-data').find('tbody').append(
                            '<tr class="status" data-status="'+item.status+'">\n' +
                            '  <td class="passport-date-created" onclick="window.location.href=&quot;/manager/passport/'+item._id+'&quot;; return false">'+moment(item.createdAt).format("DD.MM.YYYY")+'</td>' +
                            '  <td class="passport-date" onclick="window.location.href=&quot;/manager/passport/'+item._id+'&quot;; return false">'+item.passOn+'</td>' +
                            '  <td class="passport-number" onclick="window.location.href=&quot;/manager/passport/'+item._id+'&quot;; return false">'+item.inc+'</td>' +
                            '  <td class="passport-customer" onclick="window.location.href=&quot;/manager/passport/'+item._id+'&quot;; return false">'+item.customer+'</td>' +
                            '  <td class="passport-paper" onclick="window.location.href=&quot;/manager/passport/'+item._id+'&quot;; return false"><strong>Тип:</strong>'+item.typePaper+'<br /><strong>Размер:</strong>'+item.typePaperSize+'<br /><strong>Граммаж:</strong> '+item.typePaperGramm+'</td>' +
                            '  <td class="passport-price" onclick="window.location.href=&quot;/manager/passport/'+item._id+'&quot;; return false">'+item.price+'</td>' +
                            '  <td class="passport-circulation" onclick="window.location.href=&quot;/manager/passport/'+item._id+'&quot;; return false">'+item.circulationFiled+'</td>' +
                            '  <td class="passport-id" onclick="window.location.href=&quot;/manager/passport/'+item._id+'&quot;; return false">'+item.passportId+'</td>' +
                            '  <td>' +
                            '       <i class="material-icons removeRow" id="'+item._id+'" data-name="пасспорт от ' + item.date + ', номер паспорта ' + item.passportId + ', Заказчик: ' + item.customer +'">delete_forever</i>' +
                            '  </td>' +
                            '</tr>'
                        );
                    });
                    statusManager();
                }else if(window.location.href.split('/')[3] === 'supervisor') {
                    res.passports.forEach(function (item) {
                        $('.passports-data').find('tbody').append(
                            '<tr class="status" data-status="' + item.status + '">\n' +
                            '  <td class="passport-date-created" onclick="window.location.href=&quot;/supervisor/passport/' + item._id + '&quot;; return false">' + moment(item.createdAt).format("DD.MM.YYYY") + '</td>' +
                            '  <td class="passport-date" onclick="window.location.href=&quot;/supervisor/passport/' + item._id + '&quot;; return false">' + item.passOn + '</td>' +
                            '  <td class="passport-number" onclick="window.location.href=&quot;/supervisor/passport/' + item._id + '&quot;; return false">' + item.inc + '</td>' +
                            '  <td class="passport-customer" onclick="window.location.href=&quot;/supervisor/passport/' + item._id + '&quot;; return false">' + item.customer + '</td>' +
                            '  <td class="passport-paper" onclick="window.location.href=&quot;/supervisor/passport/' + item._id + '&quot;; return false"><strong>Тип:</strong>' + item.typePaper + '<br /><strong>Размер:</strong>' + item.typePaperSize + '<br /><strong>Граммаж:</strong> ' + item.typePaperGramm + '</td>' +
                            '  <td class="passport-price" onclick="window.location.href=&quot;/supervisor/passport/' + item._id + '&quot;; return false">' + item.price + '</td>' +
                            '  <td class="passport-circulation" onclick="window.location.href=&quot;/supervisor/passport/' + item._id + '&quot;; return false">' + item.circulationFiled + '</td>' +
                            '  <td class="passport-id" onclick="window.location.href=&quot;/supervisor/passport/' + item._id + '&quot; return false">' + item.passportId + '</td>' +
                            '  <td>' +
                            '       <i class="material-icons removeRow" id="' + item._id + '" data-name="пасспорт от ' + item.date + ', номер паспорта ' + item.passportId + ', Заказчик: ' + item.customer + '">delete_forever</i>' +
                            '  </td>' +
                            '</tr>'
                        );
                    });
                    statusManager();
                }else{
                    res.passports.forEach( function(item) {
                        $('.passports-data').find('tbody').append(
                            '<tr class="status" data-status="'+item.status+'">\n' +
                            '  <td class="passport-date-created" onclick="window.location.href=&quot;'+window.location.pathname+'/'+item._id+'&quot;; return false">'+moment(item.createdAt).format("DD.MM.YYYY")+'</td>' +
                            '  <td class="passport-date" onclick="window.location.href=&quot;'+window.location.pathname+'/'+item._id+'&quot;; return false">'+item.passOn+'</td>' +
                            '  <td class="passport-number" onclick="window.location.href=&quot;'+window.location.pathname+'/'+item._id+'&quot;; return false">'+item.inc+'</td>' +
                            '  <td class="passport-customer" onclick="window.location.href=&quot;'+window.location.pathname+'/'+item._id+'&quot;; return false">'+item.customer+'</td>' +
                            '  <td class="passport-paper" onclick="window.location.href=&quot;'+window.location.pathname+'/'+item._id+'&quot;; return false"><strong>Тип:</strong>'+item.typePaper+'<br /><strong>Размер:</strong>'+item.typePaperSize+'<br /><strong>Граммаж:</strong> '+item.typePaperGramm+'</td>' +
                            '  <td class="passport-circulation" onclick="window.location.href=&quot;'+window.location.pathname+'/'+item._id+'&quot;; return false">'+item.circulationFiled+'</td>' +
                            '  <td class="passport-id" onclick="window.location.href=&quot;'+window.location.pathname+'/'+item._id+'&quot;; return false">'+item.passportId+'</td>' +
                            '</tr>'
                        );
                    });
                }
            }
        });
    }
}


function addCar(){
    var carContainer = $('.car-container');
    var cont = '<div class="car-container">\n' +
        '  <table class="table table-bordered table-condensed car-tabel">\n' +
        '    <tr>\n' +
        '      <td>\n' +
        '        <div class="row">\n' +
        '          <div class="col-md-12">\n' +
        '            <div class="form-group">\n' +
        '              <label class="col-md-3 control-label">На машину</label>\n' +
        '              <div class="col-md-3">\n' +
        '                <select style="margin-top: 10px;" required="required" class="form-control typePaper"></select>\n' +
        '              </div>\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '              <div class="col-md-3">\n' +
        '                <select required="required" class="form-control car-select not-select">\n' +
        '                  <option></option>\n' +
        '                  <option>A2</option>\n' +
        '                  <option>A3</option>\n' +
        '                </select>\n' +
        '              </div>\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '              <div class="col-md-3">\n' +
        '                <input class="form-control comment-top"/>\n' +
        '              </div>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '          <label class="col-md-5 control-label">Шт.</label>\n' +
        '          <div class="col-md-3">\n' +
        '            <input type="text" required="required" class="form-control Sht"/>\n' +
        '          </div>\n' +
        '          <div class="col-md-4">\n' +
        '            <select required="required" class="form-control typePaperGramm"></select>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '          <label class="col-md-5 control-label">На</label>\n' +
        '          <div class="col-md-3">\n' +
        '            <input type="text" required="required" class="form-control on"/>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '          <div class="col-md-4">\n' +
        '            <select required="required" class="form-control typePaperSize"></select>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '          <label class="col-md-5 control-label">Печ. листов</label>\n' +
        '          <div class="col-md-7">\n' +
        '            <input type="text" required="required" class="form-control printSheet"/>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '        <div class="form-group">\n' +
        '          <label class="col-md-5 control-label">Исходных листов</label>\n' +
        '          <div class="col-md-7">\n' +
        '            <input type="text" required="required" class="form-control allSheet"/>\n' +
        '          </div>\n' +
        '        </div>\n' +
        '      </td>\n' +
        '    </tr>\n' +
        '    <tr>\n' +
        '      <td>\n' +
        '        <textarea cols="40" style="text-align: center;" class="signature"></textarea>\n' +
        '      </td>\n' +
        '    </tr>\n' +
        '  </table>\n' +
        '</div>';
    if(carContainer.length < 8) carContainer.last().after(cont);
}

function sourceSheets(el){
    var del = el.parents('.car-tabel').find('.on').val().slice('\\')[2] || 0;
    var printSheet = eval(el.parents('.car-tabel').find('.printSheet').val()) || 0;
    var res = printSheet / del;
    if(!isInteger(res)){
        res = Math.ceil(res.toFixed(2));
    }
    el.parents('.car-tabel').find('.allSheet').val(res);
}

function isInteger(num) {
    return (num ^ 0) === num;
}

function removeCar(){
    var carContainer = $('.car-container');
    if(carContainer.length > 1) carContainer.last().remove();
}


//Цвета для менеджеры
function statusManager(){
    var el = $('.status');
    el.each(function(){
        switch ($(this).data('status')){
            case 'prepress':
                $(this).addClass('danger');
                break;
            case 'citipi':
                $(this).addClass('warning');
                break;
            case 'keeper':
                $(this).addClass('info');
                break;
            case 'production':
                $(this).addClass('active');
                break;
            case 'success':
                $(this).addClass('success');
                break;
            default:
                $(this).addClass('');
        }
        // if($(this).data('status') === 'prepress'){
        //     $(this).addClass('danger');
        // }
        // if($(this).data('status') === 'citipi'){
        //     $(this).addClass('warning');
        // }
        // if($(this).data('status') === 'keeper'){
        //     $(this).addClass('info');
        // }
        // if($(this).data('status') === 'production'){
        //     $(this).addClass('active');
        // }
        // if($(this).data('status') === 'success'){
        //     $(this).addClass('success');
        // }
    });
}



//style, placholder, collection
function ajaxSelect(style, plachold, collection){
    //ajax select2
    style.select2({
        placeholder: plachold,
        ajax: {
            url: '/getCollection',
            dataType: 'json',
            data: function (params) {

                var queryParameters = {
                    term: params.term,
                    collection: collection
                };
                return queryParameters;
            },
            processResults: function (data) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            text: item.name,
                            id: item.name
                        }
                    })
                };
            }
        }
    });
}