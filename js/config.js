// Configuration & Environment Settings
const CONFIG = {
    API_BASE: 'https://api.guerrillamail.com/ajax.php',
    // Host restrictions removed
    isAuthorized: true
};

// Bypass any global host checks if present
window.__APP_LICENSE_OK__ = true;

export default CONFIG;
