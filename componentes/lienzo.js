// Archivo de lienzo

export function inicializarLienzo() {
    const lienzoImagen = document.getElementById('lienzoImagen');
    const lienzoGenetico = document.getElementById('lienzoGenetico');
    const ctxImagen = lienzoImagen.getContext('2d');
    const ctxGenetico = lienzoGenetico.getContext('2d');

    // Agregar un event listener para cargar una imagen en el lienzo de imagen
    lienzoImagen.addEventListener('change', (event) => {
        const archivo = event.target.files[0];
        if (archivo) {
            const lector = new FileReader();
            lector.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    ctxImagen.clearRect(0, 0, lienzoImagen.width, lienzoImagen.height);
                    ctxImagen.drawImage(img, 0, 0, lienzoImagen.width, lienzoImagen.height);
                }
                img.src = e.target.result;
            }
            lector.readAsDataURL(archivo);
        }
    });

    // Agregar cualquier otra lógica necesaria para el lienzo genético aquí
}


export function obtenerImagenData() {
    const lienzoImagen = document.getElementById('lienzoImagen').getContext('2d');
    return lienzoImagen.getImageData(0, 0, lienzoImagen.canvas.width, lienzoImagen.canvas.height);
}

const lienzoGenetico = document.getElementById('lienzoGenetico').getContext('2d');

export function dibujarFiguras(individuos) {
    lienzoGenetico.clearRect(0, 0, lienzoGenetico.canvas.width, lienzoGenetico.canvas.height);

    individuos.forEach(individuo => {
        switch (individuo.tipo) {
            case 'circulo':
                dibujarCirculo(individuo);
                break;
            case 'triangulo':
                dibujarTriangulo(individuo);
                break;
            case 'cuadrado':
                dibujarCuadrado(individuo);
                break;
            default:
                console.log('Tipo de figura no reconocido:', individuo.tipo);
        }
    });
}

function dibujarCirculo(individuo) {
    lienzoGenetico.beginPath();
    lienzoGenetico.arc(individuo.x, individuo.y, individuo.tamano, 0, 2 * Math.PI);
    lienzoGenetico.fillStyle = individuo.color;
    lienzoGenetico.fill();
    lienzoGenetico.closePath();
}

function dibujarTriangulo(individuo) {
    lienzoGenetico.beginPath();
    lienzoGenetico.moveTo(individuo.x, individuo.y - individuo.tamano / Math.sqrt(3));
    lienzoGenetico.lineTo(individuo.x + individuo.tamano / 2, individuo.y + individuo.tamano / (2 * Math.sqrt(3)));
    lienzoGenetico.lineTo(individuo.x - individuo.tamano / 2, individuo.y + individuo.tamano / (2 * Math.sqrt(3)));
    lienzoGenetico.closePath();
    lienzoGenetico.fillStyle = individuo.color;
    lienzoGenetico.fill();
}

function dibujarCuadrado(individuo) {
    lienzoGenetico.fillStyle = individuo.color;
    lienzoGenetico.fillRect(individuo.x - individuo.tamano / 2, individuo.y - individuo.tamano / 2, individuo.tamano, individuo.tamano);
}
