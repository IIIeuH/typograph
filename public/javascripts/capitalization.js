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
                '      <div class="col-md-3">' +
                '        <input class="form-control stockPaperCount" required="required" type="number" placeholder="Кол-во" min="0" />' +
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
        }else{
            return false;
        }
    });


    $(document).on('click', '.saveCapitalization', function(e){
        //e.preventDefault();

        var arrPappers = [];

        $('.numenclature').each(function(){

            var obj = {
                typePaperId: $(this).find('.stockTypePaper').val(),
                typePaper: $(this).find('.stockTypePaper :selected').text(),
                grammPaperId: $(this).find('.stockGrammPaper').val(),
                grammPaper: $(this).find('.stockGrammPaper :selected').text(),
                sizePaperId: $(this).find('.stockSizePaper').val(),
                sizePaper: $(this).find('.stockSizePaper :selected').text(),
                count: +$('.stockPaperCount').val()
            };

            arrPappers.push(obj);
        });


        var data = {
            number: $('#number-capitalization').val(),
            date: $('#date-capitalization').val(),
            comment: $('#comment-capitalization').val(),
            papper: arrPappers
        };

        socket.emit('addPaperCapitalization', data, function (res) {
            if (res.status === 412) {
                Snackbar.show({
                    text: res.msg,
                    pos: 'top-center',
                    actionText: null
                });
            }else{
                window.location.reload();
            }
        });

    });

});