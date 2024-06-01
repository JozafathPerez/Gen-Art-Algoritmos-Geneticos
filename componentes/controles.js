let file;
const dropArea = document.querySelector(".drop-area");
const input = dropArea.querySelector("#entradaImagen");

export function inicializarControles() {
    // Inicialización de los controles de entrada
    input.addEventListener('change', (e) => {
        file = e.target.files[0];
        cargarImagen(file);       
    });

    dropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        file = e.dataTransfer.files[0];
        cargarImagen(file);
    });
    
}

function cargarImagen(archivo) {
    //console.log("aa");
    //const archivo = evento.target.files[0];

    const lector = new FileReader();
    lector.onload = function(e) {
        const imagen = new Image();
        imagen.src = e.target.result;

        imagen.onload = function() {
            const lienzoImagen = document.getElementById('lienzoImagen');
            const lienzoGenetico = document.getElementById('lienzoGenetico');
            const contexto = lienzoImagen.getContext('2d');

            // Obtener el tamaño original de la imagen
            const anchoOriginal = imagen.naturalWidth;
            const altoOriginal = imagen.naturalHeight;

            // Establecer el tamaño máximo del lienzo
            const maxAncho = 500;
            const maxAlto = 500;

            // Calcular las dimensiones ajustadas respetando la proporción
            let nuevoAncho, nuevoAlto;
            if (anchoOriginal > altoOriginal) {
                nuevoAncho = maxAncho;
                nuevoAlto = (maxAncho / anchoOriginal) * altoOriginal;
            } else {
                nuevoAlto = maxAlto;
                nuevoAncho = (maxAlto / altoOriginal) * anchoOriginal;
            }

            lienzoImagen.width = nuevoAncho;
            lienzoImagen.height = nuevoAlto;
            
            lienzoGenetico.width = nuevoAncho;
            lienzoGenetico.height = nuevoAlto;
            
            // Dibujar la imagen en el lienzo con las nuevas dimensiones
            contexto.drawImage(imagen, 0, 0, nuevoAncho, nuevoAlto);

            lienzoImagen.style.visibility = "visible";

            console.log(lienzoImagen.style.visibility);
        }
    }
    lector.readAsDataURL(archivo);
}

