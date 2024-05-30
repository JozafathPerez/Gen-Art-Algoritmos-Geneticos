// Archivo poblacion.js

import { Individuo } from './individuo.js';

export class Poblacion {
    constructor(tamano) {
        this.individuos = [];
        for (let i = 0; i < tamano; i++) {
            this.individuos.push(Individuo.crearAleatorio());
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
                padre.color
            );
            descendencia.push(hijo);
        }
        return descendencia;
    }

    mutar(descendencia, tasaMutacion) {
        descendencia.forEach(individuo => {
            if (Math.random() < tasaMutacion) {
                individuo.tamano += Math.random() * 10 - 5; // Ejemplo de mutación del tamaño
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


