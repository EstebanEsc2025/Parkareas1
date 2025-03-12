const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.toggle-btn');
const overlay = document.getElementById('overlay');

toggleBtn.addEventListener('click', (e) => {
    sidebar.classList.toggle('active');
    // Cuando se abre la barra lateral
    if(sidebar.classList.contains('active')) {
        overlay.style.display = 'block';
    } else {
        // Cuando se cierra la barra lateral
        overlay.style.display = 'none';
    }
});