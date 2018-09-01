$(function(){
    $("#history").select2();
    var table = $('.history-body');
    var subtable = $('.subtable-history');
    $(document).on('change', '#history', function(){

        var data = {
            passportId: $(this).val()
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

                    console.log($('.tr'));
                    console.log($('.tr')[i]);

                    var tr =$('.tr').last();


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