document.getElementById('homeButton1').addEventListener('click', function(event) {
    event.preventDefault(); 
    const sections = document.querySelectorAll('.main-content section');
   
    sections.forEach(section => {
        section.style.display = 'none';  
    });

    document.getElementById('overview').style.display = 'block';
    document.getElementById('contentP1').style.display= 'block';
});