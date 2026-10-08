/**
 * Aplicación principal - Mapa Interactivo de Grafitis de Bogotá
 */

import { Grafiti } from './grafiti.js';
import { cargarGrafitis, filtrarPorLocalidad, obtenerLocalidadesUnicas } from './data-loader.js';
import { MapaGrafitis } from './mapa-grafitis.js';

// Elementos del DOM
const mapContainer = document.getElementById('map');
const localidadFilter = document.getElementById('localidad-filter');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');

// Instancia del mapa
let mapaGrafitis = null;
let todosLosGrafitis = [];

/**
 * Inicializa la aplicación
 */
async function inicializarApp() {
    try {
        // Mostrar loading
        mostrarLoading(true);
        ocultarError();
        
        // Cargar datos
        todosLosGrafitis = await cargarGrafitis();
        
        // Inicializar mapa
        mapaGrafitis = new MapaGrafitis('map');
        
        // Mostrar grafitis en el mapa
        mapaGrafitis.mostrarGrafitis(todosLosGrafitis);
        
        // Poblar filtro de localidades
        poblarFiltroLocalidades();
        
        // Configurar event listeners
        configurarEventListeners();
        
    } catch (error) {
        console.error('Error al inicializar la app:', error);
        mostrarError(error.message);
    } finally {
        mostrarLoading(false);
    }
}

/**
 * Pobla el select de localidades con las opciones únicas
 */
function poblarFiltroLocalidades() {
    const localidades = obtenerLocalidadesUnicas(todosLosGrafitis);
    
    // Limpiar opciones existentes (mantener "Todas")
    while (localidadFilter.options.length > 1) {
        localidadFilter.remove(1);
    }
    
    // Agregar localidades
    for (const localidad of localidades) {
        const option = document.createElement('option');
        option.value = localidad;
        option.textContent = localidad;
        localidadFilter.appendChild(option);
    }
}

/**
 * Configura los event listeners
 */
function configurarEventListeners() {
    // Filtro de localidad
    localidadFilter.addEventListener('change', (e) => {
        const localidadSeleccionada = e.target.value;
        mapaGrafitis.filtrarPorLocalidad(localidadSeleccionada);
    });
}

/**
 * Muestra u oculta el indicador de carga
 * @param {boolean} mostrar - True para mostrar, false para ocultar
 */
function mostrarLoading(mostrar) {
    if (mostrar) {
        loadingEl.classList.remove('hidden');
    } else {
        loadingEl.classList.add('hidden');
    }
}

/**
 * Muestra un mensaje de error
 * @param {string} mensaje - Mensaje de error
 */
function mostrarError(mensaje) {
    errorEl.textContent = mensaje;
    errorEl.classList.remove('hidden');
}

/**
 * Oculta el mensaje de error
 */
function ocultarError() {
    errorEl.classList.add('hidden');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarApp);