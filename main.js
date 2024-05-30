import { inicializarLienzo } from './componentes/lienzo.js';
import { inicializarControles } from './componentes/controles.js';
import { inicializarTemporizador } from './componentes/temporizador.js';
import { inicializarGrafico } from './componentes/grafico.js';
import { iniciarAlgoritmoGenetico } from './algoritmo/algoritmoGenetico.js';


// Borrar esto al terminar
document.getElementById('generaciones').value = 1000;
document.getElementById('tamanoPoblacion').value = 150;
document.getElementById('seleccion').value = 70;
document.getElementById('mutacion').value = 10;
document.getElementById('cruce').value = 20;


document.addEventListener('DOMContentLoaded', () => {
    inicializarLienzo();
    inicializarControles();
    inicializarTemporizador();
    inicializarGrafico();
    document.getElementById('botonIniciar').addEventListener('click', iniciarAlgoritmoGenetico);
});


