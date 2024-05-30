// poblacion.js

// Función para inicializar la población con individuos aleatorios
export function inicializarPoblacion(tamanoPoblacion) {
    let poblacion = [];
    for (let i = 0; i < tamanoPoblacion; i++) {
        poblacion.push(crearIndividuoAleatorio());
    }
    return poblacion;
}

// Función para evaluar la población utilizando la función de fitness
export function evaluarPoblacion(poblacion) {
    poblacion.forEach(individuo => {
        individuo.fitness = calcularFitness(individuo);
    });
}

// Función para seleccionar individuos para la reproducción basada en su fitness
export function seleccionarIndividuos(poblacion, tasaSeleccion) {
    let seleccionados = [];
    poblacion.sort((a, b) => b.fitness - a.fitness); // Ordena de mayor a menor fitness
    const cantidadSeleccion = Math.round(poblacion.length * tasaSeleccion);
    seleccionados = poblacion.slice(0, cantidadSeleccion);
    return seleccionados;
}

// Función para cruzar individuos seleccionados para producir descendencia
export function cruzar(seleccionados, tasaCruce) {
    let descendencia = [];
    const cantidadCruce = Math.round(seleccionados.length * tasaCruce);
    for (let i = 0; i < cantidadCruce; i++) {
        const padre = seleccionados[i % seleccionados.length];
        const madre = seleccionados[(i + 1) % seleccionados.length];
        const hijo = {
            // Lógica para cruzar padre y madre y obtener el hijo
            x: (padre.x + madre.x) / 2,
            y: (padre.y + madre.y) / 2,
            radio: (padre.radio + madre.radio) / 2,
            color: padre.color // Puedes modificar la lógica de cruce según tus necesidades
        };
        descendencia.push(hijo);
    }
    return descendencia;
}

// Función para mutar descendencia generada
export function mutar(descendencia, tasaMutacion) {
    descendencia.forEach(individuo => {
        if (Math.random() < tasaMutacion) {
            // Lógica para mutar el individuo
            individuo.radio += Math.random() * 10 - 5; // Ejemplo de mutación del radio
        }
    });
}

// Función para reemplazar la población actual con la descendencia generada
export function reemplazarPoblacion(poblacion, descendencia) {
    poblacion.sort((a, b) => b.fitness - a.fitness); // Ordena de mayor a menor fitness
    const cantidadReemplazo = Math.min(poblacion.length, descendencia.length);
    for (let i = 0; i < cantidadReemplazo; i++) {
        poblacion[i] = descendencia[i];
    }
    return poblacion;
}

// Función auxiliar para crear individuos aleatorios
export function crearIndividuoAleatorio() {
    const individuo = {
        x: Math.random() * 800, // Ejemplo: coordenada x aleatoria dentro de un lienzo de 800x800
        y: Math.random() * 800, // Ejemplo: coordenada y aleatoria dentro de un lienzo de 800x800
        radio: Math.random() * 50 + 20, // Ejemplo: radio aleatorio entre 20 y 70
        color: '#' + Math.floor(Math.random() * 16777215).toString(16) // Ejemplo: color aleatorio en hexadecimal
    };
    return individuo;
}

// Función auxiliar para calcular el fitness de un individuo
export function calcularFitness(individuo) {
    // Lógica para calcular el fitness de un individuo
    // Ejemplo de cálculo de fitness basado en la distancia del individuo a una posición objetivo
    const objetivoX = 400; // Posición x objetivo
    const objetivoY = 400; // Posición y objetivo
    const distancia = Math.sqrt(Math.pow(objetivoX - individuo.x, 2) + Math.pow(objetivoY - individuo.y, 2));
    return 1 / (distancia + 1); // Fitness inversamente proporcional a la distancia
}
