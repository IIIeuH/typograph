$(function(){
    var sel = $('.size-paper');
    sel.change(function (e) {
        $('.size-paper-input').append(
            '<div class="itemPaper">' +
            $(this).val() +
            '</div>'
        );
        sel.prop('selectedIndex', 0);
    });

    $(document).on('click', '.itemPaper', function () {
        $(this).remove();
    })
});