const generateUploadOnclick = (type) => {
    return (e) => {
        e.preventDefault();
        var file = $(`#${type}-file`)[0].files[0];
        var formData = new FormData();
        formData.append('file', file);
        console.log(file);
        $.ajax({
            url: `/upload/${type}`,
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            success: (res) => {
                console.log(res);
                $('#result-modal-body').html(`<b>${res.eval.split('\n').join('<br>')}</b>`);
                $('#result-modal').modal('show');
            },
            error: (err) => console.error(err)
        });
    }
}

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
