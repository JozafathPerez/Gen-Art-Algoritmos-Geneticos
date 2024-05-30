import { inicializarPoblacion, evaluarPoblacion, seleccionarIndividuos, cruzar, mutar, reemplazarPoblacion } from './poblacion.js';
import { actualizarGrafico } from '../componentes/grafico.js';
import { actualizarTemporizador, detenerTemporizador } from '../componentes/temporizador.js';

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
    }

    detenerTemporizador();
}
