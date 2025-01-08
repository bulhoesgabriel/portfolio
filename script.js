const body = document.body;
const button = document.getElementById('button')

function toggleLightMode() {
    body.classList.toggle('light-mode')
    if (body.classList.contains('light-mode')) {
        button.innerHTML = '<i class="bi bi-moon-fill"></i>'
    } else {
        button.innerHTML = '<i class="bi bi-brightness-high-fill"></i>'
    }
}