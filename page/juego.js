// DOM Elements
const body = document.body;
const inicio = document.getElementById("inicio");
const agregarPalabra = document.getElementById("agregar_palabra");
const juego = document.getElementById("juego");

let palabraActual = "";
let errores = 0;

// Utilidades
function obtenerPalabraAleatoria() {
  const palabras = ["Python", "Java", "Javascript", "Html", "Css"];
  return palabras[Math.floor(Math.random() * palabras.length)];
}

function crearListaOculta(palabra) {
  const lista = juego.querySelector(".aciertos");
  lista.innerHTML = "";
  palabra.toLowerCase().split("").forEach(() => {
    const li = document.createElement("li");
    li.textContent = "★";
    li.classList.add("carta_oculta");
    lista.appendChild(li);
  });
}

function crearListaErrores() {
  const lista = juego.querySelector(".errores");
  lista.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const li = document.createElement("li");
    li.textContent = "☠️";
    li.classList.add("carta_oculta");
    lista.appendChild(li);
  }
}

function mostrarMensaje(mensaje) {
  setTimeout(() => alert(mensaje), 1000);
}

function limpiarJuego() {
  juego.querySelector(".aciertos").innerHTML = "";
  juego.querySelector(".errores").innerHTML = "";
  const svg = document.querySelector("svg");
  if (svg) {
    Array.from(svg.children).forEach(el => el.style.visibility = "collapse");
  }
  errores = 0;
  body.removeEventListener("keydown", manejarTeclado);
}

// Lógica del juego
function manejarTeclado(e) {
  const letra = e.key.toLowerCase();
  if (!/^[a-zñ]$/.test(letra)) return;

  const aciertos = juego.querySelectorAll(".aciertos li");
  const erroresLista = juego.querySelectorAll(".errores li");
  const letrasPalabra = palabraActual.toLowerCase().split("");
  let acierto = false;

  letrasPalabra.forEach((l, i) => {
    if (l === letra && aciertos[i].textContent !== letra) {
      aciertos[i].textContent = letra;
      aciertos[i].classList.remove("carta_oculta");
      aciertos[i].classList.add("letra");
      acierto = true;
    }
  });

  if (!acierto && !Array.from(erroresLista).some(li => li.textContent === letra)) {
    if (errores < 10) {
      erroresLista[errores].textContent = letra;
      erroresLista[errores].classList.add("letra");
      erroresLista[errores].classList.remove("carta_oculta");
      errores++;
      const svg = document.querySelector("svg");
      if (svg && svg.children[errores]) {
        svg.children[errores].style.visibility = "inherit";
      }
    }
  }

  if (errores === 10) {
    mostrarMensaje("Perdiste");
    body.removeEventListener("keydown", manejarTeclado);
  }

  const palabraAdivinada = letrasPalabra.every((l, i) => aciertos[i].textContent === l);
  if (palabraAdivinada) {
    mostrarMensaje("Ganaste");
    body.removeEventListener("keydown", manejarTeclado);
  }
}

// Eventos de botones
body.addEventListener("click", (e) => {
  if (e.target.classList.contains("inicio")) {
    palabraActual = obtenerPalabraAleatoria();
    crearListaOculta(palabraActual);
    crearListaErrores();
    inicio.classList.add("ocultar");
    juego.classList.remove("ocultar");
    body.addEventListener("keydown", manejarTeclado);
  }

  if (e.target.classList.contains("agregar")) {
    inicio.classList.add("ocultar");
    agregarPalabra.classList.remove("ocultar");
  }

  if (e.target.classList.contains("guardar")) {
    const input = agregarPalabra.querySelector("input");
    const nueva = input.value.trim();
    if (/\s/.test(nueva)) {
      alert("La palabra ingresada no debe contener espacios");
      input.value = "";
    } else if (nueva.length > 0) {
      palabraActual = nueva;
      crearListaOculta(palabraActual);
      crearListaErrores();
      input.value = "";
      agregarPalabra.classList.add("ocultar");
      juego.classList.remove("ocultar");
      body.addEventListener("keydown", manejarTeclado);
    } else {
      alert("No ingresó ninguna palabra");
    }
  }

  if (e.target.classList.contains("cancelar")) {
    agregarPalabra.querySelector("input").value = "";
    agregarPalabra.classList.add("ocultar");
    inicio.classList.remove("ocultar");
  }

  if (e.target.classList.contains("desistir")) {
    limpiarJuego();
    inicio.classList.remove("ocultar");
    juego.classList.add("ocultar");
  }

  if (e.target.classList.contains("nuevo_juego")) {
    limpiarJuego();
    palabraActual = obtenerPalabraAleatoria();
    crearListaOculta(palabraActual);
    crearListaErrores();
    juego.classList.remove("ocultar");
    body.addEventListener("keydown", manejarTeclado);
  }
});
