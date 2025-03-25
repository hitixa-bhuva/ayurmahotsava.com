function submitDelegateForm(event) {
    var formData = $(event).closest('form').serialize(); // Get form data

    $.ajax({
        url: $(event).closest('form').attr('action'), // Get the form action dynamically
        type: 'POST',
        data: formData,
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



function fnDelegatePayment(encodeDelegateId) {
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
                url: '/admin/delegate/payment',
                data: { encodeDelegateId: encodeDelegateId },
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