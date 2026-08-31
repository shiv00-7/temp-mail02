// ─────────────────────────────────────────────
// TempMail v3.5 — Core Engine (Enhanced UX)
// Author: Mehmet Kahya
// Last Updated: 10 February 2026
// ─────────────────────────────────────────────

import CONFIG from './config.js';

// ── License verification (layer 3) ──
if (typeof window !== 'undefined') {
    const LICENSE_SYM = Symbol.for('temp_mail_license');
    if (!window.__APP_LICENSE_OK__ || window[LICENSE_SYM] !== 'OK') {
        throw new Error('Domain not authorized');
    }
}

// ══════════════════════════════════════════════
// Toast Notification System
// ══════════════════════════════════════════════
const toastContainer = document.getElementById('toast-container');
const toastIcons = {
    success: 'fa-check',
    error: 'fa-xmark',
    info: 'fa-info',
    warning: 'fa-exclamation'
};

// ══════════════════════════════════════════════
// Localization (EN/TR Switcher & Translation Engine)
// ══════════════════════════════════════════════
const TRANSLATIONS = {
    EN: {
        doc_title: "TempMail — Disposable Email",
        header_subtitle: "Instant disposable email addresses. No signup, no hassle.",
        status_online: "Online",
        status_offline: "Offline",
        status_syncing: "Syncing",
        badge_instant: "Instant",
        badge_private: "Private",
        generating_email: "Generating email address...",
        aria_email_address: "Your temporary email address",
        custom_username: "Custom Username",
        tooltip_custom_name: "Custom Name",
        show_qrcode: "Show QR Code",
        tooltip_qrcode: "QR Code",
        copy_email: "Copy email address",
        tooltip_copy: "Copy",
        domain_label: "Domain:",
        aria_select_domain: "Select email domain",
        domain_random: "Random",
        tooltip_refresh_btn: "Refresh inbox",
        tooltip_refresh: "Refresh (R)",
        btn_refresh: "Refresh",
        tooltip_new_btn: "Generate new address",
        tooltip_new: "New (N)",
        btn_new: "New Address",
        auto_refresh_label: "Auto",
        aria_refresh_interval: "Auto-refresh interval",
        search_placeholder: "Search emails by subject, sender...",
        aria_search_emails: "Search emails",
        inbox_label: "Inbox",
        tooltip_clear_all: "Delete all emails",
        btn_clear_all: "Clear All",
        table_id: "ID",
        table_from: "From",
        table_subject: "Subject",
        table_date: "Date",
        table_actions: "Actions",
        footer_credits: "Mehmet Kahya — 2025-2026 — TempMail v4.0 — ",
        footer_release: "May 2026 release",
        aria_send_email: "Send email",
        aria_github_profile: "GitHub profile",
        aria_linkedin_profile: "LinkedIn profile",
        btn_disclaimer: "Disclaimer",
        btn_privacy: "Privacy Policy",
        welcome_header: "Welcome to TempMail",
        welcome_p1: "Your temporary email address is being generated. Use it to sign up for services without revealing your real email.",
        welcome_tips_header: "Tips:",
        welcome_tip1: "Press <kbd>?</kbd> to see keyboard shortcuts",
        welcome_tip2: "Enable auto-refresh to get emails instantly",
        welcome_tip3: "Click \"New Address\" if loading fails",
        welcome_p3: "Thank you for using this project! ❤️",
        btn_got_it: "Got it!",
        tooltip_shortcuts: "Keyboard shortcuts",
        shortcut_hint_text: "Shortcuts",
        aria_scroll_top: "Scroll to top",
        aria_quick_actions: "Quick actions",
        empty_title: "No emails yet",
        empty_desc: "Emails sent to your address will appear here automatically",
        empty_hint_desktop: "Press R to refresh or N for a new address",
        empty_hint_mobile: "Tap the + button for quick actions",
        shortcut_refresh: "Refresh inbox",
        shortcut_new: "New address",
        shortcut_copy: "Copy email",
        shortcut_search: "Focus search",
        shortcut_help: "Show shortcuts",

        // V4 Keys
        cmd_palette_placeholder: "Type a command or search...",
        cmd_palette_action: "Action",
        cmd_palette_settings: "Settings",
        cmd_palette_navigation: "Navigation",
        tab_mailbox_name: "Mailbox",
        tab_add_new: "New Mailbox",
        filter_all: "All",
        filter_starred: "Starred",
        filter_verification: "Verifications",
        tag_verification: "Verification",
        tag_testing: "Testing",
        tag_marketing: "Marketing",
        tag_security: "Security",
        toast_mailbox_limit: "Maximum limit of 5 mailboxes reached!",
        toast_mailbox_deleted: "Mailbox deleted!",
        toast_command_palette: "Command Palette opened!",

        // Toasts
        'No email address to copy': 'No email address to copy',
        'Email copied to clipboard!': 'Email copied to clipboard!',
        'Email text copied!': 'Email text copied!',
        'No active session': 'No active session',
        'Failed to load email content': 'Failed to load email content',
        'Downloading attachment...': 'Downloading attachment...',
        'Attachment downloaded!': 'Attachment downloaded!',
        'Failed to download attachment': 'Failed to download attachment',
        'Email deleted': 'Email deleted',
        'Failed to delete email': 'Failed to delete email',
        'No emails to delete': 'No emails to delete',
        'All emails deleted': 'All emails deleted',
        'Failed to delete all emails': 'Failed to delete all emails',
        'Auto-refresh enabled': 'Auto-refresh enabled',
        'Auto-refresh disabled': 'Auto-refresh disabled',
        'Username cannot be empty': 'Username cannot be empty',
        'Username must be at least 3 characters': 'Username must be at least 3 characters',
        'Username must be alphanumeric (letters and numbers only)': 'Username must be alphanumeric (letters and numbers only)',
        'Generate an email first!': 'Generate an email first!',
        'Downloading QR code...': 'Downloading QR code...',
        'QR Code downloaded successfully!': 'QR Code downloaded successfully!',
        'Failed to download QR code. Try right clicking the image and saving.': 'Failed to download QR code. Try right clicking the image and saving.',
        'EML file downloaded!': 'EML file downloaded!',
        'Custom email address generated!': 'Custom email address generated!',
        'New email address generated!': 'New email address generated!',
        'Showing cached emails (offline)': 'Showing cached emails (offline)',
        'Session expired. Click "New Address" to continue.': 'Session expired. Click "New Address" to continue.',
        'Connection failed. Click "New Address" to try again.': 'Connection failed. Click "New Address" to try again.',
    },
    TR: {
        doc_title: "TempMail — Geçici E-posta",
        header_subtitle: "Anında geçici e-posta adresleri. Kayıt yok, zahmet yok.",
        status_online: "Çevrimiçi",
        status_offline: "Çevrimdışı",
        status_syncing: "Eşitleniyor",
        badge_instant: "Anında",
        badge_private: "Gizli",
        generating_email: "E-posta adresi oluşturuluyor...",
        aria_email_address: "Geçici e-posta adresiniz",
        custom_username: "Özel Kullanıcı Adı",
        tooltip_custom_name: "Özel Ad",
        show_qrcode: "QR Kodunu Göster",
        tooltip_qrcode: "QR Kodu",
        copy_email: "E-posta adresini kopyala",
        tooltip_copy: "Kopyala",
        domain_label: "Alan Adı:",
        aria_select_domain: "E-posta alan adını seçin",
        domain_random: "Rastgele",
        tooltip_refresh_btn: "Gelen kutusunu yenile",
        tooltip_refresh: "Yenile (R)",
        btn_refresh: "Yenile",
        tooltip_new_btn: "Yeni adres oluştur",
        tooltip_new: "Yeni (N)",
        btn_new: "Yeni Adres",
        auto_refresh_label: "Oto",
        aria_refresh_interval: "Otomatik yenileme sıklığı",
        search_placeholder: "E-postaları konuya, gönderene göre ara...",
        aria_search_emails: "E-postaları ara",
        inbox_label: "Gelen Kutusu",
        tooltip_clear_all: "Tüm e-postaları sil",
        btn_clear_all: "Hepsini Sil",
        table_id: "ID",
        table_from: "Kimden",
        table_subject: "Konu",
        table_date: "Tarih",
        table_actions: "İşlemler",
        footer_credits: "Mehmet Kahya — 2025-2026 — TempMail v4.0 — ",
        footer_release: "Mayıs 2026 sürümü",
        aria_send_email: "E-posta gönder",
        aria_github_profile: "GitHub profili",
        aria_linkedin_profile: "LinkedIn profili",
        btn_disclaimer: "Sorumluluk Reddi",
        btn_privacy: "Gizlilik Politikası",
        welcome_header: "TempMail'e Hoş Geldiniz",
        welcome_p1: "Geçici e-posta adresiniz oluşturuluyor. Gerçek e-postanızı açıklamadan hizmetlere kaydolmak için kullanın.",
        welcome_tips_header: "İpuçları:",
        welcome_tip1: "Klavye kısayollarını görmek için <kbd>?</kbd> tuşuna basın",
        welcome_tip2: "E-postaları anında almak için otomatik yenilemeyi etkinleştirin",
        welcome_tip3: "Yükleme başarısız olursa \"Yeni Adres\"e tıklayın",
        welcome_p3: "Bu projeyi kullandığınız için teşekkürler! ❤️",
        btn_got_it: "Anladım!",
        tooltip_shortcuts: "Klavye kısayolları",
        shortcut_hint_text: "Kısayollar",
        aria_scroll_top: "Yukarı kaydır",
        aria_quick_actions: "Hızlı işlemler",
        empty_title: "Henüz e-posta yok",
        empty_desc: "Adresinize gönderilen e-postalar otomatik olarak burada görünecektir",
        empty_hint_desktop: "Yenilemek için R veya yeni adres için N tuşuna basın",
        empty_hint_mobile: "Hızlı işlemler için + düğmesine dokunun",
        shortcut_refresh: "Gelen kutusunu yenile",
        shortcut_new: "Yeni adres",
        shortcut_copy: "E-postayı kopyala",
        shortcut_search: "Aramaya odaklan",
        shortcut_help: "Kısayolları göster",

        // V4 Keys
        cmd_palette_placeholder: "Bir komut yazın veya arayın...",
        cmd_palette_action: "Eylem",
        cmd_palette_settings: "Ayarlar",
        cmd_palette_navigation: "Gezinti",
        tab_mailbox_name: "Posta Kutusu",
        tab_add_new: "Yeni Kutu",
        filter_all: "Tümü",
        filter_starred: "Yıldızlı",
        filter_verification: "Doğrulamalar",
        tag_verification: "Doğrulama",
        tag_testing: "Test",
        tag_marketing: "Bülten",
        tag_security: "Güvenlik",
        toast_mailbox_limit: "Maksimum 5 posta kutusu sınırına ulaşıldı!",
        toast_mailbox_deleted: "Posta kutusu silindi!",
        toast_command_palette: "Komut Paleti açıldı!",

        // Toasts
        'No email address to copy': 'Kopyalanacak e-posta adresi yok',
        'Email copied to clipboard!': 'E-posta panoya kopyalandı!',
        'Email text copied!': 'E-posta içeriği kopyalandı!',
        'No active session': 'Aktif oturum bulunamadı',
        'Failed to load email content': 'E-posta içeriği yüklenemedi',
        'Downloading attachment...': 'Ek indiriliyor...',
        'Attachment downloaded!': 'Ek başarıyla indirildi!',
        'Failed to download attachment': 'Ek indirilemedi',
        'Email deleted': 'E-posta silindi',
        'Failed to delete email': 'E-posta silinemedi',
        'No emails to delete': 'Silinecek e-posta yok',
        'All emails deleted': 'Tüm e-postalar silindi',
        'Failed to delete all emails': 'Tüm e-postalar silinemedi',
        'Auto-refresh enabled': 'Otomatik yenileme aktif',
        'Auto-refresh disabled': 'Otomatik yenileme pasif',
        'Username cannot be empty': 'Kullanıcı adı boş olamaz',
        'Username must be at least 3 characters': 'Kullanıcı adı en az 3 karakter olmalıdır',
        'Username must be alphanumeric (letters and numbers only)': 'Kullanıcı adı sadece harf ve rakamlardan oluşmalıdır',
        'Generate an email first!': 'Önce bir e-posta adresi oluşturun!',
        'Downloading QR code...': 'QR kodu indiriliyor...',
        'QR Code downloaded successfully!': 'QR Kodu başarıyla indirildi!',
        'Failed to download QR code. Try right clicking the image and saving.': 'QR kodu indirilemedi. Resme sağ tıklayıp kaydetmeyi deneyin.',
        'EML file downloaded!': 'EML file downloaded!',
        'Custom email address generated!': 'Özel e-posta adresi oluşturuldu!',
        'New email address generated!': 'Yeni e-posta adresi oluşturuldu!',
        'Showing cached emails (offline)': 'Önbellekteki e-postalar gösteriliyor (çevrimdışı)',
        'Session expired. Click "New Address" to continue.': 'Oturum süresi doldu. Devam etmek için "Yeni Adres"e tıklayın.',
        'Connection failed. Click "New Address" to try again.': 'Bağlantı başarısız. Tekrar denemek için "Yeni Adres"e tıklayın.',
    }
};

