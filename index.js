const tituloCancion = document.querySelector('.Reproductor h1');
const nombreArtista = document.querySelector('.Reproductor p');

const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');

const iconControl = document.getElementById('iconControl');
const botonReproducirPausar = document.querySelector('.controles button.reproducir-pausar');

const botonAtras = document.querySelector('.controles button.atras');
const botonAdelante = document.querySelector('.controles button.adelante');

const canciones = [
    { titulo: 'Qué bonito fue', nombre: 'El David', fuente: 'Musica/Qué bonito fue.mp3' },
    { titulo: 'Una Mañana', nombre: 'José José', fuente: 'Musica/Una Mañana.mp3' },
    { titulo: 'I Love You So', nombre: 'The Walters', fuente: 'Musica/I Love You So.mp3' },
    { titulo: 'En Otra Vida', nombre: 'Yami Safdie; Lasso', fuente: 'Musica/En Otra Vida.mp3' },
    { titulo: 'R U Mine?', nombre: 'Arctic Monkeys', fuente: 'Musica/R U Mine.mp3' },
    { titulo: 'Es Por Ti', nombre: 'Juanes', fuente: 'Musica/Es Por Ti.mp3' },
    { titulo: 'Shut up My Moms Calling', nombre: 'Hotel Ugly', fuente: 'Musica/Shut up My Moms Calling.mp3' },
    { titulo: 'Snowman', nombre: 'Sia', fuente: 'Musica/Snowman.mp3' },
    { titulo: 'Eres', nombre: 'Café Tacvba', fuente: 'Musica/Eres.mp3' },
    { titulo: 'Riptide', nombre: 'Vance Joy', fuente: 'Musica/Riptide.mp3' },
    { titulo: 'Mr. Loverman', nombre: 'Ricky Montgomery', fuente: 'Musica/Mr. Loverman.mp3' },
    { titulo: 'I Ran (So Far Away)', nombre: 'A Flock Of Seagulls', fuente: 'Musica/I Ran (So Far Away).mp3' },
    { titulo: 'Nice To Meet You', nombre: 'Myles Smith', fuente: 'Musica/Nice To Meet You.mp3' },
    { titulo: 'Out of My League', nombre: 'Fitz & The Tantrums', fuente: 'Musica/Out of My League.mp3' },
    { titulo: 'Valentine', nombre: 'Laufey', fuente: 'Musica/Valentine.mp3' },
    { titulo: 'I Like Me Better', nombre: 'Lauv', fuente: 'Musica/I Like Me Better.mp3' },
    { titulo: 'Aint No Mountain High Enough', nombre: 'Marvin Gaye; Tammi Terrell', fuente: 'Musica/Aint No Mountain High Enough.mp3' }
];

let indiceCancionActual = 0;

function actualizarInfoCancion() {
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    nombreArtista.textContent = canciones[indiceCancionActual].nombre;
    cancion.src = canciones[indiceCancionActual].fuente;
    cancion.addEventListener('loadeddata', function () {
        cancion.play();
    });
};

cancion.addEventListener('loadedmetadata', function () {
    progreso.max = cancion.duration;
    progreso.value = cancion.currentTime;
});

botonReproducirPausar.addEventListener('click', reproducirPausar);

function reproducirPausar() {
    if (cancion.paused) {
        reproducirCancion();
    } else {
        pausarCancion();
    }
};

function reproducirCancion() {
    cancion.play();
    iconControl.classList.remove('bi-play-fill');
}

function pausarCancion() {
    cancion.pause();
    iconControl.classList.remove('bi-pause-fill');
}

cancion.addEventListener('timeupdate', function () {
    progreso.value = cancion.currentTime;
});

progreso.addEventListener('input', function () {
    cancion.currentTime = progreso.value;
});

progreso.addEventListener('change', function () {
    reproducirCancion();
});

cancion.addEventListener('ended', function () {
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

botonAdelante.addEventListener('click', function () {
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

botonAtras.addEventListener('click', function () {
    indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

actualizarInfoCancion();