/**
 * Keyboard Tester - Keyboard Logic
 * 
 * Gestion de la détection des touches, matching avec les éléments DOM,
 * gestion des événements clavier
 * 
 * @license GPL-3.0
 */

/**
 * État global du clavier
 */
const KeyboardState = {
  keys: [], // Tous les éléments .key du DOM
  pendingControlLeft: null, // Timeout pour détecter ControlLeft fantôme
  currentLayout: CONFIG.DEFAULT_LAYOUT
};

/**
 * Initialise le module clavier
 * Récupère toutes les touches du DOM et configure l'état initial
 */
function initKeyboard() {
  KeyboardState.keys = [...document.querySelectorAll('.key')];
  console.log(`✅ Clavier initialisé : ${KeyboardState.keys.length} touches détectées`);
}

/**
 * Trouve les éléments DOM correspondant à un événement clavier
 * Utilise en priorité le data-code pour gérer CapsLock et touches spéciales
 * 
 * @param {KeyboardEvent} event - Événement clavier
 * @returns {Array<HTMLElement>} - Éléments DOM correspondants
 */
function matchKey(event) {
  // Priorité 1: Correspondance exacte par code (pour CapsLock et touches spéciales)
  const codeMatch = KeyboardState.keys.filter(k => k.dataset.code === event.code);
  if (codeMatch.length > 0) {
    return codeMatch;
  }
  
  // Priorité 2: AltGraph mapping
  // AltGr génère event.key = 'AltGraph' et event.code = 'AltRight'
  if (event.key === 'AltGraph') {
    return KeyboardState.keys.filter(k => k.dataset.code === 'AltRight');
  }
  
  // Priorité 3: Matching par caractère (pour les lettres)
  const ch = (event.key && event.key.length === 1) ? event.key.toLowerCase() : null;
  if (ch) {
    return KeyboardState.keys.filter(k => k.dataset.key === ch);
  }
  
  return [];
}

/**
 * Gère l'événement keydown
 * Détecte AltGr, ControlLeft fantôme, et met à jour l'interface
 * 
 * @param {KeyboardEvent} event - Événement clavier
 */
function handleKeyDown(event) {
  console.log('Key:', event.key, 'Code:', event.code);
  
  // Mettre à jour les LED
  updateLEDs(event);
  
  // Détecter le chattering (sauf pour les touches modificatrices)
  if (!CONFIG.MODIFIER_KEYS.includes(event.code)) {
    detectChattering(event.code);
  }
  
  // ========== DÉTECTION ALTGR ==========
  if (event.key === 'AltGraph') {
    // Annuler le ControlLeft fantôme s'il était en attente
    if (KeyboardState.pendingControlLeft) {
      console.log('ControlLeft fantôme détecté - activation annulée');
      clearTimeout(KeyboardState.pendingControlLeft);
      KeyboardState.pendingControlLeft = null;
    }
    
    // Activer la touche AltGr
    matchKey(event).forEach(k => {
      k.classList.add('active', 'used');
    });
    updateStats();
    event.preventDefault();
    return;
  }
  
  // ========== DÉTECTION CONTROLLEFT FANTÔME ==========
  // AltGr génère parfois un ControlLeft ~1ms avant sur certains systèmes
  // On attend 15ms pour voir si un AltGraph arrive
  if (event.code === 'ControlLeft') {
    const ctrlKeys = matchKey(event);
    
    KeyboardState.pendingControlLeft = setTimeout(() => {
      // Après 15ms, si on est toujours là, c'est un vrai Ctrl
      ctrlKeys.forEach(k => {
        k.classList.add('active', 'used');
      });
      updateStats();
      KeyboardState.pendingControlLeft = null;
    }, CONFIG.ALTGR_DETECTION_DELAY);
    
    event.preventDefault();
    return;
  }

  // ========== PRÉVENTION DES ACTIONS PAR DÉFAUT ==========
  if (event.code.startsWith('F') || CONFIG.SYSTEM_KEYS.includes(event.code)) {
    event.preventDefault();
  }

  // ========== TRAITEMENT NORMAL ==========
  const matched = matchKey(event);
  if (matched.length > 0) {
    matched.forEach(k => {
      k.classList.add('active', 'used');
    });
    updateStats();
  }
}

/**
 * Gère l'événement keyup
 * Retire l'état actif des touches et gère les cas spéciaux
 * 
 * @param {KeyboardEvent} event - Événement clavier
 */
function handleKeyUp(event) {
  console.log('KeyUp:', event.key, 'Code:', event.code);
  
  // Mettre à jour les LED
  updateLEDs(event);
  
  // ========== CONTROLLEFT EN ATTENTE ==========
  // Si on relâche ControlLeft alors qu'il était en attente de confirmation
  if (event.code === 'ControlLeft' && KeyboardState.pendingControlLeft) {
    clearTimeout(KeyboardState.pendingControlLeft);
    const ctrlKeys = matchKey(event);
    // Marquer comme testé mais pas actif
    ctrlKeys.forEach(k => {
      k.classList.add('used');
    });
    updateStats();
    KeyboardState.pendingControlLeft = null;
  }
  
  // ========== PRINT SCREEN (cas spécial) ==========
  // Print Screen ne déclenche souvent que keyup, pas keydown
  if (event.code === 'PrintScreen') {
    const printScreenKeys = KeyboardState.keys.filter(k => k.dataset.code === 'PrintScreen');
    printScreenKeys.forEach(k => {
      k.classList.add('active', 'used');
      // Animation temporaire
      setTimeout(() => k.classList.remove('active'), 200);
    });
    updateStats();
    event.preventDefault();
    return;
  }
  
  // ========== RETRAIT DE L'ÉTAT ACTIF ==========
  matchKey(event).forEach(k => k.classList.remove('active'));
}

/**
 * Change le layout de clavier actuel
 * @param {string} layoutName - Nom du layout
 */
function changeLayout(layoutName) {
  const layout = getLayout(layoutName);
  if (!layout) {
    console.error('Layout non trouvé:', layoutName);
    return;
  }
  
  KeyboardState.currentLayout = layoutName;
  console.log('Changement de layout:', layout.name);
  
  // Réinitialiser le test lors du changement de layout
  resetTest();
}

/**
 * Attache les event listeners au clavier
 */
function attachKeyboardListeners() {
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  window.addEventListener('contextmenu', e => e.preventDefault());
  
  console.log('✅ Event listeners attachés');
}