let currentLanguage = localStorage.getItem('temp_mail_lang') || (navigator.language && navigator.language.startsWith('tr') ? 'TR' : 'EN');

function t(key) {
    const lang = currentLanguage;
    const isTr = lang === 'TR';

    if (typeof key === 'string') {
        if (key.startsWith('Retrying connection...')) {
            const m = key.match(/\((\d+)\/(\d+)\)/);
            if (m) {
                return isTr ? `Bağlantı yeniden deneniyor... (${m[1]}/${m[2]})` : key;
            }
        }
        if (key.startsWith('Failed to generate email:')) {
            const rest = key.substring('Failed to generate email:'.length);
            return isTr ? `E-posta oluşturulamadı:${rest}` : key;
        }
    }

    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
        return TRANSLATIONS[lang][key];
    }
    if (TRANSLATIONS['EN'] && TRANSLATIONS['EN'][key]) {
        return TRANSLATIONS['EN'][key];
    }
    return key;
}

function updateUILanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('temp_mail_lang', lang);

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        const flag = lang === 'TR' ? '🇹🇷' : '🇺🇸';
        const label = lang === 'TR' ? 'TR' : 'EN';
        langToggle.querySelector('.lang-icon').textContent = flag;
        langToggle.querySelector('.lang-text').textContent = label;
        langToggle.setAttribute('data-tooltip', lang === 'TR' ? 'English' : 'Türkçe');
        langToggle.setAttribute('aria-label', lang === 'TR' ? 'Switch to English' : 'Türkçe\'ye geç');
    }

    document.documentElement.lang = lang.toLowerCase();
    document.title = t('doc_title');

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerHTML = t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.setAttribute('placeholder', t(key));
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        el.setAttribute('title', t(key));
    });

    document.querySelectorAll('[data-i18n-tooltip]').forEach(el => {
        const key = el.getAttribute('data-i18n-tooltip');
        el.setAttribute('data-tooltip', t(key));
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria-label');
        el.setAttribute('aria-label', t(key));
    });

    if (elements.statusLed) {
        let activeStatus = 'OFFLINE';
        if (elements.statusLed.classList.contains('online')) activeStatus = 'ONLINE';
        else if (elements.statusLed.classList.contains('loading')) activeStatus = 'LOADING';
        updateSystemStatus(activeStatus);
    }

    let emailsToRerender = [];
    const cached = getStored(CONFIG.EMAIL_CACHE_KEY);
    if (cached) {
        try {
            emailsToRerender = JSON.parse(cached);
        } catch { /* ignore parse errors */ }
    }
    renderMailboxTabs();
    updateEmailTable(emailsToRerender);
}

