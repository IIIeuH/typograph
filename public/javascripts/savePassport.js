$(function(){

    var btn = $('#savePassportBtn');
    var form = $('#formPassport');
    var socket = io();

    form.on("submit", function( event ) {
    //btn.click(function(){
        var data = {};
        data.sizePaper = [];
        data.typePaper = [];
        data.typePaperSize = [];
        data.typePaperGramm = [];
        data.decoration = [];
        data.manager = [];
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
        data.passportId = 'k'+moment().format("DDMMYYYYhhmm") || '';
        data.deliveryFiled = $('input[name="delivery"]:checked').val() || '';
        data.typeDeliveryFiled = $('input[name="type-delivery"]:checked').val() || '';
        data.sizePaper = $('.size-paper').val() || [];
        data.typePaper = $('.typePaper').val() || [];
        data.typePaperSize = $('.typePaperSize').val() || [];
        data.typePaperGramm = $('.typePaperGramm').val() || [];
        data.set = $('.set').val() || [];
        data.decoration = $('.decoration').val() || [];
        data.manager = $('.manager').val() || [];

        socket.emit('savePassportBtn', data);
        socket.on('readySavePassport', function(data) {
            if(data.status === 412){
                Snackbar.show({
                    text: data.msg,
                    pos: 'top-center',
                    actionText: null
                });
            }
        });
    });

});