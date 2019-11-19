(function() {
    const imgform = document.getElementById('imagenet-form');
    const cocoform = document.getElementById('coco-form');
    // imgform.onsubmit = (e) => {
    //     e.preventDefault();
    //     var formData = new FormData();
    //     var file = document.getElementById('imagenet-file').files[0];
    //     console.log(file)
    //     formData.append('file', file);
    //     console.log(formData);
    //     // var xhr = new XMLHttpRequest();
    //     // xhr.open('POST', '/upload/imagenet')
    //     // $.ajax({
    //     //     url: '/upload/imagenet',
    //     //     type: 'POST',
    //     //     data: formData,
    //     //     cache: false,
    //     //     processData: false,
    //     //     contentType: false,
    //     //     success: res => {
    //     //         console.log(res);
    //     //     },
    //     //     error: err => {
    //     //         console.error(err);
    //     //     }
    //     // });
    // }

    $('#imagenet-btn').on('click', () => {
       var file = $('#imagenet-file')[0].files[0];
       var formData = new FormData();
       formData.append('file', file);
       console.log(file);
       $.ajax({
           url: '/upload/imagenet',
           type: 'post',
           data: formData,
           contentType: false,
           processData: false,
           success: (res) => {
               console.log(res);
           },
           error: (err) => console.log(err)
       })
    });
 })();