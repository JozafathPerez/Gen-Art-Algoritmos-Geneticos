// individuo.js

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
            const rDiff = imagenData.data[i] - individuoData[i];
            const gDiff = imagenData.data[i + 1] - individuoData[i + 1];
            const bDiff = imagenData.data[i + 2] - individuoData[i + 2];
            diff += Math.abs(rDiff) + Math.abs(gDiff) + Math.abs(bDiff);
        }

        const maxDiff = 255 * 3 * (imagenData.data.length / 4);
        const normalizedDiff = diff / maxDiff;
        this.fitness = 1 - normalizedDiff;
    }

    static crearAleatorio(imagenData) {
        const tiposFiguras = ['circulo', 'triangulo', 'cuadrado'];
        const tipoAleatorio = tiposFiguras[Math.floor(Math.random() * tiposFiguras.length)];
        const x = Math.random() * imagenData.width;
        const y = Math.random() * imagenData.height;
        const tamano = Math.random() * 50 + 20;

        const color = obtenerColorAleatorioDeImagen(imagenData);

        return new Individuo(tipoAleatorio, x, y, tamano, color);
    }
}

function obtenerColorAleatorioDeImagen(imagenData) {
    const index = Math.floor(Math.random() * (imagenData.data.length / 4)) * 4;
    const r = imagenData.data[index];
    const g = imagenData.data[index + 1];
    const b = imagenData.data[index + 2];
    return `rgb(${r}, ${g}, ${b})`;
}

export function obtenerColorPromedio(imagenData, x, y, tamano) {
    const startX = Math.max(0, Math.floor(x - tamano / 2));
    const startY = Math.max(0, Math.floor(y - tamano / 2));
    const endX = Math.min(imagenData.width, Math.floor(x + tamano / 2));
    const endY = Math.min(imagenData.height, Math.floor(y + tamano / 2));
    let totalR = 0, totalG = 0, totalB = 0, count = 0;

    for (let i = startX; i < endX; i++) {
        for (let j = startY; j < endY; j++) {
            const index = (i + j * imagenData.width) * 4;
            totalR += imagenData.data[index];
            totalG += imagenData.data[index + 1];
            totalB += imagenData.data[index + 2];
            count++;
        }
    }

    return [totalR / count, totalG / count, totalB / count];
}

export function ajustarColor(colorPromedio) {
    const r = Math.min(255, Math.max(0, colorPromedio.r + Math.floor(Math.random() * 40 - 20)));
    const g = Math.min(255, Math.max(0, colorPromedio.g + Math.floor(Math.random() * 40 - 20)));
    const b = Math.min(255, Math.max(0, colorPromedio.b + Math.floor(Math.random() * 40 - 20)));
    return `rgb(${r}, ${g}, ${b})`;
}
