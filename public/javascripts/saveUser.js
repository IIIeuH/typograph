$(function () {
    var btn = $('#saveUser');

    btn.click(function () {
        var data = {};
        data.email = $('input[name="email"]').val();
        data.role = $('input[name="role"]').val();
        data.name = $('input[name="name"]').val();
        var mas = [];
        $('.permiss').each(function () {
           var obj = {};
           obj.name = $(this).find('.name').val();
           obj.access = +$(this).find('.access').val();
           mas.push(obj);
        });
        data.permissions = mas;
        $.ajax({
            type: "POST",
            data: {data: JSON.stringify(data)},
            success: function(data){
                Snackbar.show({
                    text: 'Данные успешно сохраненны!',
                    pos: 'bottom-left',
                    actionText: null
                });
            },
            error: function (err) {
                Snackbar.show({
                    text: 'Что-то пошло не так! ' + err,
                    pos: 'bottom-left',
                    actionText: null
                });
            }
        })
    });

});