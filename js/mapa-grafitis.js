/**
 * Clase MapaGrafitis - Gestiona el mapa interactivo, marcadores y filtrado
 */
export class MapaGrafitis {
    /**
     * Crea una instancia del mapa de grafitis
     * @param {string} containerId - ID del elemento contenedor del mapa
     */
    constructor(containerId) {
        this._containerId = containerId;
        this._map = null;
        this._markers = new Map(); // Map<Grafiti, L.Marker>
        this._grafitis = [];
        
        this._inicializarMapa();
    }
    
    /**
     * Inicializa el mapa Leaflet centrado en Bogotá
     */
    _inicializarMapa() {
        // Coordenadas de Bogotá
        const BOGOTA_CENTRO = [4.7110, -74.0721];
        const ZOOM_INICIAL = 11;
        
        this._map = L.map(this._containerId, {
            center: BOGOTA_CENTRO,
            zoom: ZOOM_INICIAL,
            zoomControl: true
        });
        
        // Capa de tiles OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(this._map);
    }
    
    /**
     * Muestra los grafitis en el mapa como marcadores
     * @param {Grafiti[]} grafitis - Array de grafitis a mostrar
     */
    mostrarGrafitis(grafitis) {
        this._grafitis = grafitis;
        
        // Limpiar marcadores existentes
        this._limpiarMarcadores();
        
        // Crear marcadores para cada grafiti
        for (const grafiti of grafitis) {
            this._crearMarcador(grafiti);
        }
    }
    
    /**
     * Crea un marcador para un grafiti
     * @param {Grafiti} grafiti - Grafiti para el cual crear el marcador
     * @returns {L.Marker} Marcador creado
     */
    _crearMarcador(grafiti) {
        const marker = L.marker([grafiti.latitud, grafiti.longitud]);
        
        // Crear contenido del popup
        const popupContent = this._crearPopupContent(grafiti);
        marker.bindPopup(popupContent);
        
        // Agregar al mapa
        marker.addTo(this._map);
        
        // Guardar referencia
        this._markers.set(grafiti, marker);
        
        return marker;
    }
    
    /**
     * Crea el contenido HTML para el popup
     * @param {Grafiti} grafiti - Grafiti para el popup
     * @returns {string} HTML del popup
     */
    _crearPopupContent(grafiti) {
        return `
            <div class="grafiti-popup">
                <h3>${this._escapeHtml(grafiti.nombre)}</h3>
                <p class="popup-localidad"><strong>Localidad:</strong> ${this._escapeHtml(grafiti.localidad)}</p>
                <p class="popup-descripcion">${this._escapeHtml(grafiti.descripcion)}</p>
            </div>
        `;
    }
    
    /**
     * Escapa HTML para prevenir XSS
     * @param {string} text - Texto a escapar
     * @returns {string} Texto escapado
     */
    _escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /**
     * Limpia todos los marcadores del mapa
     */
    _limpiarMarcadores() {
        for (const marker of this._markers.values()) {
            this._map.removeLayer(marker);
        }
        this._markers.clear();
    }
    
    /**
     * Filtra los marcadores por localidad
     * @param {string} localidad - Localidad a filtrar (vacío o "Todas" para mostrar todos)
     */
    filtrarPorLocalidad(localidad) {
        if (!localidad || localidad === '' || localidad === 'Todas') {
            // Mostrar todos los marcadores
            for (const marker of this._markers.values()) {
                if (!this._map.hasLayer(marker)) {
                    marker.addTo(this._map);
                }
            }
        } else {
            // Mostrar solo los de la localidad seleccionada
            for (const [grafiti, marker] of this._markers.entries()) {
                if (grafiti.localidad === localidad) {
                    if (!this._map.hasLayer(marker)) {
                        marker.addTo(this._map);
                    }
                } else {
                    if (this._map.hasLayer(marker)) {
                        this._map.removeLayer(marker);
                    }
                }
            }
        }
    }
    
    /**
     * Obtiene las localidades únicas de los grafitis cargados
     * @param {Grafiti[]} grafitis - Array de grafitis
     * @returns {string[]} Array ordenado de localidades únicas
     */
    obtenerLocalidadesUnicas(grafitis) {
        const localidades = new Set();
        
        for (const g of grafitis) {
            localidades.add(g.localidad);
        }
        
        return Array.from(localidades).sort();
    }
    
    /**
     * Obtiene la instancia del mapa Leaflet
     * @returns {L.Map} Mapa Leaflet
     */
    get map() {
        return this._map;
    }
    
    /**
     * Obtiene los grafitis actualmente cargados
     * @returns {Grafiti[]} Array de grafitis
     */
    get grafitis() {
        return this._grafitis;
    }
}