function toggleLanguage() {
    const nextLang = currentLanguage === 'EN' ? 'TR' : 'EN';
    updateUILanguage(nextLang);
    toast(nextLang === 'TR' ? 'Dil Türkçe olarak değiştirildi.' : 'Language switched to English.', 'info');
}

function toast(message, type = 'info', duration = CONFIG.TOAST_DURATION) {
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `
        <div class="toast-icon"><i class="fa-solid ${toastIcons[type]}"></i></div>
        <span class="toast-message">${t(message)}</span>
        <button class="toast-close" onclick="this.closest('.toast').remove()" aria-label="Close">&times;</button>
        <div class="toast-progress" style="animation-duration:${duration}ms"></div>
    `;
    toastContainer.appendChild(el);

    const timer = setTimeout(() => {
        el.classList.add('toast-exit');
        setTimeout(() => el.remove(), 300);
    }, duration);

    // Pause on hover
    el.addEventListener('mouseenter', () => {
        clearTimeout(timer);
        const progress = el.querySelector('.toast-progress');
        if (progress) progress.style.animationPlayState = 'paused';
    });
    el.addEventListener('mouseleave', () => {
        const progress = el.querySelector('.toast-progress');
        if (progress) progress.style.animationPlayState = 'running';
        setTimeout(() => {
            el.classList.add('toast-exit');
            setTimeout(() => el.remove(), 300);
        }, 1500);
    });
}

