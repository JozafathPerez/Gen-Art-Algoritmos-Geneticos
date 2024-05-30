export function inicializarLienzo() {
    // Inicialización del lienzo para la imagen y el lienzo genético
    const lienzoImagen = document.getElementById('lienzoImagen');
    const lienzoGenetico = document.getElementById('lienzoGenetico');
    // Configuración de los lienzos, tamaño, contexto, etc.
}

// Importa el contexto del lienzo genético desde tu archivo HTML
const lienzoGenetico = document.getElementById('lienzoGenetico').getContext('2d');

// Función para dibujar las figuras en el lienzo genético
export function dibujarFiguras(individuos) {
    // Borra el contenido anterior del lienzo
    lienzoGenetico.clearRect(0, 0, lienzoGenetico.canvas.width, lienzoGenetico.canvas.height);

    // Itera sobre los individuos y dibuja sus figuras en el lienzo
    individuos.forEach(individuo => {
        // Lógica para dibujar las figuras según la información del individuo
        lienzoGenetico.beginPath();
        lienzoGenetico.arc(individuo.x, individuo.y, individuo.radio, 0, 2 * Math.PI);
        lienzoGenetico.fillStyle = individuo.color;
        lienzoGenetico.fill();
        lienzoGenetico.closePath();
    });
}
