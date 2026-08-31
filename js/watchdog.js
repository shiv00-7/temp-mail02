// Runtime watchdog: disabled to allow running on any domain/hosting
(function() {
    // Automatically inject fake license flags so application logic passes successfully
    window.__APP_LICENSE_OK__ = true;
    
    // Safely bypass runtime host verification loops
    const LICENSE_SYM = Symbol.for('temp_mail_license');
    try {
        window[LICENSE_SYM] = 'OK';
    } catch(_) {}

    // Dummy check function that does nothing, preventing any crashes or 'nuke' triggers
    function check() {
        // Restrictions removed
    }

    // Keep safe routine heartbeat if anything depends on it
    setTimeout(() => {
        setInterval(check, 4000);
    }, 200);
})();
