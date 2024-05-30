export function inicializarControles() {
    // Inicialización de los controles de entrada
    const entradaImagen = document.getElementById('entradaImagen');
    entradaImagen.addEventListener('change', cargarImagen);
}

function cargarImagen(evento) {
    const archivo = evento.target.files[0];
    const lector = new FileReader();
    lector.onload = function(e) {
        const imagen = new Image();
        imagen.src = e.target.result;
        imagen.onload = function() {
            const lienzoImagen = document.getElementById('lienzoImagen');
            const contexto = lienzoImagen.getContext('2d');
            contexto.drawImage(imagen, 0, 0, lienzoImagen.width, lienzoImagen.height);
        }
    }
    lector.readAsDataURL(archivo);
}
