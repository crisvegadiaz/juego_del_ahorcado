// DOM 
const body = document.querySelector('body'),
    inicio = document.querySelector('#inicio'),
    agregarPalabra = document.querySelector('#agregar_palabra'),
    juego = document.querySelector('#juego')

let nuevaPalabra,
    error = 0


function palabrasRandon() {
    let palabra = ['Python', 'Java', 'Javascrip', 'Html', 'Css']
    nuevaPalabra = palabra[Math.round(Math.random() * (palabra.length - 1))]
    return nuevaPalabra
}

function agregarListaOcuta(palabra) {
    let array = palabra.toLowerCase().split('')

    for (let i = 0; i < array.length; i++) {
        let lista = document.createElement('li'),
            emoji = document.createTextNode(`★`)
        lista.appendChild(emoji)
        lista.classList.add('carta_oculta')
        juego.children[0].children[1].appendChild(lista)
    }
}
function agregarListaFallos() {
    for (let i = 0; i < 10; i++) {
        let lista = document.createElement('li'),
            emoji = document.createTextNode(`☠️`)
        lista.appendChild(emoji)
        lista.classList.add('carta_oculta')
        juego.children[0].children[2].appendChild(lista)
    }
}

function teclado(e) {

    let listaAciertos = document.querySelectorAll('.aciertos li'),
        listaErrores = document.querySelectorAll('.errores li'),
        letra = e.key.toLowerCase(),
        array = nuevaPalabra.toLowerCase().split('')



    if (/^[a-z\u00f1]{1}$/.test(letra)) {

        for (let i = 0; i < array.length; i++) {
            if (array[i] === letra) {
                listaAciertos[i].textContent = letra
                listaAciertos[i].classList.remove('carta_oculta')
                listaAciertos[i].classList.add('letra')
            }
        }

        let represioRegular = new RegExp([letra], 'mi')

        if (!represioRegular.test(nuevaPalabra)) {
            if (error < 10) {
                listaErrores[error].textContent = letra
                listaErrores[error].classList.add('letra')
                listaErrores[error].classList.remove('carta_oculta')
                error++
                juego.children[0].children[0].children[1 + error].style.visibility = 'inherit'
            }
        }
    }

    if (error === 10) {
        body.removeEventListener('keydown', teclado)
        setTimeout(() => {
            alert('Perdiste')
        }, 1000)
    }

    let ganaste = []

    for (let i = 0; i < array.length; i++) {

        if (listaAciertos[i].textContent == array[i]) {
            ganaste.push(array[i])
        }
        console.log(ganaste)
    }
    if (ganaste.toString() == array.toString()) {
        body.removeEventListener('keydown', teclado)
        setTimeout(() => {
            alert('Ganaste')
        }, 1000)
    }

}

// botones
body.addEventListener('click', (e) => {
    // inicio
    if (e.target.classList.contains('inicio')) {
        agregarListaOcuta(palabrasRandon())
        agregarListaFallos()
        inicio.classList.add('ocultar');
        juego.classList.remove('ocultar');
    }
    if (e.target.classList.contains('agregar')) {
        inicio.classList.add('ocultar');
        agregarPalabra.classList.remove('ocultar');
    }

    // agregar palabra
    if (e.target.classList.contains('guardar')) {
        nuevaPalabra = agregarPalabra.children[0].value
        if (/\s/g.test(nuevaPalabra)) {
            alert('La palabra ingresada no debe contener espacios')
            agregarPalabra.children[0].value = ''
        } else {
            if (nuevaPalabra.length > 0) {
                agregarListaOcuta(nuevaPalabra)
                agregarListaFallos()
                agregarPalabra.children[0].value = ''
                agregarPalabra.classList.add('ocultar');
                juego.classList.remove('ocultar');
            } else {
                alert('No ingreso ninguna palabra')
            }
        }
    }
    if (e.target.classList.contains('cancelar')) {
        agregarPalabra.children[0].value = ''
        agregarPalabra.classList.add('ocultar');
        inicio.classList.remove('ocultar');
    }

    // juego
    if (e.target.classList.contains('desistir')) {
        let lista1 = document.querySelectorAll('.aciertos li'),
            lista2 = document.querySelectorAll('.errores li'),
            svg = document.querySelector('svg')

        for (let i = 0; i < lista1.length; i++) {
            lista1[i].remove()
        }
        for (let i = 0; i < lista2.length; i++) {
            lista2[i].remove()
        }
        for (let i = 0; i < svg.children.length; i++) {
            svg.children[i].style.visibility = 'collapse'
        }

        body.removeEventListener('keydown', teclado)
        inicio.classList.remove('ocultar');
        juego.classList.add('ocultar');
        acierto = 0
        error = 0
    }
    if (e.target.classList.contains('nuevo_juego')) {
        let lista1 = document.querySelectorAll('.aciertos li'),
            lista2 = document.querySelectorAll('.errores li'),
            svg = document.querySelector('svg')

        for (let i = 0; i < lista1.length; i++) {
            lista1[i].remove()
        }
        for (let i = 0; i < lista2.length; i++) {
            lista2[i].remove()
        }
        for (let i = 0; i < svg.children.length; i++) {
            svg.children[i].style.visibility = 'collapse'
        }

        acierto = 0
        error = 0
        agregarListaOcuta(palabrasRandon())
        agregarListaFallos()
        body.addEventListener('keydown', teclado)
    }

    if (
        e.target.classList.contains('inicio') ||
        e.target.classList.contains('guardar')
    ) {
        body.addEventListener('keydown', teclado)
    }
})




