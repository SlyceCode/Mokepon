const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
sectionReiniciar.style.display = 'none'

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

let mokepones = []
let botones = []
let ataqueJugador = []
let inputRusty 
let inputSurf 
let inputPyro
let ataqueEnemigo = []
let opcionDeMokepones
let mascotaJugador
let ataquesMokepon
let botonTierra
let botonFuego 
let botonAgua
let ataquesMokeponEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, foto, vidas) {
        this.nombre = nombre
        this.foto = foto
        this.vidas = vidas
        this.ataques = []
    }
}

let Pyro = new Mokepon('Pyro', './assets/pyro.png', 5)
let Surf = new Mokepon('Surf', './assets/surf.png', 5)
let Rusty = new Mokepon('Rusty', './assets/rusty.png', 5)

Pyro.ataques.push(
    {nombre: "🔥", id:'boton-fuego'},
    {nombre: "🔥", id:'boton-fuego'},
    {nombre: "🔥", id:'boton-fuego'},
    {nombre: "💧", id:'boton-agua'},
    {nombre: "🌱", id:'boton-tierra'},
)

Surf.ataques.push(
    {nombre: "💧", id:'boton-agua'},
    {nombre: "💧", id:'boton-agua'},
    {nombre: "💧", id:'boton-agua'},
    {nombre: "🔥", id:'boton-fuego'},
    {nombre: "🌱", id:'boton-tierra'},
)

Rusty.ataques.push(
    {nombre: "🌱", id:'boton-tierra'},
    {nombre: "🌱", id:'boton-tierra'},
    {nombre: "🌱", id:'boton-tierra'},
    {nombre: "🔥", id:'boton-fuego'},
    {nombre: "💧", id:'boton-agua'},
)

mokepones.push(Rusty,Surf,Pyro)

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'

    mokepones.forEach((mokepon) =>{
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputRusty = document.getElementById('Rusty')
        inputSurf = document.getElementById('Surf')
        inputPyro = document.getElementById('Pyro')
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'
    
    if (inputRusty.checked) {
        spanMascotaJugador.innerHTML = inputRusty.id
        mascotaJugador = inputRusty.id
    } else if (inputSurf.checked) {
        spanMascotaJugador.innerHTML = inputSurf.id
        mascotaJugador = inputSurf.id
    } else if (inputPyro.checked) {
        spanMascotaJugador.innerHTML = inputPyro.id
        mascotaJugador = inputPyro.id
    } else {
        alert('Selecciona una mascota')
    }
    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

     botonFuego = document.getElementById('boton-fuego')
     botonAgua = document.getElementById('boton-agua')
     botonTierra = document.getElementById('boton-tierra')
     botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('fuego')
                console.log(ataqueJugador)
                boton.disabled = true
                boton.style.background = "#6A6A6A"
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('agua')
                console.log(ataqueJugador)
                boton.disabled = true
                boton.style.background = "#6A6A6A"
            } else {
                ataqueJugador.push("tierra")
                console.log(ataqueJugador)
                boton.disabled = true
                boton.style.background = "#6A6A6A"
            }
            ataqueAleatorioEnemigo()
        })
    })
}


function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length -1)
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('fuego')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('agua')
    } else {
        ataqueEnemigo.push('tierra')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] == ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'fuego' && ataqueEnemigo[index] === 'tierra') {
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'agua' && ataqueEnemigo[index] == 'fuego') {
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'tierra' && ataqueEnemigo [index] == 'agua') {
            indexAmbosOponentes(index, index)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(index, index)
            crearMensaje('PERDISTE')
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un Empate. 🤝")
    } else if (vidasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! 🏆")
    } else {
        crearMensajeFinal('Lo siento, perdiste. 🫠')
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)
