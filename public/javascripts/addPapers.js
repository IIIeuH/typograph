"use strict";

$(function (){
    $(document).on('click', '.addPapers', function() {

        var form = {
            typePaperId: $('.stockTypePaper').val(),
            typePaper: $('.stockTypePaper :selected').text(),
            grammPaperId: $('.stockGrammPaper').val(),
            grammPaper: $('.stockGrammPaper :selected').text(),
            sizePaperId: $('.stockSizePaper').val(),
            sizePaper: $('.stockSizePaper :selected').text(),
            count: +$('.stockPaperCount').val()
        };

        var flag = false;

        if(form.count === null || form.count === undefined || form.count === "" || form.count < 0){
            Snackbar.show({
                text: 'Неверное значение кол-ва бумаги',
                pos: 'top-center',
                actionText: null
            });
            flag = false;
        }else if(form.sizePaperId === null || form.sizePaperId === undefined){
            Snackbar.show({
                text: 'Выбирете формат бумаги',
                pos: 'top-center',
                actionText: null
            });
            flag = false;
        }else if(form.grammPaperId === null || form.grammPaperId === undefined){
            Snackbar.show({
                text: 'Выбирете граммаж бумаги',
                pos: 'top-center',
                actionText: null
            });
            flag = false;
        }else if(form.typePaperId === null || form.typePaperId === undefined){
            Snackbar.show({
                text: 'Выбирете тип бумаги',
                pos: 'top-center',
                actionText: null
            });
            flag = false;
        }else{
            flag = true;
        }

        console.log(flag);

        if(flag){
            socket.emit('addPaper', form, function (res) {
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
        }
    });


    $(document).on('click', '.removePapers', function(){

        var form = {
            typePaperId: $('.stockTypePaper').val(),
            grammPaperId: $('.stockGrammPaper').val(),
            sizePaperId: $('.stockSizePaper').val(),
            count: +$('.stockPaperCount').val()
        };

        var flag = false;

        if(form.count === null || form.count === undefined || form.count === "" || form.count < 0){
            Snackbar.show({
                text: 'Неверное значение кол-ва бумаги',
                pos: 'top-center',
                actionText: null
            });
            flag = false;
        }else if(form.sizePaperId === null || form.sizePaperId === undefined){
            Snackbar.show({
                text: 'Выбирете формат бумаги',
                pos: 'top-center',
                actionText: null
            });
            flag = false;
        }else if(form.grammPaperId === null || form.grammPaperId === undefined){
            Snackbar.show({
                text: 'Выбирете граммаж бумаги',
                pos: 'top-center',
                actionText: null
            });
            flag = false;
        }else if(form.typePaperId === null || form.typePaperId === undefined){
            Snackbar.show({
                text: 'Выбирете тип бумаги',
                pos: 'top-center',
                actionText: null
            });
            flag = false;
        }else{
            flag = true;
        }

        if(flag){
            socket.emit('removePaper', form, function (res) {
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
        }

    });

});