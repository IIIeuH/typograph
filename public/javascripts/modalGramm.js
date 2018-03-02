var mas = [];
$(document).on('select2:select', '#grammpapper',function (e) {
    mas.push(e.params.data.text  + '; ');
    $('.resultBoxGramm').last().append(
        '<div class="childrenBoxGramm" contenteditable="true">' +
        '<button type="button" class="close closeBoxGramm">×</button>' +
        '<div class="textBoxGramm">' +
        e.params.data.text +
        '</div>' +
        '</div>'
    );
});

$(document).on('click', '.addBoxGramm', function(e){
    $('.gramm-modal-body').append(
        '<div class="carBoxGramm">' +
        '<button type="button" class="close closeCarBoxGramm">×</button>' +
        '<h4 class="modal-title">Значения для машины' +
        '</h4>' +
        '<div class="resultBoxGramm"></div>' +
        '</div>');
});

$(document).on('click', '.childrenBoxGramm', function(){
    $(this).parents('.childrenBoxGramm').text()
});

$(document).on('click', '.closeBoxGramm', function(){
    $(this).parents('.childrenBoxGramm').remove();
});

$(document).on('click', '.closeCarBoxGramm', function(){
    $(this).parent().remove();
});

//Тип бумаги
$(document).on('click', '.resultButtonGramm', function(){
    var text = '';
    if($('.resultBoxGramm').length >1){
        text = '';
        $('.resultBoxGramm').each(function(){
            $(this).find('.textBoxGramm').each(function(){
                text += $(this).text() +'; ';
            });
            text += "//";
        });
        text = text.substring(0, text.length - 2)
    }else{
        $('.resultBoxGramm').each(function(){
            text = '';
            $(this).find('.textBoxGramm').each(function(){
                text += $(this).text() +'; ';
            });
        });
    }
    $('#modalGramm').modal('toggle');
    $('.typePaperGramm').val(text);
});


$(document).on('click','.addSetGramm', function(){
    var carBox = $('.carBoxGramm');
    carBox.remove();
    var text = $('.typePaperGramm').val().split('//');
    var subText = '';
    var mas = [];
    for(var i =0; i < text.length; i++){
        $('.gramm-modal-body').append(
            '<div class="carBoxGramm">' +
            '<button type="button" class="close closeCarBoxGramm">×</button>' +
            '<h4 class="modal-title">Значения для машины</h4>' +
            '<div class="resultBoxGramm"></div>' +
            '</div>'
        );
    }
    $('.carBoxGramm').each(function(i, item){
        subText = text[i].split('; ');
        subText = _.compact(subText);
        var that = $(this);
        subText.forEach(function(item){
            that.find('.resultBoxGramm').append(
                '<div class="childrenBoxGramm" contenteditable="true">' +
                '<button type="button" class="close closeBoxGramm">×</button>' +
                '<div class="textBoxGramm">' +
                item +
                '</div>' +
                '</div>'
            );
        });

    });
});