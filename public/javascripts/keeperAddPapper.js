$(function(){
    var saveBtnPapper = $('.saveBtnPapper');
    var deleteBtn = $('.removeItemId');

    saveBtnPapper.click(function(e){
        e.preventDefault();

        var data = {
            collection: $(this).data('collection'),
            name: $($(this).data('field')).val()
        };


        socket.emit('addPapper', data, function (res) {
            if(res.status === 200){
                window.location.reload();
            }else{
                Snackbar.show({
                    text: 'Ошибка Добавлени!',
                    pos: 'top-center',
                    actionText: null
                });
            }
        });
    });

    deleteBtn.click(function(e){
        e.preventDefault();

        var c = confirm('Вы действительно хотите удалить ' + $(this).data('name') + "?");

        if(c){
            var data = {
                collection: $(this).data('collection'),
                _id: $(this).attr('id')
            };

            socket.emit('removeItemId', data, function (res) {
                if(res.status === 200){
                    window.location.reload();
                }else{
                    Snackbar.show({
                        text: 'Ошибка Удаления!',
                        pos: 'top-center',
                        actionText: null
                    });
                }
            });
        }else{
            return false;
        }
    });
});