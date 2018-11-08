$(document).ready(function(){
    var count = 0;
    $(document).on('click', '.showMore', function(){
        var skip = count + 20;
        count = skip;
        var table = $(this).data('table');
        socket.emit('loadContent', skip, function(res) {
            if(res.passports.length){
                res.passports.forEach(function(item){
                    $('.'+table).find('tbody').append(
                        '<tr class="status" data-status="'+item.status+'">\n' +
                        '  <td class="passport-date-created" onclick="window.location.href=&quot;/manager/passport/'+item._id+'&quot;; return false">'+moment(item.createdAt).format("DD.MM.YYYY")+'</td>' +
                        '  <td class="passport-date" onclick="window.location.href=&quot;/manager/passport/'+item._id+'&quot;; return false">'+moment(item.passOn, "DD.MM.YYYY").format("DD.MM.YYYY")+'</td>' +
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
            }
        });
    });
});