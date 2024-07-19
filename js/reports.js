document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.sidebar a[href="#reports"]').addEventListener('click', function(event) {
        event.preventDefault();
        showSection('reports');
    });
})
/*const btn = document.getElementById('submit-btn');
btn.addEventListener('click', function() {
    const notification = document.createElement('div');
    notification.textContent = 'Thank you!';
    notification.style.backgroundColor = 'blue';
    notification.style.color = 'white';
    notification.style.padding = '10px';
    notification.style.position = 'fixed';
    notification.style.bottom = '40px';
    notification.style.right = '40px';
    document.body.appendChild(notification);

    setTimeout(function() {
        document.body.removeChild(notification);
    }, 1500);
});*/
document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Show the notification
    const notification = document.getElementById('notify');
    notification.style.display = 'block';

    // Hide the notification after 2 seconds
    setTimeout(function() {
        notification.style.display = 'none';
    }, 2000);
});

