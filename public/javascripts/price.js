$(function(){
    $(document).on('click', '#price-add', function(){
        $('.form-price').last().after(addPrice());
    });
    $(document).on('click', '#price-remove', function(){
        var form = $('.form-price');
        if(form.length > 1) form.last().remove();
    })
});

function addPrice() {
    return '<div class="col-md-3 form-price">' +
        '  <div class="form-group">' +
        '    <div class="col-md-4">' +
        '      <label class="control-label">Название</label>' +
        '    </div>' +
        '    <div class="col-md-8">' +
        '      <input type="text" required="required" class="form-control price-name"/>' +
        '    </div>' +
        '  </div>' +
        '  <div class="form-group">' +
        '    <div class="col-md-4">' +
        '      <label class="control-label">Сумма</label>' +
        '    </div>' +
        '    <div class="col-md-8">' +
        '      <input type="number" min="0" required="required" class="form-control price-number"/>' +
        '    </div>' +
        '  </div>' +
        '</div>';
}

