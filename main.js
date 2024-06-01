import { inicializarLienzo } from './componentes/lienzo.js';
import { inicializarControles } from './componentes/controles.js';
import { inicializarTemporizador } from './componentes/temporizador.js';
import { inicializarGrafico } from './componentes/grafico.js';
import { iniciarAlgoritmoGenetico } from './algoritmo/algoritmoGenetico.js';


// Borrar esto al terminar
document.getElementById('generaciones').value = 5;
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

const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#entradaImagen");
const preview = document.querySelector("#preview");
let file;

document.getElementById('seleccion').addEventListener('input', function() {
    document.getElementById('seleccionValue').textContent = this.value;
});

document.getElementById('mutacion').addEventListener('input', function() {
    document.getElementById('mutacionValue').textContent = this.value;
});

document.getElementById('cruce').addEventListener('input', function() {
    document.getElementById('cruceValue').textContent = this.value;
});


/**
 * Escucha el evento click del botón para abrir el cuadro de diálogo de selección de archivo.
 * @param {Event} e - Evento click
 */
button.addEventListener("click", (e) => {
    input.click();
});


/**
 * Escucha el evento change del input de tipo archivo para manejar la selección de archivos.
 * @param {Event} e - Evento change
 */
input.addEventListener("change", (e) => {
    file = e.target.files[0]; 
    dropArea.classList.add("active");
    showFile(file);
    dropArea.classList.remove("active");
});


/**
 * Escucha el evento dragover del área de soltar para mostrar la indicación de soltar.
 * @param {Event} e - Evento dragover
 */
dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Suelta para subir la imagen";
});


/**
 * Escucha el evento dragleave del área de soltar para restablecer el estado original.
 * @param {Event} e - Evento dragleave
 */
dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta la imagen";
});


/**
 * Escucha el evento drop del área de soltar para manejar la carga del archivo.
 * @param {Event} e - Evento drop
 */
dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    file = e.dataTransfer.files[0];
    showFile(file);
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta la imagen";
});


/**
 * Muestra el archivo seleccionado para previsualización si es válido.
 * @param {File} file - Archivo seleccionado
 */
function showFile(file) {
    if (file !== undefined) { 
        processFile(file);
    } else {
        console.log("Seleccione una sola imagen");
    }
}

/**
 * Procesa el archivo seleccionado, mostrando una previsualización si es una imagen válida.
 * @param {File} file - Archivo a procesar
 */
function processFile(file) {
    const docType = file.type;
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

    if (validExtensions.includes(docType)) {
        const fileReader = new FileReader();
        const id = `file-${Math.random().toString(32).substring(7)}`;

        fileReader.addEventListener('load', (e) => {
            const fileUrl = fileReader.result;
            const image = `
                <div id="${id}" class="file-container">
                    <img src="${fileUrl}" alt="${file.name}" width="30px">
                    <div class="status">
                        <span>${file.name}</span>
                        <span class="status-text">
                            Archivo subido
                        </span>
                    </div>
                </div>
            `;
            preview.innerHTML = image;
        });

        fileReader.readAsDataURL(file);
        
    } else {
        alert('El archivo seleccionado no es uno válido.');
    }
}
