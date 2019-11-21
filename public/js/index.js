const toggleLoading = (type) => {
    var d = $(`#${type}-loading`).css('display') === 'none' ? 'block' : '';
    $(`#${type}-loading`).css('display', d);
    var dis = $(`#${type}-btn`).prop('disabled');
    $(`.upload-btn`).prop('disabled', !dis);
};

const generateUploadOnclick = (type) => {
    return (e) => {
        e.preventDefault();
        var file = $(`#${type}-file`)[0].files[0];
        var formData = new FormData();
        formData.append('file', file);
        toggleLoading(type);
        $.ajax({
            url: `/upload/${type}`,
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            success: (res) => {
                toggleLoading(type);
                $('#result-modal-body').html(`<b>${res.eval.split('\n').join('<br>')}</b>`);
                $('#result-modal').modal('show');
            },
            error: (err) => {
                toggleLoading(type);
                $('#result-modal-body').html(`<b>Invalid Format!</b>`);
                $('#result-modal').modal('show');
                console.error(err);
            }
        });
    }
};

(function() {
    $('#imagenet-btn').on('click', generateUploadOnclick('imagenet'));
    $('#coco-btn').on('click', generateUploadOnclick('coco'));
    
    $('#imagenet-file').on('change', (e) => {
        $('#imagenet-file-label').text($('#imagenet-file')[0].files[0].name);
    });
    $('#coco-file').on('change', (e) => {
        $('#coco-file-label').text($('#coco-file')[0].files[0].name);
    });
})();
