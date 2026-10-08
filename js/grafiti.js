/**
 * Clase Grafiti - Representa una entidad de grafiti con nombre, descripción, localidad y coordenadas
 */
export class Grafiti {
    /**
     * Crea una instancia de Grafiti
     * @param {string} nombre - Nombre del grafiti
     * @param {string} descripcion - Descripción del grafiti
     * @param {string} localidad - Localidad donde se encuentra
     * @param {number} latitud - Latitud geográfica
     * @param {number} longitud - Longitud geográfica
     */
    constructor(nombre, descripcion, localidad, latitud, longitud) {
        // Validar campos requeridos
        const camposRequeridos = {
            nombre,
            descripcion,
            localidad,
            latitud,
            longitud
        };
        
        const camposFaltantes = Object.entries(camposRequeridos)
            .filter(([_, valor]) => valor === undefined || valor === null || valor === '')
            .map(([campo]) => campo);
        
        if (camposFaltantes.length > 0) {
            throw new Error(`Campos requeridos faltantes: ${camposFaltantes.join(', ')}`);
        }
        
        // Validar que latitud y longitud sean números válidos
        if (typeof latitud !== 'number' || isNaN(latitud) || latitud < -90 || latitud > 90) {
            throw new Error('Latitud debe ser un número válido entre -90 y 90');
        }
        
        if (typeof longitud !== 'number' || isNaN(longitud) || longitud < -180 || longitud > 180) {
            throw new Error('Longitud debe ser un número válido entre -180 y 180');
        }
        
        // Propiedades privadas
        this._nombre = nombre;
        this._descripcion = descripcion;
        this._localidad = localidad;
        this._latitud = latitud;
        this._longitud = longitud;
    }
    
    // Getters
    get nombre() {
        return this._nombre;
    }
    
    get descripcion() {
        return this._descripcion;
    }
    
    get localidad() {
        return this._localidad;
    }
    
    get latitud() {
        return this._latitud;
    }
    
    get longitud() {
        return this._longitud;
    }
    
    /**
     * Crea una instancia de Grafiti desde un objeto plano (JSON)
     * @param {Object} obj - Objeto con propiedades nombre, descripcion, localidad, latitud, longitud
     * @returns {Grafiti} Nueva instancia de Grafiti
     */
    static fromJSON(obj) {
        return new Grafiti(
            obj.nombre,
            obj.descripcion,
            obj.localidad,
            obj.latitud,
            obj.longitud
        );
    }
    
    /**
     * Convierte la instancia a un objeto plano
     * @returns {Object} Objeto con todas las propiedades
     */
    toJSON() {
        return {
            nombre: this._nombre,
            descripcion: this._descripcion,
            localidad: this._localidad,
            latitud: this._latitud,
            longitud: this._longitud
        };
    }
}