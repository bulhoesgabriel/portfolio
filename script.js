const body = document.body;
const button = document.getElementById('button')
const sobre = document.getElementById('sobre')
const titulo = document.getElementById('titulo')
const paragrafo1 = document.getElementById('paragrafo1')
const paragrafo2 = document.getElementById('paragrafo2')
const paragrafo3 = document.getElementById('paragrafo3')
const paragrafo4 = document.getElementById('paragrafo4')
const cv = document.getElementById('cv')

function toggleLightMode() {
    body.classList.toggle('light-mode')
    if (body.classList.contains('light-mode')) {
        button.innerHTML = '<i class="bi bi-moon-fill"></i>'
    } else {
        button.innerHTML = '<i class="bi bi-brightness-high-fill"></i>'
    }
}

sobre.addEventListener('click', () => {
    titulo.classList.remove('animate__slideInLeft')
    paragrafo1.classList.remove('animate__fadeInDown')
    paragrafo2.classList.remove('animate__fadeInDown')
    paragrafo3.classList.remove('animate__fadeInDown')
    paragrafo4.classList.remove('animate__fadeInDown')
    cv.classList.remove('animate__bounceInLeft')
    void titulo.offsetWidth
    void paragrafo1.offsetWidth
    void paragrafo2.offsetWidth
    void paragrafo3.offsetWidth
    void paragrafo4.offsetWidth
    void cv.offsetWidth
    titulo.classList.add('animate__slideInLeft')
    paragrafo1.classList.add('animate__fadeInDown')
    paragrafo2.classList.add('animate__fadeInDown')
    paragrafo3.classList.add('animate__fadeInDown')
    paragrafo4.classList.add('animate__fadeInDown')
    cv.classList.add('animate__bounceInLeft')
})