// lienzo.js

export function inicializarLienzo() {
    // Inicialización del lienzo para la imagen y el lienzo genético
    const lienzoImagen = document.getElementById('lienzoImagen');
    const lienzoGenetico = document.getElementById('lienzoGenetico');
    // Configuración de los lienzos, tamaño, contexto, etc.
}

// Importa el contexto del lienzo genético desde tu archivo HTML
const lienzoGenetico = document.getElementById('lienzoGenetico').getContext('2d');

// Función para dibujar las figuras en el lienzo genético
// lienzo.js

// Función para dibujar las figuras en el lienzo genético
export function dibujarFiguras(individuos) {
    // Borra el contenido anterior del lienzo
    lienzoGenetico.clearRect(0, 0, lienzoGenetico.canvas.width, lienzoGenetico.canvas.height);

    // Itera sobre los individuos y dibuja sus figuras en el lienzo
    individuos.forEach(individuo => {
        // Comprueba el tipo de figura del individuo y dibújala en consecuencia
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

// Función auxiliar para dibujar un círculo
function dibujarCirculo(individuo) {
    lienzoGenetico.beginPath();
    lienzoGenetico.arc(individuo.x, individuo.y, individuo.radio, 0, 2 * Math.PI);
    lienzoGenetico.fillStyle = individuo.color;
    lienzoGenetico.fill();
    lienzoGenetico.closePath();
}

// Función auxiliar para dibujar un triángulo
function dibujarTriangulo(individuo) {
    lienzoGenetico.beginPath();
    lienzoGenetico.moveTo(individuo.x, individuo.y - individuo.lado / Math.sqrt(3));
    lienzoGenetico.lineTo(individuo.x + individuo.lado / 2, individuo.y + individuo.lado / (2 * Math.sqrt(3)));
    lienzoGenetico.lineTo(individuo.x - individuo.lado / 2, individuo.y + individuo.lado / (2 * Math.sqrt(3)));
    lienzoGenetico.closePath();
    lienzoGenetico.fillStyle = individuo.color;
    lienzoGenetico.fill();
}

// Función auxiliar para dibujar un cuadrado
function dibujarCuadrado(individuo) {
    lienzoGenetico.fillStyle = individuo.color;
    lienzoGenetico.fillRect(individuo.x - individuo.lado / 2, individuo.y - individuo.lado / 2, individuo.lado, individuo.lado);
}

