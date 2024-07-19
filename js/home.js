document.getElementById('homeButton').addEventListener('click', function(event) {
    event.preventDefault(); 
    const sections = document.querySelectorAll('.main-content section');
   
    sections.forEach(section => {
        section.style.display = 'none';  
    });
    document.getElementById('overview').style.display = 'block';  
    document.getElementById('scholarships').style.display = 'block';  
    document.querySelector('.main-content').style.display = 'block'; 
});