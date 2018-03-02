var mas = [];
// $('.box').click(function(){
//     mas.push($(this).text() + '; ');
//     $('.resultBox').last().append(
//         '<div class="childrenBox" contenteditable="true">' +
//         '<button type="button" class="close closeBox">×</button>' +
//         '<div class="textBox">' +
//         $(this).text() +
//         '</div>' +
//         '</div>'
//     );
// });

$(document).on('select2:select', '#typepapper',function (e) {
    mas.push(e.params.data.text  + '; ');
    $('.resultBoxType').last().append(
        '<div class="childrenBoxType" contenteditable="true">' +
        '<button type="button" class="close closeBoxType">×</button>' +
        '<div class="textBoxType">' +
        e.params.data.text +
        '</div>' +
        '</div>'
    );
});

$(document).on('click', '.addBoxType', function(e){
    $('.type-modal-body').append(
        '<div class="carBoxType">' +
        '<button type="button" class="close closeCarBoxType">×</button>' +
        '<h4 class="modal-title">Значения для машины' +
        '</h4>' +
        '<div class="resultBoxType"></div>' +
        '</div>');
});

$(document).on('click', '.childrenBoxType', function(){
    $(this).parents('.childrenBoxType').text()
});

$(document).on('click', '.closeBoxType', function(){
    $(this).parents('.childrenBoxType').remove();
});

$(document).on('click', '.closeCarBoxType', function(){
    $(this).parent().remove();
});

//Тип бумаги
$(document).on('click', '.resultButtonType', function(){
    var text = '';
    if($('.resultBoxType').length >1){
        text = '';
        $('.resultBoxType').each(function(){
            $(this).find('.textBoxType').each(function(){
                text += $(this).text() +'; ';
            });
            text += "//";
        });
        text = text.substring(0, text.length - 2)
    }else{
        $('.resultBoxType').each(function(){
            text = '';
            $(this).find('.textBoxType').each(function(){
                text += $(this).text() +'; ';
            });
        });
    }
    $('#modalType').modal('toggle');
    $('.typePaper').val(text);
});


$(document).on('click','.addSetType', function(){
    var carBox = $('.carBoxType');
    carBox.remove();
    var text = $('.typePaper').val().split('//');
    var subText = '';
    var mas = [];
    console.log(text);
    for(var i =0; i < text.length; i++){
        $('.type-modal-body').append(
            '<div class="carBoxType">' +
            '<button type="button" class="close closeCarBoxType">×</button>' +
            '<h4 class="modal-title">Значения для машины</h4>' +
            '<div class="resultBoxType"></div>' +
            '</div>'
        );
    }

    $('.carBoxType').each(function(i, item){
        subText = text[i].split('; ');
        subText = _.compact(subText);
        var that = $(this);
        subText.forEach(function(item){
            that.find('.resultBoxType').append(
                '<div class="childrenBoxType" contenteditable="true">' +
                '<button type="button" class="close closeBoxType">×</button>' +
                '<div class="textBoxType">' +
                item +
                '</div>' +
                '</div>'
            );
        });

    });
});