// ══════════════════════════════════════════════
// State Management
// ══════════════════════════════════════════════
const getStored = (key) => localStorage.getItem(key);
const setStored = (key, val) => localStorage.setItem(key, val);
const removeStored = (key) => localStorage.removeItem(key);

const clearStoredData = () => {
    removeStored(CONFIG.EMAIL_KEY);
    removeStored(CONFIG.SESSION_KEY);
    removeStored(CONFIG.EMAIL_CACHE_KEY);
    removeStored(CONFIG.KNOWN_IDS_KEY);
};

let currentEmail = getStored(CONFIG.EMAIL_KEY) || '';
let sessionId = getStored(CONFIG.SESSION_KEY) || '';
let knownMailIds = new Set(JSON.parse(getStored(CONFIG.KNOWN_IDS_KEY) || '[]'));
let lastEmailCount = 0;

// ── V4.0 State Extensions ──
let activeSessions = JSON.parse(getStored('temp_mail_sessions_v4') || '[]');
let activeSessionIndex = parseInt(getStored('temp_mail_current_session_index') || '0', 10);
let starredMailIds = new Set(JSON.parse(getStored('temp_mail_starred_ids') || '[]'));
let currentFilter = 'all'; // 'all', 'starred', 'verification'
let lastFetchedEmails = []; // Cache of the last fetched email objects for instant client-side filtering

