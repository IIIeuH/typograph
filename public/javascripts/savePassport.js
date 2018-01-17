$(function(){

    var btn = $('#savePassportBtn');
    var form = $('#formPassport');

    form.on( "submit", function( event ) {
    //btn.click(function(){
        var data = {};
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



        var dataMass = {};
        dataMass.sizePaper = [];
        dataMass.typePaper = [];
        dataMass.typePaperSize = [];
        dataMass.typePaperGramm = [];
        dataMass.decoration = [];
        dataMass.manager = [];


        dataMass.sizePaper = $('.size-paper').val() || [];
        dataMass.typePaper = $('.typePaper').val() || [];
        dataMass.typePaperSize = $('.typePaperSize').val() || [];
        dataMass.typePaperGramm = $('.typePaperGramm').val() || [];
        dataMass.set = $('.set').val() || [];
        dataMass.decoration = $('.decoration').val() || [];
        dataMass.manager = $('.manager').val() || [];

        $.ajax({
            type: 'POST',
            dataType: "json",
            data: {field1: JSON.stringify(data), field2: JSON.stringify(dataMass)},
            success: function(data){
                let href = window.location.host;
                window.location.replace = (href +'/manager');
            },
            error: function(err){
                console.log(err);
            }
        })
    });

});