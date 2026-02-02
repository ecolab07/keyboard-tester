/**
 * Keyboard Tester - Chattering Detection
 * 
 * Détection des problèmes de double frappe (chattering)
 * Un chattering se produit quand une touche génère plusieurs signaux
 * lors d'un seul appui physique (problème mécanique ou électrique)
 * 
 * @license GPL-3.0
 */

/**
 * État de la détection de chattering
 */
const ChatteringState = {
  lastKeyPressTime: {}, // Map: keyCode -> timestamp
  timeout: null // Timeout pour cacher la modal
};

/**
 * Détecte si une touche produit un chattering (double frappe involontaire)
 * 
 * Un chattering est détecté si deux appuis de la même touche sont séparés
 * de moins de CONFIG.CHATTERING_THRESHOLD millisecondes
 * 
 * @param {string} code - Le code de la touche (ex: 'KeyA', 'Space')
 */
function detectChattering(code) {
  const now = performance.now();
  const lastPress = ChatteringState.lastKeyPressTime[code];
  
  // Si la touche a déjà été pressée
  if (lastPress) {
    const timeDiff = now - lastPress;
    
    // Si l'écart est inférieur au seuil, c'est un chattering
    if (timeDiff < CONFIG.CHATTERING_THRESHOLD) {
      // Log pour debug
      console.log('🚨 CHATTERING DÉTECTÉ:', code, 'Délai:', Math.round(timeDiff), 'ms');
      
      // Afficher la modal
      showChatteringModal(code, timeDiff);
    }
  }
  
  // Enregistrer le timestamp de cet appui
  ChatteringState.lastKeyPressTime[code] = now;
}

/**
 * Affiche la modal d'alerte de chattering
 * 
 * @param {string} code - Code de la touche concernée
 * @param {number} timeDiff - Temps écoulé entre les deux appuis (ms)
 */
function showChatteringModal(code, timeDiff) {
  const modal = document.getElementById('chatteringModal');
  const keyInfo = document.getElementById('chatteringKey');
  
  if (!modal || !keyInfo) {
    console.error('Éléments de modal introuvables');
    return;
  }
  
  // Afficher la modal
  modal.classList.add('show');
  keyInfo.textContent = `Touche: ${code} (${Math.round(timeDiff)}ms entre les frappes)`;
  
  // Programmer la fermeture automatique
  if (ChatteringState.timeout) {
    clearTimeout(ChatteringState.timeout);
  }
  
  ChatteringState.timeout = setTimeout(() => {
    modal.classList.remove('show');
  }, CONFIG.CHATTERING_MODAL_DURATION);
}

/**
 * Réinitialise l'état du détecteur de chattering
 * Utilisé lors du reset du test
 */
function resetChattering() {
  ChatteringState.lastKeyPressTime = {};
  
  const modal = document.getElementById('chatteringModal');
  if (modal) {
    modal.classList.remove('show');
  }
  
  if (ChatteringState.timeout) {
    clearTimeout(ChatteringState.timeout);
    ChatteringState.timeout = null;
  }
  
  console.log('✅ Détection de chattering réinitialisée');
}
