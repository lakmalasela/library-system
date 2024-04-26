function credentialCheck() {
    var username = document.getElementById('txtUsername').value;
    var password = document.getElementById('txtPassword').value;

    // Client-side validation (optional)
    if (username.trim() === '' || password.trim() === '') {
        alert('Please enter both username and password');
        return false;
    }

    // You can also perform further client-side validation if needed

    // Submit the form
    return true;
}



document.addEventListener('DOMContentLoaded', function() {
    var urlParams = new URLSearchParams(window.location.search);
    var errorParam = urlParams.get('error');
    if (errorParam === 'true') {
        // Display error message in an alert if error parameter is present in URL
        alert('Username or Password Wrong');
    }
});