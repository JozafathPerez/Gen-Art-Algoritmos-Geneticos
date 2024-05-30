let graficoFitness;

export function inicializarGrafico() {
    const ctx = document.getElementById('graficoFitness').getContext('2d');
    graficoFitness = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Fitness Promedio',
                    borderColor: 'blue',
                    fill: false,
                    data: []
                },
                {
                    label: 'Mejor Fitness',
                    borderColor: 'green',
                    fill: false,
                    data: []
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Generación'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Fitness'
                    }
                }
            }
        }
    });
}

export function actualizarGrafico(generacion, fitnessPromedio, mejorFitness) {
    graficoFitness.data.labels.push(generacion);
    graficoFitness.data.datasets[0].data.push(fitnessPromedio);
    graficoFitness.data.datasets[1].data.push(mejorFitness);
    graficoFitness.update();
}
