// Archivo algoritmoGenetico.js

import { Poblacion } from './poblacion.js';
import { actualizarGrafico } from '../componentes/grafico.js';
import { actualizarTemporizador, detenerTemporizador } from '../componentes/temporizador.js';
import { dibujarFiguras, obtenerImagenData } from '../componentes/lienzo.js';

export function iniciarAlgoritmoGenetico() {
    const generaciones = parseInt(document.getElementById('generaciones').value);
    const tamanoPoblacion = parseInt(document.getElementById('tamanoPoblacion').value);
    const tasaSeleccion = parseInt(document.getElementById('seleccion').value) / 100;
    const tasaMutacion = parseInt(document.getElementById('mutacion').value) / 100;
    const tasaCruce = parseInt(document.getElementById('cruce').value) / 100;

    if (tasaSeleccion + tasaMutacion + tasaCruce !== 1) {
        alert('Los porcentajes de selección, mutación y cruce deben sumar 100%.');
        return;
    }

    const lienzoImagen = document.getElementById('lienzoImagen').getContext('2d');
    const imagenData = lienzoImagen.getImageData(0, 0, lienzoImagen.canvas.width, lienzoImagen.canvas.height);

    const poblacion = new Poblacion(tamanoPoblacion);

    for (let generacion = 0; generacion < generaciones; generacion++) {
        console.log(generacion);
        poblacion.evaluar(imagenData);
        const seleccionados = poblacion.seleccionar(tasaSeleccion);
        const descendencia = poblacion.cruzar(seleccionados, tasaCruce);
        poblacion.mutar(descendencia, tasaMutacion);
        poblacion.reemplazar(descendencia);

        const fitnessPromedio = poblacion.calcularFitnessPromedio();
        const mejorFitness = poblacion.calcularMejorFitness();

        actualizarGrafico(generacion, fitnessPromedio, mejorFitness);
        actualizarTemporizador(generacion);

        dibujarFiguras(poblacion.individuos);
    }

    detenerTemporizador();
}