// ══════════════════════════════════════════════
// DOM Elements
// ══════════════════════════════════════════════
const $ = (id) => document.getElementById(id);
const elements = {
    emailInput: $('addr'),
    emailTable: $('emails')?.querySelector('tbody'),
    loadingSpinner: $('loading-spinner'),
    errorMessage: $('error-message'),
    autoRefreshCheckbox: $('auto-refresh'),
    refreshIntervalSelect: $('refresh-interval'),
    emailSearch: $('email-search'),
    statusLed: $('status-led'),
    statusText: $('status-text'),
    countBadge: $('email-count-badge'),
    deleteAllBtn: $('delete-all-btn'),
    countdown: $('countdown'),
    sessionTimer: $('session-timer'),
    sessionTimerText: $('session-timer-text'),
    countdownBarContainer: $('countdown-bar-container'),
    countdownBar: $('countdown-bar'),
    domainSelect: $('domain-select'),
    copyBtn: $('copy-btn'),
    copyIcon: $('copy-icon'),
    mailboxTabs: $('mailbox-tabs'),
    filterChips: $('filter-chips'),
};

// ══════════════════════════════════════════════
// V4.0 Interactive Logic Helpers
// ══════════════════════════════════════════════
function saveCurrentSession() {
    if (!currentEmail || !sessionId) return;
    
    if (activeSessions.length === 0) {
        activeSessions = [{
            email: currentEmail,
            sessionId: sessionId,
            knownIds: Array.from(knownMailIds),
            sessionStart: getStored(CONFIG.SESSION_START_KEY) || Date.now().toString(),
            cache: getStored(CONFIG.EMAIL_CACHE_KEY) || '[]'
        }];
        activeSessionIndex = 0;
    } else {
        if (activeSessionIndex >= activeSessions.length) {
            activeSessionIndex = activeSessions.length - 1;
        }
        activeSessions[activeSessionIndex] = {
            email: currentEmail,
            sessionId: sessionId,
            knownIds: Array.from(knownMailIds),
            sessionStart: getStored(CONFIG.SESSION_START_KEY) || Date.now().toString(),
            cache: getStored(CONFIG.EMAIL_CACHE_KEY) || '[]'
        };
    }
    setStored('temp_mail_sessions_v4', JSON.stringify(activeSessions));
    setStored('temp_mail_current_session_index', activeSessionIndex.toString());
}

function renderMailboxTabs() {
    if (!elements.mailboxTabs) return;
    
    if (activeSessions.length === 0 && currentEmail) {
        activeSessions = [{
            email: currentEmail,
            sessionId: sessionId,
            knownIds: Array.from(knownMailIds),
            sessionStart: getStored(CONFIG.SESSION_START_KEY) || Date.now().toString(),
            cache: getStored(CONFIG.EMAIL_CACHE_KEY) || '[]'
        }];
        activeSessionIndex = 0;
    }
    
    let html = '';
    activeSessions.forEach((sess, idx) => {
        const isActive = idx === activeSessionIndex;
        const displayEmail = sess.email || t('generating_email');
        const shortEmail = displayEmail.length > 20 ? displayEmail.substring(0, 18) + '...' : displayEmail;
        
        html += `
            <button class="mailbox-tab ${isActive ? 'active' : ''}" onclick="switchMailbox(${idx})">
                <i class="fa-solid fa-inbox"></i>
                <span title="${displayEmail}">${shortEmail}</span>
                <span class="mailbox-tab-close-btn" onclick="closeMailbox(${idx}, event)">
                    <i class="fa-solid fa-xmark"></i>
                </span>
            </button>
        `;
    });
    
    if (activeSessions.length < 5) {
        html += `
            <button class="mailbox-tab-add" onclick="addNewMailbox()">
                <i class="fa-solid fa-plus"></i>
                <span>${t('tab_add_new')} (${activeSessions.length}/5)</span>
            </button>
        `;
    } else {
        html += `
            <div class="mailbox-tab-add" style="border-style: solid; border-color: transparent; opacity: 0.7; cursor: not-allowed;" title="${t('toast_mailbox_limit')}">
                <i class="fa-solid fa-lock"></i>
                <span>5/5 Limit</span>
            </div>
        `;
    }
    
    elements.mailboxTabs.innerHTML = html;
}

function switchMailbox(index) {
    if (index === activeSessionIndex) return;
    
    saveCurrentSession();
    
    activeSessionIndex = index;
    const session = activeSessions[index];
    if (session) {
        currentEmail = session.email;
        sessionId = session.sessionId;
        knownMailIds = new Set(session.knownIds || []);
        
        setStored(CONFIG.EMAIL_KEY, currentEmail);
        setStored(CONFIG.SESSION_KEY, sessionId);
        setStored(CONFIG.KNOWN_IDS_KEY, JSON.stringify(Array.from(knownMailIds)));
        setStored(CONFIG.SESSION_START_KEY, session.sessionStart || Date.now().toString());
        setStored(CONFIG.EMAIL_CACHE_KEY, session.cache || '[]');
        
        if (elements.emailInput) elements.emailInput.value = currentEmail;
        
        if (elements.domainSelect && currentEmail) {
            const domain = currentEmail.split('@')[1];
            if (domain) {
                elements.domainSelect.value = domain;
            }
        }
        
        renderMailboxTabs();
        startSessionTimer();
        refreshMail();
    }
}

async function addNewMailbox() {
    if (activeSessions.length >= 5) {
        toast(t('toast_mailbox_limit'), 'warning');
        return;
    }
    
    saveCurrentSession();
    
    activeSessionIndex = activeSessions.length;
    currentEmail = '';
    sessionId = '';
    knownMailIds = new Set();
    
    setStored(CONFIG.EMAIL_KEY, '');
    setStored(CONFIG.SESSION_KEY, '');
    setStored(CONFIG.KNOWN_IDS_KEY, '[]');
    setStored(CONFIG.SESSION_START_KEY, Date.now().toString());
    setStored(CONFIG.EMAIL_CACHE_KEY, '[]');
    
    if (elements.emailInput) elements.emailInput.value = '';
    
    activeSessions.push({
        email: '',
        sessionId: '',
        knownIds: [],
        sessionStart: Date.now().toString(),
        cache: '[]'
    });
    
    saveCurrentSession();
    renderMailboxTabs();
    
    try {
        setLoading(true);
        await getSession();
        await genEmail();
        saveCurrentSession();
        renderMailboxTabs();
    } catch (e) {
        console.error('Failed to add new mailbox:', e);
    } finally {
        setLoading(false);
    }
}

