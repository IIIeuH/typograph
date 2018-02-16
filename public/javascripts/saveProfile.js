$(function(){
    var btn = $('#profileUpdate');
    var data = {};

    btn.click(function(){
        data.name = $('#name').val();
        $.ajax({
            url: "/manager/profile",
            type: "post",
            data: data,
            success: function(data){
                Snackbar.show({
                    text: 'Данные успешно сохраненны!',
                    pos: 'bottom-left',
                    actionText: null
                });
            },
            error: function(err){
                Snackbar.show({
                    text: 'Что-то пошло не так!',
                    pos: 'bottom-left',
                    actionText: null
                });
            }
        });
    });
});