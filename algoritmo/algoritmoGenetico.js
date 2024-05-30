// algoritmoGenetico.js

import { inicializarPoblacion, evaluarPoblacion, seleccionarIndividuos, cruzar, mutar, reemplazarPoblacion } from './poblacion.js';
import { actualizarGrafico } from '../componentes/grafico.js';
import {  actualizarTemporizador, detenerTemporizador } from '../componentes/temporizador.js';
import { dibujarFiguras } from '../componentes/lienzo.js'; // Agrega la importación de la función para dibujar las figuras

export function iniciarAlgoritmoGenetico() {
    // Leer los parámetros
    const generaciones = parseInt(document.getElementById('generaciones').value);
    const tamanoPoblacion = parseInt(document.getElementById('tamanoPoblacion').value);
    const tasaSeleccion = parseInt(document.getElementById('seleccion').value) / 100;
    const tasaMutacion = parseInt(document.getElementById('mutacion').value) / 100;
    const tasaCruce = parseInt(document.getElementById('cruce').value) / 100;

    if (tasaSeleccion + tasaMutacion + tasaCruce !== 1) {
        alert('Los porcentajes de selección, mutación y cruce deben sumar 100%.');
        return;
    }

    let poblacion = inicializarPoblacion(tamanoPoblacion);

    for (let generacion = 0; generacion < generaciones; generacion++) {
        evaluarPoblacion(poblacion);
        let seleccionados = seleccionarIndividuos(poblacion, tasaSeleccion);
        let descendencia = cruzar(seleccionados, tasaCruce);
        mutar(descendencia, tasaMutacion);
        poblacion = reemplazarPoblacion(poblacion, descendencia);

        actualizarGrafico(generacion, poblacion);
        actualizarTemporizador(generacion);

        dibujarFiguras(poblacion); // Dibuja las figuras en el lienzo genético
    }

    detenerTemporizador(); // Detiene el temporizador al finalizar el algoritmo
}
