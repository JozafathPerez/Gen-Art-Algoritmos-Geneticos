// Archivo funcionFitness.js


export function calcularFitnessPromedio(poblacion) {
    let sumaFitness = 0;
    poblacion.forEach(individuo => {
        sumaFitness += individuo.fitness;
    });
    return sumaFitness / poblacion.length;
}

export function calcularMejorFitness(poblacion) {
    let mejorFitness = 0;
    poblacion.forEach(individuo => {
        if (individuo.fitness > mejorFitness) {
            mejorFitness = individuo.fitness;
        }
    });
    return mejorFitness;
}
