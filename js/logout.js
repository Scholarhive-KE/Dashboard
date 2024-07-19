document.querySelector('.sidebar a[href="#logout"]').addEventListener('click', function(event) {
    event.preventDefault();
    history.replaceState(null, null, 'login.html');
    window.location.href = 'login.html';
});
