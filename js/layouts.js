/**
 * Keyboard Tester - Layout Definitions
 * 
 * Définitions des différents layouts de clavier supportés
 * Chaque layout définit le mapping entre touches physiques et caractères
 * 
 * @license GPL-3.0
 */

const LAYOUTS = {
  /**
   * AZERTY (France)
   * Layout standard français
   */
  azerty: {
    name: 'AZERTY (FR)',
    physicalLayout: 'iso', // ISO = touche supplémentaire <>, Enter en L
    description: 'Layout français standard'
  },

  /**
   * QWERTY (US)
   * Layout américain standard
   */
  qwerty: {
    name: 'QWERTY (US)',
    physicalLayout: 'ansi', // ANSI = pas de touche <>, Enter rectangulaire
    description: 'Layout américain standard'
  },

  /**
   * QWERTY (UK)
   * Layout britannique
   */
  'qwerty-uk': {
    name: 'QWERTY (UK)',
    physicalLayout: 'iso',
    description: 'Layout britannique avec touches £ et #'
  },

  /**
   * BÉPO
   * Layout français optimisé pour l'ergonomie
   */
  bepo: {
    name: 'BÉPO',
    physicalLayout: 'iso',
    description: 'Layout français optimisé basé sur la fréquence des lettres'
  },

  /**
   * AZERTY (Apple)
   * Variante Apple du layout français
   */
  'azerty-apple': {
    name: 'AZERTY (Apple)',
    physicalLayout: 'iso',
    description: 'Layout français pour claviers Apple'
  }
};

/**
 * Récupère les informations d'un layout
 * @param {string} layoutName - Nom du layout
 * @returns {Object|null} - Informations du layout ou null si introuvable
 */
function getLayout(layoutName) {
  return LAYOUTS[layoutName] || null;
}

/**
 * Liste tous les layouts disponibles
 * @returns {Array} - Tableau des noms de layouts
 */
function getAvailableLayouts() {
  return Object.keys(LAYOUTS);
}

// Geler les layouts pour éviter les modifications
Object.freeze(LAYOUTS);
