// Safe updateSystemStatus implementation example to prevent undefined crashes
function updateSystemStatus(status, text) {
    const statusLed = document.getElementById('status-led');
    const statusText = document.getElementById('status-text');
    
    if (!statusLed || !statusText) return;

    if (status) {
        statusLed.classList.remove('offline');
        statusLed.classList.add('online');
        statusText.textContent = text || 'Online';
    } else {
        statusLed.classList.remove('online');
        statusLed.classList.add('offline');
        statusText.textContent = text || 'Offline';
    }
}
