$(function(){
    $('.passportList').click( function() {
        var valid = false;
        var that = $(this);

        var search = {
            manager: $(this).parents('.panel-default').find('a').text(),
            startDate: $(this).parents('.panel-default').find('.start-date').val(),
            endDate: $(this).parents('.panel-default').find('.end-date').val()
        };

        if(search.startDate === '' || search.endDate === ''){
            Snackbar.show({
                text: 'Дата не выбрана!',
                pos: 'top-center',
                actionText: null
            });
            valid = false;
        }else{
            valid = true;
        }



        if(valid) {
            socket.emit('getManager', $(this).parents('.panel-default').find('a').text(), function (res) {
                if (res.status === 412) {
                    Snackbar.show({
                        text: res.msg,
                        pos: 'top-center',
                        actionText: null
                    });
                } else {
                    if (res.manager.length) {

                        var req = {
                            manager: res.manager[0]._id,
                            startDate: that.parents('.panel-default').find('.start-date').val(),
                            endDate: that.parents('.panel-default').find('.end-date').val()
                        };

                        socket.emit('adminReportPassports', req, function (res) {
                            if(res.status === 412){
                                Snackbar.show({
                                    text: res.msg,
                                    pos: 'top-center',
                                    actionText: null
                                });
                            }else{
                                $('.setPassportList').empty();
                                $('.setPassportPrice').empty();
                                if(res.price.length){
                                    that.parents('.panel-default').find('.setPassportPrice').text('Общая цена паспортов за выбранный период: ' + res.price[0].price);
                                }else{
                                    that.parents('.panel-default').find('.setPassportPrice').text('Общая цена паспортов за выбранный период: ' + 0);
                                }
                                if(res.passports.length){
                                    res.passports.forEach( function (item, i) {
                                        that.parents('.panel-default').find('.setPassportList').append(
                                            '<div class="panel-group" id="accordion-passport-'+ i +'">' +
                                            '  <div class="panel panel-default">' +
                                            '    <div class="panel-heading">' +
                                            '      <h4 class="panel-title">' +
                                            '              <a data-toggle="collapse" data-parent="#accordion-passport'+ i +'" data-passportId="' + item.passportId + '" aria-expanded="false" href="#passportCollaps-'+i+'" class="getHistory">' +
                                            'Паспорт № ' + '<b>'+item.passportId+'</b>' + ' за ' + '<b>'+item.date+'</b>' +
                                            '              </a>' +
                                            '            </h4>' +
                                            '    </div>' +
                                            '    <div id="passportCollaps-'+i+'" class="panel-collapse collapse in">' +
                                            '      <div class="panel-body" class="history-passport">' +
                                                    '<table class="table table-bordered">' +
                                                    '  <thead>' +
                                                    '    <th>Дата</th>' +
                                                    '    <th>Менеджер</th>' +
                                                    '    <th>Действие</th>' +
                                                    '    <th>Данные</th>' +
                                                    '  </thead>' +
                                                    '  <tbody class="history-body">' +
                                                    '</tbody>' +
                                                    '</table>' +
                                            '      </div>' +
                                            '    </div>' +
                                            '  </div>' +
                                            '</div>'
                                        )
                                    });
                                    $('.collapse').collapse();
                                }
                            }
                        });
                    }
                }
            });
        }else{
            return false;
        }
    });


    $(document).on('click', '.getHistory', function(){

        var table = $(this).closest('.panel-default').find('.history-body');


        var that = $(this);

        var data = {
            passportId: $(this).data('passportid')
        };

        socket.emit('history', data, function (res) {
            if (res.status === 412) {
                Snackbar.show({
                    text: res.msg,
                    pos: 'top-center',
                    actionText: null
                });
            }else{
                table.empty();
                res.history.forEach(function(item, i){

                    var d = new Date(item.date);
                    //var date = d.getDate() + "."+ d.getMonth() + 1 + "."+ d.getFullYear();
                    var date = d.getFullYear() + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + ('0' + d.getDate()).slice(-2);

                    table.append(
                        '<tr class="tr">' +
                        '<td>'+date+'</td>' +
                        '<td>'+item.manager+'</td>' +
                        '<td>'+item.meta+'</td>' +
                        '</tr>'
                    );

                    var tr = that.closest('.panel-default').find('.panel-body').find('.history-body').find('.tr');


                    item.price.forEach(function (price){
                        tr.append(
                            '<table class="table table-bordered">' +
                            '<thead>' +
                            '<th>Название</th>' +
                            '<th>Цена</th>' +
                            '</thead>' +
                            '<tbody>' +
                            '</tbody>'+
                            '<tr>' +
                            '<td>'+ price.name +'</td>' +
                            '<td>'+  price.number +'р.</td>' +
                            '</tr>' +
                            '</table>'
                        );
                    });


                });
            }
        });
    });
});