let tiempoInicio, tiempoTotal, tiempoPromedio;

export function inicializarTemporizador() {
    tiempoInicio = Date.now();
    tiempoTotal = 0;
    tiempoPromedio = 0;
}

export function actualizarTemporizador(generacion) {
    const tiempoActual = Date.now();
    tiempoTotal = (tiempoActual - tiempoInicio) / 1000;
    tiempoPromedio = tiempoTotal / (generacion + 1);
    document.getElementById('tiempoTotal').innerText = `Tiempo Total: ${tiempoTotal.toFixed(2)}s`;
    document.getElementById('tiempoPromedio').innerText = `Tiempo Promedio: ${tiempoPromedio.toFixed(2)}s`;
}

export function detenerTemporizador() {
    tiempoInicio = null;
}