function closeMailbox(index, event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    if (activeSessions.length <= 1) {
        activeSessions = [];
        activeSessionIndex = 0;
        clearStoredData();
        currentEmail = '';
        sessionId = '';
        knownMailIds = new Set();
        
        saveCurrentSession();
        renderMailboxTabs();
        initializeApp();
        toast(t('toast_mailbox_deleted'), 'success');
        return;
    }
    
    activeSessions.splice(index, 1);
    
    if (activeSessionIndex === index) {
        activeSessionIndex = Math.max(0, activeSessions.length - 1);
    } else if (activeSessionIndex > index) {
        activeSessionIndex--;
    }
    
    setStored('temp_mail_sessions_v4', JSON.stringify(activeSessions));
    setStored('temp_mail_current_session_index', activeSessionIndex.toString());
    
    const session = activeSessions[activeSessionIndex];
    currentEmail = session.email;
    sessionId = session.sessionId;
    knownMailIds = new Set(session.knownIds || []);
    
    setStored(CONFIG.EMAIL_KEY, currentEmail);
    setStored(CONFIG.SESSION_KEY, sessionId);
    setStored(CONFIG.KNOWN_IDS_KEY, JSON.stringify(Array.from(knownMailIds)));
    setStored(CONFIG.SESSION_START_KEY, session.sessionStart || Date.now().toString());
    setStored(CONFIG.EMAIL_CACHE_KEY, session.cache || '[]');
    
    if (elements.emailInput) elements.emailInput.value = currentEmail;
    
    if (elements.domainSelect && currentEmail) {
        const domain = currentEmail.split('@')[1];
        if (domain) {
            elements.domainSelect.value = domain;
        }
    }
    
    renderMailboxTabs();
    startSessionTimer();
    refreshMail();
    toast(t('toast_mailbox_deleted'), 'success');
}

function detectEmailTags(subject, from) {
    const s = (subject || '').toLowerCase();
    const f = (from || '').toLowerCase();
    
    if (s.includes('verify') || s.includes('verification') || s.includes('code') || s.includes('pin') || s.includes('otp') || s.includes('activation') || s.includes('confirm') || s.includes('onay') || s.includes('dogrula') || s.includes('doğrula') || s.includes('şifre') || s.includes('sifre') || s.includes('password') || s.includes('sign up') || s.includes('kayıt') || s.includes('kayit') || s.includes('activate') || s.includes('welcome') || s.includes('hoş geldin') || s.includes('hos geldin') ||
        f.includes('verify') || f.includes('code') || f.includes('otp') || f.includes('activation') || f.includes('confirm') || f.includes('onay') || f.includes('dogrula') || f.includes('doğrula')) {
        return { class: 'verification', label: t('tag_verification'), icon: 'fa-key' };
    }
    
    if (s.includes('security') || s.includes('güvenlik') || s.includes('guvenlik') || s.includes('alert') || s.includes('warn') || s.includes('suspicious') || s.includes('uyarı') || s.includes('uyari') || s.includes('login') || s.includes('giriş') || s.includes('giris') || s.includes('reset') || s.includes('2fa') || s.includes('mfa') ||
        f.includes('security') || f.includes('alert') || f.includes('warn') || f.includes('login')) {
        return { class: 'security', label: t('tag_security'), icon: 'fa-shield-halved' };
    }
    
    if (s.includes('test') || s.includes('demo') || s.includes('sandbox') || s.includes('dummy') || s.includes('trial') || s.includes('deneme') ||
        f.includes('test') || f.includes('demo') || f.includes('sandbox')) {
        return { class: 'testing', label: t('tag_testing'), icon: 'fa-flask' };
    }
    
    if (s.includes('newsletter') || s.includes('bülten') || s.includes('bulten') || s.includes('offer') || s.includes('discount') || s.includes('promo') || s.includes('deal') || s.includes('kampanya') || s.includes('indirim') || s.includes('fırsat') || s.includes('firsat') || s.includes('sale') ||
        f.includes('newsletter') || f.includes('promo') || f.includes('marketing') || f.includes('offer')) {
        return { class: 'marketing', label: t('tag_marketing'), icon: 'fa-bullhorn' };
    }
    
    return null;
}

