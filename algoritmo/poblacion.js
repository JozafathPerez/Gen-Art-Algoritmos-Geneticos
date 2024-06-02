import { Individuo, obtenerColorPromedio, ajustarColor} from './individuo.js';

export class Poblacion {
    constructor(tamano, imagenData) {
        this.individuos = [];
        for (let i = 0; i < tamano; i++) {
            this.individuos.push(Individuo.crearAleatorio(imagenData));
        }
    }

    evaluar(imagenData) {
        this.individuos.forEach(individuo => individuo.calcularFitness(imagenData));
    }

    seleccionar(tasaSeleccion) {
        this.individuos.sort((a, b) => b.fitness - a.fitness);
        const cantidadSeleccion = Math.round(this.individuos.length * tasaSeleccion);
        return this.individuos.slice(0, cantidadSeleccion);
    }
    
    cruzar(seleccionados, tasaCruce) {
        const descendencia = [];
        const cantidadCruce = Math.round(seleccionados.length * tasaCruce);
        for (let i = 0; i < cantidadCruce; i++) {
            const padre = seleccionados[Math.floor(Math.random() * seleccionados.length)];
            const madre = seleccionados[Math.floor(Math.random() * seleccionados.length)];
            const hijo = new Individuo(
                padre.tipo,
                (padre.x + madre.x) / 2,
                (padre.y + madre.y) / 2,
                (padre.tamano + madre.tamano) / 2,
                mezclarColores(padre.color, madre.color)
            );
            descendencia.push(hijo);
        }
        return descendencia;
    }
 
    mutar(descendencia, tasaMutacion) {
        descendencia.forEach(individuo => {
            if (Math.random() < tasaMutacion) {
                individuo.tamano += Math.random() * 10 - 5;
                const colorPromedio = obtenerColorPromedio({
                    data: [
                        parseInt(individuo.color.match(/\d+/g)[0], 10), 
                        parseInt(individuo.color.match(/\d+/g)[1], 10), 
                        parseInt(individuo.color.match(/\d+/g)[2], 10)
                    ]
                });
                individuo.color = ajustarColor(colorPromedio);
            }
        });
    }

    reemplazar(descendencia) {
        this.individuos.sort((a, b) => b.fitness - a.fitness);
        const cantidadReemplazo = Math.min(this.individuos.length, descendencia.length);
        for (let i = 0; i < cantidadReemplazo; i++) {
            this.individuos[i] = descendencia[i];
        }
    }

    calcularFitnessPromedio() {
        let sumaFitness = 0;
        this.individuos.forEach(individuo => {
            sumaFitness += individuo.fitness;
        });
        return sumaFitness / this.individuos.length;
    }

    calcularMejorFitness() {
        let mejorFitness = 0;
        this.individuos.forEach(individuo => {
            if (individuo.fitness > mejorFitness) {
                mejorFitness = individuo.fitness;
            }
        });
        return mejorFitness;
    }
}

function mezclarColores(color1, color2) {
    const color1Values = color1.match(/\d+/g).map(Number);
    const color2Values = color2.match(/\d+/g).map(Number);

    const r = Math.floor((color1Values[0] + color2Values[0]) / 2);
    const g = Math.floor((color1Values[1] + color2Values[1]) / 2);
    const b = Math.floor((color1Values[2] + color2Values[2]) / 2);

    return `rgb(${r}, ${g}, ${b})`;
}