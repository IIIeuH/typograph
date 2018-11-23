$(function(){
    var field = '<div class="wrap-numencloture">' +
                '  <div class="numenclature">' +
                '    <div class="row">' +
                '      <div class="col-md-2">' +
                '        <select class="form-control stockTypePaper" required="required">' +
                '          <option disabled="disabled" selected="selected" value="">Тип бумаги</option>' +
                '        </select>' +
                '      </div>' +
                '      <div class="col-md-2">' +
                '        <select class="form-control stockGrammPaper" required="required">' +
                '          <option disabled="disabled" selected="selected" value="">Граммаж бумаги</option>' +
                '        </select>' +
                '      </div>' +
                '      <div class="col-md-2">' +
                '        <select class="form-control stockSizePaper" required="required">' +
                '          <option disabled="disabled" selected="selected" value="">Формат бумаги</option>' +
                '        </select>' +
                '      </div>' +
                '      <div class="pricer">' +
                '       <div class="col-md-2">' +
                '           <input class="form-control stockPaperCount" required="required" type="number" placeholder="Кол-во" min="0" />' +
                '       </div>' +
                '       <div class="col-md-2">' +
                '           <input class="form-control stockPaperPriceOne" required="required" disabled type="number" placeholder="Сумма за лист" min="0" />' +
                '       </div>' +
                '       <div class="col-md-2">' +
                '           <input class="form-control stockPaperPrice" required="required" type="number" placeholder="Сумма за все листы" min="0" />' +
                '           <h4 style="float: right;">Итого:<span class="totals-capitalization">0</span></h4>' +
                '       </div>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>';
    $('#capitalization-add').click(function(){
        $('.wrap-numencloture').last().append(field);

        socket.emit('typepappers', function (res) {
            if(res.status === 200){
                if(res.result.length){
                    $('.stockTypePaper').last().select2({
                        data: res.result
                    });
                }
            }else{
                Snackbar.show({
                    text: res.msg,
                    pos: 'top-center',
                    actionText: null
                });
            }
        });

        socket.emit('grammpappers', function (res) {
            if(res.status === 200){
                if(res.result.length){
                    $('.stockGrammPaper').last().select2({
                        data: res.result
                    });
                }
            }else{
                Snackbar.show({
                    text: res.msg,
                    pos: 'top-center',
                    actionText: null
                });
            }
        });

        socket.emit('sizepappers', function (res) {
            if(res.status === 200){
                if(res.result.length){
                    $('.stockSizePaper').last().select2({
                        data: res.result
                    });
                }
            }else{
                Snackbar.show({
                    text: res.msg,
                    pos: 'top-center',
                    actionText: null
                });
            }
        });

    });

    $(document).on('click', '#capitalization-remove', function(){
        if($('.numenclature').length > 1){
            $('.numenclature').last().remove();
            var sum = 0;
            $('.totals-capitalization').each(function(i, item){
                sum += +$(this).text();
            });
            $('#totals-capitalization-all').text(sum);
        }else{
            return false;
        }
    });


    $(document).on('click', '.saveCapitalization', function(e){
        //e.preventDefault();

        if($('#number-capitalization').val() === ''){
            Snackbar.show({
                text: 'Номер не заполнен',
                pos: 'top-center',
                actionText: 'OK'
            });
        }else if($('#date-capitalization').val() === ''){
            Snackbar.show({
                text: 'Дата не заполнена',
                pos: 'top-center',
                actionText: 'OK'
            });
        }else if($('#provider-capitalization').val() === ''){
            Snackbar.show({
                text: 'Поставщик не заполнен',
                pos: 'top-center',
                actionText: 'OK'
            });
        }else if($('.stockTypePaper').last().val() === null){
            Snackbar.show({
                text: 'Тип бумаги не заполнен!',
                pos: 'top-center',
                actionText: 'OK'
            });
        }else if($('.stockGrammPaper').last().val() === null){
            Snackbar.show({
                text: 'Граммаж бумаги не заполнен!',
                pos: 'top-center',
                actionText: 'OK'
            });
        }else if($('.stockSizePaper').last().val() === null){
            Snackbar.show({
                text: 'Формат бумаги не заполнен!',
                pos: 'top-center',
                actionText: 'OK'
            });
        }else if($('.stockPaperCount').last().val() === ''){
            Snackbar.show({
                text: 'Количество бумаги не заполнено!',
                pos: 'top-center',
                actionText: 'OK'
            });
        }else if($('.stockPaperPrice').last().val() === ''){
            Snackbar.show({
                text: 'Цена бумаги не заполнено!',
                pos: 'top-center',
                actionText: 'OK'
            });
        }else{
            var arrPappers = [];

            $('.numenclature').each(function(){

                var obj = {
                    typePaperId: $(this).find('.stockTypePaper').val(),
                    typePaper: $(this).find('.stockTypePaper :selected').text(),
                    grammPaperId: $(this).find('.stockGrammPaper').val(),
                    grammPaper: $(this).find('.stockGrammPaper :selected').text(),
                    sizePaperId: $(this).find('.stockSizePaper').val(),
                    sizePaper: $(this).find('.stockSizePaper :selected').text(),
                    count: +$(this).find('.stockPaperCount').val(),
                    price: +$(this).find('.stockPaperPriceOne').val(),
                    priceAll: +$(this).find('.stockPaperPrice').val()
                };

                arrPappers.push(obj);
            });


            var data = {
                number: $('#number-capitalization').val(),
                date: $('#date-capitalization').val(),
                provider: $('#provider-capitalization').val(),
                papper: arrPappers,
                totals: +$('#totals-capitalization-all').text()
            };

            socket.emit('addPaperCapitalization', data, function (res) {
                if (res.status === 412) {
                    Snackbar.show({
                        text: res.msg,
                        pos: 'top-center',
                        actionText: null
                    });
                }else{
                    window.location.href = '/storekeeper/capitalization-list';
                }
            });
        }
    });


    //Редактирование прихода
    $(document).on('click', '.saveCapitalizationRedactor', function(e){
        e.preventDefault();
        if($('#number-capitalization').val() === ''){
            Snackbar.show({
                text: 'Номер не заполнен',
                pos: 'top-center',
                actionText: 'OK'
            });
        }else if($('#date-capitalization').val() === ''){
            Snackbar.show({
                text: 'Дата не заполнена',
                pos: 'top-center',
                actionText: 'OK'
            });
        }else if($('#provider-capitalization').val() === ''){
            Snackbar.show({
                text: 'Поставщик не заполнен',
                pos: 'top-center',
                actionText: 'OK'
            });
        }else if($('.stockTypePaper').last().val() === null){
            Snackbar.show({
                text: 'Тип бумаги не заполнен!',
                pos: 'top-center',
                actionText: 'OK'
            });
        }else if($('.stockGrammPaper').last().val() === null){
            Snackbar.show({
                text: 'Граммаж бумаги не заполнен!',
                pos: 'top-center',
                actionText: 'OK'
            });
        }else if($('.stockSizePaper').last().val() === null){
            Snackbar.show({
                text: 'Формат бумаги не заполнен!',
                pos: 'top-center',
                actionText: 'OK'
            });
        }else if($('.stockPaperCount').last().val() === ''){
            Snackbar.show({
                text: 'Количество бумаги не заполнено!',
                pos: 'top-center',
                actionText: 'OK'
            });
        }else if($('.stockPaperPrice').last().val() === ''){
            Snackbar.show({
                text: 'Цена бумаги не заполнено!',
                pos: 'top-center',
                actionText: 'OK'
            });
        }else{

            var arrPappers = [];

            $('.numenclature').each(function(){

                var obj = {
                    typePaperId: $(this).find('.stockTypePaper').val(),
                    typePaper: $(this).find('.stockTypePaper :selected').text(),
                    grammPaperId: $(this).find('.stockGrammPaper').val(),
                    grammPaper: $(this).find('.stockGrammPaper :selected').text(),
                    sizePaperId: $(this).find('.stockSizePaper').val(),
                    sizePaper: $(this).find('.stockSizePaper :selected').text(),
                    count: +$(this).find('.stockPaperCount').val(),
                    price: +$(this).find('.stockPaperPriceOne').val(),
                    priceAll: +$(this).find('.stockPaperPrice').val()
                };

                arrPappers.push(obj);
            });


            var data = {
                number: $('#number-capitalization').val(),
                date: $('#date-capitalization').val(),
                provider: $('#provider-capitalization').val(),
                papper: arrPappers,
                totals: +$('#totals-capitalization-all').text()
            };

            var that = $(this);


            socket.emit('subtractPaperCapitalization', $(this).data('paper'), function (res) {
                if (res.status === 412) {
                    Snackbar.show({
                        text: res.msg,
                        pos: 'top-center',
                        actionText: null
                    });
                }else{
                    socket.emit('redactorPaperCapitalization', data, that.attr('id'), function (res) {
                        if (res.status === 412) {
                            Snackbar.show({
                                text: res.msg,
                                pos: 'top-center',
                                actionText: null
                            });
                        }else{
                            window.location.href = '/storekeeper/capitalization-list';
                        }
                    });
                }
            });
        }
    });


    ///Итог
    $(document).on('input', '.stockPaperCount, .stockPaperPrice', function () {
        var countFields = $(this).parents('.pricer').find('.stockPaperCount').val();
        var priceFields = $(this).parents('.pricer').find('.stockPaperPrice').val();
        var res = $(this).parents('.pricer').find('.stockPaperPrice').val();
        var sumList = 0;
        var all = 0;

        sumList = priceFields / countFields;

        $(this).parents('.pricer').find('.stockPaperPriceOne').val(sumList.toFixed(2));
        $(this).parents('.pricer').find('.totals-capitalization').text(res);

        var itogo = $('.totals-capitalization');


        itogo.each(function(){
            console.log(+$(this).text());
            all += +$(this).text();
        });


        $('#totals-capitalization-all').text(all.toFixed(2));
    });


    $(document).on('click', '.capitalization-redactor', function(){
        window.location.href = '/storekeeper/capitalization/redactor/' + $(this).attr('id');
    });

});