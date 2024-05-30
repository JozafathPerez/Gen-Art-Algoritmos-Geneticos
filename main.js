import { inicializarLienzo } from './componentes/lienzo.js';
import { inicializarControles } from './componentes/controles.js';
import { inicializarTemporizador } from './componentes/temporizador.js';
import { inicializarGrafico } from './componentes/grafico.js';
import { iniciarAlgoritmoGenetico } from './algoritmo/algoritmoGenetico.js';


document.addEventListener('DOMContentLoaded', () => {
    inicializarLienzo();
    inicializarControles();
    inicializarTemporizador();
    inicializarGrafico();
    document.getElementById('botonIniciar').addEventListener('click', iniciarAlgoritmoGenetico);
});


