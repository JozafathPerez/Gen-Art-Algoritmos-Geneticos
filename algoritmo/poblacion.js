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
            const padre = seleccionados[i % seleccionados.length];
            const madre = seleccionados[(i + 1) % seleccionados.length];
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
                individuo.color = ajustarColor(obtenerColorPromedio({ data: [parseInt(individuo.color.slice(1, 3), 16), parseInt(individuo.color.slice(3, 5), 16), parseInt(individuo.color.slice(5, 7), 16)] }));
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
    const r = Math.floor((parseInt(color1.slice(1, 3), 16) + parseInt(color2.slice(1, 3), 16)) / 2);
    const g = Math.floor((parseInt(color1.slice(3, 5), 16) + parseInt(color2.slice(3, 5), 16)) / 2);
    const b = Math.floor((parseInt(color1.slice(5, 7), 16) + parseInt(color2.slice(5, 7), 16)) / 2);
    return `rgb(${r}, ${g}, ${b})`;
}
