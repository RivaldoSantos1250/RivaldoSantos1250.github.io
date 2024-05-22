function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; Secure; SameSite=Lax";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999; path=/; Secure; SameSite=Lax";
}

function showCookieConsent() {
    if (!getCookie("cookieConsent")) {
        document.getElementById("cookieConsent").style.display = "block";
    } else {
        initializeCookies();
    }
}

function acceptCookies() {
    setCookie("cookieConsent", "accepted", 365);
    document.getElementById("cookieConsent").style.display = "none";
    initializeCookies();
}

function initializeCookies() {
    // Exemplo de cookies
    setCookie("username", "", 30); // Nome de usuário
    setCookie("theme", "light", 30); // Preferência de tema
    setCookie("language", "pt", 30); // Idioma preferido
    setCookie("userPreferences", JSON.stringify({ fontSize: '16px', showNotifications: true }), 30); // Preferências do usuário
    setCookie("siteSettings", JSON.stringify({ layout: 'grid', showSidebar: true }), 30); // Configurações de site
    setCookie("trackingData", JSON.stringify({ lastVisit: new Date().toISOString().split('T')[0], pagesVisited: ['home', 'about', 'contact'] }), 30); // Dados de rastreamento
    setCookie("lastPageVisited", window.location.pathname, 30); // Última página visitada

    // Lendo os cookies
    const username = getCookie("username");
    const theme = getCookie("theme");
    const language = getCookie("language");
    const userPreferences = JSON.parse(getCookie("userPreferences") || '{}');
    const siteSettings = JSON.parse(getCookie("siteSettings") || '{}');
    const trackingData = JSON.parse(getCookie("trackingData") || '{}');
    const lastPageVisited = getCookie("lastPageVisited");

    if (username) {
        console.log("Bem-vindo de volta, " + username);
    }
    console.log("Tema atual: " + theme);
    console.log("Idioma preferido: " + language);
    console.log("Preferências do usuário: ", userPreferences);
    console.log("Configurações de site: ", siteSettings);
    console.log("Dados de rastreamento: ", trackingData);
    console.log("Última página visitada: " + lastPageVisited);

    // Aplicando as preferências de tema e idioma
    if (theme) {
        document.body.className = theme;
    }

    // Aplicando a preferência de idioma (a ser desenvolvida)
    if (language) {
        console.log("Idioma selecionado: " + language);
        // Implementação da lógica de troca de idioma
    }
}

document.addEventListener("DOMContentLoaded", showCookieConsent);