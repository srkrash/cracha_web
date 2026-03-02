let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    console.log('PWA is installable');
    window.pwaInstallable = true;
});

window.addEventListener('appinstalled', (evt) => {
    // Log install to analytics
    console.log('INSTALL: Success');
    window.pwaInstallable = false;
    deferredPrompt = null;
});

async function promptPwaInstall() {
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, throw it away
        deferredPrompt = null;
        window.pwaInstallable = false;
        return outcome === 'accepted';
    } else {
        // Check if it's iOS
        const isIos = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            return /iphone|ipad|ipod/.test(userAgent);
        };

        // Check if it's already running in standalone mode (installed)
        const isStandalone = () => {
            return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
        };

        if (isStandalone()) {
            alert("O aplicativo já está instalado ou rodando em modo stand-alone.");
            return false;
        }

        if (isIos()) {
            alert("Para instalar neste dispositivo (iOS), toque no botão de Compartilhar do Safari e selecione 'Adicionar à Tela de Início'.");
            return false;
        } else {
            alert("A instalação rápida não está disponível neste navegador no momento, ou o aplicativo já está instalado. Tente acessar pelo Google Chrome ou procure por 'Instalar/Adicionar à Tela de Início' no menu do navegador.");
            return false;
        }
    }
}

// Function to check if we can install
function isPwaInstallable() {
    return window.pwaInstallable === true;
}
