/**
 * Keyboard Tester - Configuration
 * 
 * Constantes globales, seuils de détection, paramètres
 * 
 * @license GPL-3.0
 */

const CONFIG = {
  /**
   * Seuil de détection de chattering en millisecondes
   * Si deux appuis de la même touche sont séparés de moins de cette valeur,
   * on considère qu'il y a un problème de double frappe (chattering)
   */
  CHATTERING_THRESHOLD: 50,

  /**
   * Délai d'attente pour confirmer qu'un ControlLeft n'est pas un fantôme d'AltGr
   * Sur certains systèmes, AltGr génère un événement ControlLeft fantôme ~1ms avant
   * On attend 15ms pour voir si un AltGraph arrive derrière
   */
  ALTGR_DETECTION_DELAY: 15,

  /**
   * Durée d'affichage de la modal de chattering en millisecondes
   */
  CHATTERING_MODAL_DURATION: 3000,

  /**
   * Layout par défaut au chargement de la page
   */
  DEFAULT_LAYOUT: 'azerty',

  /**
   * Touches modificatrices à exclure de la détection de chattering
   * Ces touches sont souvent maintenues enfoncées et généreraient des faux positifs
   */
  MODIFIER_KEYS: [
    'ShiftLeft', 
    'ShiftRight', 
    'ControlLeft', 
    'ControlRight', 
    'AltLeft', 
    'AltRight', 
    'MetaLeft', 
    'MetaRight'
  ],

  /**
   * Touches système à bloquer (preventDefault)
   * Pour éviter les comportements par défaut du navigateur
   */
  SYSTEM_KEYS: [
    'Escape', 'Tab', 'CapsLock', 'Enter', 'Backspace', 'Space', 
    'ContextMenu', 'AltLeft', 'AltRight', 'ControlRight', 
    'MetaLeft', 'MetaRight', 'ShiftLeft', 'ShiftRight', 
    'PrintScreen', 'ScrollLock', 'Pause',
    'Insert', 'Delete', 'Home', 'End', 'PageUp', 'PageDown',
    'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'
  ]
};

// Geler la configuration pour éviter les modifications accidentelles
Object.freeze(CONFIG);
