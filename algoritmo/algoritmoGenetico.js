// Archivo algoritmoGenetico.js

import { Poblacion } from './poblacion.js';
import { actualizarGrafico } from '../componentes/grafico.js';
import { actualizarTemporizador, detenerTemporizador } from '../componentes/temporizador.js';
import { dibujarFiguras, obtenerImagenData } from '../componentes/lienzo.js';

export async function iniciarAlgoritmoGenetico() {
    const generaciones = parseInt(document.getElementById('generaciones').value);
    const tamanoPoblacion = parseInt(document.getElementById('tamanoPoblacion').value);
    const tasaSeleccion = parseInt(document.getElementById('seleccion').value) / 100;
    const tasaMutacion = parseInt(document.getElementById('mutacion').value) / 100;
    const tasaCruce = parseInt(document.getElementById('cruce').value) / 100;
    const lienzo = document.getElementById('lienzoImagen');
    const visibilidad = getComputedStyle(lienzo);
    
    if (visibilidad.visibility === 'hidden') {
        alert('Debes de cargar una imagen para la generación.');
        return;
    }

    if (!generaciones) {
        alert("Por favor, rellena el campo de 'Generaciones'.");
        return;
    }
    if (!tamanoPoblacion) {
        alert("Por favor, rellena ambos campos de 'Tamaño de la población'.");
        return;
    }

    if (tasaSeleccion + tasaMutacion + tasaCruce !== 1) {
        alert('Los porcentajes de selección, mutación y cruce deben sumar 100%.');
        return;
    }

    const imagenData = obtenerImagenData();

    const poblacion = new Poblacion(tamanoPoblacion, imagenData);

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

        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    detenerTemporizador();
}