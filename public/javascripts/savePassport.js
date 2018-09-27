$(function(){
    var btn = $('#savePassportBtn');
    var form = $('#formPassport');
    var socket = io();

    // socket.on('updatePassport', function (res) {
    //     Snackbar.show({
    //         text: res,
    //         pos: 'top-center',
    //         actionText: 'OK',
    //         duration: null
    //     });
    // });

    form.on("submit", function( e ) {
        e.preventDefault();
    //btn.click(function(){
        var data = {};
        data.sizePaper = [];
        data.typePaper = [];
        data.typePaperSize = [];
        data.typePaperGramm = [];
        data.decoration = [];
        data.manager = [];
        data.allCar = [];
        data.passOn = $('.pass-on').val() || '';
        data.timePassport = $('.time').val() || '';
        data.contactPerson = $('.contact-person').val() || '';
        data.phone = $('.phone').val() || '';
        data.customer = $('.customer').val() || '';
        data.name = $('.name').val() || '';
        data.circulationFiled = $('.circulation').val() || '';
        data.page = $('.page').val() || '';
        data.redness = $('.redness').val() || '';
        data.file = $('.fileText').val() || '';
        data.comment = $('.comment').val() || '';
        data.address = $('.address').val() || '';
        data.date = moment().format("DD.MM.YYYY") || '';
        data.timeSave = moment().format("hh:mm") || '';
        data.passportId = moment().format("DDMMYYYY") || '';
        data.deliveryFiled = $('input[name="delivery"]:checked').val() || '';
        data.typeDeliveryFiled = $('input[name="type-delivery"]:checked').val() || '';
        data.sizePaper = [];
        $('.itemPaper').map(function () {
            data.sizePaper.push($(this).text());
        });
        data.typePaperSize = $('.typePaperSize').val() || '';
        data.typePaperGramm = $('.typePaperGramm').val() || '';
        data.set = $('.set').val() || '';
        data.decoration = $('.decoration').val() || '';
        data.manager = $('.manager').val() || [];
        data.managerId = $('#managerId').val();
        data.status = 'new';
        data.createdAt = new Date();

        data.managerName = get_cookie('manager') || '';
        data.priceArray = [];

        var count = 0;

        $('.form-price').each(function(){
            var obj = {};
            obj.name = $(this).find('.price-name').val();
            obj.number = +$(this).find('.price-number').val();
            data.priceArray.push(obj);
            count += obj.number;
        });

        var priceLog = {
            meta: 'Создано',
            manager: get_cookie('manager') || '',
            price: data.priceArray
        };

        data.price = count;

        if(!data.sizePaper.length){
            Snackbar.show({
                text: 'Размер бумаги не выбран!',
                pos: 'top-center',
            });
            return false;
        }

        $('.car-container').each(function(){
            var obj = {};
            obj.typePaper = $(this).find('.typePaper').val();
            obj.grammPaper = $(this).find('.typePaperGramm').val();
            obj.sizePaper = $(this).find('.typePaperSize').val();
            obj.commentTop = $(this).find('.comment-top').val();
            obj.car = $(this).find('.car-select').val();
            obj.sht = $(this).find('.Sht').val();
            obj.on = $(this).find('.on').val();
            obj.printSheet = $(this).find('.printSheet').val();
            obj.allSheet = $(this).find('.allSheet').val();
            obj.signature = $(this).find('.signature').val();
            data.allCar.push(obj);
        });

        var valid = true;

        socket.emit('savePassportBtn', data, priceLog, function(res) {
            if(res.status === 412){
                Snackbar.show({
                    text: res.msg,
                    pos: 'top-center',
                    actionText: null
                });
                valid = false;
            }else if(res.status === 201){
                var text = '';
                res.arr.forEach(function (item){
                    text += 'На складе не хватает бумаги тип: '+item.typePaper+' граммаж: '+item.grammPaper+' формат: '+item.sizePaper+' '+item.count+' штук.\n'
                });
                var confirmer = confirm(text + 'Хотите оставить заявку?');
                if(confirmer){
                    var obj = {
                        order: res.arr,
                        person: get_cookie('manager')
                    };
                    socket.emit('stockOrder', obj, function(res) {
                        window.location.replace('/manager/orderpapers')
                    });
                }else{
                    window.location.replace('/manager/allpassport');
                }
                valid = true;
            }else{
                window.location.replace('/manager/allpassport');
                valid = true;
            }
        });
        if(!valid){
            return false;
        }
    });

    var updateBtn = $('#updatePassportBtn');
    updateBtn.on("click", function( event ) {
        //btn.click(function(){
        var data = {};
        data.sizePaper = [];
        data.typePaper = [];
        data.typePaperSize = [];
        data.typePaperGramm = [];
        data.decoration = [];
        data.manager = [];
        data.allCar = [];
        data.passOn = $('.pass-on').val() || '';
        data.timePassport = $('.time').val() || '';
        data.contactPerson = $('.contact-person').val() || '';
        data.phone = $('.phone').val() || '';
        data.customer = $('.customer').val() || '';
        data.name = $('.name').val() || '';
        data.circulationFiled = $('.circulation').val() || '';
        data.page = $('.page').val() || '';
        data.redness = $('.redness').val() || '';
        data.file = $('.fileText').val() || '';
        data.comment = $('.comment').val() || '';
        data.address = $('.address').val() || '';
        data.date = moment().format("DD.MM.YYYY") || '';
        data.timeSave = moment().format("hh:mm") || '';
        data.passportId = $('.passportId').text();
        data.deliveryFiled = $('input[name="delivery"]:checked').val() || '';
        data.typeDeliveryFiled = $('input[name="type-delivery"]:checked').val() || '';
        data.sizePaper = [];
        $('.itemPaper').map(function () {
            data.sizePaper.push($(this).text());
        });
        data.typePaper = $('.typePaper').val() || '';
        data.typePaperSize = $('.typePaperSize').val() || '';
        data.typePaperGramm = $('.typePaperGramm').val() || '';
        data.set = $('.set').val() || '';
        data.decoration = $('.decoration').val() || '';
        data.manager = $('.manager').val() || [];
        data.managerId = $('.managerId').val();
        data.userUpdate = $('.userName').text();
        data.updatedAt = new Date();
        data.managerCreated = new Date();


        data.priceArray = [];

        var count = 0;

        $('.form-price').each(function(){
            var obj = {};
            obj.name = $(this).find('.price-name').val();
            obj.number = +$(this).find('.price-number').val();
            data.priceArray.push(obj);
            count += obj.number;
        });

        var priceLog = {
            meta: 'Обновлено',
            manager: get_cookie('manager') || '',
            price: data.priceArray,
            passportId: data.passportId
        };

        data.price = count;

        if(!data.sizePaper.length){
            Snackbar.show({
                text: 'Размер бумаги не выбран!',
                pos: 'top-center',
            });
            return false;
        }

        $('.car-container').each(function(){
            var obj = {};
            obj.typePaper = $(this).find('.typePaper').val();
            obj.grammPaper = $(this).find('.typePaperGramm').val();
            obj.sizePaper = $(this).find('.typePaperSize').val();
            obj.commentTop = $(this).find('.comment-top').val();
            obj.car = $(this).find('.car-select').val();
            obj.sht = $(this).find('.Sht').val();
            obj.on = $(this).find('.on').val();
            obj.printSheet = $(this).find('.printSheet').val();
            obj.allSheet = $(this).find('.allSheet').val();
            obj.signature = $(this).find('.signature').val();
            data.allCar.push(obj);
        });

        var id = window.location.pathname.split('/')[3];

        var valid = true;
        socket.emit('updatePassportBtn', {data: data, id: id, priceLog: priceLog}, function (res) {
            if(res.status === 412){
                Snackbar.show({
                    text: res.msg,
                    pos: 'top-center',
                    actionText: null
                });
                valid = false;
            }else if(res.status === 201){
                var text = '';
                res.arr.forEach(function (item){
                    text += 'На складе не хватает бумаги тип: '+item.typePaper+' граммаж: '+item.grammPaper+' формат: '+item.sizePaper+' '+item.count+' штук.\n'
                });
                var confirmer = confirm(text + 'Хотите оставить заявку?');
                if(confirmer){
                    var obj = {
                        order: res.arr,
                        person: get_cookie('manager')
                    };
                    socket.emit('stockOrder', obj, function(res) {
                        window.location.replace('/manager/orderpapers')
                    });
                }else{
                    Snackbar.show({
                        text: 'Паспорт сохранен!',
                        pos: 'top-center',
                        actionText: null
                    });
                }
                valid = true;
            }else{
                Snackbar.show({
                    text: res.msg,
                    pos: 'top-center',
                    actionText: null
                });
                valid = true;
            }
        });
        if(!valid){
            return false;
        }
    });


});


function get_cookie ( cookie_name )
{
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( decodeURI ( results[2] ) );
    else
        return null;
}