$(function(){
    $('#report').click(function(){
        var search = {
            managers: $('#managers-name').val(),
            startDate: $('#start-date').val(),
            endDate: $('#end-date').val()
        };
        if(!search.managers){
            return false;
        }
        socket.emit('report', search, function (res) {
            if(res.status === 412) {
                Snackbar.show({
                    text: res.msg,
                    pos: 'top-center',
                    actionText: null
                });
            }else{
                $('.report').empty();
                if(res.report.length){
                    var sum = 0;
                    res.report.forEach(function(item){
                        $('.report').append(
                            '<tr>' +
                            '<td>' +
                            item._id +
                            '</td>' +
                            '<td>' +
                            item.price +
                            '</td>' +
                            '</tr>'
                        );
                        sum += item.price;
                    });
                    $('.report').append(
                        '<tr>' +
                        '<td>' +
                        '<b>Итого</b>' +
                        '</td>' +
                        '<td>' +
                        '<b>' + sum + '</b>' +
                        '</td>' +
                        '</tr>'
                    )
                }
            }
        });
    });
});