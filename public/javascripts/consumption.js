$(function(){
    var field = '<div class="wrap-numencloture">' +
        '  <div class="numenclature">' +
        '    <div class="row">' +
        '      <div class="col-md-3">' +
        '        <select class="form-control stockTypePaper" required="required">' +
        '          <option disabled="disabled" selected="selected" value="">Тип бумаги</option>' +
        '        </select>' +
        '      </div>' +
        '      <div class="col-md-3">' +
        '        <select class="form-control stockGrammPaper" required="required">' +
        '          <option disabled="disabled" selected="selected" value="">Граммаж бумаги</option>' +
        '        </select>' +
        '      </div>' +
        '      <div class="col-md-3">' +
        '        <select class="form-control stockSizePaper" required="required">' +
        '          <option disabled="disabled" selected="selected" value="">Формат бумаги</option>' +
        '        </select>' +
        '      </div>' +
        '      <div class="pricer">' +
        '       <div class="col-md-3">' +
        '           <input class="form-control stockPaperCountCon" required="required" type="number" placeholder="Кол-во" min="0" />' +
        '       </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>';
    $('#consumption-add').click(function(){
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

    $(document).on('click', '#consumption-remove', function(){
        if($('.numenclature').length > 1){
            $('.numenclature').last().remove();
        }else{
            return false;
        }
    });


    $(document).on('click', '.saveConsumption', function(e){
        e.preventDefault();


        if($('#number-consumption').val() === ''){
            Snackbar.show({
                text: 'Номер не заполнен',
                pos: 'top-center',
                actionText: 'OK'
            });
        }else if($('#date-consumption').val() === ''){
            Snackbar.show({
                text: 'Дата не заполнена',
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
        }else if($('.stockPaperCountCon').last().val() === ''){
            Snackbar.show({
                text: 'Количество бумаги не заполнено!',
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
                    count: +$(this).find('.stockPaperCountCon').val()
                };

                arrPappers.push(obj);
            });


            var data = {
                number: $('#number-consumption').val(),
                date: $('#date-consumption').val(),
                comment: $('#comment-consumption').val(),
                papper: arrPappers
            };

            socket.emit('addPaperConsumption', data, function (res) {
                if (res.status === 412) {
                    Snackbar.show({
                        text: res.msg,
                        pos: 'top-center',
                        actionText: 'OK'
                    });
                }else{
                    window.location.reload();
                }
            });
        }

    });

});