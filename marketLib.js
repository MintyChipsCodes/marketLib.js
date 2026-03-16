/**
 * marketLib.js - Simple library for fetching and displaying app marketplaces
 */
(function(window) {
    'use strict';
    
    /**
     * Fetch JSON from URL or use provided data object, then render app cards
     * @param {string|Object} source - URL string or data object with apps
     * @param {string} container - CSS selector for container (default: '.apps')
     */
    window.mpFetch = async function(source, container = '.apps') {
        const containerEl = document.querySelector(container);
        
        if (!containerEl) {
            console.error(`marketLib: Container "${container}" not found`);
            return;
        }
        
        try {
            let data;
            
            // Check if source is an object (data) or string (URL)
            if (typeof source === 'object' && source !== null) {
                // Direct data object
                data = source;
            } else if (typeof source === 'string') {
                // URL - fetch it
                containerEl.innerHTML = '<p>Loading apps...</p>';
                
                let url = source;
                if (!url.startsWith('http')) {
                    url = 'https://' + url;
                }
                
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                data = await response.json();
            } else {
                throw new Error('Source must be a URL string or data object');
            }
            
            // Clear container
            containerEl.innerHTML = '';
            
            // Add title
            const title = document.createElement('p');
            title.textContent = 'apps';
            title.style.margin = '0';
            containerEl.appendChild(title);
            
            // Render each app
            if (data.apps) {
                Object.values(data.apps).forEach(app => {
                    const appCard = createAppCard(app);
                    containerEl.appendChild(appCard);
                });
            } else {
                containerEl.innerHTML = '<p>No apps found</p>';
            }
            
        } catch (error) {
            console.error('marketLib error:', error);
            containerEl.innerHTML = `<p style="color: red;">Error loading apps: ${error.message}</p>`;
        }
    };
    
    /**
     * Create an app card element
     * @param {Object} app - App data object
     * @returns {HTMLElement}
     */
    function createAppCard(app) {
        const card = document.createElement('div');
        card.className = 'app';
        
        // Create card content
        const name = document.createElement('div');
        name.textContent = app.Name || 'Unnamed App';
        name.style.fontWeight = 'bold';
        name.style.marginBottom = '8px';
        
        const about = document.createElement('div');
        about.textContent = app.about || '';
        about.style.fontSize = '0.9em';
        about.style.marginBottom = '4px';
        
        const creator = document.createElement('div');
        creator.textContent = app.creator || '';
        creator.style.fontSize = '0.9em';
        creator.style.marginBottom = '8px';
        
        const downloadLink = document.createElement('a');
        downloadLink.href = app.download || '#';
        downloadLink.textContent = 'download';
        downloadLink.style.color = '#4a9eff';
        downloadLink.style.textDecoration = 'none';
        downloadLink.target = '_blank';
        
        card.appendChild(name);
        card.appendChild(about);
        card.appendChild(creator);
        card.appendChild(downloadLink);
        
        return card;
    }
    
})(window);
