let lambdaEndpoint = process.env.LAMBDA_ENDPOINT;

function submitForm() {
    let email = $('#email').val();
    let totalScore = localStorage.getItem('totalScore');
    return saveDataToGoogleSheets(email, totalScore)
        .then(() => {
            localStorage.setItem('hasConfirmed', true);
            window.location.href = "/results";
        })
}

function saveDataToGoogleSheets(email, totalScore) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            method: 'POST',
            url: `${lambdaEndpoint}/google-sheets`,
            data: JSON.stringify({
                email: email,
                totalScore: totalScore
            }),
            contentType: 'application/json',
            success: function (response) {
                resolve();
            },
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error storing email: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                resolve();
            }
        });
    })
}