/**
 * Keyboard Tester - LED Manager
 * 
 * Gestion des LED virtuelles pour Caps Lock, Num Lock, Scroll Lock
 * Détection et mise à jour de l'état des touches de verrouillage
 * 
 * @license GPL-3.0
 */

/**
 * Références aux éléments LED du DOM
 */
const LEDElements = {
  capsLock: null,
  numLock: null,
  scrollLock: null
};

/**
 * Initialise le gestionnaire de LED
 * Récupère les éléments DOM et vérifie l'état initial
 */
function initLEDManager() {
  LEDElements.capsLock = document.getElementById('ledCapsLock');
  LEDElements.numLock = document.getElementById('ledNumLock');
  LEDElements.scrollLock = document.getElementById('ledScrollLock');
  
  // Vérifier l'état initial des touches de verrouillage
  checkInitialLEDStates();
  
  console.log('✅ LED Manager initialisé');
}

/**
 * Met à jour l'état des LED en fonction des touches de verrouillage
 * Utilise getModifierState() pour détecter l'état actuel
 * 
 * @param {KeyboardEvent} event - Événement clavier contenant l'état des modificateurs
 */
function updateLEDs(event) {
  // Caps Lock
  if (event.getModifierState('CapsLock')) {
    LEDElements.capsLock?.classList.add('active');
  } else {
    LEDElements.capsLock?.classList.remove('active');
  }
  
  // Num Lock
  if (event.getModifierState('NumLock')) {
    LEDElements.numLock?.classList.add('active');
  } else {
    LEDElements.numLock?.classList.remove('active');
  }
  
  // Scroll Lock
  if (event.getModifierState('ScrollLock')) {
    LEDElements.scrollLock?.classList.add('active');
  } else {
    LEDElements.scrollLock?.classList.remove('active');
  }
}

/**
 * Vérifie l'état initial des LED au chargement de la page
 * Problème : getModifierState() nécessite un événement
 * Solution : On attend le premier événement (keydown ou mousemove)
 */
function checkInitialLEDStates() {
  /**
   * Handler qui vérifie les états et se supprime après
   * @param {Event} event - Premier événement capturé
   */
  const checkStates = (event) => {
    updateLEDs(event);
    // Retirer les listeners après la première vérification
    window.removeEventListener('keydown', checkStates);
    window.removeEventListener('mousemove', checkStates);
    console.log('✅ État initial des LED vérifié');
  };
  
  // Vérifier au premier keydown ou mousemove
  // (mousemove permet de détecter l'état même si l'utilisateur ne presse aucune touche)
  window.addEventListener('keydown', checkStates, { once: true });
  window.addEventListener('mousemove', checkStates, { once: true });
}
