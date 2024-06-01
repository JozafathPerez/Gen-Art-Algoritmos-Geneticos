// Archivo individuo.js

export class Individuo {
    constructor(tipo, x, y, tamano, color) {
        this.tipo = tipo;
        this.x = x;
        this.y = y;
        this.tamano = tamano; // Usar 'tamano' en lugar de 'radio' o 'lado'
        this.color = color;
        this.fitness = 0;
    }

    calcularFitness(imagenData) {
        // Crear un lienzo temporal
        const lienzoGenetico = document.createElement('canvas').getContext('2d');
        lienzoGenetico.canvas.width = imagenData.width;   //Tener mismo ancho que la imagen original
        lienzoGenetico.canvas.height = imagenData.height; //Tener misma altuta que la imagen original
        lienzoGenetico.clearRect(0, 0, lienzoGenetico.canvas.width, lienzoGenetico.canvas.height);

        // Dibujar la figura del individuo en el lienzo temporal
        switch (this.tipo) {
            case 'circulo':
                lienzoGenetico.beginPath();
                lienzoGenetico.arc(this.x, this.y, this.tamano, 0, 2 * Math.PI);
                lienzoGenetico.fillStyle = this.color;
                lienzoGenetico.fill();
                lienzoGenetico.closePath();
                break;
            case 'triangulo':
                lienzoGenetico.beginPath();
                lienzoGenetico.moveTo(this.x, this.y - this.tamano / Math.sqrt(3));
                lienzoGenetico.lineTo(this.x + this.tamano / 2, this.y + this.tamano / (2 * Math.sqrt(3)));
                lienzoGenetico.lineTo(this.x - this.tamano / 2, this.y + this.tamano / (2 * Math.sqrt(3)));
                lienzoGenetico.closePath();
                lienzoGenetico.fillStyle = this.color;
                lienzoGenetico.fill();
                break;
            case 'cuadrado':
                lienzoGenetico.fillStyle = this.color;
                lienzoGenetico.fillRect(this.x - this.tamano / 2, this.y - this.tamano / 2, this.tamano, this.tamano);
                break;
            default:
                console.log('Tipo de figura no reconocido:', this.tipo);
        }

        // Obtener los datos de píxeles del individuo
        const individuoData = lienzoGenetico.getImageData(0, 0, lienzoGenetico.canvas.width, lienzoGenetico.canvas.height).data;

        // Comparar con los datos de la imagen de referencia
        let diff = 0;
        for (let i = 0; i < imagenData.data.length; i += 4) {
            diff += Math.abs(imagenData.data[i] - individuoData[i]);       // R
            diff += Math.abs(imagenData.data[i + 1] - individuoData[i + 1]); // G
            diff += Math.abs(imagenData.data[i + 2] - individuoData[i + 2]); // B
            /*console.log("R1",imagenData.data[i]);
            console.log("G1",imagenData.data[i+1]);
            console.log("B1",imagenData.data[i+2]);

            console.log("R2",individuoData[i]);
            console.log("G2",individuoData[i+1]);
            console.log("B2",individuoData[i+2]);

            console.log(diff);*/
        }

        this.fitness = 1 /(diff + 1);

        // Para evitar fitness negativos
        if (this.fitness < 0) {
            this.fitness = 0;
        }
    }

    static crearAleatorio() {
        const tiposFiguras = ['circulo', 'triangulo', 'cuadrado'];
        const tipoAleatorio = tiposFiguras[Math.floor(Math.random() * tiposFiguras.length)];
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const tamano = Math.random() * 50 + 20;
        const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return new Individuo(tipoAleatorio, x, y, tamano, color);
    }
}

