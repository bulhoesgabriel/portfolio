const body = document.body
const button = document.getElementById('button')
const sobre = document.getElementById('sobre')
const titulo = document.getElementById('titulo')
const paragrafo1 = document.getElementById('paragrafo1')
const paragrafo2 = document.getElementById('paragrafo2')
const paragrafo3 = document.getElementById('paragrafo3')
const paragrafo4 = document.getElementById('paragrafo4')
const cv = document.getElementById('cv')
const nav = document.getElementById('nav')
const tooltips = document.querySelectorAll('[data-tooltip]')

function toggleLightMode() {
    body.classList.toggle('light-mode')
    if (body.classList.contains('light-mode')) {
        button.innerHTML = '<i class="bi bi-moon-fill"></i>'
        nav.classList.remove('navbar-dark')
    } else {
        button.innerHTML = '<i class="bi bi-brightness-high-fill"></i>'
        nav.classList.add('navbar-dark')
    }
}

sobre.addEventListener('click', () => {
    titulo.classList.remove('animate__bounceInLeft')
    paragrafo1.classList.remove('animate__fadeInDown')
    paragrafo2.classList.remove('animate__fadeInDown')
    paragrafo3.classList.remove('animate__fadeInDown')
    paragrafo4.classList.remove('animate__fadeInDown')
    cv.classList.remove('animate__bounceInRight')
    void titulo.offsetWidth
    void paragrafo1.offsetWidth
    void paragrafo2.offsetWidth
    void paragrafo3.offsetWidth
    void paragrafo4.offsetWidth
    void cv.offsetWidth
    titulo.classList.add('animate__bounceInLeft')
    paragrafo1.classList.add('animate__fadeInDown')
    paragrafo2.classList.add('animate__fadeInDown')
    paragrafo3.classList.add('animate__fadeInDown')
    paragrafo4.classList.add('animate__fadeInDown')
    cv.classList.add('animate__bounceInRight')
})

tooltips.forEach((item) => {
    item.addEventListener('mouseover', onMouseOver)
})

function onMouseOver(e) {
    const tooltipBox = criarTooltipBox(this)
    onMouseLeave.tooltipBox = tooltipBox
    onMouseLeave.element = this
    this.addEventListener('mouseleave', onMouseLeave)
    onMouseMove.tooltipBox = tooltipBox
    this.addEventListener('mousemove', onMouseMove)
}

const onMouseLeave = {
    handleEvent() {
        this.tooltipBox.remove()
        this.element.removeEventListener('mouseleave', onMouseLeave) 
        this.element.removeEventListener('mousemove', onMouseMove) 
    }
}

const onMouseMove = {
    handleEvent(e) {
        this.tooltipBox.style.top = e.pageY + 20 + 'px'
        this.tooltipBox.style.left = e.pageX + 20 + 'px'
    }
}

function criarTooltipBox(element) {
    const tooltipBox = document.createElement('div')
    const text = element.getAttribute('aria-label')
    tooltipBox.classList.add('skill')
    tooltipBox.innerText = text
    document.body.appendChild(tooltipBox)
    return tooltipBox
}