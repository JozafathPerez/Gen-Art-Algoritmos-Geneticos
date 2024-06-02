export class Individuo {
    constructor(tipo, x, y, tamano, color) {
        this.tipo = tipo;
        this.x = x;
        this.y = y;
        this.tamano = tamano;
        this.color = color;
        this.fitness = 0;
    } 

    calcularFitness(imagenData) {
        const lienzoGenetico = document.createElement('canvas').getContext('2d');
        lienzoGenetico.canvas.width = imagenData.width;
        lienzoGenetico.canvas.height = imagenData.height;
        lienzoGenetico.clearRect(0, 0, lienzoGenetico.canvas.width, lienzoGenetico.canvas.height);

        // Dibujar la figura del individuo en el lienzo temporal
        lienzoGenetico.fillStyle = this.color;
        switch (this.tipo) {
            case 'circulo':
                lienzoGenetico.beginPath();
                lienzoGenetico.arc(this.x, this.y, this.tamano, 0, 2 * Math.PI);
                lienzoGenetico.fill();
                lienzoGenetico.closePath();
                break;
            case 'triangulo':
                lienzoGenetico.beginPath();
                lienzoGenetico.moveTo(this.x, this.y - this.tamano / Math.sqrt(3));
                lienzoGenetico.lineTo(this.x + this.tamano / 2, this.y + this.tamano / (2 * Math.sqrt(3)));
                lienzoGenetico.lineTo(this.x - this.tamano / 2, this.y + this.tamano / (2 * Math.sqrt(3)));
                lienzoGenetico.closePath();
                lienzoGenetico.fill();
                break;
            case 'cuadrado':
                lienzoGenetico.fillRect(this.x - this.tamano / 2, this.y - this.tamano / 2, this.tamano, this.tamano);
                break;
            default:
                console.log('Tipo de figura no reconocido:', this.tipo);
        }

        const individuoData = lienzoGenetico.getImageData(0, 0, lienzoGenetico.canvas.width, lienzoGenetico.canvas.height).data;
        let diff = 0;
        for (let i = 0; i < imagenData.data.length; i += 4) {
            diff += Math.abs(imagenData.data[i] - individuoData[i]);       // R
            diff += Math.abs(imagenData.data[i + 1] - individuoData[i + 1]); // G
            diff += Math.abs(imagenData.data[i + 2] - individuoData[i + 2]); // B
        }

        const maxDiff = 255 * imagenData.data.length / 4 * 3;
        const normalizedDiff = diff / maxDiff;
        this.fitness = 1 / (normalizedDiff + 1);
    }

    static crearAleatorio(imagenData) {
        const tiposFiguras = ['circulo', 'triangulo', 'cuadrado'];
        const tipoAleatorio = tiposFiguras[Math.floor(Math.random() * tiposFiguras.length)];
        const x = Math.random() * imagenData.width;
        const y = Math.random() * imagenData.height;
        const tamano = Math.random() * 50 + 20;

        // Obtener color promedio de la imagen para iniciar los individuos con colores más cercanos
        const promedioColor = obtenerColorPromedio(imagenData);
        const color = ajustarColor(promedioColor);

        return new Individuo(tipoAleatorio, x, y, tamano, color);
    }
}

export function obtenerColorPromedio(imagenData) {
    let totalR = 0, totalG = 0, totalB = 0, totalPixels = imagenData.data.length / 4;
    for (let i = 0; i < imagenData.data.length; i += 4) {
        totalR += imagenData.data[i];
        totalG += imagenData.data[i + 1];
        totalB += imagenData.data[i + 2];
    }

    return {
        r: Math.floor(totalR / totalPixels),
        g: Math.floor(totalG / totalPixels),
        b: Math.floor(totalB / totalPixels)
    };
}

export function ajustarColor(colorPromedio) {
    const r = Math.min(255, Math.max(0, colorPromedio.r + Math.floor(Math.random() * 60 - 30)));
    const g = Math.min(255, Math.max(0, colorPromedio.g + Math.floor(Math.random() * 60 - 30)));
    const b = Math.min(255, Math.max(0, colorPromedio.b + Math.floor(Math.random() * 60 - 30)));

    return `rgb(${r}, ${g}, ${b})`;
}