function toggleStarMail(id, event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    const idStr = String(id);
    if (starredMailIds.has(idStr)) {
        starredMailIds.delete(idStr);
    } else {
        starredMailIds.add(idStr);
    }
    setStored('temp_mail_starred_ids', JSON.stringify(Array.from(starredMailIds)));
    updateEmailTable(lastFetchedEmails);
}

function renderFilterChips(emails = lastFetchedEmails) {
    if (!elements.filterChips) return;
    
    const totalCount = emails.length;
    const starredCount = emails.filter(e => starredMailIds.has(String(e.mail_id))).length;
    const verificationCount = emails.filter(e => {
        const tag = detectEmailTags(e.mail_subject, e.mail_from);
        return tag && tag.class === 'verification';
    }).length;
    
    elements.filterChips.innerHTML = `
        <button class="filter-chip ${currentFilter === 'all' ? 'active' : ''}" onclick="setFilter('all')">
            <i class="fa-solid fa-inbox"></i>
            <span>${t('filter_all')}</span>
            <span class="filter-chip-count">${totalCount}</span>
        </button>
        <button class="filter-chip ${currentFilter === 'starred' ? 'active' : ''}" onclick="setFilter('starred')">
            <i class="fa-solid fa-star"></i>
            <span>${t('filter_starred')}</span>
            <span class="filter-chip-count">${starredCount}</span>
        </button>
        <button class="filter-chip ${currentFilter === 'verification' ? 'active' : ''}" onclick="setFilter('verification')">
            <i class="fa-solid fa-key"></i>
            <span>${t('filter_verification')}</span>
            <span class="filter-chip-count">${verificationCount}</span>
        </button>
    `;
}

function setFilter(type) {
    currentFilter = type;
    updateEmailTable(lastFetchedEmails);
}

let allItems = [];
let selectedIndex = 0;

function showCommandPalette() {
    let modal = $('cmd-palette-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'cmd-palette-modal';
        modal.className = 'cmd-palette-modal hidden';
        document.body.appendChild(modal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCommandPalette();
            }
        });
    }
    
    modal.innerHTML = `
        <div class="cmd-palette-content">
            <div class="cmd-palette-search-wrapper">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" class="cmd-palette-search" id="cmd-palette-search" placeholder="${t('cmd_palette_placeholder')}" autocomplete="off">
            </div>
            <div class="cmd-palette-results" id="cmd-palette-results"></div>
            <div class="cmd-palette-footer">
                <span><kbd>↑↓</kbd> ${currentLanguage === 'TR' ? 'Gezin' : 'Navigate'}</span>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    const input = $('cmd-palette-search');
    if (input) input.focus();
    
    // Add command palette handlers here...
}

function closeCommandPalette() {
    const modal = $('cmd-palette-modal');
    if (modal) modal.classList.add('hidden');
}

// Global exposure for HTML inline onclick handlers and module compatibility
window.refreshMail = typeof refreshMail !== 'undefined' ? refreshMail : function() {};
window.genEmail = typeof genEmail !== 'undefined' ? genEmail : function() {};
window.copyEmail = typeof copyEmail !== 'undefined' ? copyEmail : function() {};
window.showCustomAliasModal = typeof showCustomAliasModal !== 'undefined' ? showCustomAliasModal : function() {};
window.showQRCodeModal = typeof showQRCodeModal !== 'undefined' ? showQRCodeModal : function() {};
window.deleteAllEmails = typeof deleteAllEmails !== 'undefined' ? deleteAllEmails : function() {};
window.switchMailbox = switchMailbox;
window.closeMailbox = closeMailbox;
window.addNewMailbox = addNewMailbox;
window.setFilter = setFilter;
window.toggleStarMail = toggleStarMail;
window.toggleLanguage = toggleLanguage;
