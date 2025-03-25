function submitExhibitorForm(event) {
    

    var form = $(event).closest('form')[0]; // Get the form element
    var formData = new FormData(form); // Use FormData to include files

    $.ajax({
        url: $(form).attr('action'), // Get the form action dynamically
        type: 'POST',
        data: formData,
        processData: false, // Important: Prevent jQuery from processing the data
        contentType: false, // Important: Prevent jQuery from setting content-type
        success: function (data) {
            if (data.statusCode == enumOk) {
                fnSweetMessage("success", "Success", data.Message);
            } else {
                fnShowError(data.Message);
            }
        },
        error: function (req, status, error) {
            fnHideLoader();
            fnShowError(error);
        }
    });
}





    function fnExhibitorViewModal(encodeExhibitorId) {
        fnShowMainProgress();
    $.ajax({
        type: 'GET',
    url: '/admin/exhibitor/view',
        data: { encodeExhibitorId: encodeExhibitorId },
        success: function (data) {
        $("#exhibitorViewModalBody").empty();
            $("#exhibitorViewModalBody").html(data);

        $('#exhibitorViewModal').modal("show");

            fnHideMainProgress();
            },
        error: function (req, status, err) {
            fnHideMainProgress();
    }
        });

}


function fnExhibitorPayment(encodeExhibitorId) {
    debugger;

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#25c00e',
        cancelButtonColor: '#e44141',
        confirmButtonText: 'Yes, payment done!'
    }).then((result) => {
        if (result.isConfirmed) {
            fnShowMainProgress();

            $.ajax({
                type: 'GET',
                url: '/admin/exhibitor/payment',
                data: { encodeExhibitorId: encodeExhibitorId },
                dataType: "json", // Expect JSON response
                success: function (response) {
                    fnHideMainProgress();
                    
                    if (response.success) {
                        Swal.fire('Payment Done!', 'The Payment has been confirmed.', 'success').then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire('Error!', 'There was an error accepting the payment.', 'error');
                    }
                },
                error: function () {
                    fnHideMainProgress();
                    console.log(xhr.responseText);
                    Swal.fire('Error!', 'There was an error processing your request.', 'error');
                }
            });
        }
    });
}

