var mas = [];
$(document).on('select2:select', '#sizepapper',function (e) {
    mas.push(e.params.data.text  + '; ');
    $('.resultBoxSize').last().append(
        '<div class="childrenBoxSize" contenteditable="true">' +
        '<button type="button" class="close closeBoxSize">×</button>' +
        '<div class="textBoxSize">' +
        e.params.data.text +
        '</div>' +
        '</div>'
    );
});

$(document).on('click', '.addBoxSize', function(e){
    $('.size-modal-body').append(
        '<div class="carBoxSize">' +
        '<button type="button" class="close closeCarBoxSize">×</button>' +
        '<h4 class="modal-title">Значения для машины' +
        '</h4>' +
        '<div class="resultBoxSize"></div>' +
        '</div>');
});

$(document).on('click', '.childrenBoxSize', function(){
    $(this).parents('.childrenBoxSize').text()
});

$(document).on('click', '.closeBoxSize', function(){
    $(this).parents('.childrenBoxSize').remove();
});

$(document).on('click', '.closeCarBoxSize', function(){
    $(this).parent().remove();
});

//Тип бумаги
$(document).on('click', '.resultButtonSize', function(){
    var text = '';
    if($('.resultBoxSize').length >1){
        text = '';
        $('.resultBoxSize').each(function(){
            $(this).find('.textBoxSize').each(function(){
                text += $(this).text() +'; ';
            });
            text += "//";
        });
        text = text.substring(0, text.length - 2)
    }else{
        $('.resultBoxSize').each(function(){
            text = '';
            $(this).find('.textBoxSize').each(function(){
                text += $(this).text() +'; ';
            });
        });
    }
    $('#modalSize').modal('toggle');
    $('.typePaperSize').val(text);
});


$(document).on('click','.addSetSize', function(){
    var carBox = $('.carBoxSize');
    carBox.remove();
    var text = $('.typePaperSize').val().split('//');
    var subText = '';
    var mas = [];
    for(var i =0; i < text.length; i++){
        $('.size-modal-body').append(
            '<div class="carBoxSize">' +
            '<button type="button" class="close closeCarBoxSize">×</button>' +
            '<h4 class="modal-title">Значения для машины</h4>' +
            '<div class="resultBoxSize"></div>' +
            '</div>'
        );
    }
    $('.carBoxSize').each(function(i, item){
        subText = text[i].split('; ');
        subText = _.compact(subText);
        var that = $(this);
        subText.forEach(function(item){
            that.find('.resultBoxSize').append(
                '<div class="childrenBoxSize" contenteditable="true">' +
                '<button type="button" class="close closeBoxSize">×</button>' +
                '<div class="textBoxSize">' +
                item +
                '</div>' +
                '</div>'
            );
        });

    });
});