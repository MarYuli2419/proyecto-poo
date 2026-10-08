/**
 * Módulo de carga de datos de grafitis
 */

import { Grafiti } from './grafiti.js';

/**
 * Carga los grafitis desde el archivo JSON
 * @returns {Promise<Grafiti[]>} Array de instancias de Grafiti
 */
export async function cargarGrafitis() {
    try {
        const response = await fetch('data/grafitis.json');
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Verificar que sea un array
        if (!Array.isArray(data)) {
            throw new Error('El archivo JSON no contiene un array válido');
        }
        
        // Convertir cada objeto a instancia de Grafiti
        const grafitis = data.map((item, index) => {
            try {
                return Grafiti.fromJSON(item);
            } catch (error) {
                throw new Error(`Error en grafiti índice ${index}: ${error.message}`);
            }
        });
        
        return grafitis;
        
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error('Error de red: No se pudo cargar el archivo de datos. Asegúrese de servir la aplicación via HTTP (no file://).');
        }
        throw error;
    }
}

/**
 * Filtra grafitis por localidad
 * @param {Grafiti[]} grafitis - Array de grafitis
 * @param {string} localidad - Localidad a filtrar (vacío o "Todas" para sin filtro)
 * @returns {Grafiti[]} Array filtrado
 */
export function filtrarPorLocalidad(grafitis, localidad) {
    if (!localidad || localidad === '' || localidad === 'Todas') {
        return [...grafitis]; // Retornar copia del array original
    }
    
    return grafitis.filter(g => g.localidad === localidad);
}

/**
 * Obtiene las localidades únicas de un array de grafitis
 * @param {Grafiti[]} grafitis - Array de grafitis
 * @returns {string[]} Array ordenado de localidades únicas
 */
export function obtenerLocalidadesUnicas(grafitis) {
    const localidades = new Set();
    
    for (const g of grafitis) {
        localidades.add(g.localidad);
    }
    
    return Array.from(localidades).sort();
}